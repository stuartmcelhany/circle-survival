const obstacles = [];
var player;
var gameState = false;
var score = 0;
var hiScore = 0;
var numPlays = 0;

function checkCollision(obs, plr) {
  if (dist(obs.x, obs.y, plr.position.x, plr.position.y) > (obs.size/2+plr.size/2)) {
    return false;
  } else {
    console.log(obs.size);
    console.log(plr.size);
    console.log(dist(obs.x, obs.y, plr.position.x, plr.position.y));
    return true;
  }
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  background(255, 0, 93);

  player = new Player();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  gameState = true;
  numPlays++;
}

function spawnObstacle() {
  let randNum = floor(random(4));
  switch (randNum) {
    case 0:
      obstacles.push(new Obstacle(0, random(windowHeight), random(), random(-1, 1)));
      break;
    case 1:
      obstacles.push(new Obstacle(windowWidth, random(windowHeight), -random(), random(-1, 1)));
      break;
    case 2:
      obstacles.push(new Obstacle(random(windowWidth), 0, random(-1, 1), random()));
      break;
    case 3:
      obstacles.push(new Obstacle(random(windowWidth), windowHeight, random(-1,1), -random()));
      break;
    default:
      break;
  }
}

function endGame() {
  obstacles.splice(0, obstacles.length);
}

function draw() {
  background(255, 0, 93);
  textSize(32);
  textAlign(RIGHT, TOP);
  fill(255);
  text(score, windowWidth / 2, windowHeight / 2, windowWidth/2, windowHeight/2);
  text(hiScore, windowWidth / 2, windowHeight / 2 + 35, windowWidth/2, windowHeight/2);

  if (!gameState && numPlays === 0) {
    textSize(32);
    textAlign(CENTER);
    fill(255);
    text('Click to start', windowWidth / 2, windowHeight / 2);
  } 
  else if (!gameState && numPlays != 0) {
    textSize(32);
    textAlign(CENTER);
    fill(255);
    if (score > hiScore) {
      hiScore = score;
    }
    score = 0;
    text('Game over, click to restart', windowWidth / 2, windowHeight / 2);
  } else {
    let randNum = floor(random(5)); // change rate of spawn here
    if (randNum === 0){
      spawnObstacle();
      score++;
    }
  }

  player.update();
  player.show();

  for (let i = 0; i < obstacles.length; i++) {
    if (checkCollision(obstacles[i], player)){
      endGame();
      gameState = false;
    } else {
      obstacles[i].update();
      obstacles[i].show();
    }

    if (obstacles.length){
      if (obstacles[i].x > (windowWidth + 100) || obstacles[i].x < -100 || obstacles[i].y < -100 || obstacles[i].y > (windowHeight + 100)) {
        delete obstacles[i];
        obstacles.splice(i, 1);
        (i != 0) ? i-- : i;
      }
    }
  }
}