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
    explosionSize = 20;
    currentScore = 0;

    this.bolts = [];
    this.players = [];

    this.addBolts(5);
  };

  Game.DIM_X = 990;
  Game.DIM_Y = 550;
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

  // Draw the background and all objects to screen

  Game.prototype.draw = function (ctx) {
    this.ctx = ctx;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
    this.drawScore(ctx);
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

  Game.prototype.step = function (player) {
    this.dropBolts();
    this.checkCollisions(player);
  };

  // Checks for collisions between bolt and player and
  // bolt and ground and performs actions accordingly

  Game.prototype.checkCollisions = function (player) {
    var game = this;
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
      this.drawPlayerExplosion(player);
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
    // if (typeof this.players[0] == "undefined") {
    //   this.players[0] = new Bolts.Player({pos: [ Game.DIM_X / 2, Game.DIM_Y - 21 ], game: this});
    // }
    // if (this.players[0]) {
    // Adding the ifs above 1. make the game slower and 2. cause the explosion to not appear!
    ctx.fillText("Lives: " + this.players[0].life + "   Bolts: " + this.boltCount + "   Score: " + this.score, Game.DIM_X - 355, 40)
    // }
  };

  Game.prototype.drawPlayerExplosion = function (player) {
    if (currentScore === 0) {
      currentScore = this.score;
    }
    playerExplosionToken = setInterval(this.playerExplosion.bind(this, player), 1);
  };

  Game.prototype.playerExplosion = function (player) {
    explosionSize += 3;
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(
      player.pos[0],
      player.pos[1],
      explosionSize,
      0,
      2 * Math.PI,
      false
    );

    this.ctx.fill();
    if (this.score - currentScore >= 500) {
      this.gameOver(player);
    }
  };

  Game.prototype.gameOver = function (player) {
    this.cancelLoops();
    this.goToEndScreen();
  };

  Game.prototype.cancelLoops = function () {
    clearInterval(playerExplosionToken);
    clearInterval(scoreToken);
    clearInterval(runToken);
    clearInterval(boltToken);
    cancelAnimationFrame(requestToken);
    cancelAnimationFrame(animateToken);
  };

  Game.prototype.goToEndScreen = function () {
    var endScreen =                   document.getElementById("end-screen"),
        gameScreen =                  document.getElementById("bolts-canvas"),
        startScreen =                 document.getElementById("start-screen"),
        score =                       document.getElementById("score"),
        playAgainButton =             document.getElementById("play-again"),
        returnToWelcomeScreenButton = document.getElementById("return-to-welcome-screen"),
        game = this;

    score.children[0].innerHTML = "You got a score of <span>" + this.score + "</span> <i>points</i> and dodged <span>" + this.boltCount + "</span> <i>Bolts</i>!";

    endScreen.className = "end-screen";
    gameScreen.className = "hide";

    // Add event listeners for the end-screen buttons

    playAgainButton.addEventListener("click", function(event) {
      endScreen.className = "hide";
      gameScreen.className = "show";

      game.resetGame();
    });

    playAgainButton.removeEventListener("click", function(event) {
      endScreen.className = "hide";
      gameScreen.className = "show";

      game.resetGame();
    });

    returnToWelcomeScreenButton.addEventListener("click", function(event) {
      endScreen.className = "hide";
      startScreen.className = "start-screen";
    });

    returnToWelcomeScreenButton.removeEventListener("click", function(event) {
      endScreen.className = "hide";
      startScreen.className = "start-screen";
    });

    // window.addEventListener("keyup", function(event) {
    //   if (event.keyCode === 32) {
    //     endScreen.className = "hide";
    //     gameScreen.className = "show";
    //
    //     game.resetGame();
    //   } else if (event.keyCode === 13) {
    //     endScreen.className = "hide";
    //     startScreen.className = "start-screen";
    //   }
    // });
    //
    // window.removeEventListener("keyup", function(event) {
    //   if (event.keyCode === 32) {
    //     endScreen.className = "hide";
    //     gameScreen.className = "show";
    //
    //     game.resetGame();
    //   } else if (event.keyCode === 13) {
    //     endScreen.className = "hide";
    //     startScreen.className = "start-screen";
    //   }
    // });

  };

  Game.prototype.resetGame = function () {
    var newGame = new Bolts.Game();
    var canvas = document.getElementById("bolts-canvas");
    canvas.width = Bolts.Game.DIM_X;
    canvas.height = Bolts.Game.DIM_Y;
    var ctx = canvas.getContext("2d");
    new Bolts.GameView(newGame, ctx).start();
  };

})();
