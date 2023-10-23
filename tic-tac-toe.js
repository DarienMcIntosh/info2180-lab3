document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('.square');
    const status = document.getElementById('status');
    const newGameButton = document.querySelector('.btn');

    let currentPlayer = 'X';
    const boardState = ['', '', '', '', '', '', '', '', ''];

    function checkForWinner(player) {
        const winningCombination = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winningCombination.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] === player && boardState[b] === player && boardState[c] === player;
        });
    }

    function handleClick(square, index) {
        if (!boardState[index] && !status.classList.contains('you-won')) {
            boardState[index] = currentPlayer;
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);

            if (checkForWinner(currentPlayer)) {
                status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
                status.classList.add('you-won');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function handleMouseOver(square) {
        if (!boardState[square.dataset.index] && !status.classList.contains('you-won')) {
            square.classList.add('hover');
        }
    }

    function handleMouseOut(square) {
        square.classList.remove('hover');
    }

    function handleNewGame() {
        boardState.fill('');
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O');
        });

        status.textContent = 'Move your mouse over a square and click to play an X or an O.';
        status.classList.remove('you-won');
        currentPlayer = 'X';
    }

    squares.forEach((square, index) => {
        square.dataset.index = index;
        square.addEventListener('click', () => handleClick(square, index));
        square.addEventListener('mouseover', () => handleMouseOver(square));
        square.addEventListener('mouseout', () => handleMouseOut(square));
    });

    newGameButton.addEventListener('click', handleNewGame);
});
