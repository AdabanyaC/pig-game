'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const name0El = document.querySelector('#name--0');
const name1El = document.querySelector('#name--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, totalScore, playing;

const init = () => {
  // ........
  scores = [0, 0];

  // Initializing the Current Score
  currentScore = 0;

  // Setting active player
  activePlayer = 0;
  totalScore;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};

init();

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Implementing the Roll Dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Displaying the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.Check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player and withdraw all current score
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active players score
    totalScore = scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = totalScore;

    // Check if the player's score is >= 100
    if (totalScore >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');

      document.querySelector(`#name--${activePlayer}`).textContent = `PLAYER ${
        activePlayer + 1
      } WINS ????`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //   Switch to the next player
      switchPlayer();
    }
  }
});

// Reetting the Game
btnNew.addEventListener('click', init);
