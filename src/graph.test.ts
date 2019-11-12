import { dagSort } from './graph';

describe('dagSort', () => {
  it('empty', () => {
    expect(dagSort([])).toEqual([]);
  });

  it('simple', () => {
    const source = [[1, [2]], [2, [3]], [3, [4]], [4, []]] as any;
    const expected = [[1], [2], [3], [4]];
    expect(dagSort(source)).toEqual(expected);
  });

  it('multi', () => {
    const source = [[1, [2, 3]], [2, [3, 4]], [3, [4]], [4, []]] as any;
    const expected = [[1], [2], [3], [4]];
    expect(dagSort(source)).toEqual(expected);
  });

  it('complex', () => {
    const source = [
      [1, [2, 3]],
      [2, [3, 4]],
      [3, [6]],
      [4, [5]],
      [5, [6]],
      [6, []]
    ] as any;

    const expected = [[1], [2], [3, 4], [5], [6]] as any;

    expect(dagSort(source)).toEqual(expected);
  });

  it('orphan', () => {
    const source = [[1, []], [2, []]] as any;
    const expected = [[1, 2]];
    expect(dagSort(source)).toEqual(expected);
  });
});
