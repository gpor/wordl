
const nDown = 6
const nAcross = 5
class WordRow {
  constructor(i, targetWord) {
    this.i = i
    this.targetWord = targetWord
    this.boxes = []
    for (let i = 0; i < nAcross; i++) {
      this.boxes.push(new Box(i, this))
    }
  }
  showResult(result) {
    this.boxes.forEach((box, i) => {
      console.log('box', i, result[i])
      box.setResultClass(result[i])
    })
  }
  str() {
    let str = ''
    this.boxes.forEach((box) => {
      str += box.val
    })
    return str.toUpperCase()
  }
}
class Box {
  constructor(i, master) {
    this.master = master;
    this.i = i
    this.val = ''
    this.resultClass = ''
  }
  setResultClass(result) {
    this.resultClass = result;
  }
  tempRandomResult() {
    switch (Math.ceil(Math.random() * 9)) {
      case 1:
        this.resultClass = '-green'
        break
      case 2:
      case 3:
        this.resultClass = '-yellow'
        break
      default:
        this.resultClass = '-grey'
    }
  }
}


const newWordRows = (targetWord) => {
  const rows = []
  for (let i = 0; i < nDown; i++) {
    rows.push(new WordRow(i, targetWord))
  }
  return rows
}


export {newWordRows, nAcross, nDown}