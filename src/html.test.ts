import { string2domNode, serializeCSSStyle } from './html';

describe('string2domNode', () => {
  it('empty', () => {
    const el = string2domNode('');
    expect(el).toEqual(null);
  });

  it('p', () => {
    const el = string2domNode('<p>111</p>');
    expect(el!.tagName.toLowerCase()).toEqual('p');
    expect(el!.textContent).toEqual('111');
  });

  it('p+b', () => {
    const el = string2domNode('<p><b>111</b></p>');
    expect(el!.tagName.toLowerCase()).toEqual('p');
    expect((el!.firstChild! as any).tagName.toLowerCase()).toEqual('b');
    expect(el!.textContent).toEqual('111');
  });
});

describe('serializeCSSStyle', () => {
  it('with tail ;', () => {
    expect(serializeCSSStyle('color:red;width:3px;')).toEqual({ color: 'red', width: '3px' });
  });
  it('without tail ;', () => {
    expect(serializeCSSStyle('color:red;width:3px')).toEqual({ color: 'red', width: '3px' });
  });
  it('only one ;', () => {
    expect(serializeCSSStyle('color:red')).toEqual({ color: 'red' });
  });
  it('nothing;', () => {
    expect(serializeCSSStyle('a')).toEqual({});
  });
});
