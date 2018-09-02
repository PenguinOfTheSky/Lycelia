window.keys = {
  left: 0,
  right: 0,
  up: 0,
  down: 0,
  jump: 0
}
window.onkeydown = function (e) {
  let code = e.keyCode ? e.keyCode : e.which;
  switch (code) {
    case 65: //left
      keys.left = true;
      break;
    case 87 : //up
      keys.up = true;
      break;
    case 68: //right
      keys.right = true;
      break;
    case 83: //down
      keys.down = true
      break;
    case 32:
      keys.jump = true;
      break;
    case 81:
      keys.turnL = true;
      break;
    case 69:
      keys.turnR = true;
      break;
    case 74:
      events.hotkey(1)
      break;
    case 75:
      events.hotkey(2)
      break;
    }

};
  window.onkeyup = function (e) {
    let code = e.keyCode ? e.keyCode : e.which;
    //if (code <= 40 && code >= 37)
     switch (code) {
    case 65: //left
      keys.left = false;
      break;
    case 87 : //up
      keys.up = false;
      break;
    case 68: //right
      keys.right = false
      break;
    case 83: //down
      keys.down = false;
      break;
    case 32: //jump
      keys.jump = false
      break;
    case 81:
      keys.turnL = false;
      break;
    case 69:
      keys.turnR = false;
      break;
    }
  }
