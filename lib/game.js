(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Game = Bolts.Game = function() {
    this.DIM_X = 1200;
    this.DIM_Y = 860;
    this.NUM_BOLTS = 3;
    this.bolts = [];
    this.players = [];

    this.addBolts();
  };

  Game.prototype.add = function (object) {
    if (object instanceOf Bolts.Bolt) {
      this.bolts.push(object);
    } else if (object instanceOf Bolts.Player) {
      this.players.push(object);
    } else {
      throw "What did you do????!!!!!";
    }
  };

  Game.prototype.addBolts = function () {
    for (var i = 0; i < this.NUM_BOLTS; i++) {
      this.bolts.push(
        new Bolts.Bolt({pos: this.randomPos, vel: this.randomVel, game: this})
      );
    }
  }

  Game.prototype.addPlayers = function () {
    this.add(new Bolts.Player({}));
  };

  Game.prototype.randomPos = function () {

  };

  Game.prototype.randomVel = function () {

  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects.forEach(function(object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects.forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    if (pos[0] > this.DIM_X) {
      pos[0] = 0;
    } else if (pos[0] < 0) {
      pos[0] = this.DIM_X;
    }
    return pos;
  };

  Game.prototype.step = function () {
    this.moveObjects();
  };

  Game.prototype.allObjects = function () {
    var allObjs = this.bolts.concat([this.player]);
    return allObjs;
  };



})();
