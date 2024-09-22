const cards = document.querySelectorAll(".card");
let firstCard, secondCard;
let lock = false;
let isFlipped = false;
let matchCount = 0; // Keep track of the number of matched pairs
const totalPairs = cards.length / 2; 

cards.forEach(card => card.addEventListener("click", flip));

function flip() {
    if (lock || this === firstCard) return;

    this.classList.add("flip");

    if (!isFlipped) {
        isFlipped = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    check();
}

function check() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? success() : failed();
}

function success() {
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);
    reset();

    matchCount++; 
    if (matchCount === totalPairs) {
        gameWon();
    }
}

function failed() {
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        reset();
    }, 1000);
}

function reset() {
    [isFlipped, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function gameWon() {
    document.getElementById("restartBtn").style.display = "block"; 
}

function restartGame() {
   
    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flip); 
    });

  
    shuffle();


    document.getElementById("restartBtn").style.display = "none";
    matchCount = 0;
}

function shuffle() {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * 18); // Shuffle positions for all cards
        card.style.order = position;
    });
}

(function initialize() {
    shuffle(); // Shuffle cards on page load
})();
