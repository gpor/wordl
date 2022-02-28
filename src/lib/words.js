import words from '../data/words.js'

class TargetWord {
  constructor() {
    const diffDate = new Date() - new Date(2021, 5, 19);
    this.number = Math.floor(diffDate / (1000 * 60 * 60 * 24));
    // this.word = words[Math.floor(Math.random() * 220)];
    this.word = words[this.number].toUpperCase();
    // console.log('this.word', this.word);
  }
  
  evaluate(attempt) {
    if (! words.includes(attempt.toLowerCase())) {
      alert('That word is not in the list...') // todo: add an alert feature
      return {
        inWordList: false,
      }
    }
    if (attempt === this.word) {
      return {
        inWordList: true,
        win: true,
        result: ['-green', '-green', '-green', '-green', '-green'],
      }
    }
    const result = [];
    [...attempt].forEach((letter, i) => {
      if (letter === this.word[i]) {
        result.push('-green')
      } else if ([...this.word].includes(letter)) {
        result.push('-yellow')
      } else {
        result.push('-grey')
      }
    })
    return {
      inWordList: true,
      win: false,
      result,
    }
  }
}


export {TargetWord}