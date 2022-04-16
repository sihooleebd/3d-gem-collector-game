/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Co from './constant';
import Point from './point';

class Wall {
  points: Point[] = [];
  constructor(x1: number, y1: number, x2: number, y2: number, z1: number) {
    this.points[0] = new Point(x1, y1, z1);
    this.points[1] = new Point(x2, y2, z1);
    this.points[2] = new Point(x2, y2, z1 + Co.WALL_HEIGHT);
    this.points[3] = new Point(x1, y1, z1 + Co.WALL_HEIGHT);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.points.some((point) => !point.visible)) return;
    ctx.beginPath();
    ctx.strokeStyle = `#888888`;
    ctx.lineWidth = 3;
    ctx.moveTo(this.points[3].vx!, this.points[3].vy!);
    this.points.forEach((point) => ctx.lineTo(point.vx!, point.vy!));
    ctx.stroke();
    ctx.closePath();
  }
}

export default Wall;
