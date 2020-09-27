var PLAY = 1;
var END = 0;
var gameState = PLAY;


var trexImg, trex,trex_collided;
var backgroundImg, background,background2 ;

var changer ,obstacle,obstacleimage,obstacleimage2 , obstacle1,obstacle2,obstacle3,obstacle4,obstacleimage3,obstacleimage3;

var invisibleGround;

var jumpSound ,coinsound,oversound,diesound;


var score=0;
var point=0;
var star,starI,stargroup;
var gameOver, restart;


function preload(){

   trexImg = loadAnimation("Sonic master.gif");
  trex_collided = loadAnimation("standing sonic.png");
  
  
  
  
    jumpSound = loadSound("maro-jump-sound-effect_1.mp3")
  coinsound = loadSound("mario sound.mp3");
  oversound= loadSound("mario_pipe_sound_sms.mp3");
  diesound= loadSound("mario_bros_die.mp3");
  
  
  groundImg= loadImage("Background.jpg");
  
  backgroundImg= loadImage("Background3.png");

  obstacleimage= loadImage("Gif2.gif");

  obstacleimage2= loadImage("Bullet.png");

  airgroundI= loadImage("Air Ground.png");

  obstacleimage3= loadImage("Gomba3.png");

  starI= loadImage("Star.png");

   gameOverImg = loadImage("Gameover-1.png");
  restartImg = loadImage("restart.png");
  
  
  stargroup = new Group();
  obgroup1 = new Group();
  obgroup2 = new Group();
  obgroup3 = new Group();
  
  
}

function setup() {
 
   createCanvas(windowWidth,windowHeight);

   background  = createSprite(200,200)
  background.addImage("running", groundImg)
  
  background.velocityX = -7;
  background .scale= 4.7;
  background.x = background.width/2;
  
   background2  = createSprite(800,100)
  //background2.addImage("running",  backgroundImg)
  
  background2 .scale= 0.9;
  
  invisibleGround = createSprite(width/2,height-50,width,10)
   invisibleGround.visible = false;
  
 
  trex = createSprite(50,height-70)
  trex.addAnimation("running", trexImg)
  //trex.velocityX = 3;
  trex.scale= 0.2;
  
   changer = createSprite(600,500,14,800)
 
changer.visible = false;
 
  obstacle = createSprite(350,550)
 obstacle.addImage("running",  obstacleimage)
  obstacle.velocityX = -3;
  obstacle.scale= 0.2;
  
    gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.3;
  restart.scale = 0.5;
 gameOver.visible = false;
  restart.visible = false;
  
 
  trex.setCollider("circle",0 ,66,150)
  
  
  score = 0;
 point = 0;
   
}

function draw() {
 
    if(gameState===PLAY){
                  
   score = score + Math.round(getFrameRate()/60); 
 
     if (background2.x < 0){
      background2.x = background.width/1;

  }
  if (background.x < 0){
      background.x = background.width/1;

  }
  
  
  
  
     
     changer.velocityX = -4;
     
   if ( stargroup.isTouching ( trex)){
    
    point = point+1; 
   stargroup.destroyEach();
   coinsound.play();
   }
     
  if (trex.isTouching (  changer )){
  
  background2.addImage("running",  backgroundImg)
  background2.velocityX = -8 ;
  
  }
  
  
  
  if((touches.length >0 || keyDown("space")) && trex.y >= 330) {
      trex.velocityY = -12;
    }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if( keyDown("up_Arrow")&& trex.y >= 330)  {
      trex.velocityY = -12;
    }
  trex.velocityY = trex.velocityY + 0.8
  
  
  
  trex.collide(invisibleGround);
   
  if (obgroup3.collide(trex)){
      diesound.play()
       
      gameState = END
      
      }
  if (obgroup2.collide(trex)){
       diesound.play()
      gameState = END
      
      }
     if (obgroup1.collide(trex)){
       
      diesound.play()
      gameState = END
      
      }
  
   
    if(score>0 && score%100 === 0){
       oversound.play();
    
    }
  
  
  
  if (obstacle.collide(trex)){
      diesound.play()
      
      gameState = END
      
      }
  
  
  
  }
  
  
  if (gameState === END) {
  
  score = 0;
    point = 0;
   
    background2 .velocityX = 0;
       background.velocityX = 0;
  trex.velocityY = 0;
    
    obgroup3.setVelocityXEach(0);
       obgroup2.setVelocityXEach(0);
    obgroup2.setVelocityYEach(0);
     stargroup.setVelocityXEach(0);
  changer.velocityX = 0;
    
    
    stargroup.setLifetimeEach(-1);
obgroup1.setLifetimeEach(-1);
 obgroup2.setLifetimeEach(-1);
  obgroup3.setLifetimeEach(-1);
    
       gameOver.visible = true;
  restart.visible = true;
    
  stargroup.destroyEach();
obgroup1.destroyEach();
 obgroup2.destroyEach();
  obgroup3.destroyEach();
    obstacle.destroy();
    
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
   starG();
  spawnObstacles2() ;
  spawnObstacles();
  spawnObstacles3() 
  drawSprites();
 
  stroke("black")
  textFont(BOLD);
  fill(rgb(150, 75, 15))
textSize (20);
  text("Score: "+ score, 500,50);
  text("POINT : "+ point, 200,50);
}


function spawnObstacles() {
    if(frameCount % 400 === 0) {
    
    
     
  obstacle = createSprite(width-20,height-65,10,40)
 obstacle.addImage("running",  obstacleimage)
  obstacle.velocityX = -( 9+ 3 * score/200);
  obstacle.scale= 0.2;
  obstacle.lifetime = 300;
    
     obgroup2.add(obstacle)
    
    
    }
}

function spawnObstacles2() {
    if(frameCount % 150 === 0) {
    
    
     
  obstacle1 = createSprite(width-20,height-65,10,40)
 obstacle1.addImage("running",  obstacleimage2)
  obstacle1.velocityX = -(8+ 2 * score/100);
  obstacle1.scale= 0.2;
  obstacle1.lifetime = 300;
    obstacle1.y = Math.round(random(200,400))
    
    
    
     obgroup2.add(obstacle1)
    }
}

function spawnObstacles3() {
    if(frameCount % 100 === 0) {
    
         
  obstacle2 = createSprite(width-20,height-65,10,40)
 obstacle2.addImage("running",  obstacleimage3)
  obstacle2.velocityX = -(10+ 2 * score/100);
  obstacle2.scale= 0.1;
  obstacle2.lifetime = 300;
  
     obgroup3.add(obstacle2)
    
    }
}

function starG() {
    if(frameCount % 250 === 0) {
    
         
  star = createSprite(600,550)
 star.addImage("running",  starI)
  star.velocityX = -6;
  star.scale= 0.1;
  star.lifetime = 300;
   star.y = Math.round(random(300,450))
    
      stargroup.add(star)
    
    }
}


function reset(){
  
  
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
 
  background.velocityX = -7;
  background2.velocityX = -7;

 
   
}

