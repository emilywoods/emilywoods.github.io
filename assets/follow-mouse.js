var i;

function setup() {
  createCanvas(windowWidth,windowHeight);
  i = 0;
  background('#fff0f5');
}

function element(n) {
  fill('#cfd4db')
  ellipse(10, 0, random(100), random(10));
}

function mouseMoved() {
  i++;
  translate(mouseX , mouseY);
  rotate(i);
  fill(255, 200, 200);
  element(i);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#fff0f5');
}

