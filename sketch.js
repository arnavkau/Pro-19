var PLAY = 1
var END = 0
var gameState = PLAY;
var runner, runner_running;
var missile, missilesGroup, missileImg;
var explosionImg;
var grass, grassImg;
var ground, groundImg;
var invisibleGround;
var deathSound;
var score = 0;


function preload()
{
runner_running = loadAnimation("runner1.jpeg", "runner2.jpeg", "runner3.jpeg", "runner4.jpeg")
missileImg = loadImage("rocket-png-40794.png")

groundImg = loadImage("ground2.png")
explosionImg = loadImage("explosion.png")
deathSound = loadSound("death sound.mp3.mp3")
}

function setup() 
{
 createCanvas(600, 200)   
 runner = createSprite(60, 160)
 runner.addAnimation("running", runner_running)
 runner.scale = 0.2
 ground = createSprite(200, 180)
 ground.addImage(groundImg)
 ground.x = ground.width/2
 invisibleGround = createSprite(200, 185, 400, 1)
 invisibleGround.visible = false
 runner.debug = true
 runner.setCollider("circle",0,-10,200 )
 missilesGroup = createGroup();
}

function draw() 
{
 background("white")
 text("Score: "+score, 500, 60)

if(gameState === PLAY)
{
    if (frameCount % 80 === 0)
    {
        missile = createSprite(600,165,10,40);
        
        
         missile.velocityX = -(4 + 3* score/100)
        
        missile.addImage(missileImg)
        missile.scale = 0.3
    }

    runner.collide(invisibleGround)
    
    
     ground.velocityX = -(4 + 3* score/100)
     score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0)
    {
        ground.x = ground.width/2;
    }

if(keyDown("space")&& runner.y>120)
{
    runner.velocityY = -14
}

runner.velocityY = runner.velocityY+1.2;
}

if(runner.isTouching(missilesGroup))
{
    deathSound.play();
    text("You lose, any arrow key to restart",300, 100);
    gameState = END;
    runner.changeAnimation(explosionImg);
    ground.velocityX = 0;
    missilesGroup.setVelocityXEach(0);

}
else if(gameState === END);
{
    if(keyDown("right_arrow")||
       keyDown("left_arrow")||
       keyDown("up_arrow")||
       keyDown("bottom_arrow"))
       {
           reset()
       }
}





 missilesGroup.add(missile);

 drawSprites();
 
}

function reset()
{
  
  gameState = PLAY;
  runner.changeAnimation("running", runner_running);
  
  
  missilesGroup.destroyEach();
  
  score = 0;
}