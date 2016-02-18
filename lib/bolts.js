(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Bolt = Bolts.Bolt = function (attributes) {
    this.pos = attributes.pos;
    this.vel = attributes.vel;
    attributes.color = "yellow";
    attributes.radius = 8;

    Bolts.MovingObject.call(this, attributes);
  };

  Bolt.length = 70;

  Bolts.Util.inherits(Bolt, Bolts.MovingObject);

  Bolt.prototype.accelStrike = function (vel) {
    this.pos[1] += vel * 5;
  };

  Bolt.prototype.strike = function (vel) {
    setInterval(this.accelStrike.bind(this, vel), 700);
  };

  Bolt.prototype.hitGround = function (pos) {
    return (pos >= Bolts.Game.DIM_Y -45);
  };

})();
