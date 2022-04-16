import Co from './constant';
class Point {
  x3d: number;
  y3d: number;
  private z3d: number;

  visible = false;
  private x2d?: number;
  private y2d?: number;
  vx?: number; //--------화면에 찍어야 할 좌표 0~VIEW_WIDTH*2
  vy?: number; //--------화면에 찍어야 할 좌표 0~VIEW_HEIGHT*2
  distance?: number;
  constructor(x: number, y: number, z: number) {
    this.x3d = x;
    this.y3d = y;
    this.z3d = z;
  }
  private deg2rad = (degree: number) => (Math.PI / 180) * degree;
  private rad2deg = (radian: number) => (radian * 180) / Math.PI;

  convertTo2D = (px: number, py: number, pdir: number) => {
    
    //중심이동
    //this는 사물을 가리킨다.
    const rX = this.x3d - px; // 사물의 좌표에서 플레이어의 좌표를 뺀다.
    const rY = this.y3d - py; // 사물의 좌표에서 플레이어의 좌표를 뺀다.
    
    //회전
    const degreeToRotate = 90 - pdir;
    const radianToRotate = this.deg2rad(degreeToRotate);
    const rotatedX =
      Math.cos(radianToRotate) * rX - Math.sin(radianToRotate) * rY;
    const rotatedY =
      Math.sin(radianToRotate) * rX + Math.cos(radianToRotate) * rY;
    
      //보이는 점 거르기
    if (rotatedY < 0) {
      this.visible = false;
      return;
    }
    if (rotatedX != 0) {
      const tan = rotatedY / rotatedX;
      const rad = Math.atan(tan);
      let degree = this.rad2deg(rad);
      if (degree < 0) {
        degree += 180;
      }
      if (90 - Co.VS / 2 >= degree || degree >= 90 + Co.VS / 2) {
        this.visible = false;
        return;
      }
    }
    this.distance = Math.sqrt(rX * rX + rY * rY);
    if (this.distance < 0.1) {
      this.visible = false;
      return;
    }

    //여기까지 오면 화면에 보이는 점

    this.visible = true;
    this.x2d = Co.NORMALIZED_Y * (rotatedX / rotatedY);
    this.y2d = this.z3d / this.distance;
    //canvas 좌표 구하기
    this.vx = this.x2d * 3 + Co.VIEW_WIDTH;
    this.vy = -this.y2d * 35 + Co.VIEW_HEIGHT;
  };
}
export default Point;
