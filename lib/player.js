(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Player = Bolts.Player = function (attributes) {
    this.pos = attributes.pos;
    this.game = attributes.game;
    attributes.radius = 20;
    attributes.color = "blue";
    attributes.vel = [0, 0];
    this.life = 3;

    Bolts.MovingObject.call(this, attributes)
  };

  Bolts.Util.inherits(Player, Bolts.MovingObject);

  Player.isWrappable = true;

  Player.prototype.increaseSpeed = function (speed) {
    this.pos[0] += speed[0];
    this.game.wrap(this.pos)
    // clearInterval(horizontalId);
  };

  // var relVel = Bolts.Util.scale(Bolts.Util.dir([1,1]));

  Player.prototype.run = function (speed) {
    // this.pos[0] += speed[0];
    this.speed = speed;
    horizontalId = setInterval(this.increaseSpeed.bind(this, this.speed), 1)
    // if (this.pos[0] > Bolts.Game.DIM_X - 400) {
    //   this.pos[0] = 0;
    // }
  };

  Player.prototype.stop = function () {
    this.pos[0] = this.pos[0];
  };

  Player.prototype.relocate = function () {
    this.pos = [ Bolts.Game.DIM_X / 2, Bolts.Game.DIM_Y - 21 ];
    this.vel = [0, 0];
    this.speed = [0, 0];
  };

})();
