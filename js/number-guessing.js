// DOM Elements
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

// Game State
let targetNumber;
let attemptsLeft;
let gameActive;
let previousGuesses;

// Initialize Game
function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1-100
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

// Validate User Input
function validateInput(input) { 
    const number = parseInt(input.trim()); // Remove whitespace and convert to integer

    if (isNaN(number)) return { isValid: false, message: "You need to input a number!" }; // Input must be a number
    if (number < 1 || number > 100) return { isValid: false, message: "Use number 1-100 only!" }; // Input must be in range between 1-100
    if (previousGuesses.includes(number)) return { isValid: false, message: "Already guessed that number!" }; // Input must not be a repeated guess
    
    return { isValid: true, number: number };
}

// Show Feedback Message
function showFeedback(message, type) {
    const feedbackBaseClass = "mb-6 p-4 text-center font-black uppercase italic text-sm tracking-widest border-l-4";
    feedback.textContent = message;
    feedback.className = feedbackBaseClass; 

    switch (type) {
        case "success": feedback.classList.add("bg-green-500/20", "text-green-400", "border-green-500"); break;
        case "error":   feedback.classList.add("bg-red-500/20", "text-red-400", "border-red-500"); break;
        case "high":    feedback.classList.add("bg-orange-500/20", "text-orange-400", "border-orange-500"); break;
        case "low":     feedback.classList.add("bg-blue-500/20", "text-blue-400", "border-blue-500"); break;
    }
    feedback.classList.remove("hidden"); // Show hidden feedback
}

// Add Guess to Previous Guesses List
function addToPreviousGuesses(guess) {
    previousGuesses.push(guess);
    const guessSpan = document.createElement("span");
    guessSpan.textContent = guess;
    guessSpan.className = "bg-slate-800 border border-slate-600 px-3 py-1 font-black text-xs text-slate-400 italic";
    previousGuessesList.appendChild(guessSpan);
    previousGuessesContainer.classList.remove("hidden");
}

// Process User Guess
function processGuess(guess) {
    addToPreviousGuesses(guess);
    attemptsLeft--;
    attemptsLeftSpan.textContent = attemptsLeft;

    if (guess === targetNumber) {
        showFeedback("🎯 CONGRATULATIONS! You guessed the secret number!", "success");
        endGame(true);
        return;
    } 
    
    if (guess < targetNumber) {
        showFeedback("Secret Number is HIGHER ↑", "low");
    } else {
        showFeedback("Secret Number is LOWER ↓", "high");
    }

    if (attemptsLeft === 0) {
        endGame(false);
        showFeedback(`YOU FAILED! Number was ${targetNumber}.`, "error");
    } else {
        // Hanya reset input jika game masih aktif
        guessInput.value = ""; 
        guessInput.focus();
    }
}

// End Game logic
function endGame(won) {
    gameActive = false;
    guessInput.disabled = true;
    submitBtn.disabled = true;
    gameContainer.classList.add("hidden");
    gameOverContainer.classList.remove("hidden");
    
    if (won) {
        gameOverMessage.innerHTML = `<h2 class="text-5xl font-black font-bungee text-green-500 mb-4 italic">YOU WON!</h2><p class="text-slate-400 font-bold uppercase text-xs tracking-widest">Number was ${targetNumber}. Solved in ${10-attemptsLeft} tries.</p>`;
    } else {
        gameOverMessage.innerHTML = `<h2 class="text-5xl font-black font-bungee text-red-500 mb-4 italic">BETTER LUCK NEXT TIME!</h2><p class="text-slate-400 font-bold uppercase text-xs tracking-widest">Number was ${targetNumber}.</p>`;
    }
}

function handleSubmit() {
    if (!gameActive) return;
    const validation = validateInput(guessInput.value);
    if (!validation.isValid) { showFeedback(validation.message, "error"); return; }
    processGuess(validation.number);
}

// Event Listeners
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
submitBtn.addEventListener("click", handleSubmit);
guessInput.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSubmit(); });
resetBtn.addEventListener("click", initGame);

// Start Game
initGame();