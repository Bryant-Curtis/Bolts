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
  // need to bind(this). Without bind, the move value is passed in as undefined.

  GameView.prototype.start = function () {
   this.bindKeyHandlers();
   this.lastTime = 0;
   
  //  this.game.countPoints.call(this.game);
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
