(function() {
  if (typeof window.Bolts == "undefined") {
    window.Bolts = {};
  }

  Bolts = window.Bolts;

  var canvas = document.getElementById("bolts-canvas"),
  context = canvas.getContext('2d');

  var img = new Image();
  img.src = './Frog.png';

  var Sprite = Bolts.Sprite = function (img, width, height, positions) {
    this.img = img;
    this.width = width;
    this.height = height;
    this.pos = positions;

    return this;
  }

  Sprite.prototype.draw = function (position, x, y) {
    var sprite = this;
    var positions = sprite.pos[position];
    context.drawImage(
      this.img,
      positions[0],
      positions[1],
      this.width,
      this.height,
      x, y
      this.width,
      this.height
    );
  };

  var frog = new Sprite(img, 23, 27, [
    [0, 0],
    [100, 100],
    [100, 100]
  ])

  frog.draw(2, -500, -300);







// var spriteWidth = 23,
//     spriteHeight = 27,
//     pixelsLeft = 0,
//     pixelsTop = 0,
//
//     canvasPosX = 400,
//     canvasPosY = 30
// ;
//
// context.drawImage(
//   img,
//   pixelsLeft,
//   pixelsTop,
//   spriteWidth,
//   spriteHeight,
//   canvasPosX,
//   canvasPosY,
//   spriteWidth,
//   spriteHeight
// )


});
