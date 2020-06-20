var monkey,monkeyImg,bananaImage,obstacleImage,obstacleGroup,
    bananaGroup,scene, sceneImg,invisibleGround,score;




function preload(){
 sceneImg=loadImage("jungle.jpg");
  
monkeyImg=loadAnimation("Monkey_01.png","Monkey_02.png",       "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png",                   "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImg=loadImage("Banana.png");
  obstacleImg=loadImage("stone.png");
}


function setup() {
  createCanvas(600,600);
  scene=createSprite(300,300,50,50);
  scene.addImage("scene",sceneImg);
  scene.scale=1.1;
  scene.velocityX=-8;
  
  invisibleGround = createSprite(300,485,600,15);
invisibleGround.visible = false;
  
  monkey=createSprite(60,420,20,20);
  monkey.addAnimation("monkey",monkeyImg);
  monkey.scale=0.2;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
  score=0;
}


function draw(){
 background(255); 
  
   if (scene.x < 0){
     scene.x = scene.width/2;
    }
  
    if (keyDown("space")&&monkey.y>=360) {
      monkey.velocityY=-12;
    }
   monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(invisibleGround);
  
  if (bananaGroup.isTouching(monkey)){
    score=score+2;
    bananaGroup.destroyEach();
  }
  
  if (obstacleGroup.isTouching(monkey)){
    monkey.scale=0.2;
  }
  
  switch(score){
    case 10: monkey.scale=0.4;
      break;
    case 20: monkey.scale=0.6;
      break;
    case 30: monkey.scale=0.8;
      break;
    case 40: monkey.scale=0.10;
    default:break;
    
  }
    
    
  drawSprites();
  fill("white");
  textSize(25);
  text("Score:"+score,450,20);
  spawnBanana();
  spawnObstacle();
}

function spawnBanana() {
if (World.frameCount%80===0) {
   var banana=createSprite(600,random(200,320),10,10);
  banana.addImage("Banana",bananaImg);
  banana.scale=0.1;
  banana.velocityX=-5;
  bananaGroup.add(banana);
  banana.lifetime=120;
  }
}

function spawnObstacle() {
if (World.frameCount%300===0) {
   var stone=createSprite(500,450,10,10);
    stone.addImage("Stone",obstacleImg);
    stone.scale=0.2;
    stone.velocityX=-5;
    obstacleGroup.add(stone);
    stone.lifetime=100;
   
  }
}  
