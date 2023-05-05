/**
 * Removes leading whitespace from input
 * @param input string
 */
export function removeLeadingWhitespace(input: string) {
  const lines = input.split("\n").filter((it) => it.trim().length > 0);
  // todo: refactor, reduce doesn't need to continue if zero is reached
  const maybeIndentSize = lines.reduce((min, line) => {
    const countSpaces = countLeadingWhitespaces(line);
    return Math.min(min, countSpaces);
  }, Infinity);

  const indentSize = isFinite(maybeIndentSize) ? maybeIndentSize : 0;
  const indentedLines = lines.map((line) => line.slice(indentSize));
  return indentedLines.join("\n");
}

/**
 * Returns a number of leading whitespaces for a line
 * @param line
 */
export function countLeadingWhitespaces(line: string): number {
  return line.match(/^\s+/)?.[0].length || 0;
}

/**
 * Transforms a string into a grid (2d array of rows x columns)
 * @param input string
 * @return grid Grid
 */
export function asGrid(input: string): string[][] {
  const lines: string[] = removeLeadingWhitespace(input).split("\n");
  const [min, max] = lines.reduce(
    ([min, max], line) => {
      const startIndex = line.search(/\S/); // Find the index of the first non-whitespace character
      const endIndex = line.search(/\S(?=\s*$)/); // Find the index of the last non-whitespace character
      return [Math.min(min, startIndex !== -1 ? startIndex : min), Math.max(max, endIndex !== -1 ? endIndex : max)];
    },
    [Infinity, -Infinity]
  );

  if (!isFinite(max) || !isFinite(min)) {
    return [];
  }

  const maxLength = Math.abs(max - min) + 1; // e.g. if index 0 and index 3, then there are 4 elements

  return lines.map((line) => Array.from({ length: maxLength }, (_, i) => (i >= line.length ? " " : line.charAt(i))));
}
