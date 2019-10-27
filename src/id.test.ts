import { nextId, nextArrayId, nextStringId, nextStrArrayId } from './id';

describe('next-array-id', () => {
  it('0', () => expect(nextArrayId([])).toEqual(1));
  it('1', () =>
    expect(nextArrayId([{ id: 3, c: 1 }, { id: 4, c: 2 }])).toEqual(5));
});

describe('next-strArray-id', () => {
  it('empty', () => expect(nextStrArrayId([], 'x', ':')).toEqual('x:1'));
  it('zhang', () => {
    expect(
      nextStrArrayId(['zhang_1', 'zhang_3', 'wang_4', 'wang_2'], 'zhang', '_')
    ).toEqual('zhang_4');
  });
  it('wang', () => {
    expect(
      nextStrArrayId(['zhang_1', 'zhang_3', 'wang_4', 'wang_2'], 'wang', '_')
    ).toEqual('wang_5');
  });

  it('排除无效值', () => {
    expect(
      nextStrArrayId(['zhang_1', 'zhang_3', 'zhang_', '_zhang'], 'zhang', '_')
    ).toEqual('zhang_4');
    expect(
      nextStrArrayId(['zhang_1', 'zhang_3', 'zhang_xx'], 'zhang', '_')
    ).toEqual('zhang_4');
  });
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
