const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockBoard)return;

    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;

        return;
    }else {
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}


function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unFlipCards();
}

function disableCards(){
    firstCard.removeEventlistener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}


function unFlipCards() {
    lockBoard = true;

    setTimeout(() => { 
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');

                lockBoard = false;
            }, 2000);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]

    [firstCard, secondCard] = [null, null]
}


function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
};


let reShuffle = document.getElementById('shuffle');
reShuffle.addEventListener('click', shuffle)
cards.forEach(card => card.addEventListener('click', flipCard))