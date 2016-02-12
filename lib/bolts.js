(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Bolt = Bolts.Bolt = function (attributes) {
    attributes.color = "red";
    attributes.radius = 8;

    Bolts.MovingObject.call(this, attributes);
  };

  Bolt.isWrappable = false;

  Bolts.Util.inherits(Bolt, Bolts.MovingObject);


})();
