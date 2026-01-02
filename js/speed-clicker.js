// DOM Elements
const clickBtn = document.getElementById('clickBtn');
const scoreUI = document.getElementById('scoreCount');
const timeLeftUI = document.getElementById('timeLeft');
const cpsUI = document.getElementById('cpsCount');
const timerBar = document.getElementById('timerBar');
const startPrompt = document.getElementById('startPrompt');
const beginBtn = document.getElementById('beginBtn');
const resultOverlay = document.getElementById('resultOverlay');
const finalScoreText = document.getElementById('finalScoreText');
const resetBtn = document.getElementById('resetBtn');
const nicknameInput = document.getElementById('nicknameInput');
const leaderboardBody = document.getElementById('leaderboardBody');

// Game State
let clicks = 0;
let timeLeft = 10;
let gameActive = false;
let timer;

// Game Logic
function startGame() {
    gameActive = true;
    clicks = 0;
    scoreUI.textContent = '0';
    timer = setInterval(() => { // Timer countdown
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
            endGame();
        } else {
            timeLeftUI.textContent = timeLeft.toFixed(1) + 's'; // Integer time left display
            timerBar.style.width = (timeLeft / 10 * 100) + '%'; // Update timer bar width
            
            // Update CPS (Clicks Per Second)
            const elapsed = 10 - timeLeft;
            cpsUI.textContent = (clicks / elapsed).toFixed(1);
        }
    }, 100);
}

// End Game Visual
function endGame() {
    clearInterval(timer);
    gameActive = false;
    timeLeft = 0;
    timeLeftUI.textContent = '0.0s';
    timerBar.style.width = '0%';
    const finalCPS = (clicks / 10).toFixed(1);
    finalScoreText.textContent = `You achieved ${clicks} clicks (${finalCPS} CPS)`;
    const nickname = nicknameInput.value.trim();
    saveScore(nickname, finalCPS);
    updateLeaderboardUI();
    resultOverlay.classList.remove('hidden');
}

// Leaderboard Local Storage
function getLeaderboard() {
    const data = localStorage.getItem('clicker_leaderboard');
    return data ? JSON.parse(data) : [];
}

// Save Score
function saveScore(name, cps) {
    let leaderboard = getLeaderboard();
    
    leaderboard.push({ name: name || "Anonymous", cps: parseFloat(cps) });

    leaderboard.sort((a, b) => b.cps - a.cps);

    leaderboard = leaderboard.slice(0, 5);

    localStorage.setItem('clicker_leaderboard', JSON.stringify(leaderboard));
}

// Update Leaderboard UI
function updateLeaderboardUI() {
    const leaderboard = getLeaderboard();
    leaderboardBody.innerHTML = '';

    leaderboard.forEach((entry, index) => {
        const row = `
            <tr class="border-b border-slate-800/50">
                <td class="py-2 text-orange-500">#${index + 1}</td>
                <td class="py-2 text-white">${entry.name}</td>
                <td class="py-2 text-right text-orange-400">${entry.cps.toFixed(1)}</td>
            </tr>
        `;
        leaderboardBody.innerHTML += row;
    });
}

// Reset Game Visual
function resetGame() {
    timeLeft = 10;
    clicks = 0;
    gameActive = false;
    scoreUI.textContent = '0';
    timeLeftUI.textContent = '10.0s';
    cpsUI.textContent = '0.0';
    timerBar.style.width = '100%';
    resultOverlay.classList.add('hidden');
}

// Event Listeners
// Begin Button
beginBtn.addEventListener('click', () => {
    startPrompt.style.opacity = '0';
    setTimeout(() => startPrompt.classList.add('hidden'), 300); // Wait for transition
});

// Click Button
clickBtn.addEventListener('click', (e) => {
    e.target.blur(); // Removes focus outline on button after click
    if (!gameActive && timeLeft === 10 && startPrompt.classList.contains('hidden')) {
        startGame();
    }
    if (gameActive) {
        clicks++;
        scoreUI.textContent = clicks;
        clickBtn.classList.add('bg-orange-400');
        setTimeout(() => clickBtn.classList.remove('bg-orange-400'), 50); // Give visual feedback to user on click
    }
});
resetBtn.addEventListener("click", resetGame);