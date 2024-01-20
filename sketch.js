// implement universal multiplier

let panSpeed = 4;
let passedPipe;
let pipes = [];
let birds = [];
let activeBirds = [];
let counter = 0;

const generationSize = 200;
let speedMultiplier = 1


let allTimeBest = 0;
let genBest = 0;
let genCounter = 0;
let birdScore = 0;
let genBestPipes = 0;
let allTimeBestPipes = 0;


let activeBirdsSpan;
let genCounterSpan;
let genBestSpan;
let allTimeBestSpan;
let genBestPipesSpan;
let allTimeBestPipesSpan

function preload() {
  // Preload all game sprites
  bg = loadImage("sprites/background-day.png");
  groundSprite = loadImage("sprites/base.png");
  birdU = loadImage("sprites/yellowbird-upflap.png");
  birdM = loadImage("sprites/yellowbird-midflap.png");
  birdD = loadImage("sprites/yellowbird-downflap.png");
  bottomPipe = loadImage("sprites/pipe-green.png");
  topPipe = loadImage("sprites/top-pipe-green.png");


}
function setup() {
  let cnvs = createCanvas(400, 600);
  cnvs.parent('canvas-container');
  angleMode(DEGREES);
  textSize(40)
  setupCanvas();

  activeBirdsSpan = select('#sb');
  genCounterSpan = select('#gen');
  genBestSpan = select('#ghs');
  allTimeBestSpan = select('#ahs');
  genBestPipesSpan = select('#gbp')
  allTimeBestPipesSpan = select('#atbp')

  ground = new Ground();
}

function setupCanvas() {
  for (let i = 0; i < generationSize; i++) {
    birds[i] = new Bird();
    activeBirds[i] = birds[i].copy();
  }

  pipes.push(new Pipes())

}

function draw() {

  background(bg);

  for (let i = 0; i < pipes.length; i++) {
    if (pipes[i].passed) {
      passedPipe = pipes[i]
      pipes.splice(i, 1)
      pipes.push(new Pipes())
    }

    pipes[i].show();
    pipes[i].update();



    for (let j = 0; j < activeBirds.length; j++) {

      pipes[i].passes(activeBirds[j]);

      if (pipes[i].hit(activeBirds[j]) || activeBirds[j].y + activeBirds[j].w / 2 > 470) {
        activeBirds[j].y = (height - 120) - activeBirds[j].w / 2;
        activeBirds[j].velocity = 0;
        activeBirds.splice(j, 1);

      }
      activeBirdsSpan.html(activeBirds.length);



    }

  }
  if (passedPipe) {
    passedPipe.show()
    passedPipe.update()
  }


  for (let bird of activeBirds) {
    bird.tilt = 45;
    bird.show();
    bird.update();
    bird.decide(pipes)


    if (bird.score > allTimeBest) {
      bestBird = bird.copy();
      allTimeBest = bird.score;
      allTimeBestPipes = bird.pipesPassed
      allTimeBestSpan.html(allTimeBest);
      allTimeBestPipesSpan.html(allTimeBestPipes)

    }


    if (bird.score > genBest) {
      genBest = bird.score
      genBestPipes = bird.pipesPassed


    }


    genBestSpan.html(genBest)
    genBestPipesSpan.html(genBestPipes)

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
  genCounter++;
  genCounterSpan.html(genCounter);
  genBest = 0
  genBestPipes = 0


  setupCanvas();
}
