

//Game Project
//Charlie Rowles-Davies, 2022
//Use The spacebar, left and right arrow keys to play!

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;


var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;
var treePos_y;

var game_score;
var flagpole;
var lives;

var enemies;
    


var jumpSound;

var flagpoleSound;

var gameOverSound;

var deathSound;

var backgroundSound;

var collectableSound;

var gameEnded;

var gameCompleted;



//function to load all of the sounds

function preload()
{
        soundFormats('mp3','wav');

        //load your sounds here
        jumpSound = loadSound('assets/jump.wav');
        jumpSound.setVolume(0.04);

        backgroundSound = loadSound('assets/backgroundSound.mp3')
        backgroundSound.setVolume(0.1);

        deathSound = loadSound('assets/deathSound.wav');
        deathSound.setVolume(3);

        gameOverSound = loadSound('assets/gameOver.wav');
        gameOverSound.setVolume(4);


        collectableSound = loadSound('assets/collectableSound.wav');
        collectableSound.setVolume(0.7);

        flagpoleSound = loadSound('assets/levelComplete.wav');
        flagpoleSound.setVolume(2);


}
  


function setup()
{
    
        backgroundSound.loop();

        createCanvas(1024, 576);
        floorPos_y = height * 3/4;
        lives = 3;


        startGame();

    gameEnded = false;
    gameCompleted = false;

    
}


function draw()
{

	 // fill the sky blue
     fill(0, 0, 128)
     rect(0, 0, width, height / 2);
    
	 // fill the sky blue
     fill(0, 0, 139)
     rect(0, 270, width, height);
    
    
    
    
    
    
    


        noStroke();

        fill(240, 230, 140);
        rect(0, 432, 1024, 144); //draw some Sandy ground

        fill(34, 139, 34)
        rect(0, 432, 1024, 20); // Green Part of the Ground

        fill(0,100,0);
        rect(0, 450, 1024, 2); //Second Green Part of the Ground




    
    
    
    //Code for Scrolling
    push();
    translate(scrollPos,0);
    
   
    //Draw Stars.
    
    drawStars();
    

	// Draw clouds.
    
     drawClouds();
        

	// Draw mountains.
    
    drawMountains();
    

	// Draw trees.
    
    drawTrees();
    

	// Draw canyons.

    
    for(var i = 0; i < canyons.length; i++) {
        
            drawCanyon(canyons[i]);
            checkCanyon(canyons[i]);

    }
    
    
	// Draw collectable items.
    
     for(var i = 0; i < collectables.length; i++) {
         
             if(collectables[i].isFound == false) {
             drawCollectable(collectables[i]);
             checkCollectable(collectables[i]);    

    }
    

             
     }
    
    
    

    

 //Draw Flagpole
    
    renderFlagpole();  
    

    
    
    
//    Drawing the enemies
    
    for (var i = 0; i < enemies.length; i++){
        
        
        enemies[i].draw();
        
//        Checking if the enemies have touched the game character
        var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y)
        
        if(isContact){
            
                lives -= 1
                deathSound.play();
                startGame();
                break;
        }
    }
    
    
    

     //Code for Scrolling
           pop();


    //    Displaying Game over text if the player has no lives left
        if (lives < 1) {

            fill(205, 92, 92);
            textSize(50);
            textFont("Georgia")
            text("GAME OVER!!!", 400, 300)


        // playing the game over sound if the game is over       
        if(gameEnded == false)
        {
            gameOverSound.play()
            backgroundSound.stop()
            gameEnded = true;
        } 

        return;        
            } 


    //    displaying congratulations text if the game character has reached the flagpole
        if (flagpole.isReached) {

        fill(176, 196, 222);
        textSize(50);
        textFont("Georgia")
        text("CONGRATS, Level complete!", 250 , 300) 

        // playing flagpole sound if the game is finished      
        if(gameCompleted == false)
        {
            flagpoleSound.play()
            deathSound.stop()
            backgroundSound.stop()
            gameCompleted = true;
        } 

         return;        
            } 


    
    
    
    
    
    
    
    
   // Draw game character.
	
	drawGameChar();
    

    
    
    
    

    
   //Draw Player Score
    fill(244,255,255);
    rect(860, 5, 150, 35, 20)
    fill(0, 0, 0);
    textSize(15);
    textFont("Georgia")
    text("Score: " + game_score, 870, 25);
    
   

     
    //Draw Moon
    drawMoon();
    
     
    
    //Draw Lives & check if player has died
    checkPlayerDie()
    
     
    

    

	// Logic to make the game character move or the background scroll.
    
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
    
    
     if (gameChar_y != floorPos_y) {
        
        gameChar_y += 1
        isFalling = true;
         
   } else {
        
        isFalling = false;
    }
    
    
     
    //Code to make the Character fall down the Canyon 
    
    if (isPlummeting == true) {
        
        gameChar_y += 5


        
    }
       
    

