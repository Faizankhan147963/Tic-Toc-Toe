var gamecell = document.querySelectorAll(".cell")
let alertbox = document.querySelector(".alertbox")
let restart = document.querySelector(".restart")
var currentPlayer = "X"
var nextplayer = "O"
var playerturn = currentPlayer;
function startgame() {
    gamecell.forEach(cell => {
        cell.addEventListener("click", lock)
    })
}

function playerturning() {
    if (playerturn === currentPlayer) {
        playerturn = nextplayer;
    } else {
        playerturn = currentPlayer;
    }
}

function winning() {
    const winning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 6],
        [2, 5, 8],
    ]

    for (let i = 0; i < winning.length; i++) {
        const [pos1, pos2, pos3] = winning[i];
        if (gamecell[pos1].textContent !== "" &&
            gamecell[pos1].textContent === gamecell[pos2].textContent &&
            gamecell[pos2].textContent === gamecell[pos3].textContent) {
            return true;
        }
    }
    return false;
}

function draw() {
    let count = 0;
    gamecell.forEach(cell => {
        if (cell.textContent === "") {
            count++;
        }
    })
    return count === 0 && !winning();
}


function lock(e) {
    if (e.target.textContent === "") {
        e.target.textContent = playerturn;
        if (winning()) {
            alert(`${playerturn} : Is Winner`);
            effect();
        } else if (draw()) {
            alert("Draw");
            effect();

        }
    }
    playerturning()
}

function effect() {
    gamecell.forEach(cell => {
        cell.removeEventListener("click", lock);
        cell.classList.add("active")
    })
}

function alert(msg) {
    alertbox.style.display = "block";
    alertbox.textContent = msg;
    setTimeout(() => {
        alertbox.style.display = "none";
    }, 1000);
}

restart.addEventListener("click", reset);

function reset() {
    gamecell.forEach(cell => {
        if (cell.textContent === "") {
            alert("Play Game")
        } else {
            alert("Restart Game")
            cell.textContent = "";
            cell.classList.remove("active")
            startgame();
        }
    })
}

startgame()