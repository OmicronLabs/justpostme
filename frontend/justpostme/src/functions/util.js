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
