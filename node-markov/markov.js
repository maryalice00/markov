/** Textual markov chain generator */


class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    this.chains = {};

    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];

      if (!this.chains[word]) {
        this.chains[word] = [nextWord];
      } else {
        this.chains[word].push(nextWord);
      }
    }

    // Handle the last word
    const lastWord = this.words[this.words.length - 1];
    this.chains[lastWord] = [null];
  }

  makeText(numWords = 100) {
    const result = [];
    let currentWord = this.words[0];

    for (let i = 0; i < numWords; i++) {
      result.push(currentWord);

      const possibleNextWords = this.chains[currentWord];
      const nextWordIndex = Math.floor(Math.random() * possibleNextWords.length);
      currentWord = possibleNextWords[nextWordIndex];

      if (currentWord === null) {
        // Reached the end of the chain
        break;
      }
    }

    return result.join(" ");
  }
}

// Example usage:
let mm = new MarkovMachine("the cat in the hat");
console.log(mm.makeText());
console.log(mm.makeText(numWords = 50));

