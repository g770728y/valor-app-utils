import { nextId, nextArrayId, nextStringId } from './id';

describe('next-array-id', () => {
  it('0', () => expect(nextArrayId([])).toEqual(1));
  it('1', () =>
    expect(nextArrayId([{ id: 3, c: 1 }, { id: 4, c: 2 }])).toEqual(5));
});

describe('next-id', () => {
  it('0', () => expect(nextId()).toEqual(1));
  it('1', () => expect(nextId()).toEqual(2));
  it('2', () => expect(nextId()).toEqual(3));
});

describe('next-string-id', () => {
  it('0', () => expect(nextStringId()).toEqual('id_1'));
  it('1', () => expect(nextStringId()).toEqual('id_2'));
  it('2', () => expect(nextStringId('prefix_')).toEqual('prefix_3'));
});
