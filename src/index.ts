// rollup 0.67 不支持 export * from './html'的方式
import { isDescendant } from './dom';
export { isDescendant };

import {
  string2domNode,
  getTextSize,
  getAttrFromHtmlStr,
  getAllSrcsFromHtmlStr,
  stripHtmlTag,
  renameTag_danger
} from './html';
export {
  string2domNode,
  getTextSize,
  getAttrFromHtmlStr,
  getAllSrcsFromHtmlStr,
  stripHtmlTag,
  renameTag_danger
};

import {
  findIndexFrom,
  reAppend,
  swapByProp,
  swap,
  insertIndex,
  ArrayDiffs,
  patchByDiffs,
  upsert,
  arrayCompare,
  arrayCompareBy,
  insertArround,
  insertBetween,
  padding,
  sliceBy
} from './array';
export {
  findIndexFrom,
  reAppend,
  swapByProp,
  swap,
  insertIndex,
  ArrayDiffs,
  patchByDiffs,
  upsert,
  arrayCompare,
  arrayCompareBy,
  insertArround,
  insertBetween,
  padding,
  sliceBy
};

import { min, max, sum, safeDivide, inferBlankCells } from './math';
export { min, max, sum, safeDivide, inferBlankCells };

import {
  reverseKV,
  remove,
  removeNils,
  removeProp,
  getNumberOrElse,
  getOrElse,
  objSubtract,
  objSubtractDeep,
  isPlainObject
} from './object';
export {
  reverseKV,
  remove,
  removeNils,
  removeProp,
  getNumberOrElse,
  getOrElse,
  objSubtract,
  objSubtractDeep,
  isPlainObject
};

import { formatNumber, formatPercent, formatPermillage } from './format';
export { formatNumber, formatPercent, formatPermillage };

import {
  TreeNode,
  NodeContext,
  NamingStrategy,
  getTreeContexts,
  createTreeNode,
  deleteTreeNode,
  replaceTreeNode,
  findTreeNode,
  mapTreeNode,
  moveTreeNodeDown,
  moveTreeNodeUp,
  pushTreeNodeLeft,
  pushTreeNodeRight,
  array2tree_byLevel,
  array2tree_byPid,
  tree2Array,
  traverseTree
} from './tree';
export {
  TreeNode,
  NodeContext,
  NamingStrategy,
  getTreeContexts,
  createTreeNode,
  deleteTreeNode,
  replaceTreeNode,
  findTreeNode,
  mapTreeNode,
  moveTreeNodeDown,
  moveTreeNodeUp,
  pushTreeNodeLeft,
  pushTreeNodeRight,
  array2tree_byLevel,
  array2tree_byPid,
  tree2Array,
  traverseTree
};

import {
  nextId,
  nextArrayId,
  nextStringId,
  stringIdGenerator,
  nextStrArrayId
} from './id';
export { nextId, nextArrayId, nextStringId, stringIdGenerator, nextStrArrayId };

import {
  css,
  highlight,
  serializeCSSStyle,
  deserializeCSSStyle,
  condenseStyles,
  getMarginFromStyle,
  reactStyle2style,
  style2ReactStyle,
  isDimStyleKey,
  normalizeReactStyle,
  normalizeDimValue
} from './css';
export {
  css,
  highlight,
  serializeCSSStyle,
  deserializeCSSStyle,
  condenseStyles,
  getMarginFromStyle,
  reactStyle2style,
  style2ReactStyle,
  isDimStyleKey,
  normalizeReactStyle,
  normalizeDimValue
};

import {
  nop,
  getFunctionParamsFromStr,
  getFunctionBodyFromStr,
  invoke
} from './function';
export { nop, getFunctionParamsFromStr, getFunctionBodyFromStr, invoke };

import { tap } from './debug';
export { tap };

import { filename, humanReadableCapacity, download, getFileExt } from './fs';
export { filename, humanReadableCapacity, download, getFileExt };

import {
  file2DataURL,
  openFile,
  dataURItoBlob,
  getFormDataWithDataURLField
} from './file';
export { file2DataURL, openFile, dataURItoBlob, getFormDataWithDataURLField };

import { getImageDimension } from './image';
export { getImageDimension };

import {
  replaceAll,
  camel2snake,
  snake2camel,
  isNumberLike,
  ensureSuffix
} from './string';
export { replaceAll, camel2snake, snake2camel, isNumberLike, ensureSuffix };

import { waitUntil } from './promise';
export { waitUntil };

import appCache, { AppCache } from './appCache';
export { appCache, AppCache };
