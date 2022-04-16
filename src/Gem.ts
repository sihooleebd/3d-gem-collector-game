import Point from './point';
class Gem {
  point: Point;
  image: HTMLImageElement;
  imageLoaded = false;
  constructor(x?: number, y?: number) {
    this.point = new Point(
      x !== undefined ? x : Math.random() * 200 - 100,
      y !== undefined ? y : Math.random() * 200 - 100,
      -100,
    );
    this.image = new Image();
    this.image.src = require('./img/gem.png');
    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.point.visible) return;
    if (!this.point.distance) return;
    if (!this.point.vx) return;
    if (!this.point.vy) return;
    if (!this.imageLoaded) return;
    const size = 800 / this.point.distance;
    ctx.save();
    ctx.translate(this.point.vx, this.point.vy);
    ctx.drawImage(this.image, -size / 2, -size, size, size * 2);
    ctx.restore();
  }
}

export default Gem;
