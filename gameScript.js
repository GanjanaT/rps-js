const userAvatar = document.getElementById("player-avatar");
const computerAvatar = document.getElementById("computer-avatar");
const username = document.getElementById("username");
const userHand = document.getElementById("player-hand")
const computerHand = document.getElementById("computer-hand");
let playerChoices = document.querySelectorAll(".hand");
let playerScore = document.getElementById("player-score");
let computerScore = document.getElementById("computer-score");
const popUp = document.getElementById("pop-up");

// get locally stored player data
const storedUserAvatar = localStorage.getItem('userAvatar');
const storedUsername = localStorage.getItem('username');

// show player data in game 
userAvatar.src = storedUserAvatar;
username.textContent = `${storedUsername} `;

// the choices of player and computer and score count.
let player;
let playerScoreCount = 0;
let computer;
let computerScoreCount = 0;


// the RPS game
playerChoices.forEach(choice => { 
    choice.addEventListener("click", () => {
        
        shakeHand()
        userAvatar.src = storedUserAvatar;
        player = choice.alt;

        setTimeout(() => {
            userHand.src = choice.src;
            computerMove();
            removeClass()
            result()
            changeAvtar()
            announceWinner()
        }, 1500)
    })
})

// function for computer to randomly pick a move to play.
// change computer image depending on what move.
function computerMove() {
    const randomNr = Math.floor(Math.random() * 3);

    switch (randomNr) {
        case 0:
            computer = "rock"
            computerHand.src = "/images/rock.png";
            break;
        case 1: 
            computer = "paper"
            computerHand.src = "/images/paper.png";
            break;
        case 2:
            computer = "scissors"
            computerHand.src = "/images/scissors.png";
            break;
    }
}

// function that makes the hand shake before each play.
// set popUp text and hand images to default before next shake.
function shakeHand() {
    popUp.textContent = "";
    computerHand.src = "/images/rock.png";
    userHand.src = "/images/rock.png";
    computerHand.classList.add("shake-right");
    userHand.classList.add("shake-left");
}

// function to remove class so that the we can add same class again to shake. 
function removeClass() {
    computerHand.classList.remove("shake-right");
    userHand.classList.remove("shake-left");
}

// function to decide winner of each draw 
// and print out the result in popUp text and changes the score.
function result() {
    let playerChoice = player;
    switch (playerChoice) {
        case "rock":
            if(computer === "rock"){
                popUp.textContent = "Draw";
            } else if ( computer === "paper"){
                popUp.textContent = "Computer 1p";
                ++computerScoreCount
            } else {
                popUp.textContent = `${username.textContent}1p`;;
                ++playerScoreCount
            }
            break;
        case "paper":
            if(computer === "rock"){
                popUp.textContent = `${username.textContent}1p`;
                ++playerScoreCount
            } else if ( computer === "paper"){
                popUp.textContent = "Draw";
            } else {
                popUp.textContent = "Computer 1p";
                ++computerScoreCount
            }
            break;
        case "scissors":
            if(computer === "rock"){
                popUp.textContent = "Computer 1p";
                ++computerScoreCount
            } else if ( computer === "paper"){
                popUp.textContent = `${username.textContent}1p`;
                ++playerScoreCount
            } else {
                popUp.textContent = "Draw";
            }
            break;
    }

    playerScore.textContent = playerScoreCount; 
    computerScore.textContent = computerScoreCount;
}

// function to change avatar images depending on win, loose, draw.
function changeAvtar() {
    let avatarChoice = userAvatar.src;

    switch (avatarChoice) {
        case `http://127.0.0.1:5500/images/woman.png`: 
            chooseImg(0)
            break;
        case `http://127.0.0.1:5500/images/cat.png`: 
            chooseImg(1)    
            break;
        case `http://127.0.0.1:5500/images/man.png`: 
            chooseImg(2);
            break;
    }

}


// function when to change avatar images.
// array of images to display.
function chooseImg(imgIndex) {
    
let avatarResultImages = [{
    winner: `/images/womanWin.png`,
    draw: `/images/womanTie.png`,
    looser: `/images/womanLoose.png`
},
{
    winner: `/images/catWin.png`,
    draw: `/images/catTie.png`,
    looser: `/images/catLoose.png`
},
{
    winner: `/images/manWin.png`,
    draw: `/images/manTie.png`,
    looser: `/images/manLoose.png`
}]

    if(popUp.textContent === `${username.textContent}1p`){
        userAvatar.src = avatarResultImages[imgIndex].winner;
    } else if(popUp.innerHTML === "Draw") {
        userAvatar.src = avatarResultImages[imgIndex].draw;
    } else {
        userAvatar.src = avatarResultImages[imgIndex].looser;
    } 
}


// popUp window when player or computer get 3 points
// displays winner and points
// buttons to play again or continue to homepage
function announceWinner() {
    const scoreContainer = document.getElementById("hide");
    const gameContainer = document.getElementById("container");
    const playAgainBtn = document.getElementById("play-again-btn");
    const toHomepageBtn = document.getElementById("to-homepage-btn");
    let winnerAvatar = document.getElementById("winner-avatar");
    let playerFinalScore = document.getElementById("player-final-score");
    let computerFinalScore = document.getElementById("computer-final-score");

    if(playerScoreCount === 3 || computerScoreCount === 3){
        setTimeout(()=>{
            scoreContainer.style.display = "block";
            gameContainer.classList.add("container-hide");

            if (playerScoreCount > computerScoreCount) {
                winnerAvatar.src = userAvatar.src;
            } else {
                winnerAvatar.src = computerAvatar.src;
            }

            playerFinalScore.textContent = playerScoreCount;
            computerFinalScore.textContent = computerScoreCount;

            playAgainBtn.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.reload();
                scoreContainer.style.display = "none";
                gameContainer.classList.remove("container-hide");
                console.log("fireeee")
            })

            toHomepageBtn.addEventListener("click", (e) => {
                e.preventDefault()
                window.location.href = "/index.html";
                console.log("fire")
            })
        }, 500);
    }
}

