"use strict";
// Selecting element
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;

  // Reset the score
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add("hidden");
  // Remove the winner class
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");

  // Remove the active class
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  // Reset score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0; // if the activeplayer is 0, then change it to activeplayer1
  currentScore = 0;
  // Change visual display
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};
// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEL.classList.add("hidden");
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
