import {
  reverseKV,
  removeNils,
  objSubtract,
  getOrElse,
  getNumberOrElse,
  isPlainObject,
  objSubtractDeep,
  removeProp
} from './object';

describe('isPlainObject', () => {
  it('null', () => expect(isPlainObject(null)).toBe(false));
  it('undefined', () => expect(isPlainObject(undefined)).toBe(false));
  it('number', () => expect(isPlainObject(3)).toBe(false));
  it('string', () => expect(isPlainObject('3')).toBe(false));
  it('function', () => expect(isPlainObject(function() {})).toBe(false));
  it('lambda', () => expect(isPlainObject(() => {})).toBe(false));
  it('array', () => expect(isPlainObject([])).toBe(false));
  it('object create null', () =>
    expect(isPlainObject(Object.create(null))).toBe(false));
  it('object create', () => expect(isPlainObject({})).toBe(true));
  it('object', () => expect(isPlainObject({})).toBe(true));
});

describe('reverseKV', () => {
  it('empty', () => {
    expect(reverseKV({})).toEqual({});
  });

  it('value is string', () => {
    expect(reverseKV({ a: '1', b: '2' })).toEqual({ 1: 'a', 2: 'b' });
  });

  it('value has number, boolean', () => {
    expect(reverseKV({ a: true, b: 2 })).toEqual({ true: 'a', 2: 'b' });
  });
});

describe('removeNils', () => {
  it('common', () => {
    expect(removeNils({})).toEqual({});
    expect(removeNils({ a: 1, b: null, c: undefined, d: '' })).toEqual({
      a: 1,
      d: ''
    });
    expect(
      removeNils({ a: 1, b: null, c: undefined, d: '' }, { removeBlank: true })
    ).toEqual({
      a: 1
    });
    expect(
      removeNils({ a: 1, b: null, c: undefined, d: {} }, { removeEmpty: true })
    ).toEqual({
      a: 1
    });
  });
});

describe('removeProp', () => {
  it('common', () => {
    expect(removeProp({}, 'a')).toEqual({});
    expect(removeProp({ a: [] }, 'a')).toEqual({});
    expect(removeProp({ a: { b: 1 }, a1: 1 }, 'a')).toEqual({ a1: 1 });
    expect(removeProp({ a: { b: 1 }, a1: { a: 2 } }, 'a')).toEqual({
      a1: { a: 2 }
    });
    expect(removeProp({ b: [{ a: 1, b: [{ a: 1 }] }, { b: 2 }] }, 'a')).toEqual(
      {
        b: [{ a: 1, b: [{ a: 1 }] }, { b: 2 }]
      }
    );
  });

  it('recursive', () => {
    expect(
      removeProp({ a: { b: 1 }, a1: { a: 2 } }, 'a', { recursive: true })
    ).toEqual({ a1: {} });
    expect(
      removeProp({ b: [{ a: 1, b: [{ a: 1 }] }, { b: 2 }] }, 'a', {
        recursive: true
      })
    ).toEqual({ b: [{ b: [{}] }, { b: 2 }] });
  });
});

describe('objSubtract', () => {
  it('same', () => expect(objSubtract({}, {})).toEqual({}));

  it('右侧多', () => expect(objSubtract({ b: 2 }, { a: 1, b: 2 })).toEqual({}));

  it('左侧多', () =>
    expect(objSubtract({ a: 1, b: 2 }, { a: 1 })).toEqual({ b: 2 }));

  it('右侧与左侧不同', () =>
    expect(objSubtract({ a: 2 }, { a: 1 })).toEqual({ a: 2 }));

  it('需要保留id', () =>
    expect(objSubtract({ a: 2, id: 1 }, { a: 1, id: 1 })).toEqual({
      id: 1,
      a: 2
    }));

  it('只剩下id', () => {
    expect(objSubtract({ a: 1, id: 1 }, { a: 1, id: 1 })).toEqual({
      id: 1
    });
  });

  it('复杂', () =>
    expect(objSubtract({ a: 2, b: [2, 3], c: 5 }, { a: 1, b: [1, 2] })).toEqual(
      { a: 2, b: [2, 3], c: 5 }
    ));
});

