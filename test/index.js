// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require("chai");

const { move, moveMultiArr, moveMultiIndex, isValid } = require("../src");

describe("move-position", () => {
  it("returns the same input when params is invalid", () => {
    const input = ["a1", "b1", "c1"];

    const result1 = move(input, "0", "2");
    expect(result1).to.have.ordered.members(input);

    const result2 = move(input, 0, 10);
    expect(result2).to.have.ordered.members(input);
  });

  it("moves with mutation (default)", () => {
    const input = ["a1", "b1", "c1"];

    const result = move(input, 0, 2);

    const expected = ["b1", "c1", "a1"];

    expect(result).to.have.ordered.members(expected);
    expect(input).to.have.ordered.members(expected);
  });

  it("moves without mutation", () => {
    const input = ["a1", "b1", "c1"];

    const result = move(input, 0, 2, false);

    const expected = ["b1", "c1", "a1"];
    expect(result).to.have.ordered.members(expected);
    expect(input).to.have.ordered.members(input);
  });

  it("moves multiple arrays with mutation (default)", () => {
    const input1 = ["a1", "b1", "c1"];
    const input2 = ["a2", "b2", "c2"];

    const total = [input1, input2];

    const result = moveMultiArr(total, 2, 0);

    const expectedInput1 = ["c1", "a1", "b1"];
    const expectedInput2 = ["c2", "a2", "b2"];

    expect(result[0]).to.have.ordered.members(expectedInput1);
    expect(result[1]).to.have.ordered.members(expectedInput2);
    expect(input1).to.have.ordered.members(result[0]);
  });

  it("moves multiple arrays without mutation", () => {
    const input1 = ["a1", "b1", "c1"];
    const input2 = ["a2", "b2", "c2"];

    const total = [input1, input2];

    const result = moveMultiArr(total, 2, 0, false);

    const expectedInput1 = ["c1", "a1", "b1"];

    expect(result[0]).to.have.deep.members(expectedInput1);
    expect(input1).to.not.have.ordered.members(result[0]);
  });

  it("tests with movingMap: Apply multi changes to same array", () => {
    const input = [
      "folo-forms",
      "folo-layout",
      "folo-utils",
      "folo-withcontext",
    ];

    const movingMap = [
      { from: 2, to: 0 },
      { from: 3, to: 1 },
      { from: 1, to: 2 },
      { from: 0, to: 3 },
    ];

    const result = moveMultiIndex(input, movingMap);

    const expected = [
      "folo-utils",
      "folo-withcontext",
      "folo-layout",
      "folo-forms",
    ];

    expect(result).to.have.deep.members(expected);
  });
});

describe("tests validation", () => {
  describe("detects invalid returns false:", () => {
    it("when not array", () => {
      const result = isValid("foo");
      expect(result).to.be.equal(false);
    });

    it("when array is empty", () => {
      const result = isValid([]);
      expect(result).to.be.equal(false);
    });

    it("when from/to is out of range", () => {
      let result = isValid([1, 2, 3], { from: -4, to: 0 });
      expect(result).to.be.equal(false);

      result = isValid([1, 2, 3], { from: 4, to: 0 });
      expect(result).to.be.equal(false);

      result = isValid([1, 2, 3], { from: 1, to: 6 });
      expect(result).to.be.equal(false);

      result = isValid([1, 2, 3], { from: 1, to: -6 });
      expect(result).to.be.equal(false);
    });

    it("when from/to is not numbers", () => {
      const result = isValid([1, 2, 3], { from: "1", to: "0" });
      expect(result).to.be.equal(false);
    });
  });

  describe("detects valid returns true:", () => {
    it("when valid array", () => {
      const result = isValid([1, 2, 3], { from: 0, to: 1 });
      expect(result).to.be.equal(true);
    });
  });
});