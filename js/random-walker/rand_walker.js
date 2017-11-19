var walker;
var x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(72, 61, 0);
  frameRate(160);
}

function draw() {
  if (mouseIsPressed) {
    x = mouseX;
    y = mouseY;
  }
  stroke(random(260), 255,random(260));
  strokeWeight(5);
  fill(72, 0, 255, 2);
  ellipse(x, y, 20, 20);
  background(72, 0, 255, 2);
  var move = random(10);
  if(move < 2.5) {
    x+=10;
  } else if(move < 5) {
    x-=10;
  } else if(move < 7.5) {
    y +=10;
  } else {
    y -=10;
  }
  stroke(0, 1, 0);
  strokeWeight(7);
  ellipse(x, y, 20, 20);
}
