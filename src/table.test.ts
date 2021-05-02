import { getSpanSeq } from "./table";
describe("getRowSpanSeq", () => {
  const arr = [
    { id: 1, label: "x1", title: "y" },
    { id: 2, label: "x1", title: "y" },
    { id: 3, label: "x", title: "y1" },
    { id: 4, label: "x", title: "y" },
    { id: 5, label: "x", title: "y" },
  ];
  it("case0", () => {
    const comparer = (a1: any, a2: any) =>
      a1.label === a2.label && a1.title === a2.title;

    expect(getSpanSeq([] as any, comparer)).toEqual([]);

    expect(getSpanSeq(arr, comparer)).toEqual([2, 0, 1, 2, 0]);
  });
});
