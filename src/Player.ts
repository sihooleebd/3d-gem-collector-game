import Co from './constant';

class Player {
  x: number;
  y: number;
  direction: number;
  speed: number;
  deltaAngle = 3;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = 90;
    this.speed = 0;
  }

  turn(direction: 'left' | 'right') {
    this.direction += direction === 'left' ? this.deltaAngle : -this.deltaAngle;
  }

  setSpeed(point: number) {
    this.speed = Co.DEFAULT_SPEED + point;
  }
  move(gap: number) {
    this.x +=
      (this.speed / 1000) * gap * Math.cos((Math.PI / 180) * this.direction);
    this.y +=
      (this.speed / 1000) * gap * Math.sin((Math.PI / 180) * this.direction);
    if (this.x > 100) {
      this.x = 100;
    }
    if (this.x < -100) {
      this.x = -100;
    }
    if (this.y > 100) {
      this.y = 100;
    }
    if (this.y < -100) {
      this.y = -100;
    }
  }
}

export default Player;
