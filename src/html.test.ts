import {
  string2domNode,
  getAttrFromHtmlStr,
  getAllSrcsFromHtmlStr,
  stripHtmlTag,
  renameTag_danger
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

describe('renameTag', () => {
  const html1 = '<table><tr><td>1</td></tr></table>';
  const result1 = '<table><tbody><tr><th>1</th></tr></tbody></table>';
  it('simple', () =>
    expect(
      renameTag_danger(string2domNode(html1, true), 'td', 'th').innerHTML
    ).toEqual(result1));

  const html2 =
    '<table><tr><td colspan="2" rowspan="3" style="color:red">2</td></tr></table>';
  const result2 =
    '<table><tbody><tr><th colspan="2" rowspan="3" style="color:red">2</th></tr></tbody></table>';
  it('colspan不变', () =>
    expect(
      renameTag_danger(string2domNode(html2, true), 'td', 'th').innerHTML
    ).toEqual(result2));

  const html3 =
    '<div data-a="1"><div data-a="2"><div data-a="3"></div></div><div data-a="4"></div></div>';
  const result3 =
    '<span data-a="1"><span data-a="2"><span data-a="3"></span></span><span data-a="4"></span></span>';
  it('嵌套情况', () =>
    expect(
      renameTag_danger(string2domNode(html3, true), 'div[data-a]', 'span')
        .innerHTML
    ).toEqual(result3));
});
