let symbols = ['X', 'O'];
let currentPlayer = 'X';
const cells = [];
const minimaxBoard = ['', '', '', '', '', '', '', '', ''];
const board = document.getElementById('board');
const boardCells = board.querySelectorAll('.board-cell');
boardCells.forEach(cell => {
    cells.push(cell);
    cell.addEventListener('click', () => {
        if (cell.textContent === '') {
            cell.textContent = symbols[0];
            checkWin(symbols[0]);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === symbols[1]) {
                // Computer's move (AI)
                makeComputerMove();
            }
        }
    });
});

const xButton = document.querySelector('#xButton');
const oButton = document.querySelector('#oButton');

xButton.addEventListener('change', handlePlayerSelect);
oButton.addEventListener('change', handlePlayerSelect);

function handlePlayerSelect(event) {
    const selectedValue = event.target.id[0].toUpperCase();
    symbols[0] = selectedValue;
    symbols[1] = selectedValue === 'X' ? 'O' : 'X';
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    resetBoard();
    if (currentPlayer === symbols[1]) {
        // Computer's move (AI)
        makeComputerMove();
    }
}

function makeComputerMove() {
    // Simple AI: Choose a random empty cell
    const difficultySelect = document.querySelector('#select-difficulty');
    const emptyCells = cells.filter(cell => cell.textContent === '');

    switch (difficultySelect.value) {
        case "easy":
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const cell = emptyCells[randomIndex];
            if (cell) {
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer);
                checkWin(currentPlayer);
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            break;

        case "medium":
            // Medium Difficulty - Random or Winning Move
            const winningMove = getWinningMove(currentPlayer);
            if (winningMove !== -1) {
                const winningCell = cells[winningMove];
                winningCell.textContent = currentPlayer;
                winningCell.classList.add(currentPlayer);
                checkWin(currentPlayer);
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                break;
            }

            const randomIndexMedium = Math.floor(Math.random() * emptyCells.length);
            const mediumCell = emptyCells[randomIndexMedium];
            if (mediumCell) {
                mediumCell.textContent = currentPlayer;
                mediumCell.classList.add(currentPlayer);
                checkWin(currentPlayer);
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            break;

        case "impossible":
            // TODO:Impossible Difficulty - Minimax Algorithm
            const bestMove = minimax(minimaxBoard.slice(), currentPlayer).index;
            const impossibleCell = cells[bestMove];
            if (impossibleCell) {
                impossibleCell.textContent = currentPlayer;
                impossibleCell.classList.add(currentPlayer);
                checkWin(currentPlayer);
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            break;

        default:
            break;
    }
}

function getWinningMove(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent === player &&
            cells[b].textContent === player &&
            cells[c].textContent === ''
        ) {
            return c;
        } else if (
            cells[a].textContent === player &&
            cells[b].textContent === '' &&
            cells[c].textContent === player
        ) {
            return b;
        } else if (
            cells[a].textContent === '' &&
            cells[b].textContent === player &&
            cells[c].textContent === player
        ) {
            return a;
        }
    }
    return -1;
}

function minimax(newBoard, player) {
    const availableMoves = getEmptyCells(newBoard);

    if (checkWin(symbols[0])) {
        return { score: -10 };
    } else if (checkWin(symbols[1])) {
        return { score: 10 };
    } else if (availableMoves.length === 0) {
        return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availableMoves.length; i++) {
        const move = {};
        move.index = newBoard[availableMoves[i]];
        newBoard[availableMoves[i]] = player;

        if (player === symbols[1]) {
            const result = minimax(newBoard, symbols[0]);
            move.score = result.score;
        } else {
            const result = minimax(newBoard, symbols[1]);
            move.score = result.score;
        }

        newBoard[availableMoves[i]] = move.index;
        moves.push(move);
    }

    let bestMove;
    if (player === symbols[1]) {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function getEmptyCells(board) {
    return board.map((cell, index) => (cell === '' ? index : null)).filter((value) => value !== null);
}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent === player &&
            cells[b].textContent === player &&
            cells[c].textContent === player
        ) {
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            setTimeout(resetBoard, 2000);
            return true;
        }
    }
    if (cells.every(cell => cell.textContent !== '') && cells.every(cell => cell.classList.contains('win') === false)) {
        //Draw
        board.classList.add('draw');
        setTimeout(resetBoard, 2000);
    }
    return false;
}

function resetBoard() {
    board.classList.remove('draw');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'win');
    });
    currentPlayer = 'X';
    if (symbols[1] === currentPlayer)
        makeComputerMove();
}
