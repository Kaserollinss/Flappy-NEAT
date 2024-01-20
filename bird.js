class Bird {
  constructor(decisionMaker) {

    if (decisionMaker instanceof NeuralNetwork) {
      this.decisionMaker = decisionMaker.copy();
    } else {
      this.decisionMaker = new NeuralNetwork(3, 5, 2);
    }


    this.x = width / 3;
    this.y = height / 2;
    this.velocity = 0;
    this.gravity = 0.5; 
    this.flapHeight = -10; // how high the bird goes each flap
    this.flaps = [birdU, birdM, birdD]; // 3 images for flap animation cycle. See sketch.js lines 9-11
    this.alive = true;
    this.tilt = 45;
    this.h = 24;
    this.w = 34;
    this.score = 0
    this.fitness = 0;
  }

  decide(pipes){
    let inputs = []
    if (pipes.length != 0){
      //inputs[0] = map(this.x, this.x, width, -1, 1);
      inputs[0] = map(pipes[0].topCorner, 0, height, -1, 1);
      inputs[1] = map(pipes[0].bottomY, 0, height, -1, 1);
      inputs[2] = map(this.y, 0, height, -1, 1);
      //inputs[4] = map(this.velocity, -5, 5, 0, 1);
      let decision = this.decisionMaker.predict(inputs);

      //console.log(decision)
      //console.log(inputs)
      //console.log(decision[0], decision[1])

      if (decision[0] > decision[1] && this.velocity >= 0 ) {
        this.flap();
      }
    } else {
      if (counter % 15 == 0 && counter != 0) {
        this.flap();
      }
    }
  }


  copy() {
    return new Bird(this.decisionMaker);
  }

  mutate() {
    this.brain.mutate(0.1);
  }



  show() { 
    if (this.alive) {
      this.animate();
    } else {
      this.death();
    }
  }

  update() {
    if (this.velocity < -10) {
      this.velocity = -10;
      this.y += this.velocity;

    } else {
      this.y += this.velocity;
    }
    this.score += 1
    this.velocity += this.gravity;

  }

  flap() {
    this.velocity += this.flapHeight;
  }

  animate() {  
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    if (this.velocity < 0) {  // controls the angle of the bird based on its velocity 
      rotate(-this.tilt);
    } else {
      rotate(this.tilt);
    }
    image(this.flaps[animateFrame], 0, 0, this.w, this.h);
    pop();

   // controls the speed of the "flap" animation
    if (frameCount % 5 === 0) {
      animateFrame++;
      if (animateFrame == 3) { // cycles through the 3 images in this.flaps
        animateFrame = 0;
      }
    }
  }
}
