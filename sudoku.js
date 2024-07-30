const sudokuString1 =
  "005809100800010005140000037300070004010406020200080001920000018400090003001307400";
const sudokuString2 =
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000";
const sudokuString =
  "920306000001024600500000001040007000103402706000100080800000002007280900000601037";
const sudokuString3 =
  "142976853783542619659318274297465138438129765561837942326784591815693427974251386";
const N = 81;
const L = 9;
function mainjs() {
  let suitableIndexes = [];
  const falselyInsertedIndexesAndNumbers = new Map();
  const sudoku = sudokuString.split("");
  printSudoku(sudoku);

  for (let thatIndex = 0; thatIndex < N; thatIndex++) {
    if (sudoku[thatIndex] != 0) continue;
    suitableIndexes.push(thatIndex);
  }

  if (suitableIndexes.length == 0) checkSudokuFinished(sudoku);

  for (let index = 0; index < suitableIndexes.length; index++) {
    let suitableIndex = suitableIndexes[index];
    if (solve(sudoku, suitableIndex, falselyInsertedIndexesAndNumbers) == -1) {
      // Couldn't insert number
      // Get the index that number falsely inserted.
      let previousIndex = index - 1;
      let falselyInsertedIndex = suitableIndexes[previousIndex];
      let falselyInsertedNumber = sudoku[falselyInsertedIndex];

      if (falselyInsertedNumber == 0) {
        throw new Error(
          "Falsely inserted number is zero. This should not happen."
        );
      }
      // Delete the falsely inserted number.
      sudoku[falselyInsertedIndex] = 0 + "";
      printSudoku(sudoku);

      let falseNumbers =
        falselyInsertedIndexesAndNumbers.get(falselyInsertedIndex);
      if (falseNumbers == null) {
        falseNumbers = new Set();
      }
      falseNumbers.add(falselyInsertedNumber);
      falselyInsertedIndexesAndNumbers.set(falselyInsertedIndex, falseNumbers);
      index = previousIndex - 1;
    }
  }
  checkSudokuFinished(sudoku);
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
  str = str.join("");
  for (let i = 0; i < L; i++) {
    console.log(str.substr(i * L, L));
    if (i % 3 === 2) {
      console.log(" ");
    }
  }
}

function availableNumbers(solvedSudoku, index) {
  const arow = checkRow(solvedSudoku, index);
  const acol = checkColumn(solvedSudoku, index);
  const abox = checkBox(solvedSudoku, index);
  // Give the available numbers to try to fit.
  let everyNotpossible = [];
  everyNotpossible = arow.concat(acol).concat(abox);
  let okSet = new Set(everyNotpossible);

  let everyPossible = [];
  for (let i = 1; i <= 9; i++) {
    if (!okSet.has("" + i)) {
      everyPossible.push(i);
    }
  }
  return everyPossible;
}

function solve(solvedSudoku, index, falselyInsertedIndexesAndNumbers) {
  let availableNumbersArray = availableNumbers(solvedSudoku, index);

  let falseNumbersSetAtIndex = falselyInsertedIndexesAndNumbers.get(index);
  if (falseNumbersSetAtIndex != undefined) {
    let tempAvailableNumbersArray = [];
    for (let i = 0; i < availableNumbersArray.length; i++) {
      if (falseNumbersSetAtIndex.has(availableNumbersArray[i] + "")) {
        continue;
      }
      tempAvailableNumbersArray.push(availableNumbersArray[i]);
    }
    availableNumbersArray = tempAvailableNumbersArray;
  }
  if (availableNumbersArray.length == 0) {
    if (checkSudokuFinished(solvedSudoku)) {
      return 1;
    }
    for (let startIndex = index; startIndex < N; startIndex++) {
      if (falselyInsertedIndexesAndNumbers.get(startIndex) == undefined)
        continue;
      falselyInsertedIndexesAndNumbers.set(startIndex, new Set());
    }
    return -1;
  } else {
    const number = availableNumbersArray.pop();
    solvedSudoku[index] = number + "";
    printSudoku(solvedSudoku);
  }
}
function isSudokuAnswerValid(solvedSudoku) {
  let availableNumbersArray = [];
  for (let i = 0; i < 81; i++) {
    availableNumbersArray = availableNumbers(solvedSudoku, i);
    if (availableNumbersArray.length > 0) return;
  }
  console.log("Well done! Sudoku is valid too.");
}
function checkSudokuFinished(solvedSudoku) {
  isFinished = true;
  printSudoku(solvedSudoku);
  for (let i = 0; i < 81; i++) {
    if (solvedSudoku[i] == 0) return (isFinished = false);

    const availableNumbersArray = availableNumbers(solvedSudoku, i);

    if (
      availableNumbersArray.length == 1 &&
      availableNumbersArray.pop() === solvedSudoku[i]
    ) {
      return (isFinished = true);
    }

    if (availableNumbersArray.length !== 0) {
      isFinished = false;
      return isFinished;
    }
  }
  console.log("Sudoku Finished!");
  isSudokuAnswerValid(solvedSudoku);
  return isFinished;
}

mainjs();
