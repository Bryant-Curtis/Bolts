(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var GameView = Bolts.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var gameloop = function () {
      this.game.step();
      this.game.draw(this.ctx);
    }
    setInterval(gameloop, 20);
  };

})();
