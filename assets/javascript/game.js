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
                ).innerHTML = `The correct movie was ${
                    this.strPick
                    }!<br/><br/>Press Space to play again`;
            }
        } else {
            document.getElementById('word-being-guessed').innerHTML = this.wordGuessed;
            document.getElementById('letters-guessed').innerHTML = `Your guesses: ${this.letterGuessed}`;
            document.getElementById('numGuesses').innerHTML = `You have ${this.remainingGuesses} guesses left`;
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


        // //Create all the nodes:

        // var underscoreNode = document.getElementById("answerArray");
        // var winsNode = document.getElementById("wins");
        // var lossesNode = document.getElementById("losses");
        // var wrongGuessNode = document.getElementById("wrongGuess");
        // var remainingGuessesNode = document.getElementById("remainingGuesses");
        // var alphabet = "qwertyuioplkjhgfdsazxcvbnm";
        // var gameInProgress = true;
        // var wins = 0;
        // var losses = 0;
        // var wrongGuesses = [];
        // var underscoreArray = [];
        // var answerArray = [];
        // var words = ["fillmore", "lombard", "velencia", "hyde", "Polk", "geary", "haight", "ashbury", "embarcadero", "market"];
        // var word = words[Math.floor(Math.random() * words.length)];
        // var remainingLetters = word.length;
        // var repeat = false;

        // for (let index = 0; index < word.length; index++) {
        //     answerArray[index] = "_";
        // };

        // document.onkeyup = function (event) {
        //     var guess = event.key;
        //     console.log(guess);

        //     for (let index = 0; index < wrongGuesses.length; index++) {
        //         if (guess === wrongGuesses[index]) {
        //             repeat = true; 
        //             alert("You've already guessed this letter!")
        //             break;
        //         } else { 
        //             repeat = false;
        //         }; 
        //     };


        //     if (repeat === false) { 
        //         if (alphabet.includes(guess)) {
        //             if ( word.includes(guess) ) { 
        //                 wins++;
        //                 remainingLetters--;
        //                 for (let index = 0; index < word.length; index++) {
        //                     if (word[index] === guess) {
        //                         answerArray[index] = guess;
        //                     };
        //                 };          
        //             } else {
        //                 wrongGuesses.push(guess);
        //                 losses++; 
        //             };
        //             console.log("wins", wins);
        //             console.log("losses", losses);
        //         } else { 
        //             alert("Please press a letter, this is not a letter!");
        //         };
        //     };

        //     underscoreNode.textContent = answerArray.join(" ");
        //     underscoreNode.textContent = answerArray.join(" ");
        //     winsNode.textContent = "wins: " + wins;
        //     lossesNode.textContent = "losses: " + losses;
        //     wrongGuessNode.textContent = "Your guesses: " + wrongGuesses.join(", ");
        //     remainingGuessesNode.textContent = "You have " + remainingLetters + " letters to guess";
        // };


