// @flow
export const processText = (text: string) => {
  return text.split(/\040+/).map(word => {
    if (word.startsWith("|p|") && word.endsWith("|/p|")) {
      return { word: cleanupText(word), profanity: true };
    } else if (word.startsWith("|i|") && word.endsWith("|/i|")) {
      return { word: cleanupText(word), information: true };
    } else {
      return word;
    }
  });
};

export const cleanupText = (text: string) => {
  return text
    .replace(/\|p\|/g, ``)
    .replace(/\|\/p\|/g, ``)
    .replace(/\|i\|/g, ``)
    .replace(/\|\/i\|/g, ``);
};

export const convertSecondsToDate = unixtimestamp => {
  const months_arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const date = new Date(unixtimestamp * 1000);
  const year = date.getFullYear();
  const month = months_arr[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const convdataTime =
    day + "-" + month + "-" + year + " " + hours + ":" + minutes.substr(-2);
  return convdataTime;
};
