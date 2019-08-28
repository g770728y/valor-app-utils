import { sum, max } from './math';

it('sum', () => {
  expect(sum([])).toEqual(0);
  expect(sum([1, 2, 3])).toEqual(6);
  expect(sum([1 / 0, 4, 5])).toEqual(9);
  expect(sum([3, parseFloat('x'), 5])).toEqual(8);
  expect(sum([undefined, null, 5, 6])).toEqual(11);
});

describe('max', () => {
  it('0个元素', () => expect(max([])).toEqual(-Infinity));

  it('0个元素, 但有default', () => expect(max([], 0)).toEqual(0));
});
