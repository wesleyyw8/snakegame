module.exports = function () {
   const
      canvas = document.getElementById('game'),
      ctx = canvas.getContext('2d');
      //Canvas size configuration
      canvas.width = 800;
      canvas.height = 400;

  let
    snakeX = 0,
    snakeY = 0,
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
    },
    fruit = randomFruit();

  /**
   * This function gets the snake direction and gives the right x and y sum.
   */
  function core() {
    snakeX = (snakeDirection[direction].x)*20 + snakeX;
    snakeY = (snakeDirection[direction].y)*20 + snakeY;
    
    checkBounds({ x: snakeX, y: snakeY });

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < snakeTrail.length; i++) {
      if (compareCoords({x: snakeX, y: snakeY}, snakeTrail[i])) {
        snakeTail = 5
      }
      drawSnake(snakeTrail[i].x, snakeTrail[i].y);
    }

    snakeTrail.push({x: snakeX, y:snakeY});
    
    while(snakeTrail.length>snakeTail) {
      snakeTrail.shift();
    }

    // Draw the fruit
    drawFruit(fruit.x, fruit.y);
    
    if (compareCoords({ x: snakeX, y: snakeY }, fruit)) {
      increaseSnakeLength();
      fruit = randomFruit();
    }
      
    debug();
  };

/**
 * draw the snake on canvas.
 * @param {number} x - x of the canvas.
 * @param {number} y - y of the canvas.
 */
  function drawSnake(x, y) {
      ctx.fillStyle = "#009688";
      ctx.fillRect(x, y, 20-2,20-2);
  };
  
/**
 * draw the fruit on canvas.
 * @param {number} x - x of the canvas.
 * @param {number} y - y of the canvas.
 */
  function drawFruit(x, y) {
      ctx.fillStyle = "#f00";
      ctx.fillRect(x, y, 20-2,20-2);
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

  function increaseSnakeLength() {
    snakeTail++;
  }

  function compareCoords(snake, fruit) {
    return snake.x === fruit.x && snake.y === fruit.y;
  }

  function checkBounds(snake) {
    if (snake.x >= canvas.width) {
      snakeX = 0
    }

    else if (snake.x < 0){
      snakeX = canvas.width - 20;
    }

    if (snake.y >= canvas.height){
      snakeY = 0;
    }
    
    else if (snake.y < 0){
      snakeY = canvas.height - 20;
    }
  
  }

  function randomFruit() {
    let x, y;

    const 
      w = canvas.width,
      h = canvas.height;

    x = Math.floor(Math.random() * w / 20) * 20;
    y = Math.floor(Math.random() * h / 20) * 20;

    return {
      x,
      y
    };
  }

  return {
      core: core,
      controller: controller,
      debug: debug,
      drawSnake: drawSnake
  }
}();