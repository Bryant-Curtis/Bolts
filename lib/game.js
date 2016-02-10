(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Game = Bolts.Game = function() {
    this.DIM_X = 1200;
    this.DIM_Y = 860;
    this.bolts = [];
  }

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


});
