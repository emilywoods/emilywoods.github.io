var radius = 100;
var radian = Math.PI / 180;
var frames = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB);
}

function draw() {
  frames +=0.00005;
  var k = Math.sin(frames*radius);
  var rad_update = radius * Math.abs(k);
  var l = 100-((100 * Math.abs(k))/2);
  stroke (0,10,l);

  for (var i = 0; i < width+100; i += 50) {
    for (var j = 0; j < height+100; j += 50) {
      draw_circle(i, j, rad_update)
    }
  }
  for (var i = 0; i < width; i += 100) {
    for (var j = 0; j < height; j += 100) {
      draw_triangle(0 + i , 0  +j)
    }
  }
}

function draw_circle(x, y, radius) {
  noFill()
  stroke((radius+random(500,560)/2)-100,67,66)
  strokeWeight(2);
  ellipse(x, y, radius-2);
  strokeWeight(1);
  stroke('white')
  ellipse(x, y, radius);
}

function draw_triangle(x, y) {
  stroke('white')
  triangle(x, y, x + 50, y - 100, x + 100, y)
}
