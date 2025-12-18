/**
 * REVO-FUN LOGIC MODULE: SPEED CLICKER
 */

// UI Elements
const tutorialBtn = document.getElementById('toggleTutorial');
const tutorialContent = document.getElementById('tutorialContent');
const tutorialArrow = document.getElementById('tutorialArrow');
const clickBtn = document.getElementById('clickBtn');
const scoreUI = document.getElementById('scoreCount');
const timeLeftUI = document.getElementById('timeLeft');
const cpsUI = document.getElementById('cpsCount');
const timerBar = document.getElementById('timerBar');
const startPrompt = document.getElementById('startPrompt');
const beginBtn = document.getElementById('beginBtn');
const resultOverlay = document.getElementById('resultOverlay');
const finalScoreText = document.getElementById('finalScoreText');

// Game State
let clicks = 0;
let timeLeft = 10;
let gameActive = false;
let timer;

// Tutorial Toggle
tutorialBtn.addEventListener('click', () => {
    const isExpanded = tutorialContent.style.maxHeight && tutorialContent.style.maxHeight !== "0px";
    if (isExpanded) {
        tutorialContent.style.maxHeight = "0px";
        tutorialArrow.classList.remove('rotate-180');
    } else {
        tutorialContent.style.maxHeight = tutorialContent.scrollHeight + "px";
        tutorialArrow.classList.add('rotate-180');
    }
});

// Start Game Logic
beginBtn.addEventListener('click', () => {
    startPrompt.style.opacity = '0';
    setTimeout(() => startPrompt.classList.add('hidden'), 300);
});

clickBtn.addEventListener('click', () => {
    if (startPrompt.classList.contains('hidden') && !gameActive && timeLeft === 10) {
        startGame();
    }
    if (gameActive) {
        clicks++;
        scoreUI.textContent = clicks;
        // Visual feedback
        clickBtn.classList.add('bg-orange-400');
        setTimeout(() => clickBtn.classList.remove('bg-orange-400'), 50);
    }
});

function startGame() {
    gameActive = true;
    clicks = 0;
    scoreUI.textContent = '0';
    
    timer = setInterval(() => {
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
            endGame();
        } else {
            timeLeftUI.textContent = timeLeft.toFixed(1) + 's';
            timerBar.style.width = (timeLeft / 10 * 100) + '%';
            
            // Update CPS (Clicks Per Second)
            const elapsed = 10 - timeLeft;
            cpsUI.textContent = (clicks / elapsed).toFixed(1);
        }
    }, 100);
}

function endGame() {
    clearInterval(timer);
    gameActive = false;
    timeLeft = 0;
    timeLeftUI.textContent = '0.0s';
    timerBar.style.width = '0%';
    
    finalScoreText.textContent = `You achieved ${clicks} clicks (${(clicks/10).toFixed(1)} CPS)`;
    resultOverlay.classList.remove('hidden');
}

function resetGame() {
    timeLeft = 10;
    clicks = 0;
    gameActive = false;
    scoreUI.textContent = '0';
    timeLeftUI.textContent = '10.0s';
    cpsUI.textContent = '0.0';
    timerBar.style.width = '100%';
    resultOverlay.classList.add('hidden');
    startPrompt.classList.remove('hidden');
    startPrompt.style.opacity = '1';
}