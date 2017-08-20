var index;
var dist_config;

function setup() {
  createCanvas(windowWidth,windowHeight);
  index = 0;
  dist_config = 10;
  colorMode(HSB);
  background('black');
}

function draw() {
  index++;
  translate(width / 2 , height / 2);
  rotate(angle(index));
  fill(255, 200, 200);
  if (index< 2000) element(index);
}

function element(n) {
  stroke((random(560)),67,66)
  if (n < 500) {
    ellipse(createDistance(dist_config)(n), 0+n, random(10), random(10));
  }
  else {
    var dist = createDistance(dist_config)(n);
    triangle(n, 0, 15, 4+sqrt(n));
  }
}

function angle(n) {
  return 2.159844949343 * n;
}

function createDistance(dist_config) {
  var distance = function (n) {
    return dist_config * sqrt(n);
  };
  return distance;
}
