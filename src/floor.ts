/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Point from './point';

class Floor {
  points: Point[] = [];
  constructor(x: number, y: number) {
    this.points[0] = new Point(x, y, -150);
    this.points[1] = new Point(x, y + 10, -150);
    this.points[2] = new Point(x + 10, y + 10, -150);
    this.points[3] = new Point(x + 10, y, -150);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.points.some((point) => !point.visible)) return;
    ctx.beginPath();
    ctx.strokeStyle = `#888888`;
    ctx.lineWidth = 1;
    ctx.moveTo(this.points[3].vx!, this.points[3].vy!);
    this.points.forEach((point) => ctx.lineTo(point.vx!, point.vy!));
    ctx.stroke();
    ctx.closePath();
  }
}

export default Floor;
