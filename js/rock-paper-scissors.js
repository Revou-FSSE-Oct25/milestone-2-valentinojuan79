/**
 * REVO-FUN LOGIC MODULE: ROCK PAPER SCISSORS (FIRST TO 5)
 */

// UI Elements
const tutorialBtn = document.getElementById('toggleTutorial');
const tutorialContent = document.getElementById('tutorialContent');
const tutorialArrow = document.getElementById('tutorialArrow');
const playerHandUI = document.getElementById('playerHand');
const aiHandUI = document.getElementById('aiHand');
const resultTextUI = document.getElementById('resultText');
const playerScoreUI = document.getElementById('playerScore');
const aiScoreUI = document.getElementById('aiScore');
const gameResultOverlay = document.getElementById('gameResultOverlay');
const finalStatus = document.getElementById('finalStatus');
const finalMessage = document.getElementById('finalMessage');
const finalIcon = document.getElementById('finalIcon');

// State
let playerScore = 0;
let aiScore = 0;
let gameActive = true;
const weapons = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Tutorial Animation
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

/**
 * Main Game Logic
 */
function playRound(playerChoice) {
    if (!gameActive) return;

    // 1. Reset Display & Start Animation
    resultTextUI.textContent = "STRIKING...";
    playerHandUI.textContent = "✊";
    aiHandUI.textContent = "✊";
    
    playerHandUI.classList.add('shake');
    aiHandUI.classList.add('shake');

    // Wait for animation
    setTimeout(() => {
        playerHandUI.classList.remove('shake');
        aiHandUI.classList.remove('shake');

        // 2. AI Logic
        const choices = Object.keys(weapons);
        const aiChoice = choices[Math.floor(Math.random() * choices.length)];

        // 3. Update Visuals
        playerHandUI.textContent = weapons[playerChoice];
        aiHandUI.textContent = weapons[aiChoice];

        // 4. Determine Winner
        const result = getWinner(playerChoice, aiChoice);
        updateScore(result);
    }, 500);
}

function getWinner(p, a) {
    if (p === a) return "DRAW";
    
    if (
        (p === 'rock' && a === 'scissors') ||
        (p === 'paper' && a === 'rock') ||
        (p === 'scissors' && a === 'paper')
    ) {
        return "PLAYER";
    }
    return "AI";
}

function updateScore(winner) {
    if (!gameActive) return;

    if (winner === "PLAYER") {
        playerScore++;
        playerScoreUI.textContent = playerScore;
        resultTextUI.textContent = "YOU WIN! ⚡";
        resultTextUI.className = "text-center px-4 font-bungee text-xl italic text-green-400 animate-bounce";
    } else if (winner === "AI") {
        aiScore++;
        aiScoreUI.textContent = aiScore;
        resultTextUI.textContent = "AI WINS 💀";
        resultTextUI.className = "text-center px-4 font-bungee text-xl italic text-red-500";
    } else {
        resultTextUI.textContent = "DRAW [=]";
        resultTextUI.className = "text-center px-4 font-bungee text-xl italic text-slate-400";
    }

    // Check for match point
    if (playerScore === 5 || aiScore === 5) {
        endBattle();
    }
}

function endBattle() {
    gameActive = false;
    setTimeout(() => {
        gameResultOverlay.classList.remove('hidden');

        if (playerScore === 5) {
            finalIcon.textContent = "🏆";
            finalStatus.textContent = "YOU WON THE DUEL";
            finalStatus.className = "text-4xl font-black font-bungee text-green-500 mb-2 italic tracking-tighter";
            finalMessage.textContent = "AI defeated. Mission accomplished!";
        } else {
            finalIcon.textContent = "💀";
            finalStatus.textContent = "YOU LOST THE DUEL";
            finalStatus.className = "text-4xl font-black font-bungee text-red-500 mb-2 italic tracking-tighter";
            finalMessage.textContent = "AI too strong. Better luck next time.";
        }
    }, 800);
}

function resetGame() {
    playerScore = 0;
    aiScore = 0;
    gameActive = true;
    playerScoreUI.textContent = "0";
    aiScoreUI.textContent = "0";
    playerHandUI.textContent = "✊";
    aiHandUI.textContent = "✊";
    resultTextUI.textContent = "READY?";
    resultTextUI.className = "text-center px-4 font-bungee text-xl italic text-orange-500";
    gameResultOverlay.classList.add('hidden');
}