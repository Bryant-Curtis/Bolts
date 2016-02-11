(function = () {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Bolt = Bolts.Bolt = function (pos, game) {
    COLOR = red;
    RADIUS = 5;
    var length = 5;

    Bolts.MovingObject.call(this, {
      pos: pos,
      vel: Bolts.Util.randomVec(length),
      color: COLOR,
      radius: RADIUS,
      game: game
    });
  };

  Bolts.Util.inherits(Bolt, Bolts.MovingObject);


});
