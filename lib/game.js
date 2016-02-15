(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Game = Bolts.Game = function() {
    this.score = 0;
    this.bolts = [];
    this.players = [];
    this.countPoints.call(this);
    this.addBolts();
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 700;
  Game.NUM_BOLTS = 3;
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

  Game.prototype.addBolts = function () {
    for (var i = 0; i < Game.NUM_BOLTS; i++) {
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
    var pos_y = 0;
    return [pos_x, pos_y];
  };

  Game.prototype.randomVel = function () {
    var vel_x = 0;
    var vel_y = Math.random() * 7;
    return [vel_x, vel_y];
  };

  Game.prototype.draw = function (ctx) {
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

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    var player = game.players[game.players.length - 1]
    game.bolts.forEach(function(bolt) {
      if (bolt.isCollidedWith(player)) {
        game.remove(bolt, player);
      }
    });
  };

  Game.prototype.remove = function(bolt, player) {
    debugger
    this.bolts.splice(this.bolts.indexOf(bolt), 1);
    player.life -= 1;
    if (player.life > 0) {
      this.players.splice(0, 1);
      this.addPlayer();
    } else {
      player.relocate();
      clearInterval(scoreToken);
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

  Game.prototype.countPoints = function () {
    scoreToken = setInterval(this.addScore.bind(this), 5);
  };

  Game.prototype.addScore = function () {
    this.score += 1;
  };

  Game.prototype.drawScore = function (ctx) {
    ctx.fillStyle = "#0095DD";
    ctx.font = "14px Sans-serif";
    ctx.fillText("Score: " + this.score, 700, 30)
  };



})();
