// https://www.e-education.psu.edu/eme812/node/896 
// https://en.wikipedia.org/wiki/Lambert%27s_cosine_law
let a = 0;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background("white");

  //--------------------------------- draw formula
  let angle = Math.abs(Math.round(a));
  let percent = Math.round(Math.cos(radians(a)) * 1000) / 1000;

  textSize(20);
  noStroke();
  fill("black");
  textAlign(LEFT);
  text("cos(", 10, 20 + 10);
  textAlign(CENTER);
  fill("dodgerblue");
  text(angle + "°", 65, 20 + 10);
  textAlign(LEFT);
  fill("black");
  text(") = ", 80, 20 + 10);
  fill("orange");
  text(percent, 110, 20 + 10);
  //text("cos(" + angle + "°) = " + percent, 10, 20 + 10);

  translate(width / 2, height * 0.8);

  push(); //--------------------------------- draw polar graph
  for (let i = 0; i < 180; i++) {
    push();
    rotate(radians(i));
    let p = Math.cos(radians(i - 90));
    let hue = map(p, 0.0, 1.0, 50, 20);

    strokeWeight(1);
    stroke(47, 100, 100, 20);
    line(height * -0.5 * 0.75, 0, height * -0.5 * 1.0, 0);
    stroke(47, 100, 100, 10);
    line(height * -0.5 * 0.5, 0, height * -0.5 * 0.75, 0);
    stroke(47, 100, 100, 15);
    line(height * -0.5 * 0.25, 0, height * -0.5 * 0.5, 0);
    stroke(47, 100, 100, 5);
    line(height * -0.5 * 0.0, 0, height * -0.5 * 0.25, 0);

    pop();
  }
  pop();
  
  push(); //--------------------------------- draw polar graph
  for (let i = 0; i < 180; i+=2) {
    push();
    rotate(radians(i));
    let p = Math.cos(radians(i - 90));
    let hue = map(p, 0.0, 1.0, 50, 20);

    strokeWeight(2);//map(p, 0.0, 1.0, 0.5, 5.0));
    stroke(30, 100, 100, 20);
    let max = map(p, 0.0, 1.0, 0, height * -0.5);
    line(0, 0, max, 0);
    pop();
  }
  pop();

  strokeWeight(1);
  stroke("dodgerblue");
  noFill();
  if (radians(a) > 0.2)
    arc(0, 0, height * 1.2, height * 1.2, -PI / 2, radians(a) - PI / 1.8);
  if (radians(a) < -0.2)
    arc(0, 0, height * 1.2, height * 1.2, radians(a) - PI / 2.2, -PI / 2);

  push(); //--------------------------------- draw sun angle
  rotate(radians(a / 2));
  translate(0, -height * 0.59);
  rotate(radians(-a / 2));

  textSize(15);
  strokeWeight(15);
  stroke("white");
  fill("dodgerblue");
  textAlign(CENTER);
  text(a + "°", 0, 0);
  pop();

  push(); //--------------------------------- draw panel power bar
  rotate(radians(a));
  let max = map(percent, 0.0, 1.0, 0, height * -0.5);

  stroke("dodgerblue");
  strokeWeight(1);
  line(0, 0, 0, height * -0.5 - 3);

  stroke("white");
  strokeWeight(10);
  line(0, height * -0.0, 0, max);

  strokeWeight(4);
  stroke("orange");
  line(0, height * -0.0, 0, max);

  translate(0, height * -0.6);
  rotate(radians(-a));
  textSize(height / 10);
  textAlign(CENTER);
  text("🌞", 0, height / 30);
  pop();

  push(); //--------------------------------- draw panel power text
  let aoff = 13.0;
  if (a > 0) aoff *= -1;

  //rotate(radians(a + aoff));
  //translate(2*aoff*(1-percent), max*0.75);
  //rotate(radians(-a - aoff));

  textSize(15);
  noStroke();
  //strokeWeight(15);
  //stroke('white');
  fill("orange");
  textAlign(CENTER);
  text(int(cos(radians(a)) * 100) + "%", 0, 40);
  pop();

  push(); //--------------------------------- draw panel
  stroke("blue");
  strokeWeight(5);
  line(-height * 0.1, 10, height * 0.1, 10);
  pop();
}

function mouseWheel(event) {
  //print(event.delta+' > '+a);
  a += event.delta;
  a = constrain(a, -90, 90);
}
