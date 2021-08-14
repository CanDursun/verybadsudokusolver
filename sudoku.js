const sudoku = []
const sudokuString1 = '005809100800010005140000037300070004010406020200080001920000018400090003001307400'
const sudokuString =  '000000000000000000000000000000000000000000000000000000000000000000000000000000000'
const N = 81
const L = 9
function mainjs() {
  let availableRow
  let availableColumn
  let availableBox

  for (let i = 0; i < N; i++) {
    sudoku[i] = Number(sudokuString.substr(i, 1))
  }


  for (let thatIndex = 0; thatIndex < N; thatIndex++) {
    console.log(thatIndex);
    availableRow = checkRow(sudoku, thatIndex)
    availableColumn = checkColumn(sudoku, thatIndex)
    availableBox = checkBox(sudoku, thatIndex)
    printSudoku(sudoku, sudokuString)
    console.log('Box:')
    console.log(availableBox)
    deleteZeros(availableBox)
    console.log(availableBox)
    console.log('Col:')
    console.log(availableColumn)
    deleteZeros(availableColumn)
    console.log(availableColumn)
    console.log('Row:')
    console.log(availableRow)
    deleteZeros(availableRow)
    console.log(availableRow)
    console.log('the sum:' + availableNumber(availableRow, availableColumn, availableBox))
  }
}

function checkRow (sud, index) {
  let thisRow = []
  let j = 0
  const tmp = index
  let division = 0
  division = tmp / L;
  division = Math.floor(division)
  for (let i = division * L; i < (division * L) + 9; i++) {
    thisRow[j] = sud[i]
    j++
  }

  return thisRow
}

function checkColumn (sud, index) {
  var thisColumn = []
  let j = 0
  const tmp = index
  let remainder = 0
  remainder = tmp % L
  for (let i = remainder; i < remainder + 73; i = i + 9) {
    thisColumn[j] = sud[i]
    j++
  }
  return thisColumn
}

function checkBox (sud, index) {
  var thisBox = []
  let tmp = index / 3
  tmp = Math.floor(tmp)
  let division
  division = tmp / 3
  division = Math.floor(division)
  let divisionOfDivision
  divisionOfDivision = division / 3
  divisionOfDivision = Math.floor(divisionOfDivision)
  let j = 0
  for (let i = tmp * 3 - division * 9 + divisionOfDivision * 27; i < tmp * 3 - division * 9 + divisionOfDivision * 27 + 21; i++) {
    thisBox[j] = sud[i]
    j++
    if (i % 3 === 2) {
      i = i + 6
    }
  }

  return thisBox
}

function deleteZeros (array) {
  for (let i = 0; i < 9; i++) {
    if (array[i] === 0) {
      array.splice(i, 1)
      i--
    }
  }
}

function printSudoku (sud, str) {
  for (let i = 0; i < L; i++) {
    console.log(str.substr(i * L, L))
    if (i % 3 === 2) {
      console.log(' ')
    }
  }
}
function availableNumber (row, col, box) {
  let everyNotpossible = [];
  everyNotpossible = row.concat(col).concat(box);
  let okSet = new Set(everyNotpossible);
  let everyPossible = [];
    for (let i = 1; i <= 9; i++) {
    if(!okSet.has(i)){
      everyPossible.push(i);
    }
  }
  return everyPossible
}
function solve (isSolved){
  if (isSolved) {
    console.log("Solved: " + isSolved++)
    if (isSolved == 10) {
      isSolved = 0;
    }
    solve(isSolved);
    printSudoku(sudoku,sudokuString);
  }else {
    console.log("Not solved: " + isSolved);
  }
}

//mainjs();
solve(1);
