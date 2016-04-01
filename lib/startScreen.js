(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var StartScreen = Bolts.StartScreen = function(ctx) {
    this.ctx = ctx;
  };

  StartScreen.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Bolts.Game.DIM_X, Bolts.Game.DIM_Y)
    ctx.fillStyle = Bolts.Game.BG_COLOR;
    ctx.fillRect(0, 0, Bolts.Game.DIM_X, Bolts.Game.DIM_Y)

    this.drawTitle(this.ctx);
    this.drawInstructions(this.ctx);
    // draw a button to start the game - start the game in it
    // Maybe improve it later to have bolts falling in the background
      // on the start screen. (If the bolts don't make the game slower)
  };

  StartScreen.prototype.drawTitle = function(ctx) {
    ctx.fillStyle = "yellow";
    ctx.font = "28px monospace";
    centerText(ctx, "BOLTS", 50);
  };

  StartScreen.prototype.drawInstructions = function(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    centerText(ctx, "Use the left(<-) and right(->) arrow keys to dodge the falling bolts. Winner can be chosen by either highest score or most bolts dodged. Happy Dodging!", 80);
  };

  StartScreen.prototype.start = function() {
    requestAnimationFrame(this.animate.bind(this));
  };

  StartScreen.prototype.animate = function (time) {
    this.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  };



})();
