//start your code here
var game = new Phaser.Game(400, 300);

var player;
var platforms;

var playState = {};

playState.preload = function() {  
  game.load.crossOrigin = "anonymous";
  game.load.image("background", "https://cdn.glitch.com/07341419-e9df-484f-820f-d6799646cfcd%2Fclouds-h.png?1540814965305"); 
  game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42); 
  game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png");
  game.load.image("grass:4x1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_4x1.png");
};

playState.create = function() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.world.enableBody = true;
  
  game.add.sprite(0, 0, "background");

  player = game.add.sprite(0, 0, "player");
  
  player.body.gravity.y = 500;
  player.body.collideWorldBounds=true;

  player.anchor.set(0.5, 0.5);
  player.animations.add("stop", [0]);
  player.animations.add("run", [1, 2], 8, true); // 8fps looped
  player.animations.play("stop");

  platforms = game.add.group(); 
  platforms.enableBody = true;

  var ground = platforms.create(0, 275, 'ground');
  ground.body.immovable = true;

};

playState.update = function() {
  
  game.physics.arcade.collide(player, platforms);

  if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        player.body.velocity.x = 200;
        player.animations.play("run");
        player.scale.x = 1;
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        player.body.velocity.x = -200;
        player.animations.play("run");
        player.scale.x = -1;
    } else {
        player.body.velocity.x = 0;
        player.animations.play("stop");
    }
  
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        if(player.body.touching.down === true){
            player.body.velocity.y = -400;  
        }
    }

};

game.state.add("play", playState);
game.state.start("play");