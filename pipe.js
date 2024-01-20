class Pipes {
  constructor() {
    this.pipeGap = -520; // gap between pipes on the same vertical axis
    this.x = width + 0; 
    this.bottomY = random(450, height + this.pipeGap + 75);
    this.topY = this.bottomY + this.pipeGap;
    this.topCorner = this.topY+320
    this.passed = false;
  }
  checkOnScreen() {
    if (this.x < 0 - bottomPipe.width) {
      return false;
    } else {
      return true;
    }
  }
  hit(bird) {
    if (
      bird.x + bird.w / 2 > this.x &&
      bird.x - bird.w / 2 < this.x + bottomPipe.width
    ) {
      if (bird.y + bird.h/2 > this.bottomY || bird.y - bird.h/2 < this.topY + topPipe.height) {
        return true;
      }
    }
    return false;
  }
  passes(bird) {
    if (bird.x > this.x + bottomPipe.width / 2 && this.passed === false) {
      this.passed = true;
      bird.score += 1;
      console.log(bird.score);
    }
  }
  show() {
    image(bottomPipe, this.x, this.bottomY);
    image(topPipe, this.x, this.topY);
    circle(this.x, 475, 10)
  }
  update() { 
    this.x -= panSpeed;

  }
}