if (flagpole.isReached == false){
    
    checkFlagpole();

}
    

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}











    // ---------------------
    // Key control functions
    // ---------------------

    function keyPressed(){


         if(keyCode == 37){

            isLeft = true;

            } 
        else if (keyCode == 39) {

            isRight = true;

            }

        if (keyCode == 32 && gameChar_y == floorPos_y) {

            gameChar_y  -= 100
            jumpSound.play();


            }





    }

    function keyReleased()
    {


        if(keyCode == 37){

            isLeft = false;

        } else if (keyCode == 39) {

            isRight = false;

            }

    }


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
    // draw game character

    if(isLeft && isFalling)
    {
        // add your jumping-left code

         //Head
        fill(200,150,150);
        ellipse(gameChar_x - 4, gameChar_y -60, -18, 30);

        //Body
        fill(0,0,255);
        rect(gameChar_x - 8, gameChar_y -45, 10, 30);

        //Feet
        fill(0);
        rect(gameChar_x -10, gameChar_y -15, 10, 10);

        //Arms
        fill(255,0,0);
        rect(gameChar_x -27 , gameChar_y - 40, 20, 5);






    }
    else if(isRight && isFalling)
    {
        // add your jumping-right code


            //Head
            fill(200,150,150);
            ellipse(gameChar_x + 4, gameChar_y -60, -18, 30);

            //Body
            fill(0,0,255);
            rect(gameChar_x - 3, gameChar_y -45, 10, 30);

            //Feet
            fill(0);
            rect(gameChar_x , gameChar_y -15, 10, 10);

            //Arms
            fill(255,0,0);
            rect(gameChar_x + 7, gameChar_y - 40, 20, 5);



    }
    else if(isLeft)
    {
        // walking left code

            //Head
            fill(200,150,150);
            ellipse(gameChar_x - 4, gameChar_y -54, -20, 35);

            //Body
            fill(0,0,255);
            rect(gameChar_x - 8, gameChar_y -35, 10, 30);

            //Feet
            fill(0);
            rect(gameChar_x -10, gameChar_y -5, 10, 10);

            //Arms
            fill(255,0,0);
            rect(gameChar_x -27 , gameChar_y - 30, 20, 5);

    }
    else if(isRight)
    {
        // walking right code

        //Head
        fill(200,150,150);
        ellipse(gameChar_x + 4, gameChar_y -54, -20, 35);

        //Body
        fill(0,0,255);
        rect(gameChar_x - 3, gameChar_y -35, 10, 30);

        //Feet
        fill(0);
        rect(gameChar_x , gameChar_y -5, 10, 10);

        //Arms
        fill(255,0,0);
        rect(gameChar_x + 7, gameChar_y - 30, 20, 5);


    }
    else if(isFalling || isPlummeting)
    {
        // jumping facing forwards code


        //Head
        fill(200,150,150);
        ellipse(gameChar_x, gameChar_y -60, 30);

        //Body
        fill(0,0,255);
        rect(gameChar_x - 8, gameChar_y -45, 15, 30);

        //Feet
        fill(0);
        rect(gameChar_x -15, gameChar_y -15, 10, 10);
        rect(gameChar_x +5, gameChar_y -15, 10, 10);

        //Arms
        fill(255,0,0);
        rect(gameChar_x -27 , gameChar_y - 40, 20, 5);
        rect(gameChar_x + 7, gameChar_y - 40, 20, 5);


    }
    else
    {
        // standing front facing code

        //Head
        fill(200,150,150);
        ellipse(gameChar_x, gameChar_y -50, 30);
        //Body
        fill(0,0,255);
        rect(gameChar_x -13, gameChar_y -35, 26, 30);
        //Feet
        fill(0);
        rect(gameChar_x -15, gameChar_y -5, 10, 10);
        rect(gameChar_x +5, gameChar_y -5, 10, 10);


    }
    
    
    
    
    
    
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

