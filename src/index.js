module.exports = function solveSudoku(matrix) {
  const size = 9;
  const boxSize= 3;

  const findEmpty = (board) => {
      for (let r = 0; r < size; r++) {
          for (let c = 0; c< size; c++) {
              if (board[r][c] === 0) {
                  return [r, c];
              }
          }
      }

      return null;
  };

  const validate = (num, pos, board) => {
      const [r, c] = pos;

      //check rows
      for (let i = 0; i < size; i++) {
          if (board[i][c] === num && i !== r) {
              return false;
          }
      }

      //check columns
      for (let i = 0; i < size; i++) {
          if (board[r][i] === num && i !== c) {
              return false;
          }
      }

      //check box
      const boxRow = Math.floor(r / boxSize) * boxSize;
      const boxCol = Math.floor(c / boxSize) * boxSize;

      for (let i = boxRow; i < boxRow + boxSize; i++) {
          for (let j = boxCol; j < boxCol + boxSize; j++) {
              if (board[i][j] === num && i !== r && j !== c) {
                  return false;
              }
          }
      }

      return true;
  };

  const solve = () => {
      const currentPosition = findEmpty(matrix);

      if (currentPosition === null) {
          return true;
      }

      for (let i = 1; i < size + 1; i++) {
          const currentNumber = i;
          const isValid = validate(currentNumber, currentPosition, matrix);

          if (isValid) {
              const [x, y] = currentPosition;
              matrix[x][y] = currentNumber;

              if(solve()) {
                  return true;
              }

              matrix[x][y] = 0;
          }
      }

      return false;
  };

  solve();
  return matrix;
};