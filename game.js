class Game{
constructor(){

}
getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
  async start(){
    if(gameState === 0){
      background(rgb(198,135,103));
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
     
    }
    
    police = createSprite(100,200);
    police.addAnimation("pRun/1.png",pRun);
    police.x = Math.round(random(displayWidth-100, displayHeight - 200));
    console.log(police);
    console.log(police.x);
    police.scale = 0.2;
    terrorist1 = createSprite(300,200);
    terrorist1.addAnimation("trun/1.png",tRun);
    terrorist1.x = Math.round(random(displayWidth-100, displayHeight - 200));
    terrorist1.scale = 0.2;
    terrorist2 = createSprite(500,200);
    terrorist2.addAnimation("t2/1.png",t2Run);
    terrorist2.scale = 0.2;
    terrorist2.x = Math.round(random(displayWidth-100, displayHeight - 200));

    players = [police, terrorist1, terrorist2];
  }
  play(){
    form.hide();
    
    Player.getPlayerInfo();
  
    
    if(allPlayers !== undefined){
     

      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        x = x+200;
        y = 135;
       console.log(index);
       console.log(players);
       players[index-1].x = x;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    drawSprites();

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
     
  
      
    }
   
    
  }
  
}