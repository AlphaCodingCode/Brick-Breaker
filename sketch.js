// Any global variables can be defined up here
let bricks = [];
let paddle;
let ball;

const VALUEBRICK = 1;
const VALUEEMPTY = 0;

/*
    Code in the setup function will only be run once at the start of the animation
*/
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for (let i = 0; i < 7; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            row.push({value : VALUEBRICK, color : randomColor()});
        }
        bricks.push(row);
    }
    paddle = {x : width / 2, y : height - 30};
    ball = {x : paddle.x + 30, y : paddle.y - 15, dir : createVector(random(0, 100) > 50 ? 5 : -5, -5)};
}

/*
    The draw function is executed once per frame.
*/
function draw() {
    // Update
    if (keys[LEFT_ARROW]) {
        paddle.x -= 15;
    }
    if (keys[RIGHT_ARROW]) {
        paddle.x += 15;
    }
    paddle.x = constrain(paddle.x, 0, width - 60);

    // update the ball
    ball.x += ball.dir.x;
    ball.y += ball.dir.y;
    // if the ball reaches the border, invert based on which border
    if (ball.x <= 15 || ball.x >= width - 15) {
        ball.dir.x = -ball.dir.x;
    }
    if (ball.y <= 15) {
        ball.dir.y = -ball.dir.y;
    }
    // Render
    background(255, 255, 255);
    // draw bricks
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
            // if the brick isn't broken, draw it
            if (bricks[i][j].value == VALUEBRICK) {
                fill(bricks[i][j].color);
                rect(i * 40 + (width / 2 - (3.5 * 40)), j * 20, 40, 20);
            }
        }
    }
    // draw paddle
    fill(0, 0, 0);
    rect(paddle.x, paddle.y, 60, 20);
    // draw ball
    fill(50, 200, 100);
    ellipse(ball.x, ball.y, 30, 30);
}


function randomColor() {
	return color(random(0, 255), random(0, 255), random(0, 255));
}
