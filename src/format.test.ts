import { formatNumber, formatPercent, formatPermillage } from './format';

it('formatNumber', () => {
  expect(formatNumber(3.333, 2)).toEqual('3.33');
});

it('formatNumber 0.33', () => {
  expect(formatNumber(0.333, 2)).toEqual('0.33');
});

it('formatPercent', () => {
  expect(formatPercent(0.552, 2)).toEqual('55.2%');
  expect(formatPercent(1.552, 0)).toEqual('155%');
});
