var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var GameOver,restart,restartImage,GameoverImage

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var PLAY = 1
var END = 0
var gamestate = PLAY


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  GameoverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  trex.debug = false;
  trex.setCollider("circle",0,0,40)
  
  ground = createSprite(width/2,height,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  
  console.log("Hello" + 5);
  
  score = 0;
  obstaclesGroup = new Group()
  cloudsGroup = new Group()
  GameOver = createSprite(width/2,height/2-50,15,15)
  GameOver.addImage(GameoverImage)
  restart = createSprite(width/2,height/2,5,5)
  restart.scale = 0.4
  GameOver.scale = 1.5
  restart.addImage(restartImage)

}

function draw() {
  background(180);
  if(gamestate == PLAY){
    score = score + Math.round(frameCount/60);
    if(keyDown("space")&& trex.y >= height-120) {
      trex.velocityY = -13;
    }
    trex.velocityY = trex.velocityY + 0.8
    ground.velocityX = -(6+score/100);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds();
    spawnObstacles();
    GameOver.visible = false
    restart.visible = false
    if(trex.isTouching(obstaclesGroup)){
      gamestate = END
    }
  }
  else if(gamestate == END){
 ground.velocityX = 0
 trex.velocityY = 0
 cloudsGroup.setVelocityXEach(0)
 obstaclesGroup.setVelocityXEach(0)
 cloudsGroup.setLifetimeEach(-1) 
 obstaclesGroup.setLifetimeEach(-1) 
GameOver.visible = true
restart.visible = true
  }
  if (mousePressedOver(restart)){
    reset()
  }
  text("Score: "+ score, width-100,height-900);
  
  

  
  

  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  //spawn obstacles on the ground
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(width+100,height-20,10,40);
   obstacle.velocityX = -(6+score/100);

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 1000;
    obstaclesGroup.add(obstacle)
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(width+100,100,40,10);
    cloud.y = Math.round(random(height-500,height-300));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    cloudsGroup.add(cloud)
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function reset(){
  gamestate = PLAY
  GameOver.visible = true
  restart.visible = true
  score = 0 
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  
}