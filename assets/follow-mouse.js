var i;

function setup() {
  createCanvas(windowWidth,windowHeight);
  i = 0;
  background('rgba(0,100,0,0.25)');
}

function element(n) {
  fill('rgba(0,255,3,0.25)')

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
  background('rgba(0,100,0,0.25)');
}

