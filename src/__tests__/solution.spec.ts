import { solution } from "@challenge/solution";

describe("Solution", () => {
  it("should work for basic example", () => {
    const input = `
@---A---+
        |
x-B-+   C
    |   |
    +---+`;
    expect(solution(input)).toBe("ACB");
  });

  it("should go straight through intersections", () => {
    const input = `
@
| +-C--+
A |    |
+---B--+
  |      x
  |      |
  +---D--+`;
    expect(solution(input)).toBe("ABCD");
  });

  it("should find letters on turns", () => {
    const input = `
@---A---+
        |
x-B-+   |
    |   |
    +---C`;
    expect(solution(input)).toBe("ACB");
  });

  it("should not collect a letter from the same location twice", () => {
    const input = `
    +-O-N-+
    |     |
    |   +-I-+
@-G-O-+ | | |
    | | +-+ E
    +-+     S
            |
            x`;
    expect(solution(input)).toBe("GOONIES");
  });

  it("should keep direction, even in compact space", () => {
    const input = `
 +-L-+
 |  +A-+
@B+ ++ H
 ++    x`;
    expect(solution(input)).toBe("BLAH");
  });

  it("should ignore stuff after end of path", () => {
    const input = `
@-A--+
     |
     +-B--x-C--D`;
    expect(solution(input)).toBe("AB");
  });

  it("should throw error if missing start character", () => {
    const input = `
   -A---+
        |
x-B-+   C
    |   |
    +---+`;
    expect(() => solution(input)).toThrowError("@ not found!");
  });

  it("should throw error if missing end character", () => {
    const input = `
@--A---+
      |
B-+   C
  |   |
  +---+`;
    expect(() => solution(input)).toThrowError("x not found!");
  });

  it("should throw error if multiple starts", () => {
    const input = `
 @--A-@-+
        |
x-B-+   C
    |   |
    +---+`;
    expect(() => solution(input)).toThrowError("Multiple @ found!");
  });

  it("should throw error if fork in path", () => {
    const input = `
     x-B
       |
@--A---+
       |
  x+   C
   |   |
   +---+`;
    expect(() => solution(input)).toThrowError("Multiple x found!");
  });

  it("should throw error if broken path", () => {
    const input = `
@--A-+
    |

    B-x`;
    expect(() => solution(input)).toThrowError("Out of moves!");
  });

  it("should throw error if multiple starting paths", () => {
    const input = `x-B-@-A-x`;
    expect(() => solution(input)).toThrowError("Multiple x found!");
  });

  it("should throw error if fake turn", () => {
    const input = `@-A-+-B-x`;
    expect(() => solution(input)).toThrowError("Out of moves!");
  });
});
