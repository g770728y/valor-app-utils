// rollup 0.67 不支持 export * from './html'的方式

import { partialEquals } from "./common";
export { partialEquals };

import {
  isDescendant,
  insertHtmlStr_to_editableCaretContainer,
  getOffsetTo,
} from "./dom";
export { isDescendant, insertHtmlStr_to_editableCaretContainer, getOffsetTo };

import { dagSort } from "./graph";
export { dagSort };

import {
  string2domNode,
  getTextSize,
  getAttrFromHtmlStr,
  getAllSrcsFromHtmlStr,
  stripHtmlTag,
  renameTag_danger,
  extractArrayFromTable,
} from "./html";
export {
  string2domNode,
  getTextSize,
  getAttrFromHtmlStr,
  getAllSrcsFromHtmlStr,
  stripHtmlTag,
  renameTag_danger,
  extractArrayFromTable,
};

import {
  findIndexFrom,
  reAppend,
  swapByProp,
  swap,
  insertIndex,
  ArrayDiffs,
  batchMove,
  patchByDiffs,
  upsert,
  arrayCompare,
  arrayCompareBy,
  insertArround,
  insertBetween,
  padding,
  sliceBy,
  crossJoin,
  is2dArray,
  getPrevByIndex,
  getNextByIndex,
  updateBy,
  dropIndex,
} from "./array";
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
  sliceBy,
  crossJoin,
  is2dArray,
  getPrevByIndex,
  getNextByIndex,
  updateBy,
  dropIndex,
  batchMove,
};

import { min, max, sum, safeDivide, inferBlankCells } from "./math";
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
  isPlainObject,
  dissoc,
  mergeDeep,
  str2object,
  object2str,
  idMap,
} from "./object";
export {
  reverseKV,
  remove,
  removeNils,
  removeProp,
  getNumberOrElse,
  getOrElse,
  objSubtract,
  objSubtractDeep,
  isPlainObject,
  dissoc,
  mergeDeep,
  str2object,
  object2str,
  idMap,
};

import { formatNumber, formatPercent, formatPermillage } from "./format";
export { formatNumber, formatPercent, formatPermillage };

import {
  getDecendants,
  getAncestors,
  TreeContext,
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
  traverseTree,
  collectSubTree,
} from "./tree";
export {
  getDecendants,
  getAncestors,
  TreeContext,
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
  traverseTree,
  collectSubTree,
};

import {
  nextId,
  nextArrayId,
  nextStringId,
  stringIdGenerator,
  nextStrArrayId,
  ShortGuid,
} from "./id";
export {
  nextId,
  nextArrayId,
  nextStringId,
  stringIdGenerator,
  nextStrArrayId,
  ShortGuid,
};

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
  normalizeDimValue,
} from "./css";
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
  normalizeDimValue,
};

import {
  nop,
  getFunctionParamsFromStr,
  getFunctionBodyFromStr,
  invoke,
} from "./function";
export { nop, getFunctionParamsFromStr, getFunctionBodyFromStr, invoke };

import { tap, debug } from "./debug";
export { tap, debug };

import { filename, humanReadableCapacity, download, getFileExt } from "./fs";
export { filename, humanReadableCapacity, download, getFileExt };

import {
  file2DataURL,
  openFile,
  openFiles,
  blob2DataURL,
  dataURItoBlob,
  getFormDataWithDataURLField,
  getFormDataWithBlobField,
  getFormDataWithDataURLFields,
} from "./file";
export {
  file2DataURL,
  openFile,
  openFiles,
  blob2DataURL,
  dataURItoBlob,
  getFormDataWithDataURLField,
  getFormDataWithBlobField,
  getFormDataWithDataURLFields,
};

import { getImageDimension } from "./image";
export { getImageDimension };

import {
  replaceAll,
  camel2snake,
  snake2camel,
  isNumberLike,
  ensureSuffix,
  getIgnoreBlank,
  sortNo,
} from "./string";
export {
  replaceAll,
  camel2snake,
  snake2camel,
  isNumberLike,
  ensureSuffix,
  getIgnoreBlank,
  sortNo,
};

import { waitUntil } from "./promise";
export { waitUntil };

import appCache, { AppCache } from "./appCache";
export { appCache, AppCache };

import { isCopyFromWord, stripWordTag, renderCatalogNo } from "./office";
export { isCopyFromWord, stripWordTag, renderCatalogNo };

import { mockLocation, mockResizeObserver } from "./mock";
export { mockLocation, mockResizeObserver };

import { querystring } from "./querystring";
export { querystring };

import { toHzNumber, parseInt36 } from "./translate";
export { toHzNumber, parseInt36 };

import * as treeArray from "./treeArray";
export { treeArray };

import { getDateRange } from "./time";
export { getDateRange };

import { shallowEqualsArray, compareDividedCode } from "./compare";
export { shallowEqualsArray, compareDividedCode };

import { hash } from "./hash";
export { hash };

import { useEventBus } from "./eventBus";
export { useEventBus };

import { createSeqByTemplate } from "./batch";
export { createSeqByTemplate };

import { getSpanSeq } from "./table";
export { getSpanSeq };

import { getRelativePath } from "./url";
export { getRelativePath };
