/**
 * Returns position of search character in a grid
 * @param grid
 * @param search
 */
import { Grid } from "@challenge/grid";
import { Point } from "@challenge/point";
import { ALLOWED_CHARACTERS_PATTERN, UPPERCASE_LETTERS_PATTERN } from "@challenge/patterns";

function getPossibleNeighbours(currDirection: Point, lastElement: string) {
  let possibleNeighbours: Point[] = Point.moves();
  if (ALLOWED_CHARACTERS_PATTERN.test(lastElement)) {
    possibleNeighbours = [currDirection, ...Point.moves()]; // current direction is favorite, unless it's ' '
  }
  return possibleNeighbours;
}

export function followPath(grid: Grid): Point[] {
  const startPoint = grid.findUnique("@"); // Fails if start is not found or multiple starts
  grid.findUnique("x"); // Fails if end is not found or multiple ends

  // Helper recursion, returns visited positions
  function findPath(currDirection: Point, visitedPositions: Point[], grid: Grid): Point[] {
    let lastPoint = visitedPositions[visitedPositions.length - 1];
    let lastElement = grid.item(lastPoint);
    let possibleNeighbours = getPossibleNeighbours(currDirection, lastElement)
      .map(lastPoint.move)
      .filter(grid.isInBounds)
      .filter((p) => grid.item(p) !== " ");

    if (lastElement === "+") {
      const elementBeforeIntersection = visitedPositions[visitedPositions.length - 2];
      possibleNeighbours = possibleNeighbours.filter(elementBeforeIntersection.ne);
    } else if (UPPERCASE_LETTERS_PATTERN.test(lastElement)) {
      possibleNeighbours = possibleNeighbours.filter((p) => !visitedPositions.includes(p));
    }

    if (possibleNeighbours.length == 0) {
      throw new Error("Out of moves!");
    }

    const nextPoint = possibleNeighbours[0];
    currDirection = possibleNeighbours[0].subtract(lastPoint);
    const nextElement = grid.item(nextPoint);

    if (nextElement === "x") {
      visitedPositions.push(nextPoint);
      return visitedPositions;
    } else if (nextElement !== " ") {
      visitedPositions.push(nextPoint);
    }

    return findPath(currDirection, visitedPositions, grid);
  }

  return findPath(Point.right(), [startPoint], grid);
}
