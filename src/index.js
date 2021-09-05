module.exports = function solveSudoku(matrix) {
	const SIZE = matrix.length;
	const BOX_SIZE = Math.sqrt(SIZE);

	function findEmpty(matrix) {
		for (let r = 0; r < SIZE; r++) {
			for (let c = 0; c < SIZE; c++) {
				if (matrix[r][c] === 0) {
					return [r, c];
				}
			}
		}
		
		return null;
	}

	function validate(num, pos, matrix) {
		const [r, c] = pos;

		// Check column
		for (let i = 0; i < SIZE; i++) {
			if (matrix[i][c] === num && i !== r) {
				return false;
			}
		}

		// Check row
		for (let i = 0; i < SIZE; i++) {
			if (matrix[r][i] === num && i !== c) {
				return false;
			}
		}

		// Check box
		const boxRowPos = Math.floor(r / BOX_SIZE) * BOX_SIZE;
		const boxColPos = Math.floor(c / BOX_SIZE) * BOX_SIZE;

		for (let i = boxRowPos; i < boxRowPos + BOX_SIZE; i++) {
			for (let j = boxColPos; j < boxColPos + BOX_SIZE; j++) {
				if (matrix[i][j] === num && i !== r && j !== c) {
					return false;
				}
			}
		}

		return true;
	};

	function solve() {
		const currentPosition = findEmpty(matrix);

		if (currentPosition === null) {
			return true;
		}

		for (let i = 1; i < SIZE + 1; i++) {
			let currentNumber = i;
			let isValid = validate(currentNumber, currentPosition, matrix);

			if (isValid) {
				const [x, y] = currentPosition;
				matrix[x][y] = currentNumber;

				if (solve()) {
					return true;
				}

				matrix[x][y] = 0;
			}
		}

		return false;
	}

	solve();
	return matrix;
};