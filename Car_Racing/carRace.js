
      
     const score = document.querySelector('.score');
     const mscore = document.querySelector('.mscore');
     let startScreen = document.querySelector('.startScreen');
     let gameArea = document.querySelector('.gameArea');
     let car = document.querySelector('.car');-
     startScreen.addEventListener("click" , startGame); // start game on cursor click

     window.addEventListener("keydown", function (e) {
      if (e.which === 13  || e.which === 32) {
          //this.alert("enter clicked")
          startGame();
      }
  });
   
	let player = { speed : 6, score: 0 } ;
	let player_max = { speed : 5, score: 0  }
	player_max.score=localStorage.getItem("Maxscore");


   
	let keys = { ArrowUp : false, ArrowDown :false, ArrowLeft : false, ArrowRight : false, Enter:false }

	document.addEventListener('keydown', keyDown);
	document.addEventListener('keyup', keyUp);

  // var code = (e.keyCode ? e.keyCode : e.which);
  // if(code == 13) { //Enter keycode
  //     alert('enter press');
  // }
   
	function keyDown(e){
		e.preventDefault();
		keys[e.key] = true;
		// console.log(e.key);
		// console.log(keys);
	}

	function keyUp(e){
		e.preventDefault();
		keys[e.key] = false;
		// console.log(e.key);
		// console.log(keys);
	}

  
	function isCollide(a,b){
		aRect  = a.getBoundingClientRect();
		bRect = b.getBoundingClientRect();

		return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
	}

   function moveLines(){
		let lines = document.querySelectorAll('.lines');

		lines.forEach(function(item) {

			if(item.y >= 1000){
				item.y -= 1110; 
			}

            item.y += player.speed;
            item.style.top = item.y + "px";
		} )

	}

   var b = document.getElementById("music2");  
   var g = document.getElementById("music3");  
   function endGame()
   { 

		player.startGame = false;
    startScreen.classList.remove('hide');
    j.pause();
    b.play();

    setTimeout(() => {
      g.play();
    }, 2300);

    if(player_max.score <= player.score)
    {
			player_max.score = player.score

			 //Store
		localStorage.setItem("Maxscore", player_max.score);
			mscore.innerHTML = "Max Score: " + localStorage.getItem("Maxscore");  
		}  
    
    startScreen.innerHTML = "Game Over ! <br> Your final score is " + player.score + " <br> Press here to restart the Game."; 
  }

   function moveEnemy(car)
   {
		let enemy = document.querySelectorAll('.enemy');
        enemy.forEach(function(item) {

			if(isCollide(car, item))
      {
				console.log("Boom HIT");
         endGame();
      
			}

			if(item.y >= 1000)
      {
				item.y = -200;
			item.style.left = Math.floor(Math.random() * 500) + "px";

		  }

           item.y += player.speed;
            item.style.top = item.y + "px";
		} )

	}

   function gamePlay()
   {
    //let car = document.querySelector('.car');
      let road = gameArea.getBoundingClientRect();
   
    if(player.startGame){

          moveLines();
          moveEnemy(car);

    
      if(keys.ArrowUp && player.y > (road.top + 70) ) { player.y -= player.speed}
      if(keys.ArrowDown && player.y < (road.bottom - 125) ) { player.y += player.speed}
      if(keys.ArrowLeft  &&  player.x > 555 ) { player.x -= player.speed}
      if(keys.ArrowRight  && player.x < (road.width + 485 ) ) { player.x += player.speed}
      
			car.style.top = player.y + "px";
			car.style.left = player.x + "px";

      window.requestAnimationFrame(gamePlay);
      console.log(player.score++);

      player.score++ ;
			let ps = player.score - 2;
			score.innerText = "Score: " + ps;
    }
}



    var j = document.getElementById("music1");

     function startGame() {                   //Start Game
    
  startScreen.classList.add('hide');
  gameArea.innerHTML = "";
      j.play();
      b.pause();

  //lines.style.visibility = " visible";
  car.style.visibility = "visible";

  

  player.startGame = true;
  player.score = 0;

  window.requestAnimationFrame(gamePlay);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  console.log("Top position:" + car.offsetTop);
  console.log("Left position:" + car.offsetLeft);

//for roadLines on road;
  for(i=0; i< 5; i++)
  {

      let roadLines = document.createElement('div');
      roadLines.setAttribute('class' , 'lines');
      roadLines.style.position = "absolute";
      roadLines.y = (i*220); //controls the distance between the two consecytives lines.
      roadLines.style.top =  roadLines.y + "px"
      gameArea.appendChild(roadLines);
      roadLines.style.visibility = "visible";
   }

  

//for enemieCar of cars on road;
 for( x=0; x<5; x++)
 {
    let enemyCar = document.createElement('div');
   enemyCar.setAttribute("class", "enemy");
   enemyCar.y = ((x+1)*250)* -1 ; //controls the distance between the enemy cars//
   enemyCar.style.top = enemyCar.y + "px";//controls from where the car will begin from top//
   enemyCar.style.left = enemyCar.y + "px";
   enemyCar.style.left = Math.floor(Math.random() * 350) + "px";//generate random number to make the ememy car laced at different left position.

   gameArea.appendChild(enemyCar);
   enemyCar.style.visibility = "visible";
   

} 
  }

  mscore.innerHTML = "Max Score: " + localStorage.getItem("Maxscore");
    /* 
    function randomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    */

