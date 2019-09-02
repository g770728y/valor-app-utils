import { deserializeCSSStyle, serializeCSSStyle, condenseStyles } from './css';
describe('deserializeCSSStyle', () => {
  it('with tail ;', () => {
    expect(deserializeCSSStyle('color:red;width:3px;')).toEqual({
      color: 'red',
      width: '3px'
    });
  });
  it('with space ;', () => {
    expect(deserializeCSSStyle(' color : red ; width : 3px ;')).toEqual({
      color: 'red',
      width: '3px'
    });
  });
  it('without tail ;', () => {
    expect(deserializeCSSStyle('color:red;width:3px')).toEqual({
      color: 'red',
      width: '3px'
    });
  });
  it('only one ;', () => {
    expect(deserializeCSSStyle('color:red')).toEqual({ color: 'red' });
  });
  it('nothing;', () => {
    expect(deserializeCSSStyle('a')).toEqual({});
  });
});

describe('serializeCSSStyle', () => {
  it('common', () => {
    expect(serializeCSSStyle({ color: 'red', width: '3px' })).toEqual(
      'color:red;width:3px'
    );
  });

  it('with nil', () => {
    expect(
      serializeCSSStyle({
        color: 'red',
        width: null,
        height: undefined
      })
    ).toEqual('color:red');
  });

  it('nothing', () => {
    expect(serializeCSSStyle({})).toEqual(null);
  });
});

describe('condenseStyles', () => {
  it('empty', () => {
    expect(condenseStyles({})).toEqual({});
  });

  it('text-align', () => {
    expect(condenseStyles({ 'text-align': 'start' } as any)).toEqual({
      'text-align': 'start'
    });
    expect(condenseStyles({ 'text-align': 'left' } as any)).toEqual({});
  });

  it('text-indent', () => {
    expect(condenseStyles({ 'text-indent': '0px' } as any)).toEqual({});
    expect(condenseStyles({ textIndent: '3px' } as any)).toEqual({
      textIndent: '3px'
    });

    expect(condenseStyles({ 'text-indent': '' } as any)).toEqual({});
  });
});
