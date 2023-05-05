import { asGrid, removeLeadingWhitespace } from "@challenge/sanitize";

describe("Sanitize", () => {
  describe("removeLeadingWhitespace", () => {
    it("should trim everything", () => {
      const value = `

`;
      const out = removeLeadingWhitespace(value);

      expect(out).toBe("");
    });

    it("should only return trimmed input", () => {
      const value = `
123
123`;

      const out = removeLeadingWhitespace(value);

      expect(out).toBe("123\n123".trim());
    });

    it("should remove leading whitespace", () => {
      const value = `
    aaa
  bbb`;

      const out = removeLeadingWhitespace(value);

      expect(out).toBe("  aaa\nbbb");
    });
  });

  describe("asGrid", () => {
    it("should convert an empty string", () => {
      expect(asGrid("")).toStrictEqual([]);
    });

    it("should convert a multiline empty string", () => {
      expect(
        asGrid(`

    `)
      ).toStrictEqual([]);
    });

    it("should convert a basic example multiline string", () => {
      expect(
        asGrid(`
@---A---+
        |
x-B-+   C
    |   |
    +---+`)
      ).toStrictEqual([
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
      ]);
    });

    it("should convert a go straight through intersections string", () => {
      expect(
        asGrid(`
@
| +-C--+
A |    |
+---B--+
  |      x
  |      |
  +---D--+`)
      ).toStrictEqual([
        ["@", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        ["|", " ", "+", "-", "C", "-", "-", "+", " ", " "],
        ["A", " ", "|", " ", " ", " ", " ", "|", " ", " "],
        ["+", "-", "-", "-", "B", "-", "-", "+", " ", " "],
        [" ", " ", "|", " ", " ", " ", " ", " ", " ", "x"],
        [" ", " ", "|", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", "+", "-", "-", "-", "D", "-", "-", "+"],
      ]);
    });

    it("should convert goonies", () => {
      expect(
        asGrid(`
    +-O-N-+
    |     |
    |   +-I-+
@-G-O-+ | | |
    | | +-+ E
    +-+     S
            |
            x`)
      ).toStrictEqual([
        [" ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+", " ", " "],
        [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|", " ", " "],
        [" ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
        ["@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
        [" ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
        [" ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
      ]);
    });
  });
});
