let targetNumber;
let attemptsLeft;
let gameActive;
let previousGuesses;


// DOM //
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("feedback");
const attemptsLeftSpan = document.getElementById("attemptsLeft");
const gameContainer = document.getElementById("gameContainer");
const gameOverContainer = document.getElementById("gameOverContainer");
const gameOverMessage = document.getElementById("gameOverMessage");
const resetBtn = document.getElementById("resetBtn");
const previousGuessesList = document.getElementById("guessList");
const previousGuessesContainer = document.getElementById("previousGuesses");
const tutorialBtn = document.getElementById('toggleTutorial');
const tutorialContent = document.getElementById('tutorialContent');
const tutorialArrow = document.getElementById('tutorialArrow');

function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 10;
    gameActive = true;
    previousGuesses = [];
    guessInput.value = "";
    guessInput.disabled = false;
    submitBtn.disabled = false;
    attemptsLeftSpan.textContent = attemptsLeft;
    gameContainer.classList.remove("hidden");
    gameOverContainer.classList.add("hidden");
    feedback.classList.add("hidden");
    previousGuessesContainer.classList.add("hidden");
    previousGuessesList.innerHTML = "";
    guessInput.focus();
}

function validateInput(input) {
    const number = parseInt(input.trim());
    if (input.trim() === "") return { isValid: false, message: "Input required, soldier!" };
    if (isNaN(number) || number < 1 || number > 100) return { isValid: false, message: "Use code 1-100 only!" };
    if (previousGuesses.includes(number)) return { isValid: false, message: "Already scanned that code!" };
    return { isValid: true, number: number };
}

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = "mb-6 p-4 text-center font-black uppercase italic text-sm tracking-widest border-l-4";
    switch (type) {
        case "success": feedback.classList.add("bg-green-500/20", "text-green-400", "border-green-500"); break;
        case "error": feedback.classList.add("bg-red-500/20", "text-red-400", "border-red-500"); break;
        case "high": feedback.classList.add("bg-orange-500/20", "text-orange-400", "border-orange-500"); break;
        case "low": feedback.classList.add("bg-blue-500/20", "text-blue-400", "border-blue-500"); break;
    }
    feedback.classList.remove("hidden");
}

function addToPreviousGuesses(guess) {
    previousGuesses.push(guess);
    const guessSpan = document.createElement("span");
    guessSpan.textContent = guess;
    guessSpan.className = "bg-slate-800 border border-slate-600 px-3 py-1 font-black text-xs text-slate-400 italic";
    previousGuessesList.appendChild(guessSpan);
    previousGuessesContainer.classList.remove("hidden");
}

function processGuess(guess) {
    addToPreviousGuesses(guess);
    attemptsLeft--;
    attemptsLeftSpan.textContent = attemptsLeft;
    if (guess === targetNumber) {
        showFeedback("🎯 ACCESS GRANTED!", "success");
        endGame(true);
    } else {
        if (guess < targetNumber) showFeedback("System Code is HIGHER ↑", "low");
        else showFeedback("System Code is LOWER ↓", "high");
        if (attemptsLeft === 0) {
            endGame(false);
            showFeedback(`ACCESS DENIED! Code was ${targetNumber}.`, "error");
        }
    }
    if (gameActive) { guessInput.value = ""; guessInput.focus(); }
}

function endGame(won) {
    gameActive = false;
    guessInput.disabled = true;
    submitBtn.disabled = true;
    gameContainer.classList.add("hidden");
    gameOverContainer.classList.remove("hidden");
    if (won) {
        gameOverMessage.innerHTML = `<h2 class="text-5xl font-black font-bungee text-green-500 mb-4 italic">MISSION WON</h2><p class="text-slate-400 font-bold uppercase text-xs tracking-widest">Solved in ${10-attemptsLeft} tries.</p>`;
    } else {
        gameOverMessage.innerHTML = `<h2 class="text-5xl font-black font-bungee text-red-500 mb-4 italic">MISSION FAILED</h2><p class="text-slate-400 font-bold uppercase text-xs tracking-widest">Code was ${targetNumber}.</p>`;
    }
}

function handleSubmit() {
    if (!gameActive) return;
    const validation = validateInput(guessInput.value);
    if (!validation.isValid) { showFeedback(validation.message, "error"); return; }
    processGuess(validation.number);
}

tutorialBtn.addEventListener('click', () => {
    const isExpanded = tutorialContent.style.maxHeight && tutorialContent.style.maxHeight !== "0px";

    if (isExpanded) {
        // Close
        tutorialContent.style.maxHeight = "0px";
        tutorialArrow.classList.remove('rotate-180');
    } else {
        // Open (Calculate dynamic height)
        tutorialContent.style.maxHeight = tutorialContent.scrollHeight + "px";
        tutorialArrow.classList.add('rotate-180');
    }
});
submitBtn.addEventListener("click", handleSubmit);
guessInput.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSubmit(); });
resetBtn.addEventListener("click", initGame);
initGame();