import {
  string2domNode,
  deserializeCSSStyle,
  getAttrFromHtmlStr,
  getAllSrcsFromHtmlStr,
  stripHtmlTag,
  serializeCSSStyle
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

describe('deserializeCSSStyle', () => {
  it('with tail ;', () => {
    expect(deserializeCSSStyle('color:red;width:3px;')).toEqual({
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

describe('stripHtmlTag', () => {
  const html1 = '<a>11</a>';
  it('common', () => expect(stripHtmlTag(html1)).toEqual('11'));

  const html2 = "a <a href=''>  测试 </a> <b>33</b>";
  it('消除> <间的空格', () =>
    expect(stripHtmlTag(html2)).toEqual('a   测试 33'));

  const html3 = `
    <a >11 1</a> <img src=''/>
  `;
  it('消除前后空白', () => expect(stripHtmlTag(html3)).toEqual('11 1'));
});
