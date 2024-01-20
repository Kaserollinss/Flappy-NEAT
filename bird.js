class Bird {
  constructor(brain) {

    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(3, 5, 2); // input, hidden, output
    }


    this.x = width / 3;
    this.y = height / 2;
    this.velocity = 0;
    this.gravity = 0.5;
    this.flapHeight = -10; // how high the bird goes each flap
    this.flaps = [birdU, birdM, birdD]; // 3 images for flap animation cycle. See sketch.js lines 9-11
    this.tilt = 45;
    this.h = 24;
    this.w = 34;
    this.score = 0
    this.fitness = 0;
    this.pipesPassed = 0;
  }

  decide(pipes) {
    let inputs = []
    if (pipes.length != 0) {
      inputs[0] = map(pipes[0].topCorner, 0, height, -1, 1);
      inputs[1] = map(pipes[0].bottomY, 0, height, -1, 1);
      inputs[2] = map(this.y, 0, height, -1, 1);
      let decision = this.brain.predict(inputs);


      if (decision[0] > decision[1] && this.velocity >= 0) {
        this.flap();
      }
    } else {
      if (counter % 15 == 0 && counter != 0) {
        this.flap();
      }
    }
  }


  copy() {
    return new Bird(this.brain);
  }

  mutate() {
    this.brain.mutate(0.1);
  }



  show() {
    this.animate();
  }

  update() {
    if (this.velocity * speedMultiplier < -10 * speedMultiplier) {
      this.velocity = -10 * speedMultiplier;
      this.y += this.velocity * speedMultiplier;

    } else {
      this.y += this.velocity * speedMultiplier;
    }
    this.score += 1 * speedMultiplier
    this.velocity += this.gravity * speedMultiplier;

  }

  flap() {
    this.velocity += this.flapHeight;
  }

  animate() {
    let animateFrame = 0
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
