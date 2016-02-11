(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts= {};
  }

  Bolts = window.Bolts;

  var Util = Bolts.Util = function (){};

  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function (){};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Util.randomVec = function () {
    var velX = 0;
    var velY = Math.random() * 6;
    return [velX, velY];
  };

})();
