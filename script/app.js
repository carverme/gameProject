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
var scoreBarrierLeft = 0;
var scoreBarrierRight = 1100;

//this function draws the initial loaded items.
function draw() {
  ctx.fillStyle = 'limegreen';
  ctx.fillRect(547.5, 10, 5, 580);
  // collisionDetection();
  //to add the score boxes here?
  console.log("working!!!");
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
  //define this more...
  collisionDetection(player1);
  collisionDetection(player2);
  ctx.clearRect(0, 0, mainGame.width, mainGame.height);
  draw()
  player1.render();
  console.log("gamelooping!");
  //Determine how to accept p2, then set to render if that truth is met.
  if(player2.alive) {
  player2.render();
  }
  console.log
  ctx.fillRect(ballPos.x, ballPos.y, 6, 6);
//In this block, maybe? Determine how to accept AI, then set to render that if truth is met.
}

//Below define player location, size, and color.
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
    case (e.keyCode === 81):
    player1.y-=20;
    //How to do sub steps to make it more smooth?
    break;
    case (e.keyCode === 65):
    player1.y+=20;
    break;
    }
  })

$(document).keydown(function(e) {
  switch(true){
    case (e.keyCode === 80):
    player2.y-=20;
    break;
    case (e.keyCode === 76):
    player2.y+=20;
    break;
    }
  })
});

function gameTick(option) {
  // ctx.clearRect(0, 0, mainGame.width, mainGame.height);
  ballPos.x = ballPos.x + ballVel.x;
  ballPos.y = ballPos.y + ballVel.y;
  // ball.style.left = (ballPos.x) + "px";
  // ball.style.top = (-ballPos.y) + "px";
  // ctx.fillRect(ballPos.x, ballPos.y, 6, 6);
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
    if(ballPos.x > paddleChar.x && ballPos.x < paddleChar.x + paddleChar.width
      && ballPos.y < paddleChar.y && ballPos.y < paddleChar.y + paddleChar.height)
      {
        //ballPos.x++;
        //ballPos.y++;
        ballVel.x += 1;
        ballVel.y += 1;
   }
//right
    if(ballPos.x < paddleChar.x && ballPos.x < paddleChar.x + paddleChar.width
      && ballPos.y < paddleChar.y && ballPos.y < paddleChar.y + paddleChar.height)
      {
       ballPos.x++;
       ballPos.y++;
        ballVel.x += -1;
        ballVel.y += 1;
    }

    if(ballPos.y <= bounceBarrierTop) {
      // ballPos.x++;
      // ballPos.y++;
      ballVel.x += 1;
      ballVel.y += 1;
    }

    if(ballPos.y >= bounceBarrierBottom) {
      // ballPos.x++;
      // ballPos.y++;
      ballVel.x += 1;
      ballVel.y += -1 * 1.5;
    }
};
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
