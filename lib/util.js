(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts= {};
  }

  Bolts = window.Bolts;

  var Util = Bolts.Util = function (){};

  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  // Find the length of the given vector
  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  var scale = Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  var inherits = Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () { this.constructor = ChildClass};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    // ChildClass.prototype.constructor = ChildClass;
  };

  Util.randomVec = function () {
    var velX = 0;
    var velY = Math.random() * 3;
    return [velX, velY];
  };

})();
