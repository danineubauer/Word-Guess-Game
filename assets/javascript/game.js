
        //Create all the nodes:

        var underscoreNode = document.getElementById("answerArray");
        var winsNode = document.getElementById("wins");
        var lossesNode = document.getElementById("losses");
        var wrongGuessNode = document.getElementById("wrongGuess");
        var remainingGuessesNode = document.getElementById("remainingGuesses");
        var alphabet = "qwertyuioplkjhgfdsazxcvbnm";
        var gameInProgress = true;
        var wins = 0;
        var losses = 0;
        var wrongGuesses = [];
        var underscoreArray = [];
        var answerArray = [];
        var words = ["fillmore", "lombard", "velencia", "hyde", "Polk", "geary", "haight", "ashbury", "embarcadero", "market"];
        var word = words[Math.floor(Math.random() * words.length)];
        var remainingLetters = word.length;
        var repeat = false;

        for (let index = 0; index < word.length; index++) {
            answerArray[index] = "_";
        };
        
        document.onkeyup = function (event) {
            var guess = event.key;
            console.log(guess);

            for (let index = 0; index < wrongGuesses.length; index++) {
                if (guess === wrongGuesses[index]) {
                    repeat = true; 
                    alert("You've already guessed this letter!")
                    break;
                } else { 
                    repeat = false;
                }; 
            };


            if (repeat === false) { 
                if (alphabet.includes(guess)) {
                    if ( word.includes(guess) ) { 
                        wins++;
                        remainingLetters--;
                        for (let index = 0; index < word.length; index++) {
                            if (word[index] === guess) {
                                answerArray[index] = guess;
                            };
                        };          
                    } else {
                        wrongGuesses.push(guess);
                        losses++; 
                    };
                    console.log("wins", wins);
                    console.log("losses", losses);
                } else { 
                    alert("Please press a letter, this is not a letter!");
                };
            };

            underscoreNode.textContent = answerArray.join(" ");
            underscoreNode.textContent = answerArray.join(" ");
            winsNode.textContent = "wins: " + wins;
            lossesNode.textContent = "losses: " + losses;
            wrongGuessNode.textContent = "Your guesses: " + wrongGuesses.join(", ");
            remainingGuessesNode.textContent = "You have " + remainingLetters + " letters to guess";
        };


