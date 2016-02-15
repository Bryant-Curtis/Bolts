(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Bolt = Bolts.Bolt = function (attributes) {
    this.pos = attributes.pos
    attributes.color = "red";
    attributes.radius = 8;

    Bolts.MovingObject.call(this, attributes);
  };

  Bolt.length = 70;

  Bolts.Util.inherits(Bolt, Bolts.MovingObject);

  Bolt.prototype.accelStrike = function () {
    this.pos[1] += Math.random();
  };

  Bolt.prototype.strike = function () {
    setInterval(this.accelStrike.bind(this), 25);
    // this.pos[1] += Math.random() * 10;
  };

  Bolt.prototype.hitGround = function (pos) {
    return (pos >= Bolts.Game.DIM_Y);
  };

  // Addition to strike(): Add argument of levels and increase
  // speed of drop as level rises.

  Bolt.isWrappable = false;


})();
