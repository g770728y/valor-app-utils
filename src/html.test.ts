import {
  string2domNode,
  getAttrFromHtmlStr,
  getAllSrcsFromHtmlStr,
  stripHtmlTag,
  renameTag_danger,
  extractArrayFromTable,
} from "./html";

describe("string2domNode", () => {
  it("empty", () => {
    const el = string2domNode("");
    expect(el).toEqual(null);
  });

  it("p", () => {
    const el = string2domNode("<p>111</p>");
    expect(el!.tagName.toLowerCase()).toEqual("p");
    expect(el!.textContent).toEqual("111");
  });

  it("p+b", () => {
    const el = string2domNode("<p><b>111</b></p>");
    expect(el!.tagName.toLowerCase()).toEqual("p");
    expect((el!.firstChild! as any).tagName.toLowerCase()).toEqual("b");
    expect(el!.textContent).toEqual("111");
  });
});

describe("getAttrFromHtmlStr", () => {
  it("src", () =>
    expect(
      getAttrFromHtmlStr("<img src='http://www.163.com'/>", "src")
    ).toEqual("http://www.163.com"));

  it("src,双引号", () =>
    expect(
      getAttrFromHtmlStr('<img src="http://www.163.com"/>', "src")
    ).toEqual("http://www.163.com"));

  it("src,有空格", () =>
    expect(
      getAttrFromHtmlStr("<img src =   'http://www.163.com' />", "src")
    ).toEqual("http://www.163.com"));

  it("src, 无匹配", () =>
    expect(getAttrFromHtmlStr("<img />", "src")).toEqual(null));

  it("更多", () =>
    expect(
      getAttrFromHtmlStr(
        '<img src="http://localhost:3000/aaa.jpg" style="width:300px"/>',
        "src"
      )
    ).toEqual("http://localhost:3000/aaa.jpg"));
});

describe("getAllSrcsFromHtmlStr", () => {
  const src1 = "http://localhost:999/abc?a";
  const src2 = "http://localhost:888/abc?b";

  const html1 = `adfsa<img src=\"${src1}\" /> dsdfaf`;
  const result1 = getAllSrcsFromHtmlStr(html1);
  it("1个", () => expect(result1).toEqual([src1]));

  const html2 = `adfsa<img src=\"${src1}\" /> ds \n <img src='${src2}' />dfaf`;
  const result2 = getAllSrcsFromHtmlStr(html2);
  it("2个", () => expect(result2).toEqual([src1, src2]));
});

describe("stripHtmlTag", () => {
  const htmlWithStyle = `<style>
  .a {}
  .b {}
  </style>11`;
  it("withStyle", () => expect(stripHtmlTag(htmlWithStyle)).toEqual("11"));
  const htmlWithScript = `<script>
  .a {}
  .b {}
  </script>11`;
  it("withScript", () => expect(stripHtmlTag(htmlWithScript)).toEqual("11"));
  const html1 = "<a>11</a>";
  it("common", () => expect(stripHtmlTag(html1)).toEqual("11"));

  const html2 = "a <a href=''>  测试 </a> <b>33</b>";
  it("消除> <间的空格", () =>
    expect(stripHtmlTag(html2)).toEqual("a   测试 33"));

  const html3 = `
    <a >11 1</a> <img src=''/>
  `;
  it("消除前后空白", () => expect(stripHtmlTag(html3)).toEqual("11 1"));

  const html4 = `
a
b`;
  it("保留换行", () => expect(stripHtmlTag(html4)).toEqual("\na\nb"));
});

describe("renameTag", () => {
  const html1 = "<table><tr><td>1</td></tr></table>";
  const result1 = "<table><tbody><tr><th>1</th></tr></tbody></table>";
  it("simple", () =>
    expect(
      renameTag_danger(string2domNode(html1, true), "td", "th").innerHTML
    ).toEqual(result1));

  const html2 =
    '<table><tr><td colspan="2" rowspan="3" style="color:red">2</td></tr></table>';
  const result2 =
    '<table><tbody><tr><th colspan="2" rowspan="3" style="color:red">2</th></tr></tbody></table>';
  it("colspan不变", () =>
    expect(
      renameTag_danger(string2domNode(html2, true), "td", "th").innerHTML
    ).toEqual(result2));

  const html3 =
    '<div data-a="1"><div data-a="2"><div data-a="3"></div></div><div data-a="4"></div></div>';
  const result3 =
    '<span data-a="1"><span data-a="2"><span data-a="3"></span></span><span data-a="4"></span></span>';
  it("嵌套情况", () =>
    expect(
      renameTag_danger(string2domNode(html3, true), "div[data-a]", "span")
        .innerHTML
    ).toEqual(result3));
});

const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Style-Type" content="text/css">
<title></title>
<meta name="Generator" content="Cocoa HTML Writer">
<meta name="CocoaVersion" content="1894.6">
<style type="text/css">
p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; text-align: center; font: 10.0px Helvetica; color: #ff0000}
p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; text-align: center; font: 10.0px Helvetica}
table.t1 {border-collapse: collapse}
td.td1 {border-style: solid; border-width: 0.8px 0.8px 0.8px 0.8px; border-color: #000000 #000000 #000000 #000000; padding: 0.0px 5.0px 0.0px 5.0px}
</style>
</head>
<body>
<table cellspacing="0" cellpadding="0" class="t1">
<tbody>
<tr>
<td valign="middle" class="td1">
<p class="p1">开工至上年度产值</p>
</td>
<td valign="middle" class="td1">
<p class="p1">本月</p>
</td>
</tr>
<tr>
<td valign="middle" class="td1">
<p class="p2">1.1</p>
</td>
<td valign="middle" class="td1">
<p class="p2">1.2</p>
</td>
</tr>
<tr>
<td valign="middle" class="td1">
<p class="p2"><span class="Apple-converted-space">         </span>810,400.00<span class="Apple-converted-space"> </span></p>
</td>
<td valign="middle" class="td1">
<p class="p2">18719762.13</p>
</td>
</tr>
</tbody>
</table>
</body>
</html>`;
describe("extractArrayFromTable", () => {
  it("case0", () => {
    const result = null as any;
    expect(extractArrayFromTable(null as any)).toEqual(result);
    expect(extractArrayFromTable("")).toEqual(result);
    expect(extractArrayFromTable("<html></html>")).toEqual(result);
  });

  it("case1: 返回空表", () => {
    const result = [] as any;
    expect(extractArrayFromTable("<html><Table></table></html>")).toEqual(
      result
    );
  });

  it("case2:不支持rowspan/colspan", () => {
    expect(() =>
      extractArrayFromTable(
        "<html><table><tr><td rowspan=2></td></tr></table></html>"
      )
    ).toThrow();
  });

  it("case3:多行", () => {
    const result = [["1"], ["1"]];
    expect(
      extractArrayFromTable(
        "<html><table><tr><td>1</td></tr><tr><td>1</td></tr></table></html>"
      )
    ).toEqual(result);
  });

  it("case3:单行", () => {
    const result = [["111", "111,111.11"]];
    expect(
      extractArrayFromTable(
        "<html><table><tr><td>111</td><td>111,111.11</td></tr></table></html>"
      )
    ).toEqual(result);
  });

  it("case10:复杂, 真实", () => {
    const result = [
      ["开工至上年度产值", "本月"],
      ["1.1", "1.2"],
      ["810,400.00", "18719762.13"],
    ];

    expect(extractArrayFromTable(html)).toEqual(result);
  });
});
