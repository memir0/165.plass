// Frank Poth 08/13/2017

var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

canvasWidth = 600;
canvasHeight = 400;

context.canvas.height = canvasHeight;
context.canvas.width = canvasWidth;

var player1 = new Rectangles();
var player2 = new Rectangles();

window.addEventListener("keydown", player1.controller.keyListener)
window.addEventListener("keyup", player1.controller.keyListener);
window.requestAnimationFrame(player1.loop);

class Rectangles{
  rectangle = {

      height:64,
      jumping:true,
      width:32,
      x:144, // center of the canvas
      x_velocity:0,
      y:0,
      y_velocity:0
    
    };
    
    controller = {
    
      left:false,
      right:false,
      up:false,
      keyListener:function(event) {
    
        var key_state = (event.type == "keydown")?true:false;
    
        switch(event.keyCode) {
    
          case 37:// left key
            controller.left = key_state;
          break;
          case 38:// up key
            controller.up = key_state;
          break;
          case 39:// right key
            controller.right = key_state;
          break;
    
        }
      }
    
    };

    loop = function() {

      if (controller.up && rectangle.jumping == false) {
    
        rectangle.y_velocity -= 20;
        rectangle.jumping = true;
    
      }
    
      if (controller.left) {
    
        rectangle.x_velocity -= 0.5;
    
      }
    
      if (controller.right) {
    
        rectangle.x_velocity += 0.5;
    
      }
    
      rectangle.y_velocity += 1.5;// gravity
      rectangle.x += rectangle.x_velocity;
      rectangle.y += rectangle.y_velocity;
      rectangle.x_velocity *= 0.9;// friction
      rectangle.y_velocity *= 0.9;// friction
    
      // if rectangle is falling below floor line
      if (rectangle.y > canvasHeight - 20 - rectangle.height) {
    
        rectangle.jumping = false;
        rectangle.y = canvasHeight - 20 - rectangle.height;
        rectangle.y_velocity = 0;
    
      }
    
      // if rectangle is going off the left of the screen
      if (rectangle.x < -32) {
    
        rectangle.x = canvasWidth;
    
      } else if (rectangle.x > canvasWidth) {// if rectangle goes past right boundary
    
        rectangle.x = -32;
    
      }
    
      context.fillStyle = "#202020";
      context.fillRect(0, 0, canvasWidth, canvasHeight);// x, y, width, height
      context.fillStyle = "#ff0000";// hex for red
      context.beginPath();
      context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
      context.fill();
      context.strokeStyle = "#202830";
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(0, canvasHeight-20);
      context.lineTo(canvasWidth, canvasHeight-20);
      context.stroke();
    
      // call update when the browser is ready to draw again
      window.requestAnimationFrame(loop);
    
    };
}