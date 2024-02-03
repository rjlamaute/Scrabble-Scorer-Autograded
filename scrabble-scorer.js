// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";

	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in oldPointStructure) {

		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }

	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word to score: ");
   // console.log(oldScrabbleScorer(word));
   return word;
};

let simpleScorer = function(word) {
   let score = 0;
   for(let char of word) {
      score++;
   }
   return score;
};

let vowelBonusScorer = function(word) {
   let score = 0;
   for(let char of word) {
      if(char.toUpperCase() === "A" || char.toUpperCase() === "E"
      || char.toUpperCase() === "I" ||char.toUpperCase() === "O" ||
      char.toUpperCase() === "U") {
         score += 3;
      } else {
         score++;
      }
   }
   return score;
};

function transform(oldObject) {
   let newObject = {};
   for(let keys in oldObject) {
      for(let letter of oldObject[keys]) {
         newObject[letter.toLowerCase()] = Number(keys);
      }
   }
   return newObject;
};

let newPointStructure = transform(oldPointStructure);


let scrabbleScorer = function(word) {
   word = word.toLowerCase();

	let letterPoints = 0;

	for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i]];
	}
	return letterPoints;
};

const scoringAlgorithms = [{
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
}, {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
}, {
   name: "Scrabble",
   description: "The traditional scoring algorithm",
   scorerFunction: scrabbleScorer
}];

function scorerPrompt() {
   let selection = input.question("Which scoring algorithm would you like to use?" + '\n' +
   `0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}` + '\n' +
   `1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}` + `\n` +
   `2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}` + `\n` +
   'Enter 0, 1, or 2: ');
   let selectedObj = scoringAlgorithms[selection];
   return selectedObj;
}

function runProgram() {
   let word = initialPrompt();
   let scoringObject = scorerPrompt();
   console.log(`Score for '${word}': ${scoringObject.scorerFunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
