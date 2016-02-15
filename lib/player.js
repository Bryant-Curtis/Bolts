(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Player = Bolts.Player = function (attributes) {
    this.pos = attributes.pos;
    attributes.radius = 20;
    attributes.color = "blue";
    attributes.vel = [0, 0];
    this.life = 2;

    Bolts.MovingObject.call(this, attributes)
  };

  Bolts.Util.inherits(Player, Bolts.MovingObject);


  Player.isWrappable = true;

  Player.prototype.increaseSpeed = function (speed) {
    this.pos[0] += speed[0];
    // this.pos[1] += speed[1];
    // clearInterval(horizontalId);
  };
  // var relVel = Bolts.Util.scale(Bolts.Util.dir([1,1]));

  Player.prototype.run = function (speed) {
    // this.pos[0] += speed[0];
    // this.pos[1] += speed[1];
    this.speed = speed;
    horizontalId = setInterval(this.increaseSpeed.bind(this, this.speed), 1)
    // clearInterval(horizontalId);
    // var verticalId = setInterval(this.pos[1] += speed[1], 1)
    // clearInterval(verticalId);
    // this.vel[0] += speed[0];
    // this.vel[1] += speed[1];
  };

  Player.prototype.stop = function () {
    // this.speed[0] = [0, 0];
    this.pos[0] = this.pos[0];
    // this.vel[1] = 0;
  };

  Player.prototype.relocate = function () {
    this.pos = [ Bolts.Game.DIM_X / 2, Bolts.Game.DIM_Y - 21 ];
    this.vel = [0, 0];
    this.speed = [0, 0];
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
