// Scores and streak trackers
let streak = 0;
let playerScore = 0;
let computerScore = 0;

// DOM elements
const streakElement = document.getElementById("streak");
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const playerChoiceImage = document.getElementById("player-choice-img");
const computerChoiceImage = document.getElementById("computer-choice-img");
const roundResult = document.getElementById("round-result");
const resetBtn = document.getElementById("reset-btn");
const resetPopup = document.getElementById("reset-popup");
const confirmResetBtn = document.getElementById("confirm-reset");
const cancelResetBtn = document.getElementById("cancel-reset");

// Music controls
const musicToggle = document.getElementById("toggle-music");
const musicVolume = document.getElementById("music-volume");

// Audio elements
const music = new Audio("sounds/music.mp3");
music.loop = true;
music.volume = 0.3;

const clickSound = new Audio("sounds/click.mp3");
clickSound.volume = 0.6;

// Start music after first interaction (due to autoplay policy)
window.addEventListener("DOMContentLoaded", () => {
  console.log("Music loaded, awaiting user interaction.");
});

document.body.addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => {});
  }
}, { once: true });

// Image paths
const images = {
  rock: "images/rock.png",
  paper: "images/paper.png",
  scissors: "images/scissors.png",
  lizard: "images/lizard.png",
  spock: "images/spock.png",
};

// Update streak display
function updateStreakDisplay() {
  const stars = "🌟".repeat(Math.floor(streak / 3));
  streakElement.textContent = `Streak: ${streak} ${stars}`;
}

// Falling star animation
function createFallingStar() {
  const star = document.createElement("div");
  star.textContent = "🌟";
  star.classList.add("falling-star");
  star.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(star);
  star.addEventListener("animationend", () => star.remove());
}

// Main game logic
function playRound(playerSelection) {
  playClick();
  const computerSelection = computerPlay();
  const result = getResult(playerSelection, computerSelection);

  animateChoice(playerChoiceImage, images[playerSelection]);
  animateChoice(computerChoiceImage, images[computerSelection]);

  if (result === "win") {
    $(playerChoiceImage).fadeOut(100).fadeIn(100);
    playerScore++;
    streak++;
    playerScoreElement.textContent = playerScore;
    roundResult.textContent = `You win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)} 🙌`;
    roundResult.style.color = "#567d46";
    for (let i = 0; i < 10; i++) setTimeout(createFallingStar, i * 150);
  } else if (result === "lose") {
    $(computerChoiceImage).fadeOut(100).fadeIn(100);
    computerScore++;
    streak = 0;
    computerScoreElement.textContent = computerScore;
    roundResult.textContent = `You lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)} 😢`;
    roundResult.style.color = "#e94e77";
  } else {
    roundResult.textContent = "It's a tie! 🤷‍♀️";
    roundResult.style.color = "#555";
  }

  updateStreakDisplay();

  if (playerScore === 5) {
    roundResult.textContent = "🎉 You won the game! 🎉";
    disableButtons();
  } else if (computerScore === 5) {
    roundResult.textContent = "🙁 You lost the game! Try again.";
    disableButtons();
  }
}

// Helper functions
function computerPlay() {
  const options = Object.keys(images);
  return options[Math.floor(Math.random() * options.length)];
}

function getResult(player, computer) {
  if (player === computer) return "tie";
  const winsAgainst = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper"],
    spock: ["scissors", "rock"],
  };
  return winsAgainst[player].includes(computer) ? "win" : "lose";
}

function animateChoice(img, src) {
  img.src = src;
  img.classList.add("pulse");
  setTimeout(() => img.classList.remove("pulse"), 500);
}

function disableButtons() {
  document.querySelectorAll(".option").forEach((btn) => (btn.disabled = true));
}

function enableButtons() {
  document.querySelectorAll(".option").forEach((btn) => (btn.disabled = false));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function resetGame() {
  playClick();
  playerScore = 0;
  computerScore = 0;
  streak = 0;
  playerScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
  roundResult.textContent = "Make your move to start the journey 🌸";
  roundResult.style.color = "#4b3b47";
  streakElement.textContent = "Streak: 0";
  playerChoiceImage.src = "images/rock.png";
  computerChoiceImage.src = "images/rock.png";
  enableButtons();
}

// Click sound utility
function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Event listeners
resetBtn.addEventListener("click", () => {
  playClick();
  resetPopup.classList.remove("hidden");
});

confirmResetBtn.addEventListener("click", () => {
  resetGame();
  resetPopup.classList.add("hidden");
});

cancelResetBtn.addEventListener("click", () => {
  playClick();
  resetPopup.classList.add("hidden");
});

document.querySelectorAll(".option").forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.getAttribute("data-option"));
  });
});

// Music toggle and volume control
if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    playClick();
    if (music.paused) {
      music.play();
      musicToggle.textContent = "🔊";
    } else {
      music.pause();
      musicToggle.textContent = "🔇";
    }
  });
}

if (musicVolume) {
  musicVolume.addEventListener("input", (e) => {
    music.volume = e.target.value;
  });
}










