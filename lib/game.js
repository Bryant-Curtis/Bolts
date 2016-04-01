(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Game = Bolts.Game = function() {
    this.score = 0;
    this.increaseBoltsBy = 1;
    this.changeLevel = 0;
    this.boltCount = 0;
    biggerPlayer = 20;
    currentScore = 0;

    this.bolts = [];
    this.players = [];

    this.addBolts(5);
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 700;
  Game.BG_COLOR = "#000000";

  Game.prototype.add = function (object) {
    if (object instanceof Bolts.Bolt) {
      this.bolts.push(object);
    } else if (object instanceof Bolts.Player) {
      this.players.push(object);
    } else {
      throw "What did you do????!!!!!";
    }
  };

  Game.prototype.addBolts = function (num) {
    for (var i = 0; i < num; i++) {
      this.bolts.push(
        new Bolts.Bolt({pos: this.randomPos(), vel: this.randomVel(), game: this})
      );
    }
  }

  Game.prototype.addPlayer = function () {
    var player = new Bolts.Player({ pos: [ Game.DIM_X / 2, Game.DIM_Y - 21 ], game: this });
    this.add(player);

    return player;
  };

  Game.prototype.randomPos = function () {
    var pos_x = Math.random() * Game.DIM_X;
    var pos_y = -70;
    return [pos_x, pos_y];
  };

  Game.prototype.randomVel = function () {
    var vel_x = 0;
    var vel_y = Math.random() * 7;
    return [vel_x, vel_y];
  };

  Game.prototype.draw = function (ctx) {
    this.ctx = ctx;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.drawScore(ctx);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  // Collect all the objects into one array to draw them to the screen

  Game.prototype.allObjects = function () {
    return [].concat(this.bolts, this.players);
  };

  // This makes the newly added bolts fall from the sky

  Game.prototype.dropBolts = function () {
    this.bolts.forEach(function(bolt) {
      bolt.strike(bolt.vel[1]);
    }.bind(this));
  };

  Game.prototype.step = function () {
    this.dropBolts();
    this.checkCollisions();
  };

  // Checks for collisions between bolt and player and
  // bolt and ground and performs actions accordingly

  Game.prototype.checkCollisions = function () {
    var game = this;
    var player = game.players[game.players.length - 1]
    game.bolts.forEach(function(bolt, i) {
      if (bolt.isCollidedWith(player)) {
        game.onCollision(bolt, player);
        this.boltCount++;

        // If the bolt hits the ground, it is deleted and a new one
        // is added at a new position and velocity

      } else if (bolt.hitGround(bolt.pos[1])) {
        this.bolts.splice(i, 1);
        this.replaceBolt(i);
        this.boltCount++;
      }
    }.bind(this));
  };

  Game.prototype.replaceBolt = function (index) {
    if (this.score % 7000 < 500 && this.score > 500) {
      this.increaseBoltsBy = 2;
    }  else {
      this.increaseBoltsBy = 1;
    }
    this.addBolts(this.increaseBoltsBy);
  };

  Game.prototype.onCollision = function(bolt, player) {
    this.bolts.splice(this.bolts.indexOf(bolt), 1);
    if (player.life > 1) {
      player.life -= 1;
    } else {
      this.players.splice(0, 1);
      this.drawPlayerExplosion(player.pos);
    }
  };

  Game.prototype.wrap = function (pos) {
    if (pos[0] > Game.DIM_X) {
      pos[0] = 0;
    } else if (pos[0] < 0) {
      pos[0] = Game.DIM_X;
    }
    return pos;
  };

  Game.prototype.countPoints = function () {
    scoreToken = setInterval(this.addScore.bind(this), 16);
  };

  Game.prototype.addScore = function () {
    this.score += 7;
  };

  Game.prototype.drawScore = function (ctx) {
    ctx.fillStyle = "#0095DD";
    ctx.font = "20px Sans-serif";
    ctx.fillText("Lives: " + this.players[0].life + "   Bolts: " + this.boltCount + "   Score: " + this.score, 630, 30)
  };

  Game.prototype.beginningInstructions = function () {
    this.instructionsToken = setInterval(this.drawInstructions.bind(this), 3);
  };

  Game.prototype.drawInstructions = function () {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "18px Sans-serif";
    this.ctx.fillText("Note: Refresh the page if it gets slow! Use the LEFT and RIGHT arrows to navigate your guy to survive! Happy Shocking!", 17, 330);
  };

  Game.prototype.playerExplosion = function (playerPos) {
    biggerPlayer += 3;
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(
      playerPos[0],
      playerPos[1],
      biggerPlayer,
      0,
      2 * Math.PI,
      false
    );

    this.ctx.fill();
    if (this.score - currentScore >= 500) {
      clearInterval(playerExplosionToken);
      clearInterval(scoreToken);
      this.drawInstructions();
      alert("Great job! You survived " + this.boltCount + " BOLTS and got a SCORE of " + this.score + " points!" )
      this.resetGame();
    }
  };

  Game.prototype.resetGame = function () {
    var newGame = new Bolts.Game();
    var canvas = document.getElementById("bolts-canvas");
    canvas.width = Bolts.Game.DIM_X;
    canvas.height = Bolts.Game.DIM_Y;
    var ctx = canvas.getContext("2d");
    new Bolts.GameView(newGame, ctx).start();
  };

  Game.prototype.drawPlayerExplosion = function (playerPos) {
    if (currentScore == 0) {
      currentScore = this.score;
    }
    playerExplosionToken = setInterval(this.playerExplosion.bind(this, playerPos), 1);
  };

})();
