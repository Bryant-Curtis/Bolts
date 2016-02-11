(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Player = Bolts.Player = function (attributes) {
    attributes.pos = [600, 0];
    attributes.radius = 5;
    attributes.color = "blue";
    attributes.vel = [20, 20];

    Bolts.MovingObject.call(this, attributes)
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

  Bolts.Util.inherits(Player, Bolts.MovingObject);

})();
