var background1,backimage,monkey,monkeyimage,bananaimage;
var invisibleGround,score,bananaGroup;
var obstaclesimage,obstaclesGroup,jumpsound,diesound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restartimage,gameoverimage,outmonkey;

function preload(){
  backimage = loadImage("back.jpg");
  monkeyimage = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaimage = loadImage("banana.png");
  obstaclesimage = loadImage("obstacle.png");
   jumpsound = loadSound("kap.mp3");
   diesound = loadSound("die.mp3");
  gameoverimage = loadImage("gover.jpg");
  restartimage = loadImage("restart.jpg");
  outmonkey = loadAnimation("unnamed.jpg")
}



function setup() {
  createCanvas(600, 400);
//creating background
  background1 = createSprite(0,0,600,600);
  background1.addImage(backimage);
  background1.scale = 2;
//creating monkey
  monkey = createSprite(60,250,20,50);
  monkey.addAnimation("monkey",monkeyimage);
  monkey.scale = 0.15;
 //creating invisible ground
  invisibleGround = createSprite(500,400,5001); 
  invisibleGround.visible = false;
//creating groups
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
//gameover and restart
 gameover = createSprite(300,100);
  gameover.addImage(gameoverimage);
   restart = createSprite(100,140);
  restart.addImage(restartimage);
  restart.scale = 0.4;
  score = 0;
}


function draw() {
  background("white");
 
  if(gameState === PLAY){
    gameover.visible = false;
    restart.visible = false;
//jungle moving
  background1.velocityX = -3;
     score = score + Math.round(getFrameRate()/60);
  if (background1.x < 0){
      background1.x = background1.width/2;
    }
//giving scores
   
//making the monkey jump  
  if(keyDown("Space")) {
        monkey.velocityY = -12;
        jumpsound.play();
    }
//function
  spawnbanana();
  spawnobstacles();
    
//monkey is feed
    if (bananaGroup.isTouching(monkey)){
      score = score+6;
    }
//monkey is out
   if(obstaclesGroup.isTouching(monkey)){  
     gameState = END;
     diesound.play();
     obstaclesGroup.destroyEach();
     bananaGroup.destroyEach();
    
   } 
}
  
 else if (gameState === END) {
  gameover.visible = true;
    restart.visible = true; 
  background.velocityX = 0;
      monkey.velocityY = 0;
    monkey.changeAnimation("out", outmonkey);
 }
  

//add gravity
    monkey.velocityY = monkey.velocityY + 0.8  

//adding coolider   
  monkey.collide(invisibleGround); 


drawSprites();
  text("score: "+ score, 100,20); 
}

function spawnbanana(){
  if (frameCount % 100 === 0){
  var banana = createSprite(400,120,40,10);
  banana.y = Math.round(random(80,120));
  banana.addImage(bananaimage);
  banana.scale = 0.1 
  banana.velocityX = -1;
  banana.lifetime = 300;  
//giving depth for banana and monkey  
  banana.depth = banana.depth;
  monkey.depth = monkey.depth + 1; 
  bananaGroup.add(banana);
}
}

function spawnobstacles(){
  if (frameCount % 85 === 0){
  var obstacles = createSprite(500,330,10,40);
  obstacles.velocityX = -6;
  var rand = Math.round(random(1,6));
  obstacles.addImage(obstaclesimage);
  obstacles.scale = 0.1; 
  obstacles.lifetime = 90; 
  obstaclesGroup.add(obstacles);  
  }
}

