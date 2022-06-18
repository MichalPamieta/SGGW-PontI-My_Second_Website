(function Game() {
    var game = document.getElementById('game-board');
    var boxes = document.querySelectorAll('.game-box');
    var resetGame = document.getElementById('reset-game');
    var resetStats = document.getElementById('reset-stats');
    var turnDisplay = document.getElementById('turn');
    var result = document.querySelector('span.winner');
    var gameMessages = document.getElementById('game-messages');
    var playerOneScoreCard = document.getElementById('x-one');
    var playerTwoScoreCard = document.getElementById('o-two');
    var players = { 'player1': 'x', 'player2': 'o' };
    var playerOneScore = 0;
    var playerTwoScore = 0;
    var turns;
    var currentPlayer;
    var board;

    var init = function () {
        turns = 0;
        board = [];
        gameMessages.class = 'whosnext';
        currentPlayer = players.player1;
        turnDisplay.className = currentPlayer;

        for (var i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('click', clickHandler);
        }

        resetGame.addEventListener('click', resetGameHandler);
        resetStats.addEventListener('click', resetStatsHandler);
    }

    var changePlayer = function () {
        return currentPlayer = currentPlayer === players.player1 ? players.player2 : players.player1;
    }


    var clickHandler = function () {
        this.removeEventListener('click', clickHandler);

        this.className = 'game-box ' + currentPlayer;
        this.innerText = currentPlayer;

        board[this.id] = currentPlayer;
        turns++;

        if (checkStatus()) {
            gameWon();
            return;
        }

        currentPlayer = changePlayer();
        turnDisplay.className = currentPlayer;
    }

    var checkStatus = function () {
        if (board[0] === currentPlayer) {
            if (board[1] === currentPlayer && board[2] === currentPlayer) {
                result.innerText = `Gracz ${currentPlayer} zaznaczył górną linię poziomą.`;
                return true;
            }
            if (board[3] === currentPlayer && board[6] === currentPlayer) {
                result.innerText = `Gracz ${currentPlayer} zaznaczył linię pionową z lewej strony.`;
                return true;
            }
            if (board[4] === currentPlayer && board[8] === currentPlayer) {
                result.innerText = `Gracz ${currentPlayer} zaznaczył linię na ukos (od lewego górnego rogu do prawego dolnego).`;
                return true;
            }
        }
        if (board[8] === currentPlayer) {
            if (board[2] === currentPlayer && board[5] === currentPlayer) {
                result.innerText = `Gracz ${currentPlayer} zaznaczył linię pionową z prawej strony.`;
                return true;
            }
            if (board[6] === currentPlayer && board[7] === currentPlayer) {
                result.innerText = `Gracz ${currentPlayer} zaznaczył dolną linię poziomą.`;
                return true;
            }
        }
        if (board[4] === currentPlayer) {
            if (board[1] === currentPlayer && board[7] === currentPlayer) {
                result.innerText = `Gracz ${currentPlayer} zaznaczył środkową linię pionową.`;
                return true;
            }
            if (board[3] === currentPlayer && board[5] === currentPlayer) {
                result.innerText = `Gracz ${currentPlayer} zaznaczył środkową linię poziomą.`;
                return true;
            }
            if (board[2] === currentPlayer && board[6] === currentPlayer) {
                result.innerText = `Gracz ${currentPlayer} zaznaczył linię na ukos (od prawego górnego rogu do lewego dolnego).`;
                return true;
            }
        }
        if (turns == 9) {
            gameDraw();
        }
    }

    var gameWon = function () {
        clearEvents();

        gameMessages.className = 'win-' + currentPlayer;
        turnDisplay.className = 'winner';

        switch (currentPlayer) {
            case 'x':
                playerOneScoreCard.innerText = ++playerOneScore;
                break;
            case 'o':
                playerTwoScoreCard.innerText = ++playerTwoScore;
        }
    };

    var gameDraw = function () {
        clearEvents();

        gameMessages.className = 'draw';
        turnDisplay.style.visibility = 'hidden';
    };


    var clearEvents = function () {
        boxes.forEach(box => box.removeEventListener('click', clickHandler));
        /*
        for(var i = 0; i < boxes.length; i++) {
            boxes[i].removeEventListener('click', clickHandler);
        }
        */
    };

    var resetGameHandler = function () {
        clearEvents();
        init();

        boxes.forEach(box => {
            box.className = 'game-box';
            box.innerText = '';
        });

        /*
        for(var i = 0; i < boxes.length; i++) {
            boxes[i].className = 'game-box';
            boxes[i].innerText = '';
        }
        */

        gameMessages.className = 'whosnext';
        currentPlayer = players.player1;
        turnDisplay.className = currentPlayer;
        turnDisplay.style.visibility = 'visible';

    };

    var resetStatsHandler = function () {
        playerOneScoreCard.innerText = 0;
        playerTwoScoreCard.innerText = 0;
    };

    game && init();
})();