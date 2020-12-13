// Getting Canvas and Score <p>
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var score = document.querySelector("#score");

// Cells
var cellSize = 20;
var row = canvas.height / cellSize;
var col = canvas.width / cellSize;

// Snake
var originalLength = 5;
var snake = {
    x: col / 2,
    y: row / 2,
    tail: [],
    tailLength: originalLength
};
var vec = {
    x: 1,
    y: 0
};

// Apple
var apple = {
    x: Math.floor(Math.random() * col),
    y: Math.floor(Math.random() * row)
};

// Events
document.onkeydown = keyDown;
var loopInterval = setInterval(gameLoop, 1000 / 15); // 15fps

function keyDown(ev) {
    switch (ev.keyCode) {
        case 87:
            // up
            if (vec.y == 1) break;
            vec.x = 0;
            vec.y = -1;
            break;
        case 83:
            // down
            if (vec.y == -1) break;
            vec.x = 0;
            vec.y = 1;
            break;
        case 65:
            // left
            if (vec.x == 1) break;
            vec.x = -1;
            vec.y = 0;
            break;
        case 68:
            // right
            if (vec.x == -1) break;
            vec.x = 1;
            vec.y = 0;
            break;
    }
}
function gameLoop() {
    // Move
    snake.x += vec.x;
    snake.y += vec.y;
    // Move: Warp at edge of screen
    if (snake.x < 0) snake.x = col - 1;
    else if (snake.x > col - 1) snake.x = 0;
    else if (snake.y < 0) snake.y = row - 1;
    else if (snake.y > row - 1) snake.y = 0;

    // Add Snake's Tail
    snake.tail.push({
        x: snake.x,
        y: snake.y
    });
    while (snake.tail.length > snake.tailLength) snake.tail.shift();

    // Action: Eat own tail
    for (var i = 0; i < snake.tail.length - 1; i++) {
        if (snake.tail[i].x == snake.x && snake.tail[i].y == snake.y) {
            clearInterval(loopInterval);
            var emoji = String.fromCodePoint(0x1F602);
            alert("You lost! You scored " + (snake.tailLength - originalLength) + " pts! " + emoji + emoji + emoji);
        }
    }

    // Action: Eat Apple
    if (snake.x == apple.x && snake.y == apple.y) {
        // Lengthen Snake
        snake.tailLength += 1;
        // Generate Apple
        apple.x = Math.floor(Math.random() * col);
        apple.y = Math.floor(Math.random() * row);
        // Resize score
        score.style.fontSize = "2em";
        setTimeout(() => score.style.fontSize = "1.25em", 500);
    }

    // Draw background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw Snake's Tail
    ctx.fillStyle = "#00CC00";
    snake.tail.forEach(t =>
        ctx.fillRect(
            t.x * cellSize,
            t.y * cellSize,
            cellSize - 1,
            cellSize - 1
        )
    );
    // Draw Snake's head
    ctx.fillStyle = "lime";
    ctx.fillRect(
        snake.x * cellSize,
        snake.y * cellSize,
        cellSize - 1,
        cellSize - 1
    );
    // Draw Apple
    ctx.fillStyle = "red";
    ctx.fillRect(
        apple.x * cellSize,
        apple.y * cellSize,
        cellSize - 1,
        cellSize - 1
    )

    // Update Score
    score.innerText = (snake.tailLength - originalLength) + " pts";
}