let avatarImage = document.querySelectorAll(".avatar");
const usernameInput = document.getElementById("username");
const btnStartGame = document.getElementById("btn-start-game");
const errorMessageAvatar = document.getElementById("error-message-avatar")
const errorMessageUsername = document.getElementById("error-message-username")

// on click add class name to the clicked avatar.
// if clicked on another avatar, remove class from the avatar clicked on before.
// save the final clicked avatar src to local storage.

avatarImage.forEach(avatar =>{
    
    avatar.addEventListener("click", () =>{

        switch(avatar) {
            case avatarImage[0]:
                avatar.classList.add("choosen-avatar");
                avatarImage[1].classList.remove("choosen-avatar")
                avatarImage[2].classList.remove("choosen-avatar")
                break;

            case avatarImage[1]:
                avatar.classList.add("choosen-avatar");
                avatarImage[0].classList.remove("choosen-avatar")
                avatarImage[2].classList.remove("choosen-avatar")
                break;

            case avatarImage[2]:
                avatar.classList.add("choosen-avatar");
                avatarImage[0].classList.remove("choosen-avatar")
                avatarImage[1].classList.remove("choosen-avatar")
                break;
        }

        errorMessageAvatar.style.display = "none";
        localStorage.setItem('userAvatar', avatar.src);
       
    }) 

})

// save username to local storage, 
// give styling.
// and do not display error message when type in input.

usernameInput.addEventListener("input", () => {
    usernameInput.classList.add("glow")
    errorMessageUsername.style.display = "none";
    localStorage.setItem('username', usernameInput.value);
})

// button to start the game.
// open the game window if username and avatar are correct.

btnStartGame.addEventListener("click", (e) => {
    e.preventDefault()
    checkUsername()
    checkAvatar()
    if (errorMessageAvatar.style.display === "none" && errorMessageUsername.style.display === "none"){
        window.location.href = "/game.html";
    }
})

// function to give an error message until avatar got class name "choosen-avatar".

function checkAvatar() {
    let exist = false;

    for ( let i = 0; i <= avatarImage.length-1; i++) {

        if (exist === true) {
            errorMessageAvatar.style.display = "none";
        } else {
            if(avatarImage[i].classList.contains("choosen-avatar")) {
                errorMessageAvatar.style.display = "none";
                exist = true;
            } else {
                errorMessageAvatar.style.display = "inline-block";
            }
        } 
    }
}

// function to give an error message when no username is entererd.

function checkUsername() {
    let exist = false;

    if(usernameInput.value === ""){
        errorMessageUsername.style.display = "inline-block";

    } else {
        errorMessageUsername.style.display = "none";
        exist = true;
    }
}

