export class Point {
  constructor(private inner: [number, number]) {
    if (!inner || inner.length != 2) {
      throw new Error(`Invalid point. ${inner} given!`);
    }
    this.add = this.add.bind(this);
    this.ne = this.ne.bind(this);
  }

  static right = (): Point => new Point([0, 1]);
  static left = (): Point => new Point([0, -1]);
  static bottom = (): Point => new Point([1, 0]);
  static top = (): Point => new Point([-1, 0]);
  static moves = () => [Point.right(), Point.bottom(), Point.left(), Point.top()];

  get row() {
    return this.inner[0];
  }

  get col() {
    return this.inner[1];
  }

  add(other: Point): Point {
    return new Point([this.row + other.row, this.col + other.col]);
  }

  ne(other: Point): boolean {
    return this.row != other.row && this.col != other.col;
  }

  subtract(other: Point): Point {
    return new Point([this.row - other.row, this.col - other.col]);
  }

  toString(): string {
    return `${this.row},${this.col}`;
  }
}
