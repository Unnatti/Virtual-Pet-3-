//Create variables here
var dog, happyDog, database, foodS, foodStock, feedDog;
var fedTime, lastFed, foodObj, object, sadDog;
var bedroom, garden, washroom, gameState, readingState;

function preload()
{
  //load images here
  sadDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
  bedroom = loadImage("images/virtual pet images/Bed Room.png");
  garden = loadImage("images/virtual pet images/Garden.png");
  washroom = loadImage("images/virtual pet images/Wash Room.png");
}

function setup() {
  createCanvas(400, 500);
  database = firebase.database()
  foodObj = new Food();

  dog = createSprite(200, 400, 150, 150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock = database.ref('Food');
foodStock.on("value", Food);

fedTime = database.ref('Feedtime')
fedTime.on("value", function(data){
  lastFed = data.val()
})

readingState = database.ref('gameState')
readingState.on("value", function(data){
  gameState = data.val()
})

feed = createButton("Feed the dog");
feed.position(700, 95);
feed.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position (800, 95);
addFood.mousePressed(addFoods);



}


function draw() { 

  currentTime = hour();
if(currentTime = (lastFed+1)){
update("Playing");
foodObj.garden();
}else if(currentTime ==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
  foodObj.washroom();
}else{
  update("Hungry")
  foodObj.display();
}

if(gameState != 'Hungry'){
  feed.hide();
  addFood.hide();
dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog)
}
drawSprites();
}

function feedDog(){
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour(),
  gameState:"Hungry"
})
}

  function addFoods(){
    foodS++;
    databaser.ref('/').update({
      Food:foodS

    })
  }

  function update(state){
    database.ref('/').update({
      gameState:state
    });
  
  }

  
  






