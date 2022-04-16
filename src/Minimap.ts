import { setTextRange } from 'typescript';
import Co from './constant';
import Gem from './Gem';
import Player from './Player';

class MiniMap {
  player: Player;
  gems: Gem[];
  canvas: HTMLCanvasElement;
  radius = 5;

  constructor(player: Player, gems: Gem[]) {
    this.player = player;
    this.gems = gems;

    const canvas = document.querySelector('#mini-map-canvas');
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('invalid minimap canvas');
    }
    this.canvas = canvas;
    this.canvas.width = Co.MINI_MAP_SIZE * 2;
    this.canvas.height = Co.MINI_MAP_SIZE * 2;
    this.canvas.style.width = `${Co.MINI_MAP_SIZE}px`;
    this.canvas.style.height = `${Co.MINI_MAP_SIZE}px`;
  }

  getCanvasPos(x: number, y: number) {
    return {
      x: (x * Co.MINI_MAP_SIZE) / 100 + Co.MINI_MAP_SIZE,
      y: (-y * Co.MINI_MAP_SIZE) / 100 + Co.MINI_MAP_SIZE,
    };
  }

  drawMiniMap() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.gems.length; ++i) {
      ctx.beginPath();
      ctx.fillStyle = 'green';
      const gemPos = this.getCanvasPos(
        this.gems[i].point.x3d,
        this.gems[i].point.y3d,
      );
      ctx.arc(gemPos.x, gemPos.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }

    ctx.beginPath();
    ctx.fillStyle = 'black';
    const playerPos = this.getCanvasPos(this.player.x, this.player.y);
    ctx.arc(playerPos.x, playerPos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  draw() {
    this.drawMiniMap();
  }
}
export default MiniMap;
