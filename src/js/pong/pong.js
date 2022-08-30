function diffButton(number) {
    switch (number) {
        case 1:
            document.getElementById("diff-button1").classList.add("button-selected");
            document.getElementById("diff-button2").classList.remove("button-selected");
            document.getElementById("diff-button3").classList.remove("button-selected");
            break;
        case 2:
            document.getElementById("diff-button1").classList.remove("button-selected");
            document.getElementById("diff-button2").classList.add("button-selected");
            document.getElementById("diff-button3").classList.remove("button-selected");
            break;
        case 3:
            document.getElementById("diff-button1").classList.remove("button-selected");
            document.getElementById("diff-button2").classList.remove("button-selected");
            document.getElementById("diff-button3").classList.add("button-selected");
            break;
    }
}
let lastTime;
function startGame() {
    document.getElementById("start-menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    const button = document.getElementsByClassName("button button-selected")[0].id;
    let difficulty;
    console.log(button);
    switch (button) {
        case "diff-button1":
            difficulty = [0.006, 0.000001];
            break;
        case "diff-button2":
            difficulty = [0.009, 0.000002];
            break;
        case "diff-button3":
            difficulty = [0.02, 0.000008];
            break;
    }
    console.log(difficulty);
    const ball = new Ball(document.getElementById("ball"), difficulty[1]);
    const playerPaddle = new Paddle(document.getElementById("player-paddle"), difficulty[0]);
    const computerPaddle = new Paddle(document.getElementById("computer-paddle"), difficulty[0]);
    const playerScoreElement = document.getElementById("player-score");
    const computerScoreElement = document.getElementById("computer-score");

    document.addEventListener("mousemove", (e) => {
        playerPaddle.position = (e.y / window.innerHeight) * 100;
    });
    window.requestAnimationFrame(function (time) {
        update(time, ball, playerPaddle, computerPaddle, playerScoreElement, computerScoreElement);
    });
}
function update(time, ball, playerPaddle, computerPaddle, playerScoreElement, computerScoreElement) {
    if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);

        if (isLose(ball)) {
            const gameEnd = handleLose(playerScoreElement, computerScoreElement, ball, computerPaddle);
            if (gameEnd) return;
        }
    }

    lastTime = time;
    window.requestAnimationFrame(function (time0) {
        update(time0, ball, playerPaddle, computerPaddle, playerScoreElement, computerScoreElement);
    });
}

function isLose(ball) {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose(playerScoreElement, computerScoreElement, ball, computerPaddle) {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1;
    } else {
        computerScoreElement.textContent = parseInt(computerScoreElement.textContent) + 1;
    }
    if (parseInt(playerScoreElement.textContent) >= 10 || parseInt(computerScoreElement.textContent) >= 10) {
        handleEnd(parseInt(playerScoreElement.textContent), parseInt(computerScoreElement.textContent));
        return true;
    }
    ball.reset();
    computerPaddle.reset();
}

const SPEED = 0.009;

class Paddle {
    constructor(paddleElem, speed) {
        console.log(speed);
        if (speed) this.speed = speed;
        this.paddleElem = paddleElem;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleElem.style.setProperty("--position", value);
    }

    rect() {
        return this.paddleElem.getBoundingClientRect();
    }

    reset() {
        this.position = 50;
    }

    update(delta, ballHeight) {
        this.position += this.speed * delta * (ballHeight - this.position);
    }
}

const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000001;
class Ball {
    constructor(ballElem, difficulty) {
        this.velocityIncrease = difficulty;
        this.ballElem = ballElem;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    rect() {
        return this.ballElem.getBoundingClientRect();
    }

    set y(value) {
        this.ballElem.style.setProperty("--y", value);
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        while (Math.abs(this.direction.x <= 0.2) || Math.abs(this.direction.x >= 0.9)) {
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += this.velocityIncrease * delta;
        const rect = this.rect();

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }

        /**if (rect.right >= window.innerWidth || rect.left <= 0) {
        this.direction.x *= -1
        }*/

        if (paddleRects.some((r) => isCollision(r, rect))) {
            this.direction.x *= -1;
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
    return rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top;
}
function handleEnd(playerScore, computerScore) {
    if (playerScore > computerScore) {
        document.getElementById("game").style.display = "none";
        document.getElementById("win").style.display = "block";
    } else {
        document.getElementById("game").style.display = "none";
        document.getElementById("lose").style.display = "block";
    }

}
