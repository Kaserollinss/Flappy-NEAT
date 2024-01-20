class Ground {
  constructor() {
    this.height = 125;
    this.topPixelCoord = 600 - this.height; // the desired y location of the highest pixel. 600 is canvas.height
    this.pixelOffset = 0; 
  }

  show() {
    for (var i = this.pixelOffset; i < canvas.width; i += groundSprite.width) { 
      image(groundSprite, i, this.topPixelCoord, 0, 130);
    }
  }
// updates the ground sprite so that it is moving at the same speed as the pipes 

  update() {
    this.pixelOffset -= panSpeed;
    if (this.pixelOffset <= -groundSprite.width) {
      this.pixelOffset += groundSprite.width;
    }
  }
}