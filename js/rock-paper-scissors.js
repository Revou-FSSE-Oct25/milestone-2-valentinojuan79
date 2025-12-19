// DOM Elements
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
const btnRock = document.getElementById('btnRock');
const btnPaper = document.getElementById('btnPaper');
const btnScissors = document.getElementById('btnScissors');
const resetBtn = document.getElementById('resetBtn');

// Game State
let playerScore = 0;
let aiScore = 0;
let gameActive = true;
let isAnimating = false;
const weapons = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};
const choices = Object.keys(weapons); 



// Play Round Logic
function playRound(playerChoice) {
    // If animation is ongoing, ignore input
    if (!gameActive || isAnimating) return;

    // Avoid double click during animation
    isAnimating = true;

    // Text while animating is ongoing
    resultTextUI.textContent = "WAIT...";
    // Reset result text style whine animating is ongoing
    resultTextUI.className = "text-center px-4 font-bungee text-xl italic text-orange-500 z-10";
    // Reset to rock icon during animatino
    playerHandUI.textContent = "✊";
    aiHandUI.textContent = "✊";
    // Shake animation
    playerHandUI.classList.add('shake');
    aiHandUI.classList.add('shake');

    // Wait for animation (1 second)
    setTimeout(() => {
        playerHandUI.classList.remove('shake');
        aiHandUI.classList.remove('shake');

        // AI Logic
        const aiChoice = choices[Math.floor(Math.random() * choices.length)];

        // Update Hands based on choices
        playerHandUI.textContent = weapons[playerChoice];
        aiHandUI.textContent = weapons[aiChoice];

        // Determine Winner
        const result = getWinner(playerChoice, aiChoice);
        updateScore(result);
        
        // Now allow input again after animation ends
        isAnimating = false;
        
    }, 1000);
}

// Winner Logic
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

// Update score
function updateScore(winner) {
    // Double check safety
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

// End Battle Logic
function endBattle() {
    gameActive = false;
    setTimeout(() => {
        gameResultOverlay.classList.remove('hidden');

        if (playerScore === 5) {
            finalIcon.textContent = "🏆";
            finalStatus.textContent = "YOU WON THE DUEL";
            finalStatus.className = "text-center text-4xl font-black font-bungee text-green-500 mb-2 italic tracking-tighter";
            finalMessage.textContent = "AI defeated. Mission accomplished!";
        } else {
            finalIcon.textContent = "💀";
            finalStatus.textContent = "YOU LOST THE DUEL";
            // [FIX 2] Typo Fixed: Menambahkan spasi antara text-center dan text-4xl
            finalStatus.className = "text-center text-4xl font-black font-bungee text-red-500 mb-2 italic tracking-tighter";
            finalMessage.textContent = "AI too strong. Better luck next time.";
        }
    }, 800);
}

// Reset Game
function resetGame() {
    playerScore = 0;
    aiScore = 0;
    gameActive = true;
    isAnimating = false;
    playerScoreUI.textContent = "0";
    aiScoreUI.textContent = "0";
    playerHandUI.textContent = "✊";
    aiHandUI.textContent = "✊";
    resultTextUI.textContent = "READY?";
    resultTextUI.className = "text-center px-4 font-bungee text-xl italic text-orange-500";
    gameResultOverlay.classList.add('hidden');
}

// Event Listeners
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
btnRock.addEventListener('click', () => playRound('rock'));
btnPaper.addEventListener('click', () => playRound('paper'));
btnScissors.addEventListener('click', () => playRound('scissors'));
resetBtn.addEventListener('click', resetGame);
