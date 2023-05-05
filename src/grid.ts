import { asGrid } from '@challenge/sanitize';
import { Point } from '@challenge/point';

export class Grid {
  constructor(private inner: string[][]) {
    this.isInBounds = this.isInBounds.bind(this);
  }

  // transforms a multiline string into Grid
  static fromText(text: string): Grid {
    return new Grid(asGrid(text));
  }

  // returns a string representation from given coordinates.
  ofPoints(points: Point[]): string {
    return points.reduce((agg, point) => agg + this.item(point), '');
  }

  get rows() {
    return this.inner.length;
  }

  get cols() {
    return this.inner?.[0].length || 0;
  }

  // returns element at position [row, col]. it will fail if out of bounds
  item(point: Point): string {
    return this.inner[point.row][point.col];
  }

  /**
   * Returns true if point row and col are inside grid.
   * @param point [number, number]
   */
  isInBounds(point: Point): boolean {
    const [row, col] = [point.row, point.col];
    return row >= 0 && col >= 0 && row < this.rows && col < this.cols;
  }

  /**
   * Returns position of search character.
   * T
   * @param search string
   */
  findUnique(search: string): Point {
    const points: Point[] = [];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.inner[row][col] === search) {
          points.push(new Point([row, col]));
        }
      }
    }
    switch (points.length) {
      case 1: {
        return points[0];
      }
      case 0: {
        throw new Error(`${search} not found!`);
      }
      default: {
        throw new Error(`Multiple ${search} found!`);
      }
    }
  }
}
