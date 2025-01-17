import { followPath } from '@challenge/paths';
import { Grid } from '@challenge/grid';

describe('Paths', () => {
  it('should follow path', () => {
    const grid: Grid = new Grid([
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      ['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
    ]);

    expect(grid.ofPoints(followPath(grid))).toEqual('@---A---+|C|+---+|+-B-x');
  });

  it('should follow path2', () => {
    const grid: Grid = new Grid([
      ['@', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' '],
      ['|', ' ', '+', '-', 'C', '-', '-', '+', ' ', ' '],
      ['A', ' ', '|', ' ', ' ', ' ', ' ', '|', ' ', ' '],
      ['+', '-', '-', '-', 'B', '-', '-', '+', ' ', ' '],
      [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
      [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      [' ', ' ', '+', '-', '-', '-', 'D', '-', '-', '+'],
    ]);

    expect(grid.ofPoints(followPath(grid))).toEqual('@|A+---B--+|+--C-+|-||+---D--+|x');
  });

  it('should follow path3', () => {
    const grid = new Grid([
      [' ', ' ', ' ', ' ', '+', '-', 'O', '-', 'N', '-', '+', ' ', ' '],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', '|', ' ', ' '],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '+', '-', 'I', '-', '+'],
      ['@', '-', 'G', '-', 'O', '-', '+', ' ', '|', ' ', '|', ' ', '|'],
      [' ', ' ', ' ', ' ', '|', ' ', '|', ' ', '+', '-', '+', ' ', 'E'],
      [' ', ' ', ' ', ' ', '+', '-', '+', ' ', ' ', ' ', ' ', ' ', 'S'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
    ]);

    expect(grid.ofPoints(followPath(grid))).toEqual('@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x');
  });

  it('should follow path4', () => {
    const grid = new Grid([
      [' ', '+', '-', 'L', '-', '+', ' ', ' '],
      [' ', '|', ' ', ' ', '+', 'A', '-', '+'],
      ['@', 'B', '+', ' ', '+', '+', ' ', 'H'],
      [' ', '+', '+', ' ', ' ', ' ', ' ', 'x'],
    ]);

    expect(grid.ofPoints(followPath(grid))).toEqual('@B+++B|+-L-+A+++A-+Hx');
  });

  it('should Ignore stuff after end of path', () => {
    const grid = new Grid([
      ['@', '-', 'A', '-', '-', '+', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', '+', '-', 'B', '-', '-', 'x', '-', 'C', '-', '-', 'D'],
    ]);

    expect(grid.ofPoints(followPath(grid))).toEqual('@-A--+|+-B--x');
  });
});
