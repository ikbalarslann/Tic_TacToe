"use strict";
var _this = this;
var Player = function (sign) {
    _this.sign = sign;
    var getSign = function () {
        return sign;
    };
    return { getSign: getSign };
};
var gameBoard = (function () {
    var board = ["", "", "", "", "", "", "", "", ""];
    var setField = function (index, sign) {
        if (index > board.length)
            return;
        board[index] = sign;
    };
    var getField = function (index) {
        if (index > board.length)
            return;
        return board[index];
    };
    var reset = function () {
        for (var i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };
    return { setField: setField, getField: getField, reset: reset };
})();
var displayController = (function () {
    var fieldElements = document.querySelectorAll(".field");
    var messageElement = document.getElementById("message");
    var restartButton = document.getElementById("restart-button");
    fieldElements.forEach(function (field) {
        return field.addEventListener("click", function (e) {
            if (gameController.getIsOver() || e.target.textContent !== "")
                return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        });
    });
    restartButton.addEventListener("click", function (e) {
        gameBoard.reset();
        gameController.reset();
        updateGameboard();
        setMessageElement("Player X's turn");
    });
    var updateGameboard = function () {
        for (var i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);
        }
    };
    var setResultMessage = function (winner) {
        if (winner === "Draw") {
            setMessageElement("It's a draw!");
        }
        else {
            setMessageElement("Player " + winner + " has won!");
        }
    };
    var setMessageElement = function (message) {
        messageElement.textContent = message;
    };
    return { setResultMessage: setResultMessage, setMessageElement: setMessageElement };
})();
var gameController = (function () {
    var playerX = Player("X");
    var playerO = Player("O");
    var round = 1;
    var isOver = false;
    var playRound = function (fieldIndex) {
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            displayController.setResultMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }
        if (round === 9) {
            displayController.setResultMessage("Draw");
            isOver = true;
            return;
        }
        round++;
        displayController.setMessageElement("Player " + getCurrentPlayerSign() + "'s turn");
    };
    var getCurrentPlayerSign = function () {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };
    var checkWinner = function (fieldIndex) {
        var winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        return winConditions
            .filter(function (combination) { return combination.includes(fieldIndex); })
            .some(function (possibleCombination) {
            return possibleCombination.every(function (index) { return gameBoard.getField(index) === getCurrentPlayerSign(); });
        });
    };
    var getIsOver = function () {
        return isOver;
    };
    var reset = function () {
        round = 1;
        isOver = false;
    };
    return { playRound: playRound, getIsOver: getIsOver, reset: reset };
})();
