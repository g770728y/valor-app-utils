import { camel2snake, snake2camel, isNumberLike, ensureSuffix } from './string';
describe('camel2snake', () => {
  test('common', () => {
    expect(camel2snake('textIndex')).toEqual('text-index');
    expect(camel2snake('TextIndex')).toEqual('text-index');
    expect(camel2snake('textIndexIndex')).toEqual('text-index-index');
  });
});

describe('snake2camel', () => {
  test('common', () => {
    expect(snake2camel('text-index')).toEqual('textIndex');
    expect(snake2camel('text-index-index')).toEqual('textIndexIndex');
  });
});

describe('isNumberLike', () => {
  test('number', () => {
    expect(isNumberLike(3)).toBe(true);
    expect(isNumberLike(3.0)).toBe(true);
  });

  test('number string', () => {
    expect(isNumberLike('3')).toBe(true);
    expect(isNumberLike('3.0')).toBe(true);
    expect(isNumberLike('3.0%')).toBe(false);
  });
});

describe('ensureSuffix', () => {
  test('number', () => {
    expect(ensureSuffix(3, 'px')).toEqual('3px');
    expect(ensureSuffix(3.0, 'px')).toEqual('3px');
  });

  test('blank', () => {
    expect(ensureSuffix(null, 'px')).toEqual(undefined);
    expect(ensureSuffix(undefined, 'px')).toEqual(undefined);
  });

  test('blank', () => {
    expect(ensureSuffix('', 'px')).toEqual(undefined);
    expect(ensureSuffix('3', 'px')).toEqual('3px');
    expect(ensureSuffix('-', 'px')).toEqual(undefined);
    expect(ensureSuffix('30-3', 'px')).toEqual(undefined);
    expect(ensureSuffix('30px', 'px')).toEqual('30px');
  });
});
