**PONG^2**

#gameProject

WDI-project1

**Introduction**
Hi, I'm Matt Carver, an aspiring Programmer.  This is my first game attempt, based on a classic, Pong.  Here you will find information on this game's development, my thought process, and future version plans.  Thank you for reading and please enjoy the game!  -MC

**Getting Started**
- PONG^2 is a web-site hosted game, located here: https://carverme.github.io/gameProject/

- If you are interested in further development of this game or to see its inner-workings, please see my github repository "gameProject", at: https://github.com/carverme.

**Built With**
- [Atom] - (https://atom.io/)
- Written in:
    - HTML
    - JavaScript
    - [jQuery] - (https://jquery.com/)
- Styled with:
    - Cascading Style Sheets
    - [Materialize] - (https://materializecss.com/)

**Pseudocode**
1. Set up files.
  - app.js
  - index.html
  - style.css

2. Link files to index.html, and initialize sources.
      - Link style.css.
      - Link JavaScript, app.js.
      - Link jQuery, minified.
      - Add GoogleFonts.
      - Add Materialize.
      - Add Canvas element.

3. Set spacing, header, footer, canvas.
      - GoogleFonts ('Jura' and 'Michroma') was used for the '.header' and the '.footer' fonts.

4. As it was my first time understanding Canvas, I found resources through the Mozilla developers network, as well as W3C's HTML Canvas 2d Context.  Using those resources, along with Instructor support, I worked to construct the gameboard, paddles, main barrier line, ball, scoreboard, and scores.
      - [W3's Canvas] (https://www.w3.org/TR/2dcontext/)

5. After establishing the Canvas items, I worked to define their individual responsibilities, functions, and characteristics.
- First, I worked to set the Canvas items to draw, then worked to build the gameLoop, with the initial load of items.  This included the ball, which has a ball position (ballPos) and a ball velocity (ballVel).  I had to determine the direction of the ball's movement once it made contact with either the paddles or the top and bottom barriers, based on the ball's position and it's velocity.

- ![Whiteboard pseudocode notes for ballVel and directions.] (https://imgur.com/h2HJd7d)

- Then, I worked to assign keyboard keys to the paddle's up and down actions.  For two players, player1 was assigned keys Q and A, and player2 was assigned P and L, for up and down respectively.

- Next, since the ball was drawn, I worked to create the collision detection.
  - For the paddles, I set the ball's 'x' and 'y' positions to stay outside of, and react to the paddle's 'x' and 'y' positions, by bouncing in reverse directions to the interior of the gameboard.
  - For the top and bottom barriers, I set the boundaries for the ball to react to, based on the canvas's dimensions.  What I learned with this barrier with my top/bottom extreme values, was that if the ball was moving at a significant velocity when it struck the barrier, it would get stuck in the barrier, and cause the game to loop without ball movement.  After adjusting the ball's distance from that barrier to be great enough to stay within 10px of those barriers, the ball looped and moved as intended.
  - For the score left/right barriers, once the ball crossed the left or right sides of the canvas, either player1Score or player2Score would be incremented +1.  This would be shown on the scoreboard, and the ball would be re-dropped, per say, on the board for the next round.

- [Whiteboard pseudocode notes for win condition, collision detection for paddles and top/bottom barriers.]
(https://imgur.com/MhTTWZD)

7. Once the game started to come together, I added the checkForWin function, which determined the win condition, which is set to the 5th goal.  Throughout game testing, this was always set to 1 to manage time.  When the function is run, by the game meeting the conditions of 'win', at 5 goals, a Materialize 'toast' is displayed with the winner of the game, player1 or player2.  The function also calls the resetGameModal function.

8. The resetGameModal function calls a Materialize 'modal', which allows the user to either click 'no' or 'yes.'  If the user clicks 'yes,' by way of an 'click' event handler, the game begins to run the resetGame function.

9. The resetGame function clears the playerScore board, resets the ball's velocity, clears the canvas, and allows for a 'toast' to be called again, once the win condition is met again.

**Next Steps**

In future versions of this game, I would like to improve or add the following:

- Player control
    - Increase the paddle speeds.
    - Allow for animation to smoothen the paddle movement.
    - Allow for multiple paddle movement when multiple keys are pressed.
    - Include mobile swiping for paddle movement.
    - Include options for handheld controller interfacing.
- Webpage use-ability and styling.
    - Include media-queries to make the game responsive on mobile platforms.
    - Include webkits to allow for use on multiple browsers.
    - Adjust name to display as an exponent without a karat.
- Game
    - Add random options for player upgrades, such as:
        - a faster moving paddle.
        - a wider paddle.
        - a ball modifier to create a faster ball.
        - a ball modifier to increase the size of the ball.
        - an option to change the board and piece colors randomly.
    - Add a computer player, including:
        - an easy option.
        - a hard option.

**Acknowledgements**

- A hat tip to:

     - Steve and Kyle, General Assembly Instructor and Instructor Assistant!
     - Ted Dabney, co-founder of Atari, co-creator(with Al Alcorn) of Pong, and video game industry pioneer died May 27, 2018.  
