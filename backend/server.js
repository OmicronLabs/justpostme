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
app.get("/backend/page", function(req, res) {
  var query =
    "SELECT * from [pages] WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "';";
  executeQuery(res, query);
});

//POST API
app.post("/backend/postcomment", function(req, res) {
  var query =
    "INSERT INTO [comments] (postHash, text, timeCommented, byAdmin) VALUES('" +
    escapeQuotations(req.body.posthash) +
    "', '" +
    escapeQuotations(req.body.text) +
    "', GETUTCDATE(), '" +
    escapeQuotations(req.body.byadmin) +
    "');";
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

//GET API
app.get("/backend/getpending", function(req, res) {
  var query =
    "SELECT * from [posts] WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "' AND pending = 1;";
  executeQuery(res, query);
});

//GET API
app.get("/backend/getmoderating", function(req, res) {
  var query =
    "SELECT * from [posts] WHERE pageId = '" +
    escapeQuotations(req.param("pageid")) +
    "' AND pending = 1 AND underModeration = 1;";
  executeQuery(res, query);
});

//POST API
app.post("/backend/setmoderating", function(req, res) {
  var query =
    "UPDATE [posts] SET underModeration = 1 WHERE ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  executeQuery(res, query);
});

//POST API
app.post("/backend/stopmoderating", function(req, res) {
  var query =
    "UPDATE [posts] SET underModeration = 0 WHERE ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  executeQuery(res, query);
});

app.post("/backend/schedulepost", function(req, res) {
  var query =
    "SELECT * from [pages] Pg JOIN [posts] Ps ON Pg.pageId = Ps.pageId WHERE Ps.ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  queryGet(response => scheduleToFacebook(res, response), query);
  res.end('{"success" : "Posted Successfully", "status" : 200}');
});

//POST API
app.post("/backend/postit", function(req, res) {
  var query =
    "SELECT * from [pages] Pg JOIN [posts] Ps ON Pg.pageId = Ps.pageId WHERE Ps.ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  queryGet(response => postToFacebook(res, response), query);
  res.end('{"success" : "Posted Successfully", "status" : 200}');
});

var scheduleToFacebook = function(res, response) {
  var pageId = response.recordset[0].pageId[0];
  var postText = response.recordset[0].postText;
  var postid = response.recordset[0].ID[1] + "";
  var pageAccessToken = response.recordset[0].pageAccessToken;
  var postTime = "GETUTCDATE()";

  var query =
    "SELECT MAX(timePosted) AS maxTime FROM dbo.posts WHERE pageId = '" +
    pageId +
    "';";
  queryGet(
    response =>
      scheduleToFacebookQuery2(response.recordset[0].maxTime, postid, pageId),
    query
  );
};

var scheduleToFacebookQuery2 = function(maxTime, postid, pageId) {
  console.log("MaxTime is: " + maxTime);
  // var query2 =
  //   "UPDATE [posts] SET pending = 0, timePosted = " +
  //   postTime +
  //   " WHERE ID = '" +
  //   escapeQuotations(postid) +
  //   "';\n" +
  //   "UPDATE [pages] SET pendingPosts = (SELECT COUNT(ID) FROM [posts] WHERE pageid = '" +
  //   escapeQuotations(pageId) +
  //   "' and pending = 1) WHERE pageid = '" +
  //   escapeQuotations(pageId) +
  //   "';";
  // queryGet(response => console.log(response), query2);

  // request.post(
  //   `https://graph.facebook.com/${pageId}/feed?access_token=${pageAccessToken}&message=${postText}`,
  //   function(error, response, body) {
  //     body = JSON.parse(body);
  //     if (!error && response.statusCode == 200) {
  //       //console.log(body.data);
  //     }
  //   }
  // );
};

var postToFacebook = function(res, response) {
  var pageId = response.recordset[0].pageId[0];
  var postText = response.recordset[0].postText;
  var postid = response.recordset[0].ID[1] + "";
  var pageAccessToken = response.recordset[0].pageAccessToken;

  var query =
    "UPDATE [posts] SET pending = 0, timePosted = GETUTCDATE() WHERE ID = '" +
    escapeQuotations(postid) +
    "';\n" +
    "UPDATE [pages] SET pendingPosts = pendingPosts - 1 WHERE pageid = '" +
    escapeQuotations(pageId) +
    "';";
  queryGet(response => console.log(response), query);

  request.post(
    `https://graph.facebook.com/${pageId}/feed?access_token=${pageAccessToken}&message=${postText}`,
    function(error, response, body) {
      body = JSON.parse(body);
      if (!error && response.statusCode == 200) {
        //console.log(body.data);
      }
    }
  );
};

var incrementPosts = function(res, pageId) {
  var query =
    "UPDATE [pages] SET pendingPosts = pendingPosts + 1 WHERE pageId = '" +
    escapeQuotations(pageId) +
    "';";

  queryGet(response => console.log(response), query);
};

function sendEmail(address, text) {
  execSync(
    "ssh mhutti1@mhutti1.eu \"echo '" +
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

app.post("/backend/newreview", function(req, res) {
  console.log(req.body);
  var sentiment = req.body.Metadata["sentiment.score"];
  var profanity = +(req.body.Metadata["text.hasprofanity"] == "True");
  var language = req.body.Metadata["text.language"];
  var pii = +(req.body.Metadata["text.haspii"] == "True");
  var review = +(req.body.Metadata["text.reviewrecommended"] == "True");
  var jobid = req.body.JobId;
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
  queryGet(response => console.log(response), query);
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
  submitForReview(req.param("postText"), random);
  var query =
    "INSERT INTO [posts] (pageId, postText, pending, posthash) VALUES ('" +
    escapeQuotations(req.body.pageid) +
    "' , '" +
    escapeQuotations(req.body.postText) +
    "', 1, '" +
    escapeQuotations(random) +
    "')";

  queryGet(response => incrementPosts(res, req.body.pageid), query);
  res.end(
    '{"success" : "Updated Successfully", "status" : 200, "posthash" : "' +
      random +
      '"}'
  );
});

//POST API
app.post("/backend/removepost", function(req, res) {
  var query =
    "UPDATE [posts] SET pending = 0 WHERE ID = '" +
    escapeQuotations(req.param("postid")) +
    "';";
  console.log(query);
  executeQuery(res, query);
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

app.post("/backend/changeform", function(req, res) {
  console.log(req.body.form + req.body.content + req.body.pageid);

  var query;

  if (!req.body.submission) {
    console.log("AHAHAHAHAHAHAHA");
    query =
      "UPDATE [pages] SET formText = '" +
      escapeQuotations(req.body.form) +
      "' WHERE pageId = '" +
      escapeQuotations(req.body.pageid) +
      "';";
  } else if (!req.body.form) {
    console.log("AHAHAHAHAHAHAHA2");
    query =
      "UPDATE [pages] SET submissionText = '" +
      escapeQuotations(req.body.submission) +
      "' WHERE pageId = '" +
      escapeQuotations(req.body.pageid) +
      "';";
  } else {
    query =
      "UPDATE [pages] SET formText = '" +
      escapeQuotations(req.body.form) +
      "', submissionText = '" +
      escapeQuotations(req.body.submission) +
      "' WHERE pageId = '" +
      escapeQuotations(req.body.pageid) +
      "';";
  }
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
