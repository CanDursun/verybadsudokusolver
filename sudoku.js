const sudoku = [];
const sudokuString1 =
  "005809100800010005140000037300070004010406020200080001920000018400090003001307400";
const sudokuString =
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000";
const N = 81;
const L = 9;

function mainjs() {
  let availableRow;
  let availableColumn;
  let availableBox;
  let suitableIndexes = [];
  const sudoku = sudokuString.split("");
  for (let thatIndex = 0; thatIndex < N; thatIndex++) {
    if (sudoku[thatIndex] != 0) continue;
    suitableIndexes.push(thatIndex);
  }
  console.log("yo! " + suitableIndexes);
  printSudoku(sudoku.join(""));

  solve(0, sudoku, 0);
}

function checkRow(sud, index) {
  let thisRow = [];
  let j = 0;
  const tmp = index;
  let division = 0;
  division = tmp / L;
  division = Math.floor(division);
  for (let i = division * L; i < division * L + 9; i++) {
    thisRow[j] = sud[i];
    j++;
  }

  return thisRow;
}

function checkColumn(sud, index) {
  var thisColumn = [];
  let j = 0;
  const tmp = index;
  let remainder = 0;
  remainder = tmp % L;
  for (let i = remainder; i < remainder + 73; i = i + 9) {
    thisColumn[j] = sud[i];
    j++;
  }
  return thisColumn;
}

function checkBox(sud, index) {
  var thisBox = [];
  let tmp = index / 3;
  tmp = Math.floor(tmp);
  let division;
  division = tmp / 3;
  division = Math.floor(division);
  let divisionOfDivision;
  divisionOfDivision = division / 3;
  divisionOfDivision = Math.floor(divisionOfDivision);
  let j = 0;
  for (
    let i = tmp * 3 - division * L + divisionOfDivision * L * 3;
    i < tmp * 3 - division * L + divisionOfDivision * 27 + 21;
    i++
  ) {
    thisBox[j] = sud[i];
    j++;
    if (i % 3 === 2) {
      i = i + 6;
    }
  }

  return thisBox;
}

function deleteZeros(array) {
  for (let i = 0; i < L; i++) {
    if (array[i] === 0) {
      array.splice(i, 1);
      i--;
    }
  }
}

function printSudoku(str) {
  for (let i = 0; i < L; i++) {
    console.log(str.substr(i * L, L));
    if (i % 3 === 2) {
      console.log(" ");
    }
  }
}

function availableNumber(row, col, box) {
  let everyNotpossible = [];
  everyNotpossible = row.concat(col).concat(box);
  let okSet = new Set(everyNotpossible);
  let everyPossible = [];
  for (let i = 1; i <= 9; i++) {
    if (!okSet.has(i)) {
      everyPossible.push(i);
    }
  }
  return everyPossible;
}

//TODO: what the fuck is that Can? XD
function solve(backflag, solvedSudoku, index) {
  if (backflag == undefined) throw "error from can: backflag is undefined";

  let unwantednum = 0;

  const arow = checkRow(solvedSudoku, index);
  const acow = checkColumn(solvedSudoku, index);
  const abox = checkBox(solvedSudoku, index);
  //TODO: sovle the undefined problem!!!
  //cant remember the before number!!
  const numbers = availableNumber(arow, acow, abox);

  console.log(numbers);
  //figure out how backflag works!!!
  if (numbers.length == 0) {
    // no elements to assign
    //do recursive shit
    console.log("going back one index");
    unwantednum = solvedSudoku[index - 1];
    solve(++backflag, solvedSudoku, index - 1);
  } else {
    const number = numbers.pop();
    solvedSudoku[index] = number;
    printSudoku(solvedSudoku.join(""));
    index++;
    solve(backflag, solvedSudoku, index);
  }
}

mainjs();
//solve(1);
