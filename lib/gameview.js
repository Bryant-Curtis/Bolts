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
    "up":     [ 0, -1],
    "down":   [ 0,  1],
    "left":   [-1,  0],
    "right":  [ 1,  0]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var player = this.player;
    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { player.run(move); });
    }.bind(this));
  };
  // need to bind(this). Without bind, the move value is not passed in correctly.


  GameView.prototype.start = function () {
   this.bindKeyHandlers();
   this.lastTime = 0;
   //start the animation
   requestAnimationFrame(this.animate.bind(this));

    // var gameloop = function () {
    //   this.game.step();
    //   this.game.draw(this.ctx);
    // }.bind(this);
    // setInterval(gameloop, 20);
  };

  GameView.prototype.animate = function (time) {
    var timeDelta = time - this.lastTime;

    this.game.step();
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

})();
