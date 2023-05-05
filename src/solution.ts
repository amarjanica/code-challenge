/**
 * For a provided input multiline string returns letters
 * as instructed in https://github.com/softwaresauna/code-challenge
 * @param asciiArt
 */
import { Grid } from "@challenge/grid";
import { followPath } from "@challenge/paths";
import { Point } from "@challenge/point";
import { UPPERCASE_LETTERS_PATTERN } from "@challenge/patterns";

export function solution(asciiArt: string): string {
  const grid = Grid.fromText(asciiArt);
  const points: Point[] = followPath(grid);

  const initialUsedPositions: string[] = [];
  const [letters, _usedPositions] = points.reduce(
    (agg, item) => {
      const [letters, usedPositions] = agg; // aggregator destructured to letters and usedPositions
      const pointAsStr = item.toString();
      const chr = grid.item(item);
      if (UPPERCASE_LETTERS_PATTERN.test(chr) && usedPositions.indexOf(pointAsStr) === -1) {
        return [letters + chr, [...usedPositions, pointAsStr]];
      }
      return [letters, usedPositions];
    },
    ["", initialUsedPositions]
  );

  return letters;
}
