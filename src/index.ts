import Floor from './floor';
import Co from './constant';
import Gem from './Gem';
import MiniMap from './Minimap';
import Player from './Player';
import View from './View';
import Wall from './wall';
import Point from 'point';

document.addEventListener('DOMContentLoaded', () => {
  new Game();
});

class Game {
  player: Player;
  gems: Gem[] = [];
  floors: Floor[] = [];
  walls: Wall[] = [];
  minimap: MiniMap;
  view: View;
  point = 0;
  prevTime: number | null = null;

  constructor() {
    this.player = new Player();
    for (let i = 0; i < Co.NUMBER_OF_GEMS; ++i) {
      this.gems.push(new Gem());
    }
    for (let x = -100; x < 100; x += 10) {
      for (let y = -100; y < 100; y += 10) {
        this.floors.push(new Floor(x, y));
      }
    }
    for (let i = -100; i < 100; i += 10) {
      for (let z = -150; z < 150; z += Co.WALL_HEIGHT) {
        this.walls.push(new Wall(i, -100, i + 10, -100, z));
        this.walls.push(new Wall(i, 100, i + 10, 100, z));
        this.walls.push(new Wall(-100, i, -100, i + 10, z));
        this.walls.push(new Wall(100, i, 100, i + 10, z));
      }
    }

    this.minimap = new MiniMap(this.player, this.gems);
    this.view = new View(this.player, this.gems, this.floors, this.walls);

    this.startCapture();
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'F12') {
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        console.log(e);
        this.player.turn(e.key === 'ArrowLeft' ? 'left' : 'right');
      }
    });
  }

  startCapture() {
    window.requestAnimationFrame(this.captureFrame);
  }

  captureFrame = (t: number) => {
    if (this.prevTime === null) {
      this.prevTime = t;
      window.requestAnimationFrame(this.captureFrame);
      return;
    }
    const gap = t - this.prevTime;
    this.prevTime = t;
    this.player.move(gap);
    this.eatGems();
    this.minimap.draw();
    this.view.draw();
    window.requestAnimationFrame(this.captureFrame);
  };

  distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  };

  eatGems = () => {
    const leftGems = this.gems.filter(
      (gem) =>
        this.distance(
          gem.point.x3d,
          gem.point.y3d,
          this.player.x,
          this.player.y,
        ) > 5,
    );
    if (this.gems.length !== leftGems.length) {
      this.player.setSpeed(this.point);
      this.point += this.gems.length - leftGems.length;
      this.gems.splice(0, this.gems.length, ...leftGems);
      const elem = document.getElementById('point');
      if (elem) elem.innerHTML = `${this.point}`;
    }

    console.log('P O I N T S : ', this.point);
  };
}
