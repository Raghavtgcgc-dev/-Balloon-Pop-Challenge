
let score = 0;
let missed = 0;
let gameInterval;
let balloonInterval;

function startGame() {
  score = 0;
  missed = 0;
  document.getElementById("score").innerText = score;
  document.getElementById("missed").innerText = missed;
  switchScreen("gameScreen");

  balloonInterval = setInterval(createBalloon, 1000);
}

function createBalloon() {
  const gameArea = document.getElementById("gameArea");
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  const colors = ["red", "yellow", "green", "blue", "purple"];
  balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.left = Math.random() * (gameArea.offsetWidth - 60) + "px";

  let bottom = -80;
  balloon.style.bottom = bottom + "px";

  balloon.onclick = () => {
    score += 10;
    document.getElementById("score").innerText = score;
    balloon.remove();
  };

  gameArea.appendChild(balloon);

  const floatInterval = setInterval(() => {
    bottom += 5;
    balloon.style.bottom = bottom + "px";

    if (bottom > gameArea.offsetHeight) {
      clearInterval(floatInterval);
      balloon.remove();
      missed++;
      document.getElementById("missed").innerText = missed;
      if (missed >= 5) {
        endGame();
      }
    }
  }, 50);
}

function endGame() {
  clearInterval(balloonInterval);
  document.getElementById("finalScore").innerText = score;
  switchScreen("gameOverScreen");
}

function restartGame() {
  switchScreen("startScreen");
}

function switchScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}
