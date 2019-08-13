import * as React from 'react';
import { reverseKV, removeNils, objSubtract } from './object';

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
