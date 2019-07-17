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
    let paddleLeft = {x : width / 2 - 30, y : height - 30};
    let paddleMiddle = {x : width / 2 - 10, y : height - 30};
    let paddleRight = {x : width / 2 + 10, y : height - 30};
    paddle = {left : paddleLeft, mid : paddleMiddle, right : paddleRight};

    ball = {x : paddle.mid.x + 10, y : paddle.mid.y - 15, dir : createVector(random(-5, 5), -5)};
}

/*
    The draw function is executed once per frame.
*/
function draw() {
    // Update
    if (keys[LEFT_ARROW]) {
        paddle.left.x -= 15;
        paddle.mid.x -= 15;
        paddle.right.x -= 15;
    }
    if (keys[RIGHT_ARROW]) {
        paddle.left.x += 15;
        paddle.mid.x += 15;
        paddle.right.x += 15;
    }
    paddle.left.x = constrain(paddle.left.x, 0, width - 60);
    paddle.mid.x = paddle.left.x + 20;
    paddle.right.x = paddle.left.x + 40;

    // update the ball
    ball.x += ball.dir.x;
    ball.y += ball.dir.y;
    // if the ball hits a border, invert direection based on border hit
    if (ball.x <= 15 || ball.x >= width - 15) {
        ball.dir.x = -ball.dir.x;
    }
    if (ball.y <= 15) {
        ball.dir.y = -ball.dir.y;
    }

    // bouncing ball off the paddle
    if (ballOnRect(paddle.left.x, paddle.left.y, 20, 20)) {
        ball.dir.y = -ball.dir.y;
        ball.dir.x -= 2;
    } else if (ballOnRect(paddle.mid.x, paddle.mid.y, 20, 20)) {
        ball.dir.y = -ball.dir.y;
        ball.dir.x *= 0.5;
    } else if (ballOnRect(paddle.right.x, paddle.right.y, 20, 20)) {
        ball.dir.y = -ball.dir.y;
        ball.dir.x += 2;
    }


    // destroying bricks
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
            // if the ball collided with this brick, destroy it and bounce the ball
            if (bricks[i][j].value == VALUEBRICK && ballOnRect(i * 40 + (width / 2 - (3.5 * 40)), j * 20, 40, 20)) {
                bricks[i][j].value = VALUEEMPTY;
                ball.dir.y = -ball.dir.y;
            }
        }
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
    fill(210, 100, 0);
    rect(paddle.left.x, paddle.left.y, 20, 20);
    rect(paddle.mid.x, paddle.mid.y, 20, 20);
    rect(paddle.right.x, paddle.right.y, 20, 20);

    // draw ball
    fill(50, 200, 100);
    ellipse(ball.x, ball.y, 30, 30);
}


function randomColor() {
	return color(random(0, 255), random(0, 255), random(0, 255));
}

function ballOnRect(x, y, w, h) {
    if ((ball.x + 15 > x) && (ball.x - 15 < x + w) && (ball.y + 15 > y) && (ball.y - 15 < y + h)) {
        return true;
    }
    return false;
}
