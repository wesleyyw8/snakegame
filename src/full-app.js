window.onload = () => {
  const
    canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d');

    //Canvas size configuration
    canvas.width = 800;
    canvas.height = 400;

  let
    snakeX = 150,
    snakeY = 150,
    snakeGrid = 20,
    direction = 'right',
    snakeTrail = [],
    snakeTail = 5,
    snakeDirection = {
      'right': { x: 1,  y: 0  },
      'left':  { x: -1, y: 0  },
      'up':    { x: 0,  y: -1 },
      'down':  { x: 0,  y: 1  }
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
      ctx.fillStyle = "#009688";
      ctx.fillRect(x, y, snakeGrid-2,snakeGrid-2);
  };

  /**
   * This function gets the snake direction and gives the right x and y sum.
   */
  function core() {
    snakeX = (snakeDirection[direction].x)*snakeGrid + snakeX;
    snakeY = (snakeDirection[direction].y)*snakeGrid + snakeY;
    
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < snakeTrail.length; i++) {
      drawSnake(snakeTrail[i].x, snakeTrail[i].y);
    }

    snakeTrail.push({x: snakeX, y:snakeY});
    
    while(snakeTrail.length>snakeTail) {
      snakeTrail.shift();
    }
    
    debug();
  };

  /**
   * set the snake's direction.
   * @param {event} x - keyboard event.
   */
  function controller(event) {
    if (directionControl[event.keyCode]) {
      direction = directionControl[event.keyCode];
    }
  };

  function debug() {
      document.querySelector('#debug .snake-x').innerHTML = snakeX;
      document.querySelector('#debug .snake-y').innerHTML = snakeY;
      document.querySelector('#debug .snake-direction').innerHTML = direction;      
  }

  window.addEventListener('keydown', controller);

  setInterval(core, 1000 / 15);
}