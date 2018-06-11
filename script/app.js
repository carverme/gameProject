var player1;
var player2;
var mainGame = document.getElementById('mainGame');
var ctx = mainGame.getContext('2d');
var ballPos = {
  x: 0,
  y: 0
};
var ballVel = {
  x: 0,
  y: 0
};
var ball = null;
var bounceBarrierTop = 7;
var bounceBarrierBottom = 592;
var scoreLeft = 0;
var scoreRight = 1100;
var player1Score = 0;
var player2Score = 0;
var canScore = true;
var winToast = true;
var canMove = true;


//this function draws the initial loaded items.
function draw() {
  ctx.fillStyle = 'limegreen';
  ctx.fillRect(547.5, 10, 5, 580);
//this controls the font for the scores
  ctx.font = "40px sans-serif";
//this is the p1 scorebox
  ctx.fillStyle = 'limegreen';
  ctx.fillRect(487.5, 20, 50, 50);
//this writes the scores into the p1 box in black
  ctx.fillStyle = 'black'
  ctx.fillText(player1Score, 502, 57.5)
//this is the p2 scorebox
  ctx.fillStyle = 'limegreen';
  ctx.fillRect(562.5, 20, 50, 50);
//this writes the scores into the p2 box in black
  ctx.fillStyle = 'black'
  ctx.fillText(player2Score, 577, 57.5)
};

//this function manages player char, and movement.
function playerPaddle(option) {
  var paddleChar = {};
  paddleChar.x = option.x;
  paddleChar.y = option.y;
  paddleChar.height = option.height;
  paddleChar.width = option.width;
  paddleChar.color = option.color;
  paddleChar.alive = option.alive;
  paddleChar.render = function() {
    ctx.fillStyle = paddleChar.color;
    ctx.fillRect(paddleChar.x, paddleChar.y, paddleChar.width, paddleChar.height);
  }
  return paddleChar;
};


function gameLoop() {
  ballPos.x = ballPos.x + ballVel.x;
  ballPos.y = ballPos.y + ballVel.y;
  collisionDetection(player1);
  collisionDetection(player2);
  ctx.clearRect(0, 0, mainGame.width, mainGame.height);
  draw();
  player1.render();
  if(player2.alive) {
    player2.render();
  }
  ctx.fillRect(ballPos.x, ballPos.y, 6, 6);
}

//This defines player location, size, and color.
$(document).ready(function() {
  draw()
  player1 = playerPaddle({
    x: 20,
    y: 20,
    height: 50,
    width: 10,
    color: 'limegreen',
    alive: true,
  })
  player2 = playerPaddle({
    x: 1070,
    y: 20,
    height: 50,
    width: 10,
    color: 'limegreen',
    alive: true,
  })
  ballPos.x = 200;
  ballPos.y = 200;
  ballVel.x = 1;
  ballVel.y = 1;
  setInterval(gameLoop, 10);
//This is the document ready that allows for the up/down keys to move the paddles.
$(document).keydown(function(e) {
  switch(true){
    case (e.keyCode === 81 && canMove):
      player1.y-=20;
      break;
    case (e.keyCode === 65 && canMove):
      player1.y+=20;
      break;
    case (e.keyCode === 80 && canMove):
      player2.y-=20;
      break;
    case (e.keyCode === 76 && canMove):
      player2.y+=20;
      break;
    }
  })
});

function collisionDetection(paddleChar) {
//This condition causes the ball to bounce off of the left paddle and maintains the speed of the ball.
    if(ballPos.x <= paddleChar.x && ballPos.x > paddleChar.x + paddleChar.width
      && ballPos.y <= paddleChar.y && ballPos.y > paddleChar.y + paddleChar.height)
      {
        ballVel.x = ballVel.x * -1;
      }
//This condition tracks if the ball scores, adds a score to the Player 1 board, and resets the ball position.
    if(ballPos.x >= scoreRight && canScore) {
        player1Score++;
        canScore = false;
        setTimeout(function(){
          canScore = true;
          ballPos.x = 600;
          ballPos.y = 300;
        }, 1000)
    }
//This condition causes the ball to bounce off of the right paddle and maintains the speed of the ball.
    if(ballPos.x >= paddleChar.x && ballPos.x < paddleChar.x + paddleChar.width
      && ballPos.y >= paddleChar.y && ballPos.y < paddleChar.y + paddleChar.height)
      {
        ballVel.x = ballVel.x * -1;
      }
//This condition tracks if the ball scores, adds a score to the Player 2 board, and resets the ball position.
    if(ballPos.x <= scoreLeft && canScore) {
        player2Score++;
        canScore = false;
        setTimeout(function(){
          canScore = true;
          ballPos.x = 600;
          ballPos.y = 300;
        }, 1000)
    }
//This condition causes the ball to bounce off of the top barrier.
    if(ballPos.y <= bounceBarrierTop) {
      ballPos.y = 10;
      // ballVel.x = 1;
      ballVel.y = ballVel.y * -1;
      }
//This condition causes the ball to bounce off of the bottom barrier.
    if(ballPos.y >= bounceBarrierBottom) {
      ballPos.y = 590;
      // ballVel.x = 1;
      ballVel.y = ballVel.y * -1;
      }
      checkForWin();
};
//This checkForWin function, checks the player score, and when it reaches 5, declares a winner, posts a toast of the winner, and calls the resetGameModal.
function checkForWin () {
  if(player1Score === 5 && winToast) {
    winToast = false;
    setTimeout(function(){
      M.toast({html: 'Player 1 wins!'});
      resetGameModal();
    }, 500);
  } else if(player2Score === 5 && winToast) {
    winToast = false;
    setTimeout(function(){
      M.toast({html: 'Player 2 wins!'});
      resetGameModal();
    }, 500);
  }
};
//This function resets the game(clearing the board, reseting the player's scores, re-engages the ball, and allows for a win toast(materialize)) when the resetGameModal is clicked "yes."
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  ctx.clearRect(0, 0, mainGame.width, mainGame.height);
  ballVel.x = 1;
  ballVel.y = 1;
  winToast = true;
}
//This function calls the materialize modal, and inits the game reset on a "yes" click.
function resetGameModal() {
  ballVel.x = 0;
  ballVel.y = 0;
  $('#modal1').modal();
  $('#modal1').modal('open');
  var yes = document.getElementById("yes");
  yes.addEventListener('click', resetGame);
}
