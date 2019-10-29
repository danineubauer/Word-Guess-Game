'use strict';

const game = {
    streets: [
        "hyde street",
        "lombard street",
        "market street",
        "embarcadero",
        "valencia",
    ],

    wins: 0,
    losses: 0,
    remainingGuesses: 9,
    wordGuessed: "",
    letterGuessed: "",
    userGuess: "",
    strPick: "",
    correctUserGuesses: [],

    initial(a) {
        if (a.code === 'Space') {
            document.getElementById('start').innerHTML = '';
            document.getElementById('end').innerHTML = '';
            return game.start();
        }
    },

    start() {
        document.removeEventListener("keyup", this.initial);
        let pick = this.streets[
            Math.floor(Math.random() * this.streets.length)
        ];
        this.strPick = pick.toUpperCase();
        console.log(this.strPick);
        this.strGen();
        return document.addEventListener("keyup", this.guess);
    },

    strGen() {
        this.wordGuessed = "";
        letter:for (let index = 0; index < this.strPick.length; index++) {
            for (let i = 0; i < this.correctUserGuesses.length; i++) {
                if ((this.strPick[index]) === (this.correctUserGuesses[i])) {
                    this.wordGuessed += this.correctUserGuesses[i] + " ";
                    continue letter;
                }
            }
            if (index === this.strPick.length - 1) {
                this.wordGuessed += "_";
            } else if (this.strPick[index] === " ") {
                this.wordGuessed += "- ";
            } else {
                this.wordGuessed += "_ ";
            }
        }
        this.updateHTML();
    },

    guess(e) {
        if (game.screenInput(e)) {
            return;
        } else {
            game.logic();
        }
    },

    logic() {
        if (this.strPick.indexOf(this.userGuess) === -1) {
            this.remainingGuesses--;
            this.letterGuessed += this.userGuess;
            this.updateHTML();
            return this.check();
        } else {
            this.correctUserGuesses.push(this.userGuess);
            this.strGen();
            return this.check();
        }
    },

    screenInput(input) {
        try {
            if (input.keyCode < 65 || input.keyCode > 90) {
                if (input.code === "Space") {
                    throw input.code;
                } else {
                    throw input.key;
                }
            } else {
                this.userGuess = input.key.toUpperCase();
            }
        } catch (err) {
            alert("This is not a letter");
            return true;
        }
        try {
            if (
                game.letterGuessed.indexOf(game.userGuess) !== -1 ||
                game.wordGuessed.indexOf(game.userGuess) !== -1
            ) {
                throw game.userGuess;
            }
        } catch (err) {
            alert("You already guessed this letter");
            return true;
        }
        return false;
    },

    updateHTML(game) {
        document.getElementById('wins').innerHTML = `Wins: ${this.wins}`;
        document.getElementById('losses').innerHTML = `Losses: ${this.losses}`;
        if (game) {
            document.getElementById('word-being-guessed').innerHTML = '';
            document.getElementById('letters-guessed').innerHTML = '';
            document.getElementById('numGuesses').innerHTML = '';
            if (game === 'win') {
                document.getElementById('end').innerHTML =
                    'Correct!<br/><br/>Press Space to play again';
            } else if (game === 'loss') {
                document.getElementById(
                    'end'
                ).innerHTML = `The correct Street is <br/> ${this.strPick}!<br/><br/>Press Space to play again`;
            }
        } else {
            document.getElementById('word-being-guessed').innerHTML = this.wordGuessed;
            document.getElementById('letters-guessed').innerHTML = `Your guesses: ${this.letterGuessed}`;
            document.getElementById('numGuesses').innerHTML = `You have ${this.remainingGuesses} guesses left`;
            document.getElementById('instructions').innerHTML = '(Figure out the Street Name by guessing letters)';
        }
    },

    check() {
        if (this.wordGuessed.indexOf('_ ' && '_') === -1) {
            this.wins++;
            this.updateHTML('win');
            return this.resetGame();
        } else if (this.remainingGuesses === 0) {
            this.losses++;
            this.updateHTML('loss');
            return this.resetGame();
        }
    },

    resetGame() {
        this.remainingGuesses = 5;
        this.wordGuessed = '';
        this.letterGuessed = '';
        this.userGuess = '';
        this.strPick = '';
        this.correctUserGuesses = [];
        document.removeEventListener('keyup', this.guess);
        return document.addEventListener('keyup', this.initial);
    }
};

document.addEventListener('keyup', game.initial);