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

  Player.prototype.increaseSpeed = function (speed) {
    this.pos[0] += speed[0];
    this.game.wrap(this.pos)
    // clearInterval(horizontalId);
  };

  Player.prototype.run = function (speed) {
    this.speed = speed;
    horizontalId = setInterval(this.increaseSpeed.bind(this, this.speed), 1)
  };

  Player.prototype.stop = function () {
    this.pos[0] = this.pos[0];
  };

})();
