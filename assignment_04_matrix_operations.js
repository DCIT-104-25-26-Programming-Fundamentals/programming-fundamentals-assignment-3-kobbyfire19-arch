// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readline = require('readline-sync');

function readMatrix(name) {
  const rows = Number(readline.question(`Enter number of rows for ${name}: `));
  const cols = Number(readline.question(`Enter number of columns for ${name}: `));

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const rowInput = readline.question(`Enter row ${i + 1} for ${name} (space-separated): `);
    const rowValues = rowInput.split(' ').map(Number);

    if (rowValues.length !== cols) {
      console.log(`Error: you must enter exactly ${cols} values.`);
      i--;
      continue;
    }

    matrix.push(rowValues);
  }

  return matrix;
}

function printMatrix(matrix, title) {
  console.log(`\n${title}:`);
  for (let i = 0; i < matrix.length; i++) {
    let line = '';
    for (let j = 0; j < matrix[i].length; j++) {
      line += matrix[i][j] + ' ';
    }
    console.log(line.trim());
  }
  console.log();
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

function addMatrices(A, B) {
  const rows = A.length;
  const cols = A[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(A[i][j] + B[i][j]);
    }
    result.push(row);
  }

  return result;
}

function multiplyMatrices(A, B) {
  const rowsA = A.length;
  const colsA = A[0].length;
  const rowsB = B.length;
  const colsB = B[0].length;
  const result = [];

  for (let i = 0; i < rowsA; i++) {
    const row = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += A[i][k] * B[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }

  return result;
}

console.log('--- PART A: Transpose a Matrix ---');
const matrixA = readMatrix('Matrix A');
const transposedA = transposeMatrix(matrixA);
printMatrix(matrixA, 'Original Matrix A');
printMatrix(transposedA, 'Transposed Matrix A');

console.log('--- PART B: Add Two Matrices ---');
const matrixB1 = readMatrix('Matrix B1');
const matrixB2 = readMatrix('Matrix B2');

if (
  matrixB1.length !== matrixB2.length ||
  matrixB1[0].length !== matrixB2[0].length
) {
  console.log('Error: Matrices B1 and B2 must have the same dimensions to be added.\n');
} else {
  const sumB = addMatrices(matrixB1, matrixB2);
  printMatrix(matrixB1, 'Matrix B1');
  printMatrix(matrixB2, 'Matrix B2');
  printMatrix(sumB, 'Sum (B1 + B2)');
}

console.log('--- PART C: Multiply Two Matrices ---');
const matrixC1 = readMatrix('Matrix C1 (A)');
const matrixC2 = readMatrix('Matrix C2 (B)');

if (matrixC1[0].length !== matrixC2.length) {
  console.log('Error: Number of columns in C1 must equal number of rows in C2 for multiplication.\n');
} else {
  const productC = multiplyMatrices(matrixC1, matrixC2);
  printMatrix(matrixC1, 'Matrix C1 (A)');
  printMatrix(matrixC2, 'Matrix C2 (B)');
  printMatrix(productC, 'Product (C1 x C2)');
}

