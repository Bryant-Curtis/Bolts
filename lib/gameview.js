(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var GameView = Bolts.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.player = this.game.addPlayer();
  };

  GameView.MOVES = {
    "up":     [ 0, -12],
    "down":   [ 0,  12],
    "left":   [-0.2,  0],
    "right":  [ 0.2,  0]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var player = this.player;
    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { player.run(move); });
      key('up', function() { player.stop(); });
    }.bind(this));
  };

  GameView.prototype.start = function () {
   this.bindKeyHandlers();
   this.game.countPoints();

   this.lastTime = 0;

   // start the animation which is the same thing as a loop iterating
   // at some designated frame rate

   requestToken = window.requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function (time) {
    this.game.step(this.player);
    this.game.draw(this.ctx);
    this.lastTime = time;

    animateToken = window.requestAnimationFrame(this.animate.bind(this));
    console.log(animateToken);
  };

})();
