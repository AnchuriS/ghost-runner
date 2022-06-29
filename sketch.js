

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleGroup, invisible;
var gameState = "play"
var barrier;
var barrier2;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  barrier = createSprite(50,100,80,1000);
  barrier2= createSprite(550,100,80,1000);
  barrier.visible = false;
  barrier2.visible=false;
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }

    if(ghost.isTouching(barrier)|| ghost.isTouching(barrier2)){
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("red");
    fill("green");
    textSize(45);
    text("Game Over", 225,250)
  }

}

function spawnDoors() {
  
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisible = createSprite(200,15);
    invisible.width = climber.width;
    invisible.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisible.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisible.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisible.lifetime = 800;

    
    
    doorsGroup.add(door);
    invisible.debug = false;
    climbersGroup.add(climber);
    invisibleGroup.add(invisible);
  }
}