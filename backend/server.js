//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();
var https = require("https");
var fs = require("fs");
var request = require("request");
var crypto = require("crypto");
const execSync = require("child_process").execSync;
require("dotenv").load();

var privateKey = fs.readFileSync("privkey.pem", "utf8");
var certificate = fs.readFileSync("fullchain.pem", "utf8");

var credentials = { key: privateKey, cert: certificate };

// Body Parser Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//CORS Middleware
app.use(function(req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

var server = https.createServer(credentials, app);

server.listen(6069, function() {
  console.log("server running at https://IP_ADDRESS:8001/");
});

//Initiallising connection string
var dbConfig = {
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  server: process.env.DBSERVER,
  database: "justpostme-main",

  options: {
    encrypt: true
  }
};

var print;

var sqlcon;

async function setup() {
  sqlcon = await sql.connect(
    dbConfig,
    function(err) {
      if (err) {
        console.log("Error while connecting database :- " + err);
        sqlcon.close();
      }
    }
  );
}

setup();

//Function to connect to database and execute query
var executeQuery = function(res, query) {
  var request = sqlcon.request();
  request.query(query, function(err, qres) {
    if (err) {
      console.log("Error while querying database :- " + err);
      res.send(err);
    } else {
      res.send(qres);
    }
  });
};

var queryGet = function(res, query) {
  // create Request object
  var request = sqlcon.request();
  // query to the database
  request.query(query, function(err, qres) {
    if (err) {
      console.log("Error while querying database :- " + err);
    } else {
      res(qres);
    }
  });
};

var updatePages = function(res, userid, userAccessToken, response) {
  request(
    `https://graph.facebook.com/${userid}/accounts?access_token=${userAccessToken}`,
    function(error, response, body) {
      body = JSON.parse(body);
      if (!error && response.statusCode == 200) {
        //console.log(body.data);
      }
      var pagesToInsert = body.data;

      var query =
        "SELECT * FROM [pages] where userid = '" +
        escapeQuotations(userid) +
        "';";
      queryGet(
        response => insertRelevantPages(res, response, userid, pagesToInsert),
        query
      );
    }
  );
};

var insertRelevantPages = function(res, response, userid, pagesToInsert) {
  var pagesInDB = response.recordset;

  var query =
    "DELETE FROM [pages] where userid = '" + escapeQuotations(userid) + "';";

  if (pagesToInsert == null) {
    console.log("Data passed to updatePages is null\n");
    return;
  }
  for (var i = 0; i < pagesToInsert.length; i++) {
    var sameFlag = false;
    var sameManaged = 0;
    var numPending = 0;
    var numScheduled = 0;
    for (var j = 0; j < pagesInDB.length; j++) {
      if (pagesToInsert[i].name === pagesInDB[j].name) {
        sameFlag = true;
        sameManaged = pagesInDB[j].managed;
        numPending = pagesInDB[j].pendingPosts;
        numScheduled = pagesInDB[j].scheduledPosts;
        break;
      }
    }

    if (sameManaged) {
      sameManaged = 1;
    } else {
      sameManaged = 0;
    }
    query =
      query +
      "\nINSERT INTO [pages] (userid, scheduledPosts, pendingPosts, pageId, pageAccessToken, managed, name) VALUES ('" +
      escapeQuotations(userid) +
      "', " +
      numScheduled +
      ", " +
      numPending +
      ", '" +
      escapeQuotations(pagesToInsert[i].id) +
      "' , '" +
      escapeQuotations(pagesToInsert[i].access_token) +
      "', " +
      sameManaged +
      ", '" +
      escapeQuotations(pagesToInsert[i].name) +
      "');";
  }

  executeQuery(res, query);
};

//GET API
app.get("/backend/getstats", function(req, res) {
  var query =
    "SELECT COUNT(DISTINCT Pg.pageID) AS numberOfPages, MAX(Ps.ID) AS numberOfPosts FROM dbo.pages Pg LEFT OUTER JOIN dbo.posts Ps ON Ps.pageId = Pg.pageId;";
  executeQuery(res, query);
});

//GET API
app.get("/backend/user", function(req, res) {
  var query = "select * from [users]";
  executeQuery(res, query);
});

//GET API
app.get("/backend/post", function(req, res) {
  var query =
    "select * from [posts] WHERE posthash = '" +
    escapeQuotations(req.param("postHash")) +
    "';";
  executeQuery(res, query);
});

//GET API
app.get("/backend/managedpages", function(req, res) {
  var query =
    "SELECT * from [pages] WHERE userid = '" +
    escapeQuotations(req.param("id")) +
    "' AND managed=1;";
  executeQuery(res, query);
});

//GET API
app.get("/backend/unmanagedpages", function(req, res) {
  var query =
    "SELECT * from [pages] WHERE userid = '" +
    escapeQuotations(req.param("id")) +
    "' AND managed=0;";
  executeQuery(res, query);
});

//GET API
app.get("/backend/getcomments", function(req, res) {
  var query =
    "SELECT * from [comments] WHERE postHash = '" +
    escapeQuotations(req.param("posthash")) +
    "';";
  executeQuery(res, query);
});

//GET API
app.get("/backend/getsettings", function(req, res) {
  var query =
    "SELECT preText, postText, queueTime, countFrom, scheduleFrom, scheduleTo from [pages] WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "';";
  executeQuery(res, query);
});

//GET API
app.get("/backend/page", function(req, res) {
  var query =
    "SELECT *, (SELECT COUNT(ID) FROM dbo.posts WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "' AND timeposted > DATEDIFF(s, '1970-01-01 00:00:00', GETUTCDATE())) AS numberScheduled FROM dbo.pages WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "';";
  executeQuery(res, query);
});

//POST API
app.post("/backend/postcomment", function(req, res) {
  var byadmin = "0";

  if (req.body.byadmin === "true") {
    byadmin = "1";
  }

  var query =
    "INSERT INTO [comments] (postHash, text, timeCommented, byAdmin) VALUES('" +
    escapeQuotations(req.body.posthash) +
    "', '" +
    escapeQuotations(req.body.text) +
    "', GETUTCDATE(), " +
    byadmin +
    ");";
  executeQuery(res, query);
});

//POST API
app.post("/backend/user", function(req, res) {
  var query =
    "DELETE FROM [users] where userid = '" +
    escapeQuotations(req.param("userid")) +
    "';\n" +
    "INSERT INTO [users] (userid, userAccessToken, email, expiresIn) VALUES ('" +
    escapeQuotations(req.param("userid")) +
    "', '" +
    escapeQuotations(req.param("userAccessToken")) +
    "' , '" +
    escapeQuotations(req.param("email")) +
    "', '" +
    escapeQuotations(req.param("expiresIn")) +
    "')";
  queryGet(
    response =>
      updatePages(
        res,
        req.param("userid"),
        req.param("userAccessToken"),
        response
      ),
    query
  );
});

app.get("/backend/authenticate", function(req, res) {
  var query =
    "SELECT * from [pages] WHERE userid = '" +
    escapeQuotations(req.param("userid")) +
    "' and pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "';";
  queryGet(response => checkAuthentication(res, response), query);
});

var checkAuthentication = function(res, response) {
  if (response.recordset[0] === undefined) {
    res.end('{"failure" : "No authentication", "status" : 403}');
  } else {
    res.end('{"success" : "Authenticated", "status" : 200}');
  }
};

//GET API
app.get("/backend/getpending", function(req, res) {
  var query =
    "SELECT * from [posts] WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "' AND pending = 1;";
  executeQuery(res, query);
});

//GET API
app.get("/backend/getnumberscheduled", function(req, res) {
  var query =
    "SELECT COUNT(ID) from dbo.posts WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "' AND timeposted > DATEDIFF(s, '1970-01-01 00:00:00', GETUTCDATE());";
  executeQuery(res, query);
});

//GET API
app.get("/backend/getscheduled", function(req, res) {
  var query =
    "SELECT * from dbo.posts WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "' AND timeposted > DATEDIFF(s, '1970-01-01 00:00:00', GETUTCDATE());";
  executeQuery(res, query);
});

//GET API
app.get("/backend/getmoderating", function(req, res) {
  var query =
    "SELECT * from [posts] WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "' AND underModeration = 1;";
  executeQuery(res, query);
});

//POST API
app.post("/backend/setmoderating", function(req, res) {
  var query =
    "SELECT pageId FROM [posts] WHERE ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  queryGet(
    response =>
      updatePostNumbers(res, req.param("postid"), response.recordset[0].pageId),
    query
  );
});

var updatePostNumbers = function(res, postId, pageId) {
  var query =
    "UPDATE [posts] SET underModeration = 1, pending = 0 WHERE ID = '" +
    postId +
    "';\n" +
    "UPDATE [pages] SET moderatingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
    pageId +
    "' and underModeration = 1), pendingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
    pageId +
    "' and pending = 1) WHERE pageId = '" +
    pageId +
    "';";
  executeQuery(res, query);
};

//POST API
app.post("/backend/setemail", function(req, res) {
  var query =
    "UPDATE [posts] SET email = '" +
    escapeQuotations(req.param("email")) +
    "' WHERE posthash = '" +
    escapeQuotations(req.param("posthash")) +
    "';";
  executeQuery(res, query);
  sendEmail(
    req.param("email"),
    "Your unique tracking link is: https://justpostme.tech/submission/" +
      req.param("posthash")
  );
});

//POST API
app.post("/backend/stopmoderating", function(req, res) {
  var query =
    "UPDATE [posts] SET underModeration = 0 WHERE ID = '" +
    escapeQuotations(req.param("postid")) +
    "';\n" +
    "UPDATE [pages] SET moderatingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
    escapeQuotations(pageId) +
    "' and underModeration = 1) WHERE pageId = '" +
    escapeQuotations(pageId) +
    "';";
  executeQuery(res, query);
});

app.post("/backend/schedulepost", function(req, res) {
  var query =
    "SELECT * from [pages] Pg JOIN [posts] Ps ON Pg.pageId = Ps.pageId WHERE Ps.ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  var email =
    "SELECT * from [posts] WHERE ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  console.log("Sending email: " + email);
  queryGet(
    response =>
      sendEmail(
        response.recordset[0].email,
        "Your post has been scheduled, you can track it at https://justpostme.tech/submission/" +
          response.recordset[0].posthash
      ),
    email
  );
  queryGet(response => scheduleToFacebook(res, response), query);
  res.end('{"success" : "Posted Successfully", "status" : 200}');
});

//POST API
app.post("/backend/postit", function(req, res) {
  var query =
    "SELECT * from [pages] Pg JOIN [posts] Ps ON Pg.pageId = Ps.pageId WHERE Ps.ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  var email =
    "SELECT * from [posts] WHERE ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  console.log("Sending email: " + email);
  queryGet(
    response =>
      sendEmail(
        response.recordset[0].email,
        "Your post has been scheduled, you can track it at https://justpostme.tech/submission/" +
          response.recordset[0].posthash
      ),
    email
  );
  queryGet(response => postToFacebook(res, response), query);
  res.end('{"success" : "Posted Successfully", "status" : 200}');
});

var scheduleToFacebook = function(res, response) {
  var pageId = response.recordset[0].pageId[0];
  var postText = response.recordset[0].postText
    .replace(/\|p\|/g, "")
    .replace(/\|\/p\|/g, "")
    .replace(/\|i\|/g, "")
    .replace(/\|\/i\|/g, "");
  var postId = response.recordset[0].ID[1] + "";
  var pageAccessToken = response.recordset[0].pageAccessToken;

  var query =
    "SELECT TOP 1 * FROM [pages] Pg JOIN [posts] PS on Ps.pageId = Pg.pageId WHERE Ps.pageId = '" +
    pageId +
    "' ORDER BY timePosted DESC;";
  queryGet(
    response =>
      scheduleToFacebookQuery2(
        response.recordset[0].timePosted,
        response.recordset[0].queueTime,
        postId,
        pageId,
        pageAccessToken,
        postText
      ),
    query
  );
};

var scheduleToFacebookQuery2 = function(
  maxTime,
  queueTime,
  postId,
  pageId,
  pageAccessToken,
  postText
) {
  console.log(
    "Max time: " +
      maxTime +
      ", queue time: " +
      queueTime +
      ", postId: " +
      postId +
      ", pageId: " +
      pageId +
      ", postText: " +
      postText
  );
  var postTime = "DATEDIFF(s, '1970-01-01 00:00:00', GETUTCDATE())";

  var nextQueueTime = maxTime + queueTime * 60 + 10;
  var nowTime = new Date() / 1000;
  console.log("Next queue time: " + nextQueueTime + ", now is: " + nowTime);

  if (nowTime > nextQueueTime) {
    //Post now
    var query =
      "UPDATE [posts] SET pending = 0, underModeration = 0, timePosted = " +
      nowTime +
      " WHERE ID = '" +
      escapeQuotations(postId) +
      "';\n" +
      "UPDATE [pages] SET pendingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
      escapeQuotations(pageId) +
      "' and pending = 1), moderatingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
      escapeQuotations(pageId) +
      "' and underModeration = 1) WHERE pageId = '" +
      escapeQuotations(pageId) +
      "';";
    queryGet(response => console.log(response), query);
    request.post(
      `https://graph.facebook.com/${pageId}/feed?access_token=${pageAccessToken}&message=${postText}`,
      function(error, response, body) {
        body = JSON.parse(body);
        if (!error && response.statusCode == 200) {
          console.log("Post body data: " + body.id);
          var queryLink =
            "UPDATE [posts] SET link = 'https://facebook.com/" +
            body.id +
            "' WHERE ID = '" +
            escapeQuotations(postId) +
            "';";
          queryGet(response => console.log(response), queryLink);
        }
      }
    );
  } else {
    console.log("Scheduling for time: " + nextQueueTime);

    var query =
      "UPDATE [posts] SET pending = 0, underModeration = 0, timePosted = " +
      nextQueueTime +
      " WHERE ID = '" +
      escapeQuotations(postId) +
      "';\n" +
      "UPDATE [pages] SET pendingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
      escapeQuotations(pageId) +
      "' and pending = 1), moderatingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
      escapeQuotations(pageId) +
      "' and underModeration = 1) WHERE pageId = '" +
      escapeQuotations(pageId) +
      "';";
    queryGet(response => console.log(response), query);
    console.log(
      `https://graph.facebook.com/${pageId}/feed?published=false&access_token=${pageAccessToken}&message=${postText}&scheduled_publish_time=${nextQueueTime}`
    );
    request.post(
      `https://graph.facebook.com/${pageId}/feed?published=false&access_token=${pageAccessToken}&message=${postText}&scheduled_publish_time=${nextQueueTime}`,
      function(error, response, body) {
        body = JSON.parse(body);
        if (!error && response.statusCode == 200) {
          console.log("Post body data: " + body.id);
          var queryLink =
            "UPDATE [posts] SET link = 'https://facebook.com/" +
            body.id +
            "' WHERE ID = '" +
            escapeQuotations(postId) +
            "';";
          queryGet(response => console.log(response), queryLink);
        }
      }
    );
  }
};

var postToFacebook = function(res, response) {
  var pageId = response.recordset[0].pageId[0];
  var postText = response.recordset[0].postText
    .replace(/\|p\|/g, "")
    .replace(/\|\/p\|/g, "")
    .replace(/\|i\|/g, "")
    .replace(/\|\/i\|/g, "");
  var postId = response.recordset[0].ID[1] + "";
  var pageAccessToken = response.recordset[0].pageAccessToken;

  var query =
    "UPDATE [posts] SET pending = 0, underModeration = 0, timePosted = DATEDIFF(s, '1970-01-01 00:00:00', GETUTCDATE()) WHERE ID = '" +
    escapeQuotations(postId) +
    "';\n" +
    "UPDATE [pages] SET pendingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
    escapeQuotations(pageId) +
    "' and pending = 1), moderatingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
    escapeQuotations(pageId) +
    "' and underModeration = 1) WHERE pageId = '" +
    escapeQuotations(pageId) +
    "';";
  queryGet(response => console.log(response), query);

  console.log(
    `https://graph.facebook.com/${pageId}/feed?access_token=${pageAccessToken}&message=${postText}`
  );
  request.post(
    `https://graph.facebook.com/${pageId}/feed?access_token=${pageAccessToken}&message=${postText}`,
    function(error, response, body) {
      body = JSON.parse(body);
      if (!error && response.statusCode == 200) {
        console.log("Post body data: " + body.id);
        var queryLink =
          "UPDATE [posts] SET link = 'https://facebook.com/" +
          body.id +
          "' WHERE ID = '" +
          escapeQuotations(postId) +
          "';";
        queryGet(response => console.log(response), queryLink);
      }
    }
  );
};

var countPosts = function(res, pageId) {
  if (pageId === undefined) {
    pageId = res.recordset[0].pageId;
  }
  console.log(res);
  var query =
    "UPDATE [pages] SET pendingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
    escapeQuotations(pageId) +
    "' and pending = 1), moderatingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageId = '" +
    escapeQuotations(pageId) +
    "' and underModeration = 1) WHERE pageId = '" +
    escapeQuotations(pageId) +
    "';";
  console.log("Recounting posts, query: " + query);
  queryGet(response => console.log(response), query);
};

function sendEmail(address, text) {
  execSync(
    "ssh -o 'StrictHostKeyChecking no' mhutti1@mhutti1.eu \"echo '" +
      text +
      "' | mail -s 'Post Update' -r noreply@justpostme.tech " +
      address +
      '"'
  );
}

//sendEmail("ijh16@ic.ac.uk", "this is a testpost");

function submitForReview(text, hash) {
  request.post({
    url: `https://westeurope.api.cognitive.microsoft.com/contentmoderator/review/v1.0/teams/webapps/jobs?ContentType=Text&ContentId=abc&WorkflowName=text&CallBackEndpoint=https://justpostme.tech:6069/backend/newreview`,
    headers: { "Ocp-Apim-Subscription-Key": process.env.AZACCESS },
    body: '{\n "ContentValue": "' + text + '" \n}',
    callback: function(error, response, body) {
      body = JSON.parse(body);
      if (!error && response.statusCode == 200) {
        console.log(body.JobId);
        var query =
          "UPDATE [posts] SET jobID = '" +
          body.JobId +
          "' WHERE posthash = '" +
          hash +
          "';";
        queryGet(response => console.log(response), query);
      }
    }
  });
}

var regp = /(cr\*p+)|(sh\*t+)|(f\*ck+)/g;
var regi = /(password)|(p\*\*\*word)|(pwd)|(pswrd)|(username)/g;

function extraLight(text) {
  text[0] = text[0].replace(regp, function(match, p) {
    text[1] = true;
    return "|p|" + match + "|/p|";
  });
  text[0] = text[0].replace(regi, function(match, p) {
    text[2] = true;
    return "|i|" + match + "|/i|";
  });
  return text;
}

function highlight(response, terms) {
  var text = response.recordset[0].postText;
  for (var i = 0; i < terms.length; i++) {
    if (terms[i].Text != undefined) {
      text =
        text.slice(0, terms[i].Index + i * 7) +
        "|i|" +
        terms[i].Text +
        "|/i|" +
        text.slice(terms[i].Index + terms[i].Text.length + i * 7);
    } else {
      text =
        text.slice(0, terms[i].Index + i * 7) +
        "|p|" +
        terms[i].Term +
        "|/p|" +
        text.slice(terms[i].Index + terms[i].Term.length + i * 7);
    }
  }
  text = extraLight([text, false, false]);

  var update =
    "UPDATE [posts] SET postText = '" +
    text[0] +
    "', profanity = " +
    +(text[1]) +
    ", pii = " +
    +(text[2]) +
    " WHERE jobID = '" +
    response.recordset[0].jobID +
    "';";
  console.log(text);
  queryGet(response => console.log(response), update);
}

app.post("/backend/newreview", function(req, res) {
  console.log(req.body);
  var sentiment = req.body.Metadata["sentiment.score"];
  var profanity = +(req.body.Metadata["text.hasprofanity"] == "True");
  var language = req.body.Metadata["text.language"];
  var pii = +(req.body.Metadata["text.haspii"] == "True");
  var review = +(req.body.Metadata["text.reviewrecommended"] == "True");
  var jobid = req.body.JobId;
  if (req.body.Metadata["text.matchterms"] == undefined) {
    req.body.Metadata["text.matchterms"] = "[]";
  }
  if (req.body.Metadata["text.detectedphonenumber"] == undefined) {
    req.body.Metadata["text.detectedphonenumber"] = "[]";
  }
  if (req.body.Metadata["text.detectedemail"] == undefined) {
    req.body.Metadata["text.detectedemail"] = "[]";
  }
  var termTerm = JSON.parse(req.body.Metadata["text.matchterms"])
    .concat(JSON.parse(req.body.Metadata["text.detectedphonenumber"]))
    .concat(JSON.parse(req.body.Metadata["text.detectedemail"]));
  var getquery = "SELECT * from [posts] WHERE jobID = '" + jobid + "';";

  var query =
    "UPDATE [posts] SET sentiment = " +
    sentiment +
    ", profanity = " +
    profanity +
    ", language = '" +
    language +
    "', pii = " +
    pii +
    ", review = " +
    review +
    " WHERE jobID = '" +
    jobid +
    "';";
  queryGet(response => queryGet(resp => highlight(resp, termTerm), getquery), query);
  res.end();
});

//POST API
app.post("/backend/updatepost", function(req, res) {
  submitForReview(req.param("postText"), escapeQuotations(req.body.postHash));
  var query =
    "UPDATE [posts] SET postText = '" +
    escapeQuotations(req.body.postText) +
    "' WHERE posthash = '" +
    escapeQuotations(req.body.postHash) +
    "'";

  queryGet(response => console.log(response), query);
  res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//POST API
app.post("/backend/createpost", function(req, res) {
  var random = crypto.randomBytes(20).toString("hex");
  var nowTime = new Date() / 1000;
  submitForReview(req.param("postText"), random);
  var query =
    "INSERT INTO [posts] (pageId, postText, pending, posthash, timeSubmitted) VALUES ('" +
    escapeQuotations(req.body.pageid) +
    "' , '" +
    escapeQuotations(req.body.postText) +
    "', 1, '" +
    escapeQuotations(random) +
    "', " +
    nowTime +
    ")";

  queryGet(response => countPosts(res, req.body.pageid), query);
  res.end(
    '{"success" : "Updated Successfully", "status" : 200, "posthash" : "' +
      random +
      '"}'
  );
});

//POST API
app.post("/backend/removepost", function(req, res) {
  var query =
    "SELECT * FROM [posts] WHERE ID = '" +
    escapeQuotations(req.param("postid")) +
    "';\n" +
    "DELETE FROM [posts] WHERE ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  queryGet(response => countPosts(response), query);
  res.end(
    '{"success" : "Deleted Successfully", "status" : 200, "postid" : "' +
      req.param("postid") +
      '"}'
  );
});

//POST API
app.post("/backend/addtomanaged", function(req, res) {
  var query =
    "UPDATE [pages] SET managed = 1 WHERE pageId = '" +
    req.param("pageid") +
    "';";
  executeQuery(res, query);
});

//POST API
app.post("/backend/removefrommanaged", function(req, res) {
  var query =
    "UPDATE [pages] SET managed = 0 WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "';";
  executeQuery(res, query);
});

app.post("/backend/settings", function(req, res) {
  console.log(
    "form: " +
      req.body.form +
      ", submission: " +
      req.body.submission +
      ", pageid: " +
      req.body.pageid +
      ", queue: " +
      req.body.queueTime +
      ", count from: " +
      req.body.countFrom
  );

  var query = "";

  if (req.body.submission) {
    console.log("Submission text change to: " + req.body.submission);
    query =
      query +
      "UPDATE [pages] SET postText = '" +
      escapeQuotations(req.body.submission) +
      "' WHERE pageId = '" +
      escapeQuotations(req.body.pageid) +
      "';\n";
  }
  if (req.body.form) {
    console.log("Form text change to: " + req.body.form);
    query =
      query +
      "UPDATE [pages] SET preText = '" +
      escapeQuotations(req.body.form) +
      "' WHERE pageId = '" +
      escapeQuotations(req.body.pageid) +
      "';\n";
  }
  if (req.body.queueTime) {
    console.log("Queue time change to: " + req.body.queueTime);
    query =
      query +
      "UPDATE [pages] SET queueTime = '" +
      req.body.queueTime +
      "' WHERE pageId = '" +
      escapeQuotations(req.body.pageid) +
      "';\n";
  }
  if (req.body.countFrom) {
    console.log("Count from change to: " + req.body.countFrom);
    query =
      query +
      "UPDATE [pages] SET countFrom = '" +
      req.body.countFrom +
      "' WHERE pageId = '" +
      escapeQuotations(req.body.pageid) +
      "';\n";
  }
  if (req.body.scheduleFrom) {
    console.log("Schedule from change to: " + req.body.scheduleFrom);
    query =
      query +
      "UPDATE [pages] SET scheduleFrom = '" +
      req.body.scheduleFrom +
      "' WHERE pageId = '" +
      escapeQuotations(req.body.pageid) +
      "';\n";
  }
  if (req.body.scheduleTo) {
    console.log("Schedule to change to: " + req.body.scheduleTo);
    query =
      query +
      "UPDATE [pages] SET scheduleTo = '" +
      req.body.scheduleTo +
      "' WHERE pageId = '" +
      escapeQuotations(req.body.pageid) +
      "';\n";
  }
  console.log("Changing settings, query: " + query);
  executeQuery(res, query);
});

var escapeQuotations = function(str) {
  result = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) === "'") {
      result += str.charAt(i);
    }
    result += str.charAt(i);
  }
  return result;
};
