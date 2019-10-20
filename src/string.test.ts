import { camel2snake, snake2camel, isNumberLike } from './string';
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
