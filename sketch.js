var ghost, ghostAnimation;
var climber,climberImage;
var door, doorImage;

var climberGroup, glassGroup;
var tower, towerImage;
var state = "play";


function preload(){
  ghostAnimation = loadAnimation("ghost-standing.png");
  towerImage = loadImage("tower.png");
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png")
  
}
function setup(){
  createCanvas(600,800);
  ghost = createSprite(300,600,30,40);
  ghost.addAnimation("standing",ghostAnimation);
  ghost.scale = 0.5;
  
  tower = createSprite(300,400,600,800);
  tower.depth = ghost.depth - 1;
  tower.addImage(towerImage)
  tower.velocityY = 3;
  
  climberGroup = new Group();
  doorGroup = new Group();
  
  spawnClimber();
  
 
}
function draw(){
  background("white");
 drawSprites(); 
  if(state === "play"){
  if(tower.y > 500){
    tower.y = 300;
  }
  if(keyDown("space")){
    if(state === "play"){
    ghost.velocityY = -12;
    }
  }
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 10;
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 10;
  }

  ghost.velocityY = ghost.velocityY + 0.8;
  if(frameCount%140 === 0){
    spawnClimber();
  }
  }
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
    tower.velocityY = 0;
    climberGroup.setVelocityYEach(0)
    state = "end"
  }
    
}
function spawnClimber(){
  climber = createSprite(Math.round(random(200,400)),0,30,40);
  climber.velocityY = 3;
  climber.addImage(climberImage);
  climberGroup.add(climber)
  
  door = createSprite(climber.x,climber.y - 76,30,40);
  door.velocityY = 3;
  door.addImage(doorImage);
  doorGroup.add(door);
  
  climber.depth = ghost.depth - 1;
  door.depth = climber.depth;
}
