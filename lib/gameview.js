(function() {
  if (window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var Gameview = Bolts.Gameview = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  Gameview.prototype.start = function () {
    var gameloop = function () {
      this.game.step();
      this.game.draw(this.ctx);
    }
    setInterval(gameloop, 20);
  };

});
