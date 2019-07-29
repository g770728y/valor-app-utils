import * as React from 'react';
import { reverseKV, removeNils } from './object';

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
    expect(removeNils({ a: 1, b: null, c: undefined, d: '' })).toEqual({ a: 1, d: '' });
    expect(removeNils({ a: 1, b: null, c: undefined, d: '' }, { removeBlank: true })).toEqual({
      a: 1,
    });
    expect(removeNils({ a: 1, b: null, c: undefined, d: {} }, { removeEmpty: true })).toEqual({
      a: 1,
    });
  });
});
