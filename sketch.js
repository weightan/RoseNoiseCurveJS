
let k1;
let k2;

let squiggliness 

let scaleF = 2.3

let nvertexes = 400
let vertexes = []

let r = 150
let alf = 250

let bc, ac

function setup() {
  
  bc = color(100,30,0)
  ac = color(0,0,0)
  
  createCanvas(1000, 1000).parent("canvas").mouseClicked(randomOne);
  
  
  noFill();
  background(bc);
  frameRate(60)

  params = new URLSearchParams(window.location.search)

  
  if(params.get("yp") && params.get("xp") && params.get("sp")) {
    
    k1 = parseInt(params.get("xp"));
    k2 = parseInt(params.get("yp"));
    squiggliness = params.get("sp")
    
    updateV()
    updateLink()
  } else {
    randomOne()
  }
}

function randomOne() {
  background(bc);
  
  squiggliness = random([0.001, 0.002, 0.003, 0.004]);
  
  k1 = random([0,1,2,3,4,5,6,7]);
  k2 = random([0,1,2,3,4,5,6,7]);
  
  h = random([0, 1])
  
  if ((h == 1) && (k2 != 1)){
    k1 = k2
  }  
  
  alf = 240;
  updateV();
  updateLink();
}

function updateLink () {
  
  const link = `https://weightan.github.io/RoseNoiseCurveJS?xp=${k1}&yp=${k2}&sp=${squiggliness}`
  
  select("#permalink").html(link).attribute("href", link)
}

function updateV() {
  
  vertexes = [];
  
  for (let i = 0; i < nvertexes; i++) {
    
	let theta = map(i, 0, nvertexes, -PI, PI);
    
    let x_ = width / 2 + scaleF*r*cos(theta) * cos(k1*theta);
    let y_ = height / 2 + scaleF*r*sin(theta) * cos(k2*theta);
    
    vertexes.push(new noiseVert(x_, y_));
  }
}

function noiseVert(x_, y_) {
  this.x = x_;
  this.y = y_;
}

function draw() {

  alf *=0.979
  
  beginShape()
  stroke(255, 255, 255, alf);
  strokeWeight(1);

  for (let v of vertexes) {
    curveVertex(v.x, v.y);
  } 
  
  endShape(CLOSE)
  
  for (let v of vertexes) {
    
    let theta = noise(v.x * squiggliness, v.y * squiggliness)*PI*4;
    let d = p5.Vector.fromAngle(theta, 1);
    
    v.x += d.x;
    v.y += d.y;
    
  } 
  
}