function drawClouds(){
    
    for(var i = 0; i < clouds.length; i++) {

        
         noStroke()
         fill(176, 196, 222, 300);

        //Left Part of Cloud
        ellipse(clouds[i].x_pos - 40 - 5.5 * clouds[i].size, clouds[i].y_pos + 10, clouds[i].width - 20 + 10 * clouds[i].size, clouds[i].height - 20 + 10 * clouds[i].size);

        //Middle part of Cloud
        ellipse(clouds[i].x_pos, clouds[i].y_pos + 5, clouds[i].width + 13 * clouds[i].size, clouds[i].height + 13 * clouds[i].size);

        //Right Part of Cloud
        ellipse(clouds[i].x_pos + 40 + 5.5 * clouds[i].size, clouds[i].y_pos + 10, clouds[i].width - 20 + 10 * clouds[i].size , clouds[i].height - 20 + 10 * clouds[i].size);
        
        
   
        
    }
    
}




// Function to draw mountains objects.

function drawMountains(){
    
    for(var i = 0; i < mountains.length; i++) {
        
        
         //Left Side
        noStroke();
        fill(128, 128, 128);    

        triangle(mountains[i].x_pos, mountains[i].y_pos - mountains[i].size, mountains[i].x_pos - 125 - mountains[i].size, mountains[i].y_pos + 247 + mountains[i].size, mountains[i].x_pos - 5 + mountains[i].size / 2, mountains[i].y_pos + 247 + mountains[i].size);
        

        //Right Side
        fill(169, 169, 169);    

        triangle(mountains[i].x_pos - 1 , mountains[i].y_pos - mountains[i].size, mountains[i].x_pos - 30 + mountains[i].size / 4, mountains[i].y_pos + 247 + mountains[i].size, mountains[i].x_pos + 115 + mountains[i].size, mountains[i].y_pos + 247 + mountains[i].size);
        
        
        
        
        
        
        

    }
        
    
    
}

// Function to draw trees objects.

function drawTrees(){
    
    
      for(var i = 0; i < trees_x.length; i++) {

         
        //Trunk
        fill(160, 82, 45);
        rect(trees_x[i], treePos_y - 3, 5, 150);




         //Branches
        strokeWeight(3);
        stroke(160, 82, 45);
        line(trees_x[i] + 5, treePos_y + 102, trees_x[i] + 50, treePos_y + 52);
        line(trees_x[i] - 40, treePos_y + 12, trees_x[i], treePos_y + 72);
        line(trees_x[i] + 5, treePos_y + 42, trees_x[i] + 30, treePos_y + 2);


        //Leaves
        noStroke()
        fill(46, 139, 87);
        ellipse(trees_x[i] + 30, treePos_y - 8, 90, 70);
        ellipse(trees_x[i] - 45, treePos_y + 12, 90, 70);
        ellipse(trees_x[i] + 60, treePos_y + 72, 90, 70);



          
      
          

    }

}

//Function to draw stars

function drawStars(){
   

         for(var i = 0; i < starX.length; i++){

        fill(255, 255, 255);
        ellipse(starX[i], starY[i],2,2);


    }
  
}

//Function to draw the moon

 function drawMoon(){
     

        fill(200,200,200)
        ellipse(30,30,80,80);

    
   
 }   

//constructor function to draw the enemies

function Enemy(x, y, range){

        this.x = x;
        this.y = y;
        this.range = range;
        this.currentX = x;
        this.inc = 1;

    this.update = function(){
        
           this.currentX += this.inc;

            if (this.currentX >= this.x + this.range){

                this.inc = -1;

            }else if (this.currentX < this.x){

                this.inc = 1;
            }

        }

       this.draw = function() {

           this.update();
       
       
       
    // Spider Body
    fill(10,10,10);
    ellipse(this.currentX,this.y - 30,75,55);
       
    
    // Outside of eyes 
    fill(255,255,255);
    ellipse(this.currentX - 20,this.y - 32, 15, 20);
    ellipse(this.currentX + 20,this.y - 32, 15, 20);
       
   
       
       
       
    
    // Inside of Eyes
    fill(10,10,10);
    ellipse(this.currentX - 20,this.y - 32 ,7,10);
    ellipse(this.currentX + 20,this.y - 32 ,7,10);
       


    // black stroke color for legs   
    stroke(0,0,0);

    //Left Leg Top

    line(this.currentX - 50, this.y - 67 , this.currentX - 28, this.y - 52); 
    line(this.currentX - 50, this.y - 67 , this.currentX - 100, this.y - 2);



    //Left Leg Bottom

    line(this.currentX - 50, this.y - 42, this.currentX - 38, this.y - 32);
    line(this.currentX - 50, this.y - 41, this.currentX - 80, this.y - 1);






    // Right Leg - Top   

    line(this.currentX + 47, this.y - 67, this.currentX + 25, this.y - 52); 
    line(this.currentX + 47, this.y - 67, this.currentX + 97, this.y - 2);



    //Right Leg - Bottom

    line(this.currentX + 47, this.y - 42, this.currentX + 35, this.y - 32);
    line(this.currentX + 47, this.y - 41, this.currentX + 77, this.y - 1);

    //    Removing stroke for code below
        noStroke();






   }
    
//   Checking to see if gamecharacter has hit the the enemy
    
   this.checkContact = function(gameChar_x, gameChar_y){
       
           var d = dist(gameChar_x,gameChar_y, this.currentX, this.y);

           if(d < 30){

               return true;
           }else {

               return false;
           }
       } 
    
    
}




// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    
    //The Canyon
            noStroke();
            fill(0, 0, 139)
            rect(t_canyon.x_pos, 432, t_canyon.width, 200); 
    

}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    
      //falling down the canyon
    
     if (gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_world_x > t_canyon.x_pos && gameChar_y >= floorPos_y) {
        
        isPlummeting = true;

    }
    
    
    
    
    
}

//function to draw the flagpole

function renderFlagpole(){
    
    push();
    strokeWeight(5);
    stroke(176, 196, 222)
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(255, 215, 0);
    noStroke();
    
    if (flagpole.isReached) {
        
        
        
    fill(255,215, 0, 80);
    rect(flagpole.x_pos + 3, floorPos_y - 250, 50, 50);
        
    fill(255, 215, 0);
    rect(flagpole.x_pos, floorPos_y - 250, 50, 50);

 
    }
    else {
        

    fill(255,215, 0, 80);
    rect(flagpole.x_pos + 3, floorPos_y - 50, 50, 50);

    fill(255, 215, 0);
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
    

    }
    
    pop();
}

//function to see if game character has reached the flagpole

function checkFlagpole(){
    
       var d = abs(gameChar_world_x - flagpole.x_pos);

       if (d < 20) {

           flagpole.isReached = true;
       }
   
}

//function to check if player had died 
function checkPlayerDie(){

       var playerHasDied = gameChar_y > floorPos_y + 250 && gameChar_y < floorPos_y + 255

        if (playerHasDied) {

        deathSound.play();
        lives -= 1;


        } else {

            lives -= 0;
        }



        if (playerHasDied && lives > 0) {

        startGame()
        }



        for(var i = 0; i < lives ; i++){

        fill(244,255,255);
        rect(860, 60, 150, 35, 20)
        textSize(15);
        textFont("Georgia")
        fill(0, 0, 0);
        text("Lives: " + lives, 872, 80);



        }



    
}




// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    
     //Shadow of the Collectable
    
    //Top Part of the collectable(Gem)
    
            fill(255,255,255, 80);
             triangle(t_collectable.x_pos + 3, t_collectable.y_pos - 0.5 * t_collectable.size - 25 - t_collectable.size, t_collectable.x_pos - 17 - t_collectable.size, t_collectable.y_pos - 0.5 * t_collectable.size,  t_collectable.x_pos + 23 + t_collectable.size, t_collectable.y_pos - 0.5 * t_collectable.size); 
    
        
        //Bottom Part of the collectable(Gem)
            triangle(t_collectable.x_pos - 13 - t_collectable.size, t_collectable.y_pos + 0.5 * t_collectable.size - t_collectable.size, t_collectable.x_pos + 3, t_collectable.y_pos + 0.5 * t_collectable.size + 40 + t_collectable.size, t_collectable.x_pos + 23 + t_collectable.size, t_collectable.y_pos + 0.5 * t_collectable.size - t_collectable.size);

    
    //The actual Collectable 
    
     
            //Top Part of Collectable(Gem)       
            fill(240, 248, 255);
            triangle(t_collectable.x_pos, t_collectable.y_pos - 0.5 * t_collectable.size - 25 - t_collectable.size, t_collectable.x_pos - 20 - t_collectable.size, t_collectable.y_pos - 0.5 * t_collectable.size,  t_collectable.x_pos + 20 + t_collectable.size, t_collectable.y_pos - 0.5 * t_collectable.size); 

         
            //Bottom Part of Collectable(Gem)
            triangle(t_collectable.x_pos - 20 - t_collectable.size, t_collectable.y_pos + 0.5 * t_collectable.size - t_collectable.size, t_collectable.x_pos, t_collectable.y_pos + 0.5 * t_collectable.size + 40 + t_collectable.size, t_collectable.x_pos + 20 + t_collectable.size, t_collectable.y_pos + 0.5 * t_collectable.size - t_collectable.size);

         
    
    
   

    

}

