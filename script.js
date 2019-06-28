var coins = 0;
var onGround = false;
var jump = 0;
var air = 0;
var keer = 0;
let speelspel = false;
var startknop = document.getElementById("startknop");
var shrimpsprite = document.getElementById("shrimpsprite");

var xCloud = 20;
var yCloud = 70;
var xCloud1 = 250;
var xCloud2 = 450;

function setup() {

    createCanvas(innerWidth, innerHeight);
    shrimppic = loadImage("https://cdn.glitch.com/a48cd703-0327-4bd6-bafc-80b9650fddba%2Fshrimpsprite.png?v=1559992100365");
    barrelpic = loadImage("https://cdn.glitch.com/a48cd703-0327-4bd6-bafc-80b9650fddba%2Fbarrel.png?v=1560239712499");
    coinpic = loadImage("https://cdn.glitch.com/a48cd703-0327-4bd6-bafc-80b9650fddba%2Fcoin.png?v=1560240049136")
    var randompos = Math.random(900,1200);
    var randomx = Math.floor(Math.random(150,750));
    var randomxSpeed =  Math.floor(Math.random(5,10) * 10);
    shrimp = new Player(100,10, 40, 50, innerHeight / 1.75, innerWidth+6);
    waterbucket = new Bucket(innerWidth+300,innerHeight /1.75, 30, 5);
    waterbucket2 = new Bucket(innerWidth+innerWidth/1.25 ,innerHeight /1.75, 30, 5);
    coin = new Coin(innerWidth+600,innerHeight / 1.75, 15, 5);
    var aantalcoins = document.getElementById("aantalcoins");
    var aantallevens = document.getElementById("aantallevens");


}
function draw() {
  if(speelspel==true){

  background(66, 134, 244);
  //shrimp.update();
  shrimp.jump();
  waterbucket.display();
  waterbucket.move();
  waterbucket.botsCheck(shrimp);
  waterbucket2.display();
  waterbucket2.move();
  waterbucket2.botsCheck(shrimp);
  coin.display();
  coin.move();
  coin.botsCheck(shrimp);
  shrimp.display();
  backgroundthing();
}
  if (speelspel==false){
    startscherm.innerHTML = "Press S key to start game";
    if (keyIsDown(83)){
      speelspel = true;
      startscherm.innerHTML = "";
    }
    else{
      speelspel=false;
    }
  }


  }
class Player {
  constructor(plHeight, plWidth, radius, xPos, yPos, speed) {
    this.height = plHeight;
    this.width = plWidth;
    this.radius = radius;
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
    this.gravity = 0.1;
    this.gravitySpeed = 0.1;
    this.xSpeed = 10;
    this.ySpeed = 6;
  }
  display(){
    fill(0);
    image(shrimppic, this.xPos - 50, this.yPos - 50,2.5 * this.radius, 2.5 * this.radius);
  }
  jump(){

  if (keyIsDown(38)){
    if ( air == 0){
      jump = 1
      air = 1
    }
  }
  if(jump == 1){
   if (keer < 60){
     this.yPos = this.yPos -this.ySpeed;
     this.ySpeed = this.ySpeed - this.gravity;
     keer += 1
    }
  }
  if(keer == 30){
    this.ySpeed = -this.ySpeed
  }
  if(keer == 60) {
  air = 0;
  jump = 0;
  keer = 0
  this.ySpeed = this.ySpeed * -1;
  this.yPos = this.yPos + this.gravity * 50;
  }
}
   }
class Bucket{
  constructor(x, y, radius, xspd) {
    this.xPos = x;
    this.yPos = y;
    this.radius = radius;
    this.xSpeed = xspd;
  }
  display() {
    noStroke();
    fill(103, 151, 229);
    image(barrelpic, this.xPos, this.yPos - 10,2 * this.radius, 2 * this.radius);


  }

  move() {
    this.xPos -= this.xSpeed;
    if (this.xPos < Math.floor(Math.random(-300,-500))){
       this.xPos = innerWidth+300;
    }
 }
  botsCheck(shrimp) {
    var dx = this.xPos - shrimp.xPos;
    var dy = this.yPos - shrimp.yPos;
    if (sqrt(dx * dx + dy * dy) <= waterbucket.radius + shrimp.radius) {
      document.location.reload();
      clearInterval(interval); // Needed for Chrome to end game

    }
  }
}
class Coin{
  constructor(x, y, radius, xspd) {
    this.xPos = x;
    this.yPos = y;
    this.radius = radius;
    this.xSpeed = xspd;
  }
  display() {
    noStroke();
    fill(232, 217, 90);
    image(coinpic, this.xPos - 15, this.yPos- 15 ,2 * this.radius, 2 * this.radius);

  }
  move() {
    this.xPos -= this.xSpeed;
    if (this.xPos < Math.floor(Math.random(-600,-1000))){
       this.xPos = innerWidth+600;
      }
    }
   botsCheck(shrimp) {
    var dx = this.xPos - shrimp.xPos;
    var dy = this.yPos - shrimp.yPos;
    if (sqrt(dx * dx + dy * dy) <= this.radius + shrimp.radius) {
      console.log("+1 Coin");
      addcoin();
      }
    }
  }
function addcoin(){
  coins++;
  aantalcoins.innerHTML = coins;
}
function backgroundthing(){
  noStroke();
  fill(255, 253, 135);
  rect(0, innerHeight / 1.55, width,innerHeight / 1.55);
  //clouds
  fill(255)
  ellipse(xCloud, yCloud, 95);
  ellipse(xCloud + 50, yCloud + 7, 80);
  //cloud1
  ellipse(xCloud1, yCloud, 105);
  ellipse(xCloud1 + 55, yCloud + 10, 85);
  ellipse(xCloud1 - 50, yCloud + 7, 80)
  //cloud2
  ellipse(xCloud2, yCloud - 5, 85);
  ellipse(xCloud2 + 45, yCloud + 5, 65);
  ellipse(xCloud2 - 40, yCloud + 2, 60);
  //cloud3
  ellipse(xCloud + 600, yCloud, 95);
  ellipse(xCloud + 650, yCloud + 7, 80);
  //cloud 4
  ellipse(xCloud1+ 660, yCloud, 105);
  ellipse(xCloud1 + 695, yCloud + 10, 85);
  ellipse(xCloud1 + 600, yCloud + 7, 80)
  //sun
  fill(242, 193, 79)
  ellipse(xCloud2+ 650, yCloud-25, 85);
  //cloud 5
  fill(255);
  ellipse(xCloud2+ 700, yCloud - 5, 85);
  ellipse(xCloud2 + 745, yCloud + 5, 65);
  ellipse(xCloud2 + 660, yCloud + 2, 60);

}

var interval = setInterval(draw, 20);
//startknop.addEventListener("click", game);
