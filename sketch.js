let panSpeed = 3;
let animateFrame = 0;
let pipes = [];
let birds = [];
let activeBirds = [];
let counter = 0;
const generationSize = 750;
let scoreLimit = 10000;
let bestScore = 0;
let generationCounter = 0;

function preload() {
  // Preload all game sprites
  bg = loadImage("sprites/background-day.png");
  groundSprite = loadImage("sprites/base.png");
  birdU = loadImage("sprites/yellowbird-upflap.png");
  birdM = loadImage("sprites/yellowbird-midflap.png");
  birdD = loadImage("sprites/yellowbird-downflap.png");
  bottomPipe = loadImage("sprites/pipe-green.png");
  topPipe = loadImage("sprites/top-pipe-green.png");
  //endSprite = loadImage("sprites/gameover.png");
  //scorePage = loadImage("sprites/scorePage.png");
  //message = loadImage("sprites/message.png");

}
function setup() {
  createCanvas(400, 600);
  angleMode(DEGREES);
  textSize(40)
  setupCanvas();



  ground = new Ground();
}

function setupCanvas() {
  for (let i = 0; i < generationSize; i++) {
    birds[i] = new Bird();
    activeBirds[i] = birds[i].copy();
  }
  
  pipes.push(new Pipes())

}

function draw() { // Game loop

  background(bg);

  if (frameCount % 100 == 0 && frameCount != 0) {
    pipes.push(new Pipes());
  }

  for (let i = 0; i < pipes.length; i++) {

    if (pipes[i].checkOnScreen() === false){
      pipes.splice(i, 1)
    }
    pipes[i].show();
    pipes[i].update();



    //pipes[i].passes(bird);
    for (let j = 0; j < activeBirds.length; j++) {
      if (pipes[i].hit(activeBirds[j]) || activeBirds[j].y + activeBirds[j].w / 2 > 470) {
        activeBirds[j].y = (height - 120) - activeBirds[j].w / 2;
        activeBirds[j].velocity = 0
        activeBirds.splice(j, 1)
      }

    }

  }
  for (let bird of activeBirds) {
    bird.tilt = 45;
    bird.show();
    bird.update();
    bird.decide(pipes)

    if (bird.score == scoreLimit) {
      let div = createDiv('----Reached score 10k---- ').size(400, 100);
      div.html('bestScore reached at generation:' + generationCounter, true);
      noLoop();
    }
    if (activeBirds.length == 1) {
      if (bird.score > bestScore) {
        bestBird = bird.copy();
        bestScore = bird.score;
        //bestScoreSpan.html(bestScore);
      }
    }


  }

  if (activeBirds.length === 0) {
    endGame()
  }


  ground.show();
  ground.update();

  //endGame();
} 

function endGame() {
  createGeneration();
  generationCounter++;
  setupCanvas();
}
