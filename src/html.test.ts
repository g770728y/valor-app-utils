import {
  string2domNode,
  serializeCSSStyle,
  getAttrFromHtmlStr,
  getAllSrcsFromHtmlStr
} from './html';

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

describe('getAllSrcsFromHtmlStr', () => {
  const src1 = 'http://localhost:999/abc?a';
  const src2 = 'http://localhost:888/abc?b';

  const html1 = `adfsa<img src=\"${src1}\" /> dsdfaf`;
  const result1 = getAllSrcsFromHtmlStr(html1);
  it('1个', () => expect(result1).toEqual([src1]));

  const html2 = `adfsa<img src=\"${src1}\" /> ds \n <img src='${src2}' />dfaf`;
  const result2 = getAllSrcsFromHtmlStr(html2);
  it('2个', () => expect(result2).toEqual([src1, src2]));
});
