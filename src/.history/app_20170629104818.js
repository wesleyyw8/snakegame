window.onload = () => {
  const
    canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d');

    //Canvas size configuration
    canvas.width = 800,
    canvas.height = 600;

  let
    x = 0,
    y = 0,
    direction = 'right',
    snakeSize = 2,
    snakeDirection = {
      'right': { x: 5,  y: 0  },
      'left':  { x: -5, y: 0  },
      'up':    { x: 0,  y: -5 },
      'down':  { x: 0,  y: 5  }
    },
    directionControl = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };

  /**
   * draw the snake on canvas.
   * @param {number} x - x of the canvas.
   * @param {number} y - y of the canvas.
   */
  function drawSnake(x, y) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < snakeSize; i++) {
        ctx.fillStyle = "#009688";
        ctx.fillRect(x -21, y, 20,20);
        ctx.fillRect(x, y, 20,20);
      }
  }

  /**
   * This function gets the snake direction and gives the right x and y sum.
   */
  function core() { 
    x = (snakeDirection[direction].x) + x;
    y = (snakeDirection[direction].y) + y;
    drawSnake(x, y);
  }

  /**
   * set the snake's direction.
   * @param {event} x - keyboard event.
   */
  function controller(event) {
    if (directionControl[event.keyCode]) {
      direction = directionControl[event.keyCode];
    }
  }

  window.addEventListener('keydown', controller);

  setInterval(core, 1000 / 15);
}