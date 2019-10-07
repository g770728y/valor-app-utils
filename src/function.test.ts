import {
  getFunctionParamsFromStr,
  getFunctionBodyFromStr,
  invoke
} from './function';
describe('invoke', () => {
  test('zero_parameter', () => {
    const s = 'function() { return 111 }';
    expect(invoke(s)).toEqual(111);
  });
  test('one_parameter', () => {
    const s = 'function(a) {return a +1}';
    expect(invoke(s, 1)).toEqual(2);
  });
  test('many_parameter', () => {
    const s = 'function(a,b) { return a + b } ';
    expect(invoke(s, 1, 2)).toEqual(3);
  });
});

describe('getFunctionParamsFromStr', () => {
  test('invalid', () => {
    const s = 'ction() { return 111 }';
    expect(() => getFunctionParamsFromStr(s)).toThrow();
  });
  test('zero_parameter', () => {
    const s = 'function() { return 111 }';
    expect(getFunctionParamsFromStr(s)).toEqual([]);
  });
  test('nesting', () => {
    const s = 'function() { function() {return 111} }';
    expect(getFunctionParamsFromStr(s)).toEqual([]);
  });
  test('one_parameter', () => {
    const s = 'function( a) {return a +1}';
    expect(getFunctionParamsFromStr(s)).toEqual(['a']);
  });
  test('many_parameter', () => {
    const s = 'function( a , b ) { return a + b } ';
    expect(getFunctionParamsFromStr(s)).toEqual(['a', 'b']);
  });
});

describe('getFunctionBodyFromStr', () => {
  test('one line', () => {
    const s = 'function() { return 111 }';
    expect(getFunctionBodyFromStr(s)).toEqual(` return 111 `);
  });

  test('wrap', () => {
    const s = `function() 
    { return 111 }`;
    expect(getFunctionBodyFromStr(s)).toEqual(` return 111 `);
  });

  test('three lines', () => {
    const s = `function(a) {
      return a +1
    }`;
    const body = `
      return a +1
    `;
    expect(getFunctionBodyFromStr(s)).toEqual(body);
  });
  test('many_lines', () => {
    const s = `function(a,b) {
      test;
       return a + b;
       } `;

    const body = `
      test;
       return a + b;
       `;
    expect(getFunctionBodyFromStr(s)).toEqual(body);
  });
});
