const dt = 0.01;
const rho = 10;
const sigma = 28;
const beta = 8.0 / 3.0;

const s = 5;

class lorenz {
  pos;
  points;

  constructor(initialConditions) {
    this.pos = initialConditions;
    this.points = []
  }

  step() {
    let delta = createVector(
      rho * (this.pos.y - this.pos.x),
      this.pos.x * (sigma - this.pos.z) - this.pos.y, 
      this.pos.x * this.pos.y - beta * this.pos.z);
    delta.mult(dt);
    this.pos.add(delta);
    this.points.push(this.pos.copy());
    if (this.points.length > 1000) {
      this.points.splice(0, 1)
    }
  }

  draw() {
    noFill();
    beginShape();
    this.points.forEach(p => {
      vertex(p.x * s, p.y * s, p.z * s);
    })
    endShape();
  }
}

let curve1;
let curve2;
let curve3;
let curve4;

let cam;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('antialias', true);
  colorMode(HSB);
  angleMode(DEGREES);

  cam = createEasyCam();
    
  curve1 = new lorenz(createVector(15 * Math.random(), 15 * Math.random(), 15 * Math.random()));
  curve2 = new lorenz(createVector(15 * Math.random(), 15 * Math.random(), 15 * Math.random()));
  curve3 = new lorenz(createVector(15 * Math.random(), 15 * Math.random(), 15 * Math.random()));
  curve4 = new lorenz(createVector(15 * Math.random(), 15 * Math.random(), 15 * Math.random()));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cam.setViewport([0,0,windowWidth, windowHeight]);
}

function draw() {
  curve1.step();
  curve2.step();
  curve3.step();
  curve4.step();

  background(0);
  strokeWeight(2);

  push();
  rotateX(90);
  rotateZ(90);

  scale(1.5);

  translate(0, 0, -150)

  rotateZ(millis() / 200);
  // rotateX(sin(millis() / 100 + 0.25) * 10);
  stroke(0, 255, 255);
  curve1.draw();

  stroke(64, 255, 255);
  curve2.draw();

  stroke(128, 255, 255);
  curve3.draw();

  stroke(200, 255, 255);
  curve4.draw();

  pop();
}