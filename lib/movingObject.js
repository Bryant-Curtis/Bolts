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
    ctx.rect(
      this.pos[0],
      this.pos[1],
      this.radius,
      70,
      5 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    var checkPos = this.pos[0] + this.vel[0];
    if (this.game.outOfBounds(checkPos)) {
      debugger

    } else {
      this.pos[0] += this.vel[0];
      this.pos[1] += Math.pow(this.vel[1], 2);
      // this.pos[0] = this.pos[0];
    }
    // if (this.isWrappable) {
    //   this.pos = this.game.wrap(this.pos);
    // } else {
    //   return;
    // }
  };

  MovingObject.prototype.isWrappable = function () {
    if (this instanceof Bolts.Bolt) {
      return Bolts.Bolt.isWrappable;
    } else if (this instanceof Bolts.Player) {
      return Bolts.Player.isWrappable;
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
