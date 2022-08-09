const cards = document.querySelectorAll('.card');
const resetButton = document.querySelector('.reset-button');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// reinicia a página para uma nova partida
resetButton.addEventListener('click', function() {
    location.reload();
})

// Função para virar a carta
function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

// Função para checar se as cartas são iguais 
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unFlipCards();
}

// Função que desabilita as cartas 
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Função que desvira as cartas
function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// Função que reseta o tabuleiro 
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// função de embaralhar as cartas 
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

// Adicionar um evento ao clicar na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

