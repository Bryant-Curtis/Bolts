(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Game = Bolts.Game = function() {
    this.score = 0;
    this.increaseBoltsBy = 1;
    this.changeLevel = 0;
    biggerPlayer = 20;
    currentScore = 0;

    this.bolts = [];
    this.players = [];

    // this.beginningInstructions();
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

  Game.prototype.allObjects = function () {
    return [].concat(this.bolts, this.players);
  };

  Game.prototype.dropBolts = function () {
    this.bolts.forEach(function(bolt) {
      bolt.strike(bolt.vel[1]);
    }.bind(this));
  };

  Game.prototype.step = function () {
    this.dropBolts();
    this.checkCollisions();
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    var player = game.players[game.players.length - 1]
    game.bolts.forEach(function(bolt, i) {
      if (bolt.isCollidedWith(player)) {
        game.loseOneLife(bolt, player);
      } else if (bolt.hitGround(bolt.pos[1])) {
        this.replaceBolt(i);
      }
    }.bind(this));
  };

  Game.prototype.replaceBolt = function (index) {
    this.bolts.splice(index, 1);
    if (this.score % 7000 < 500 && this.score > 500) {
      this.increaseBoltsBy = 2;
    }  else {
      this.increaseBoltsBy = 1;
    }
    this.addBolts(this.increaseBoltsBy);
  };

  Game.prototype.loseOneLife = function(bolt, player) {
    this.bolts.splice(this.bolts.indexOf(bolt), 1);
    player.life -= 1;
    if (player.life > 0) {
      player.relocate();
    } else {
      this.players.splice(0, 1);
      this.drawBigPlayer(this.ctx, player);
    }
  };

  Game.prototype.isWrappable = function (wrappability) {
    return wrappability;
  };

  Game.prototype.wrap = function (pos) {
    if (pos[0] > Game.DIM_X) {
      pos[0] = 0;
    } else if (pos[0] < 0) {
      pos[0] = Game.DIM_X;
    }
    return pos;
  };

  Game.prototype.outOfBounds = function (pos) {
    pos[0] > Game.DIM_X - 10 || pos[0] < 10
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
    ctx.fillText("Score: " + this.score, 800, 30)
  };

  Game.prototype.beginningInstructions = function () {
    this.instructionsToken = setInterval(drawInstructions.bind(this), 5000);
  };

  Game.prototype.drawInstructions = function () {
    ;
  };

  Game.prototype.expandPlayer = function (player) {
    biggerPlayer += 3;
    this.ctx.fillStyle = "#r0h3re"
    this.ctx.beginPath();
    this.ctx.arc(
      player.pos[0],
      player.pos[1],
      biggerPlayer,
      0,
      2 * Math.PI,
      false
    );

    this.ctx.fill();
    if (this.score - currentScore >= 500) {
      clearInterval(bigPlayerToken);
      clearInterval(scoreToken);
      alert("Great job! You got a score of " + this.score)
    }
  };

  Game.prototype.drawBigPlayer = function (ctx, player) {

    if (currentScore == 0) {
      currentScore = this.score;
    }
    bigPlayerToken = setInterval(this.expandPlayer.bind(this, player), 1);
  };

})();
