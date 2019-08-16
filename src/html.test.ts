import { string2domNode, serializeCSSStyle, getAttrFromHtmlStr } from './html';

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
    expect(serializeCSSStyle('color:red;width:3px;')).toEqual({
      color: 'red',
      width: '3px'
    });
  });
  it('without tail ;', () => {
    expect(serializeCSSStyle('color:red;width:3px')).toEqual({
      color: 'red',
      width: '3px'
    });
  });
  it('only one ;', () => {
    expect(serializeCSSStyle('color:red')).toEqual({ color: 'red' });
  });
  it('nothing;', () => {
    expect(serializeCSSStyle('a')).toEqual({});
  });
});

describe('getAttrFromHtmlStr', () => {
  it('src', () =>
    expect(
      getAttrFromHtmlStr("<img src='http://www.163.com'/>", 'src')
    ).toEqual('http://www.163.com'));

  it('src,双引号', () =>
    expect(
      getAttrFromHtmlStr('<img src="http://www.163.com"/>', 'src')
    ).toEqual('http://www.163.com'));

  it('src,有空格', () =>
    expect(
      getAttrFromHtmlStr("<img src =   'http://www.163.com' />", 'src')
    ).toEqual('http://www.163.com'));

  it('src, 无匹配', () =>
    expect(getAttrFromHtmlStr('<img />', 'src')).toEqual(null));

  it('更多', () =>
    expect(
      getAttrFromHtmlStr(
        '<img src="http://localhost:3000/aaa.jpg" style="width:300px"/>',
        'src'
      )
    ).toEqual('http://localhost:3000/aaa.jpg'));
});
