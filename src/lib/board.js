

class WordRow {
  constructor(i, solution) {
    this.i = i
    this.solution = solution
    this.boxes = []
    for (let i = 0; i < 5; i++) {
      this.boxes.push(new Box(i, this))
    }
  }
}
class Box {
  constructor(i, master) {
    this.master = master;
    this.i = i
    this.val = 'f'
  }
}


const newWordRows = (solution) => {
  const rows = []
  for (let i = 0; i < 6; i++) {
    rows.push(new WordRow(i, solution))
  }
  return rows
}


export {newWordRows}