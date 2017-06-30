window.onload = () => {
  const
    canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d'),
    snakeDirection = {
      'right': x = x+5,
      'left': x = x-5,
      'up': y = y-5,
      'down': y = y+5
    };

    //Canvas configuration
    canvas.width = 800,
    canvas.height = 600;

  let
    x = 0,
    y = 0,
    direction = 'right';

  /**
   * This function gets the snake direction and gives the right x and y sum.
   */
  console.log('asdasdasdasdas');
  function core() {
    console.log(snakeDirection[direction]);
    if(direction == 'right') {
      x = x+5;
    }

    if(direction == 'left') {
      x = x-5;
    }

    if(direction == 'up') {
      y = y-5;
    }

    if(direction == 'down') {
      y = y+5;
    }

    drawSnake(x, y);
  }

  function drawSnake(x, y) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(x, y, 20,20);
  }

  function controller(event) {
    switch (event.keyCode) {
      case 38:
        direction = 'up';
        break;
      case 40:
        direction = 'down';
        break;
      case 39:
        direction = 'right';
        break;
      case 37:
        direction = 'left';
        break;
    }
  }

  window.addEventListener('keydown', controller);

  setInterval(core, 1000 / 15);
}