
const game = document.querySelector(".game-screen");

// Criar personagem
const player = document.createElement("div");
player.classList.add("player");
game.appendChild(player);

// Posição do personagem
let x = 40;
let y = 0;
let speed = 5;
let velocityY = 0;
let jumping = false;

const gravity = 0.6;
const groundHeight = 90;

// Controles do teclado
const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;

    if (
        event.code === "Space" &&
        !jumping
    ) {
        velocityY = -12;
        jumping = true;
    }
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

// Atualização do jogo
function update() {

    if (keys["ArrowRight"] || keys["d"]) {
        x += speed;
    }

    if (keys["ArrowLeft"] || keys["a"]) {
        x -= speed;
    }

    // Gravidade e pulo
    velocityY += gravity;
    y += velocityY;

    const floor = game.clientHeight - groundHeight - 50;

    if (y >= floor) {
        y = floor;
        velocityY = 0;
        jumping = false;
    }

    // Limites da tela
    x = Math.max(0, Math.min(
        game.clientWidth - 40,
        x
    ));

    player.style.left = x + "px";
    player.style.bottom = (groundHeight + y) + "px";

    requestAnimationFrame(update);
}

update();
