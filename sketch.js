var firework = []
// var flames = []
var g
var k

window.addEventListener('resize', ()=>{resizeCanvas(windowWidth, windowHeight);});

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  g = 0.25;
  k = 0.01;
  a = new OBJ();
}

function draw() {
  background(8,0.4);
  for (let f of firework) {
      gravity = createVector(0, g * f.m)
      f.applyForce(gravity);
      let resistance = f.v.copy().mult(f.v.mag()).mult(-k);
      f.applyForce(resistance);
      f.update();
      f.render();
      f.edge();

      // console.log(f.flames.length)

    if (f.flames.length > 0){
      // console.log(f.flames)
      for (let fl of f.flames) {
        gravity = createVector(0, g * fl.m)
        fl.applyForce(gravity);
        let resistance = fl.v.copy().mult(fl.v.mag()).mult(-k);
        fl.applyForce(resistance);
        fl.update();
        let alphaOffset = noise(fl.pos.x+fl.pos.y) -0.5
        // console.log(fl.fuse);
        fl.c.setAlpha(Math.pow(fl.fuse/100,3)+ alphaOffset);
        fl.render();
        fl.edge();
    }
}
}
}

function mousePressed() {
  firework.push(new OBJ(mouseX, height - 30));
  let ignition = createVector(random(-width/16,width/16), random(100 - height/2 ,150 - height/2));
  firework[firework.length - 1].applyForce(ignition);

  // command ignite
  // if (firework.length >= 2 && firework[firework.length - 2].didExplode == false) {
  //   firework[firework.length - 2].explode();
  // }
}

class OBJ {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.v = createVector(0, 0);
    this.a = createVector(0, 0);
    this.m = 10
    this.didExplode = false;
    this.fuse = random(50,80);
    this.c = color(random(300,360),85,90)
    this.flames = []
  }

  applyForce(force) {
    //f = ma
    let f = p5.Vector.div(force, this.m);
    this.a.add(f);
  }

  explode() {
    // let flames = [];
    this.didExplode = true;
    this.c = color(0,0.2);
    //
    let n = []
    let _sum = 0
    while (_sum < 1) {
      let a = random(0.2);
      _sum += a;
      n.push(_sum);
    }
    //
    this.flameV = [];
    this.flamePos = [];
    let _c = color(random(60,300),85,90);
    for (let i = 0; i < n.length; i++) {
      this.flameV[i] = p5.Vector.fromAngle((n[i] * 2 * PI), 10);
      this.flamePos[i] = p5.Vector.add(this.pos, this.flameV[i]);
      this.flames[i] = new OBJ(this.flamePos[i].x,this.flamePos[i].y);
      this.flames[i].v = this.flameV[i].copy();
      this.flames[i].didExplode = true;
      this.flames[i].c = _c;
      this.flames[i].m = this.m/n.length
      this.flames[i].fuse = 100
    }
    this.dismiss();
  }

  update(f) {
    this.v = this.v.add(this.a);
    this.pos = this.pos.add(this.v);
    this.a.mult(0);
    // console.log(this.didExplode);
    if (this.fuse <= 0 && this.didExplode != true) {
    // if (this.fuse <= 0 ) {

      this.explode()

    }
    if (this.fuse > 0) {this.fuse--;}
  }

  dismiss() {
    // this.c = color(0,0)
    // delete object[this];
  }
  render() {
    fill(this.c)
    ellipse(this.pos.x, this.pos.y, Math.pow(this.m,0.2)*7);
  }

  edge() {
    // if (this.pos.x > width - 5) {
    //   this.pos.x = width - 5;
    //   this.v.x *= -1;
    // } else if (this.pos.x < 5) {
    //   this.v.x *= -1;
    //   this.pos.x = 5;
    // }
    if (this.pos.y > height - 5) {
      this.dismiss();
      //   this.v.y *= -1;
      //   this.pos.y = height - 5;

    }
  }

}

class fires extends OBJ {
  constructor() {
    super();
  }






}
