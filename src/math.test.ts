import { sum } from './math';

it('sum', () => {
  expect(sum([])).toEqual(0);
  expect(sum([1, 2, 3])).toEqual(6);
  expect(sum([1 / 0, 4, 5])).toEqual(9);
  expect(sum([3, parseFloat('x'), 5])).toEqual(8);
  expect(sum([undefined, null, 5, 6])).toEqual(11);
});
