(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  var MovingObject = Bolts.MovingObject = function (attributes) {
    this.pos = attributes.pos;
    this.vel = attributes.vel;
    this.radius = attributes.radius;
    this.color = attributes.color;
    this.game = attributes.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += Math.pow(this.vel[1], 2);

    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      return;
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObj) {
    var centerDist = Bolts.Util.dist(this.pos, otherObj.pos);
    return centerDist < (this.radius + otherObj.radius);
  };

  MovingObject.prototype.collideWith = function (otherObj) {
    ;
  };

})();
