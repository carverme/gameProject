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
  collisionDetection(player1);
  collisionDetection(player2);
  ctx.clearRect(0, 0, mainGame.width, mainGame.height);
  draw();
  player1.render();
  if(player2.alive) {
    player2.render();
  }
  // console.log("this is the y position: ", ballPos.y);
  // console.log("this is the y velocity: ", ballVel.y);
  ctx.fillRect(ballPos.x, ballPos.y, 6, 6);
  //how to call player1Score and player2Score.
}

//This defines player location, size, and color.
$(document).ready(function(){
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
setInterval(gameLoop, 10);

$(document).keydown(function(e) {
  switch(true){
    case (e.keyCode === 81 && canMove):
    player1.y-=20;
    //How to do sub steps to make it more smooth?
    break;
    case (e.keyCode === 65 && canMove):
    player1.y+=20;
    break;
    }
  })

$(document).keydown(function(e) {
  switch(true){
    case (e.keyCode === 80 && canMove):
    player2.y-=20;
    break;
    case (e.keyCode === 76 && canMove):
    player2.y+=20;
    break;
    }
  })
});

function gameTick(option) {
  ballPos.x = ballPos.x + ballVel.x;
  ballPos.y = ballPos.y + ballVel.y;
  };

$(document).ready(function(e) {
  ballPos.x = 200;
  ballPos.y = 200;
  ballVel.x = 1;
  ballVel.y = 1;
  setInterval(gameTick, 10);
});


function collisionDetection(paddleChar) {
//left
    if(ballPos.x <= paddleChar.x && ballPos.x > paddleChar.x + paddleChar.width
      && ballPos.y <= paddleChar.y && ballPos.y > paddleChar.y + paddleChar.height)
      {
        ballVel.x = ballVel.x * -1;
      }
//leftscoreboard
    if(ballPos.x >= scoreRight && canScore) {
        player1Score++;
        canScore = false;
        setTimeout(function(){
          canScore = true;
          ballPos.x = 600;
          ballPos.y = 300;
          ballVel.x = 1;
        }, 1000)
    }
//right
    if(ballPos.x >= paddleChar.x && ballPos.x < paddleChar.x + paddleChar.width
      && ballPos.y >= paddleChar.y && ballPos.y < paddleChar.y + paddleChar.height)
      {
        ballVel.x = ballVel.x * -1;
      }
//rightscoreboard
    if(ballPos.x <= scoreLeft && canScore) {
        player2Score++;
        canScore = false;
        setTimeout(function(){
          canScore = true;
          ballPos.x = 600;
          ballPos.y = 300;
          ballVel.x = 1;
        }, 1000)
    }
//this makes the ball bounce off the top barrier.
    if(ballPos.y <= bounceBarrierTop) {
      ballPos.y = 10;
      // ballVel.x = 1;
      ballVel.y = ballVel.y * -1;
      }
//this makes the ball bounce off the bottom barrier.
    if(ballPos.y >= bounceBarrierBottom) {
      ballPos.y = 590;
      // ballVel.x = 1;
      ballVel.y = ballVel.y * -1;
      }

    if(player1Score === 1 && winToast) {
      canMove = false;
      winToast = false;
      ballVel.x = null;
      ballVel.y = null;
      setTimeout(function(){
        M.toast({html: 'Player 1 wins!'});
        canMove = true;
        ballVel.x = 1;
        ballVel.y = 1;
      }, 1500);
    } else if(player2Score === 1 && winToast) {
      canMove = false;
      winToast = false;
      ballVel.x = null;
      ballVel.y = null;
      setTimeout(function(){
        M.toast({html: 'Player 2 wins!'});
        canMove = true;
        ballVel.x = 1;
        ballVel.y = 1;
    }, 1500);
  }
};











// function randomPosX(50, 1051) {
//   return Math.random() * (1051 - 50) + 50;
// }
//
// function randomPosY(30, 570) {
//   return Math.random() * (570 - 30) + 30;
// }
//
// function randomintVel(-1, 2) {
//   return Math.floor(Math.random() * 2) + (-1);
// }

// //use this function to get an x, and then again for a y, to have random placement of ball when reset.
// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// }
//
// //use this function to get a random integer, for x and y, to have random direction of the ball.
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * max) + min; //The maximum is exclusive and the minimum is inclusive
// }

// subtract a .5 from the math.random...

//scoreboard









// function collisionDetection() {
//     for(var c=0; c<brickColumnCount; c++) {
//         for(var r=0; r<brickRowCount; r++) {
//             var b = bricks[c][r];
//             if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
//                 dy = -dy;
//             }
//         }
//     }
// }



//collision detection

//
// //Below define player location, size, and color.
// //   comp = playerUnit({
// //     x:
// //     y:
// //     height:
// //     width:
// //     color:
// //     alive:
// //   })
// //   compHard = playerUnit({
// //     x:
// //     y:
// //     height:
// //     width:
// //     color:
// //     alive:
// //   })
// // });
////
// $(document).ready(function() {
//   console.log('jQuery init!');
// });
//
//
// $(document).keydown(function(e) {
//     console.log(e.keyCode);
//   });
