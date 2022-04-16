import Floor from './floor';
import Co from './constant';
import Gem from './Gem';
import Player from './Player';
import Wall from './wall';

class Obj3d {
  vx: number;
  distance: number;
  constructor(vx: number, distance: number) {
    this.vx = vx;
    this.distance = distance;
  }
}

class View {
  player: Player;
  gems: Gem[];
  floors: Floor[];
  walls: Wall[];
  canvas: HTMLCanvasElement;

  constructor(player: Player, gems: Gem[], floors: Floor[], walls: Wall[]) {
    this.player = player;
    this.gems = gems;
    this.floors = floors;
    this.walls = walls;
    const view = document.querySelector('#view');
    const canvas = document.querySelector('#view-canvas');
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('invalid minimap canvas');
    }
    if (!view || !(view instanceof HTMLDivElement)) {
      throw new Error('invalid view div');
    }
    this.canvas = canvas;
    view.style.width = `${Co.VIEW_WIDTH}px`;
    view.style.height = `${Co.VIEW_HEIGHT}px`;
    this.canvas.width = Co.VIEW_WIDTH * 2;
    this.canvas.height = Co.VIEW_HEIGHT * 2;
    this.canvas.style.width = `${Co.VIEW_WIDTH}px`;
    this.canvas.style.height = `${Co.VIEW_HEIGHT}px`;
  }
  rad = (degree: number) => (Math.PI / 180) * degree;
  degree = (radian: number) => (radian * 180) / Math.PI;

  draw() {
    this.gems.forEach((gem) =>
      gem.point.convertTo2D(
        this.player.x,
        this.player.y,
        this.player.direction,
      ),
    );
    this.floors.forEach((floor) =>
      floor.points.forEach((point) => {
        point.convertTo2D(this.player.x, this.player.y, this.player.direction);
      }),
    );
    this.walls.forEach((wall) =>
      wall.points.forEach((point) => {
        point.convertTo2D(this.player.x, this.player.y, this.player.direction);
      }),
    );
    const gemsToDraw = this.gems
      .filter((gem) => gem.point.visible)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .sort((a, b) => b.point.distance! - a.point.distance!);
    const floorsToDraw = this.floors.filter((floor) =>
      floor.points.every((point) => point.visible),
    );
    const wallsToDraw = this.walls.filter((wall) =>
      wall.points.every((point) => point.visible),
    );
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    floorsToDraw.forEach((floor) => floor.draw(ctx));
    wallsToDraw.forEach((wall) => wall.draw(ctx));
    gemsToDraw.forEach((gem) => gem.draw(ctx));
  }
}

export default View;
