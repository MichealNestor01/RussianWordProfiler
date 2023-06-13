const PUNCTUATION_REGEX = /[.,;:!?…–\-_"“”‘’«»(){}\[\]]/;
// split text is a way for me to extract words from the text we are given
// when given:
//      ...hello.. .world. sleep.
// It will extract:
//      {index: 0, prefix: ..., word: hello, postfix: ..},
//      {index: 1, prefix: ., word: world, postfix: .},
//      {index: 2, prefix: , word: sleep, postfix: .}
// This allows me to maintain user formatting of text by parsing these objects later
// instead of the text itself
// this function returns an array of these objects, and an array of just the words
export const splitText = (text) => {
  // console.log("\n\n\tRUNNING FORMAT TEXT\n\n");
  const items = text.split(" ");
  const outputBuffer = [];
  const wordBuffer = [];
  let itemIndex = 0;
  let currentItem = items[0];
  let wordIndex = 0;
  let wordStart = 0;
  let wordEnd = 0;
  let nextWord = -1;
  let nestedWord = false;
  while (itemIndex < items.length) {
    // get current item in the text
    if (nextWord === -1) {
      currentItem = items[itemIndex];
      wordStart = 0;
      nestedWord = false;
    } else {
      wordStart = nextWord;
      nextWord = -1;
      nestedWord = true;
    }
    wordEnd = currentItem.length;
    // find in the item the next word
    for (let charIndex = wordStart; charIndex < currentItem.length; charIndex++) {
      if (charIndex === wordStart) {
        if (PUNCTUATION_REGEX.test(currentItem[charIndex])) {
          wordStart++;
        }
      } else if (charIndex <= wordEnd) {
        if (PUNCTUATION_REGEX.test(currentItem[charIndex])) {
          wordEnd = charIndex;
        }
      } else if (nextWord === -1) {
        if (!PUNCTUATION_REGEX.test(currentItem[charIndex])) {
          nextWord = charIndex;
        }
      }
    }
    const prefix = currentItem.substring(nestedWord ? wordStart : 0, wordStart);
    let word = currentItem.substring(wordStart, wordEnd);
    // check for case where word includes line breaks at the start
    // in this case the line breaks should be their own word
    // I am ignoring the case where there are linebreaks at the end of
    // a word, why would anyone need that?
    let foundLineBreak = false;
    for (let charIndex = 0; charIndex < word.length; charIndex++) {
      if (charIndex === 0 && word[charIndex] === "\n") {
        foundLineBreak = true;
      }
      if (word[charIndex] != "\n") {
        break;
      } else {
        wordEnd = wordStart + charIndex + 1;
        nextWord = wordEnd;
      }
    }
    if (foundLineBreak) {
      word = currentItem.substring(wordStart, wordEnd);
    }
    const postfix = currentItem.substring(wordEnd, nextWord === -1 ? currentItem.length : nextWord);
    outputBuffer.push({ index: wordIndex++, prefix: prefix, word: word, postfix: postfix });
    wordBuffer.push(word);
    // Debug output: console.log(
    //  `item ${itemIndex}: {${currentItem}}\n\twordStart: ${wordStart}\n\twordEnd: ${wordEnd}\n\tnextWord: ${nextWord}\n\tprefix: ${prefix}\n\tword: ${word}\n\tpostfix: ${postfix}\n`
    //);
    // move onto the next item if there is not another nested word
    if (nextWord === -1) {
      itemIndex++;
    }
  }
  // console.log(outputBuffer);
  return { objects: outputBuffer, words: wordBuffer };
};
