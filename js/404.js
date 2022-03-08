window.root = getComputedStyle(document.documentElement);
let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = $(".guesses")[0];
const result = $(".result")[0];
const msg = $(".msg")[0];
const sumbit = $(".submit")[0];
const guess = $(".guess")[0];
const body = $('.body')[0];
let guessCount = 1;
let resetButton;
function checkGuess() {
    const userGuess = Number(guess.value);
    if (isNaN(userGuess)) return alert('That\'s not a valid number!');
    if (userGuess > 100 || userGuess < 1) return alert('You should provide a number from 1 to 100!');
    const correct = userGuess === randomNumber;
    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: ";
    }
    guesses.innerHTML += correct
        ? `<span>${userGuess}</span>`
        : userGuess + " ";
    if (correct) {
        result.textContent = "Congratulations! You got it right!";
        result.style.backgroundColor = root.getPropertyValue("--green");
        msg.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        result.textContent = "Game over!";
        msg.textContent = "";
        setGameOver();
    } else {
        result.textContent = "Wrong!";
        result.style.backgroundColor = root.getPropertyValue("--red");
        if (userGuess < randomNumber) {
            msg.textContent = "Your guess was too low!";
        } else if (userGuess > randomNumber) {
            msg.textContent = "Your guess was too high!";
        }
    }
    guessCount++;
    guess.value = "";
    guess.focus();
}
sumbit.addEventListener("click", checkGuess);
function setGameOver() {
    guess.disabled = true;
    sumbit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "New game";
    body.appendChild(resetButton);
    resetButton.addEventListener("click", resetGame);
}
function resetGame() {
    guessCount = 1;
    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }
    resetButton.parentNode.removeChild(resetButton);
    guess.disabled = false;
    sumbit.disabled = false;
    guess.value = "";
    guess.focus();
    result.style.backgroundColor = "transparent";
    randomNumber = Math.floor(Math.random() * 100) + 1;
}
$('#guess').keypress((e) => {
    if (e.which === 13) checkGuess();
})