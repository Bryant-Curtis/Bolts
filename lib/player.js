(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Player = Bolts.Player = function (attributes) {
    attributes.radius = 5;
    attributes.color = "blue";
    attributes.vel = [0, 0];

    Bolts.MovingObject.call(this, attributes)
  };

  Bolts.Util.inherits(Player, Bolts.MovingObject);

  var relVel = Bolts.Util.scale(
    Bolts.Util.dir([1, 1])
  );

  Player.prototype.run = function (speed) {
    this.vel[0] += speed[0];
    this.vel[1] += speed[1];
  };

  Player.prototype.relocate = function () {
    this.pos = [this.game.DIM_X / 2, this.game.DIM_Y - 10 ];
    this.vel = [0, 0];
  };






  // Player.prototype.move = function (direction) {
  //   if (direction === "left") {
  //     setInterval(this.moveLeft, 50)
  //   } else if (direction === "right") {
  //     setInterval(this.moveRight, 50)
  //   }
  // };

  // Player.prototype.moveLeft = function () {
  //   this.pos[0] = this.pos[0] - 10;
  // };
  //
  // Player.prototype.moveRight = function () {
  //   this.pos[0] = this.pos[0] + 10;
  // };


})();
