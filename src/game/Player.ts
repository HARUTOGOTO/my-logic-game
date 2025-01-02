// src/game/Player.ts

export enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT
}

export class Player {
  public x: number;
  public y: number;
  public direction: Direction;
  private initialX: number;
  private initialY: number;
  private initialDirection: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.initialX = x;
    this.initialY = y;
    this.initialDirection = direction;
  }

  public resetPosition() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.direction = this.initialDirection;
  }

  public moveForward() {
    switch (this.direction) {
      case Direction.UP:
        this.y -= 1;
        break;
      case Direction.DOWN:
        this.y += 1;
        break;
      case Direction.LEFT:
        this.x -= 1;
        break;
      case Direction.RIGHT:
        this.x += 1;
        break;
    }
  }

  public turnLeft() {
    this.direction = (this.direction + 3) % 4; 
    // +3 して4で割った余りを取ると左回転になる
  }

  public turnRight() {
    this.direction = (this.direction + 1) % 4;
  }
}
