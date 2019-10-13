import { inferBlankCells, _getGridIndexes, _getBlankCells } from './grid';

describe('inferBlankCell', () => {
  it('4格, 全空', () => {
    const grid = { rows: 2, cols: 2 };
    const existedCells = [] as any;
    expect(inferBlankCells(grid, existedCells)).toEqual([
      {
        x: 0,
        y: 0,
        w: 2,
        h: 2
      }
    ]);
  });

  it('4格, 空3格', () => {
    const grid = { rows: 2, cols: 2 };
    const existedCells = [{ x: 0, y: 0, w: 1, h: 1 }];
    expect(inferBlankCells(grid, existedCells)).toEqual([
      {
        x: 1,
        y: 0,
        w: 1,
        h: 2
      },
      {
        x: 0,
        y: 1,
        w: 1,
        h: 1
      }
    ]);
  });
});

describe('_getGridIndexes', () => {
  it('1格', () => {
    const grid = { rows: 2, cols: 2 };
    expect(_getGridIndexes(grid, { x: 0, y: 0, w: 1, h: 1 })).toEqual([0]);
  });

  it('2格', () => {
    const grid = { rows: 3, cols: 3 };
    expect(_getGridIndexes(grid, { x: 0, y: 0, w: 2, h: 2 })).toEqual([
      0,
      1,
      3,
      4
    ]);
  });

  it('2格, 偏移', () => {
    const grid = { rows: 3, cols: 3 };
    expect(_getGridIndexes(grid, { x: 1, y: 1, w: 2, h: 2 })).toEqual([
      4,
      5,
      7,
      8
    ]);
  });
});

describe('_getGridCells', () => {
  it('4格', () => {
    const arr = [...[0, 0], ...[1, 1]] as (0 | 1)[];
    expect(_getBlankCells(arr, 2)).toEqual([{ x: 0, y: 0, w: 2, h: 1 }]);
  });

  it('4格2', () => {
    const arr = [...[0, 0], ...[1, 0]] as (0 | 1)[];
    expect(_getBlankCells(arr, 2)).toEqual([
      {
        x: 0,
        y: 0,
        w: 2,
        h: 1
      },
      {
        x: 1,
        y: 1,
        w: 1,
        h: 1
      }
    ]);
  });

  it('9格1', () => {
    const arr = [...[1, 0, 1], ...[1, 0, 1], ...[1, 0, 1]] as (0 | 1)[];
    expect(_getBlankCells(arr, 3)).toEqual([
      {
        x: 1,
        y: 0,
        w: 1,
        h: 3
      }
    ]);
  });

  it('9格2', () => {
    const arr = [...[0, 0, 1], ...[1, 0, 1], ...[1, 0, 1]] as (0 | 1)[];
    expect(_getBlankCells(arr, 3)).toEqual([
      {
        x: 0,
        y: 0,
        w: 2,
        h: 1
      },
      {
        x: 1,
        y: 1,
        w: 1,
        h: 2
      }
    ]);
  });
});
