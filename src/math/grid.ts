import * as R from 'rambda';
import * as Rx from 'rambdax';
import { findIndexFrom } from '../array';

export interface Cell {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Grid {
  rows: number;
  cols: number;
}

/**
 * 推断空白占位的单位格 ( 排除 existedCells)
 * 比如 [[0, 1], [0, 1]] 将推断出一个单元格: {x:0,y:0, w:1, h:2}
 * 不止推断出单元格, 而且将相邻单元格进行组合
 * 场景: react-grid-layout 判断哪些位置可以插入
 * @param grid 网格尺寸
 * @param cell 存在的单元格
 */
export function inferBlankCells(grid: Grid, existedCells: Cell[]): Cell[] {
  const emptyGrid: (0 | 1)[] = new Array(grid.rows * grid.cols).fill(0);

  // 准备数据 ( 将cell已填充的单元格, 全部置1 )
  const filledIndexes: number[] = R.flatten(
    existedCells.map(it => _getGridIndexes(grid, it))
  ) as any;
  const filledGridAsArray = filledIndexes.reduce(
    (acc, idx) => R.update(idx, 1, acc),
    emptyGrid
  );

  // 发起递归, 一次次查找空白单元格
  return _getBlankCells(filledGridAsArray, grid.cols);
}

/**
 * 获取一个cell在grid构造的一维数组中的 indexes
 * 注意: cell可能跨行 & 跨列
 */
export function _getGridIndexes(grid: Grid, cell: Cell): number[] {
  const startIndexInRow = (cell.y * grid.cols + cell.x) % grid.cols;
  const indexes = R.range(cell.y, cell.y + cell.h).map(row =>
    R.range(
      row * grid.cols + startIndexInRow,
      row * grid.cols + startIndexInRow + cell.w
    )
  );
  return R.flatten(indexes) as any;
}

/**
 * 在arr形成的grid中, 构造空白单元格
 * 算法上是一次次从头查找
 * @param arr 与 cols共同构造二维数组 grid
 * @param cols 列数
 * @param cells 已构造的cell
 */
export function _getBlankCells(
  arr: (0 | 1)[],
  cols: number,
  cells?: Cell[]
): Cell[] {
  // 如果没有空白单元格, 则返回cells
  const startIndexInArr = arr.findIndex(n => n === 0);
  if (startIndexInArr < 0) return cells || [];

  // 有空白单元格, 则找到cell.w, 然后从当前行向下递归找cell.h
  const rowIndex = (startIndexInArr / cols) | 0;
  let toIndexInArr = findIndexFrom(arr, startIndexInArr, n => n === 1);
  toIndexInArr =
    toIndexInArr < 0 || toIndexInArr > (rowIndex + 1) * cols - 1
      ? (rowIndex + 1) * cols - 1
      : toIndexInArr - 1;
  const cell = _getContinueCell(arr, rowIndex + 1, cols, {
    x: startIndexInArr % cols,
    y: rowIndex,
    w: toIndexInArr - startIndexInArr + 1,
    h: 1
  });

  // 已经找到的cell填1
  const newArr = _getGridIndexes(
    { rows: arr.length / cols, cols },
    cell
  ).reduce((acc, idx) => R.update(idx, 1, acc), arr);

  return _getBlankCells(newArr, cols, [...(cells || []), cell]);
}

/**
 * 已知arr, 已知从第fromRowIndex中找到空白单元格, 但只能填充{x,y,w}, h 需要一行行向下递归才能找到
 * 从fromRowIndex向下递归, 如果次行 也存在与cell完全平行的行, 则h + 1
 * @param arr 用于与cols共同构造二维数组
 * @param fromRowIndex 从第几行开始(注意是次行)
 * @param cols 一行的列数
 * @param cell 需要向下查找的cell (如果cell的x,y,w能在次行找到匹配 ,则 cell.h+1)
 */
function _getContinueCell(
  arr: (0 | 1)[],
  fromRowIndex: number,
  cols: number,
  cell: Cell
): Cell {
  if (fromRowIndex >= ((arr.length / cols) | 0)) {
    return cell;
  }

  const startIndexInArr = fromRowIndex * cols + cell.x;
  const toIndexInArr = fromRowIndex * cols + cell.x + cell.w;
  const matched =
    !R.isEmpty(arr) &&
    arr.slice(startIndexInArr, toIndexInArr).every(it => it === 0);

  return matched
    ? _getContinueCell(arr, fromRowIndex + 1, cols, {
        ...cell,
        h: cell.h + 1
      })
    : { ...cell };
}