describe('objSubtractDeep recusive', () => {
  it('1 layer -> 1 layer, equals', () =>
    expect(objSubtractDeep({ a: 1, b: 2 }, { a: 1, b: 2 })).toEqual({}));
  it('1 layer -> 1 layer, equals, removeNil', () =>
    expect(
      objSubtractDeep({ a: 1, b: undefined }, { a: 1 }, { removeNil: true })
    ).toEqual({}));
  it('1 layer -> 1 layer, equals, removeEmpty', () =>
    expect(objSubtractDeep({ a: 1, b: [] }, { a: 1 })).toEqual({}));
  it('1 layer -> 1 layer, equals, !removeEmpty', () =>
    expect(
      objSubtractDeep(
        { a: 1, b: [], c: { c1: {} } },
        { a: 1, c: { c1: {} } },
        { removeEmpty: false }
      )
    ).toEqual({ b: [] }));

  it('1 layer -> 1 layer, equals, !removeEmpty2', () =>
    expect(
      objSubtractDeep(
        {
          id: 'slot102',
          type: 'slot',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }
          }
        },
        {
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }
          }
        },
        { removeEmpty: true }
      )
    ).toEqual({
      id: 'slot102',
      type: 'slot'
    }));

  it('1 layer -> 1 layer, equals, removeBlank', () =>
    expect(
      objSubtractDeep({ a: 1, b: '' }, { a: 1 }, { removeBlank: true })
    ).toEqual({}));
  it('1 layer -> 1 layer, equals, removeNil', () =>
    expect(
      objSubtractDeep({ a: 1, b: undefined }, { a: 1 }, { removeNil: true })
    ).toEqual({}));
  it('1 layer -> 1 layer', () =>
    expect(objSubtractDeep({ a: 1, b: 2 }, { a: 2, b: 2 })).toEqual({ a: 1 }));
  it('2 layers -> 1 layer', () =>
    expect(objSubtract({ a: { a1: 1, a2: 2 }, b: 2 }, { a: 2, b: 2 })).toEqual({
      a: { a1: 1, a2: 2 }
    }));
  it('2 layers -> 2 layer, empty', () =>
    expect(
      objSubtractDeep(
        { a: { a1: 1, a2: 2 }, b: 2 },
        { a: { a1: 1, a2: 2 }, b: 2 }
      )
    ).toEqual({}));
  it('2 layers -> 2 layer', () =>
    expect(
      objSubtractDeep(
        { a: { a1: 1, a2: 2 }, b: 2 },
        { a: { a1: 1, a2: 3 }, b: 2 }
      )
    ).toEqual({ a: { a2: 2 } }));
  it('2 layers -> 3 layer', () =>
    expect(
      objSubtractDeep(
        { a: { a1: { a11: 1, a12: 2 }, a2: 2 }, b: 2 },
        { a: { a1: 1, a2: 3 }, b: 2 }
      )
    ).toEqual({ a: { a1: { a11: 1, a12: 2 }, a2: 2 } }));
  it('3 layers -> 2 layer', () =>
    expect(
      objSubtractDeep(
        { a: { a1: 1, a2: 3 }, b: 2 },
        { a: { a1: { a11: 1, a12: 2 }, a2: 2 }, b: 2 }
      )
    ).toEqual({ a: { a1: 1, a2: 3 } }));
});

describe('getOrElse', () => {
  it('without default', () =>
    expect(getOrElse({ a: 1, b: 2 }, 'a')).toEqual(1));
  it('without default2', () =>
    expect(getOrElse({ a: 1, b: 2 }, 'c' as any)).toEqual(undefined));
  it('with default', () =>
    expect(getOrElse({ a: 1, b: 2 }, 'c' as any, 3)).toEqual(3));
});

describe('getNumberOrElse', () => {
  it('without default', () =>
    expect(getNumberOrElse({ a: 1 }, 'a')).toEqual(1));
  it('with default2', () =>
    expect(getNumberOrElse({ a: 1 }, 'c' as any, 2)).toEqual(2));
  it('without default', () =>
    expect(getNumberOrElse({ a: '1px' }, 'a')).toEqual(1));
});
