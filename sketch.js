const Engine = Matter.Engine ;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var myEngine, myWorld, ground, box1, box2, box3, box4, box5;
var pig1, pig2;
var log1, log2, log3, log4;
var bird;
var backgroundImage;
var platform1;
var gameState = "onSling";
var score = 0;
//var constrainedLog ;
var slingShot;

function preload() {
//backgroundImage = loadImage("Images/bg.png");
  getBackgroundImage ();
}

function setup() {
  createCanvas(1200,400);
  //getTime ();
  myEngine = Engine.create();
  myWorld = myEngine.world;

  
  // creating all the variables 
  ground = new Ground (600,height,width,20);
  platform1 = new Ground (150,305,300,170);
  box1 = new Box (700,320,70,70);
  box2 = new Box (920,320,70,70);
  pig1 = new Pig (810,350);
  log1 = new Log (810,260,300,PI/2);
  box3 = new Box (700,240,70,70);
  box4 = new Box (920,240,70,70);
  pig2 = new Pig (810,220);
  log2 = new Log (810,180,300,PI/2);
  log3 = new Log (760,120,150,PI/7);
  log4 = new Log (870,120,150,-PI/7);
  box5 = new Box(810,160,70,70);
  bird = new Bird (200,50);
  //constrainedLog = new Log (230,180,80,PI/2);
  slingShot = new SlingShot(bird.body,{x:200, y:50});


}

function draw() {
  if (backgroundImage)
    background(backgroundImage);  
  else 
    background ("yellow");
  Engine.update (myEngine); 
  
  //displaying all the sprites
  box1.display();
  box2.display();
  pig1.display();
  log1.display();
  box3.display();
  box4.display();
  pig2.display();
  log2.display();
  box5.display();
  log3.display();
  log4.display();
  bird.display();
  ground.display();
  platform1.display();
  //constrainedLog.display();
  slingShot.display();
  textSize(30);
  fill("yellow");
  text("SCORE : " + score, width - 300, 50);
}

function mouseDragged(){
  if (gameState == "onSling"){
    Matter.Body.setPosition(bird.body,{x:mouseX, y:mouseY});
  }
}

function mouseReleased(){

  slingShot.release();
  gameState = "launched";

}

function keyPressed (){

  if(keyCode === 32 && bird.body.speed < 1){

    slingShot.attach(bird.body);
    gameState = "onSling";
    //Clearing the trajectory
    bird.trajectory = [];
   //Bringing back the bird into the orginal position
    Matter.Body.setPosition(bird.body,{x:200, y:50});
  }


}
async function getBackgroundImage () {
  var myResponse = await fetch ("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  console.log (myResponse);
  var responseJSON = await myResponse.json ();
  console.log (responseJSON);
  console.log (responseJSON.datetime);
  var hour = responseJSON.datetime.slice(11,13);
  console.log (hour);
  if (hour >= 6 && hour <= 16){
    BG = "images/bg.png";
  }else{
    BG = "images/bg2.jpg";
  }
  backgroundImage = loadImage(BG);
}


