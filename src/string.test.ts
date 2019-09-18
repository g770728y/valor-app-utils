import { camel2snake, snake2camel } from './string';
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