// Function to check if the character has collected the collectable.

function checkCollectable(t_collectable)
{
    
                     
        if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos )< 70) {

       t_collectable.isFound = true;
       game_score += 1;
       collectableSound.play();
             
         }
        
    

}

//Start Game Function

function startGame(){
    
    
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
       //Tree Y position
        treePos_y = height/2;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    
    //Array for Stars
     starX = [];
     starY = [];
    
//    For loop for adding stars to star array
   for(var i = 0; i < 1700; i++){
          
    starX.push(random(-3000, 5000));
    starY.push(random(0, 200));
    
       
   } 
    
    

    
    
    

	// Initialise arrays of scenery objects.
    
        trees_x = [-1000, -600, -200, 50, 750, 1100, 1300, 1500, 2100, 2400, 3400, 4200, 4400];
    
    
    
    
  

  



    

    
    //Collectables Array

        collectables = [

                collectables = {x_pos: 250, y_pos: 380, size: 1, isFound: false},
                collectables = {x_pos: 1400, y_pos: 300, size: 1, isFound: false},
                collectables = {x_pos: 2700, y_pos: 370, size: 1, isFound: false},
                collectables = {x_pos: 3500, y_pos: 310, size: 1, isFound: false}


        ];
    

    //Clouds Array

        clouds = [
            
            
            
            
            
                  {x_pos: -500, y_pos: 95, height: 80, width: 80, size: -3},
                  {x_pos: -900, y_pos: 95, height: 80, width: 80, size: -3},
                  {x_pos: -1300, y_pos: 95, height: 80, width: 80, size: -3},

            
                  {x_pos: 100, y_pos: 95, height: 80, width: 80, size: -3},
                  {x_pos: 600, y_pos: 95, height: 80, width: 80, size: -3},
                  {x_pos: 1000, y_pos: 60, height: 80, width: 80, size: -3},

            
                  {x_pos: 1400, y_pos: 40, height: 80, width: 80, size: -3},
                  {x_pos: 1900, y_pos: 20, height: 80, width: 80, size: -3},
                  {x_pos: 2300, y_pos: 70, height: 80, width: 80, size: -3},

                  {x_pos: 2700, y_pos: 30, height: 80, width: 80, size: -3},
                  {x_pos: 3200, y_pos: 95, height: 80, width: 80, size: -3},
                  {x_pos: 3600, y_pos: 60, height: 80, width: 80, size: -3},
                  {x_pos: 4000, y_pos: 40, height: 80, width: 80, size: -3}

                  ];



    //Mountains Array

        mountains = [
            
            {x_pos: 550, y_pos: 205, size: -20},
            {x_pos: 665, y_pos: 185, size: 0},
            {x_pos: 1750, y_pos: 205, size: -20},
            {x_pos: 1900, y_pos: 135, size: 50},
            {x_pos: 2850, y_pos: 200, size: -15},
            {x_pos: 2750, y_pos: 185, size: 0},
            {x_pos: 3650, y_pos: 185, size: 0},
            {x_pos: 3850, y_pos: 185, size: 0},
            {x_pos: 4000, y_pos: 185, size: 0}

            ];


    //Canyons Array
    
        canyons = [
            
            
                canyon = {x_pos: -1700, width: 100},
                canyon = {x_pos: -100, width: 100},
                canyon = {x_pos: -800, width: 100},
                canyon = {x_pos: 150, width: 100},
                canyon = {x_pos: 800, width: 150},
                canyon = {x_pos: 3000, width: 200},
                canyon = {x_pos: 4500, width: 350},

        ];

    //    Enemies Array

        enemies = [];
    //    Adding Enemies to the empty array and so to the screen
        enemies.push(new Enemy(-1000,floorPos_y, 100));
        enemies.push(new Enemy(-300,floorPos_y, 100));
        enemies.push(new Enemy(600,floorPos_y, 100));
        enemies.push(new Enemy(1400,floorPos_y, 100));
        enemies.push(new Enemy(2000,floorPos_y, 100));
        enemies.push(new Enemy(3400,floorPos_y, 100));
        enemies.push(new Enemy(3900,floorPos_y, 100));



    //Setting the game score to 0
        game_score = 0;

    //    Flagpole Object
            flagpole = {isReached: false, x_pos: 5200}

    }





