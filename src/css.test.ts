import {
  deserializeCSSStyle,
  serializeCSSStyle,
  condenseStyles,
  getMarginFromStyle,
  reactStyle2style,
  style2ReactStyle,
  normalizeReactStyle,
  normalizeDimValue
} from "./css";

describe("deserializeCSSStyle", () => {
  it("with tail ;", () => {
    expect(deserializeCSSStyle("color:red;width:3px;")).toEqual({
      color: "red",
      width: "3px"
    });
  });
  it("with space ;", () => {
    expect(deserializeCSSStyle(" color : red ; width : 3px ;")).toEqual({
      color: "red",
      width: "3px"
    });
  });
  it("without tail ;", () => {
    expect(deserializeCSSStyle("color:red;width:3px")).toEqual({
      color: "red",
      width: "3px"
    });
  });
  it("only one ;", () => {
    expect(deserializeCSSStyle("color:red")).toEqual({ color: "red" });
  });
  it("nothing;", () => {
    expect(deserializeCSSStyle("a")).toEqual({});
  });
});

describe("serializeCSSStyle", () => {
  it("common", () => {
    expect(serializeCSSStyle({ color: "red", width: "3px" })).toEqual(
      "color:red;width:3px"
    );
  });

  it("with nil", () => {
    expect(
      serializeCSSStyle({
        color: "red",
        width: null,
        height: undefined
      })
    ).toEqual("color:red");
  });

  it("with nil 2", () => {
    expect(
      serializeCSSStyle({
        "text-indent": null,
        "text-align": null
      })
    ).toEqual(null);
  });

  it("nothing", () => {
    expect(serializeCSSStyle({})).toEqual(null);
  });
});

describe("condenseStyles", () => {
  it("empty", () => {
    expect(condenseStyles({})).toEqual({});
  });

  it("text-align", () => {
    expect(condenseStyles({ "text-align": "start" } as any)).toEqual({
      "text-align": "start"
    });
    expect(condenseStyles({ "text-align": "left" } as any)).toEqual({});
  });

  it("text-indent", () => {
    expect(condenseStyles({ "text-indent": "0px" } as any)).toEqual({});
    expect(condenseStyles({ textIndent: "3px" } as any)).toEqual({
      textIndent: "3px"
    });

    expect(condenseStyles({ "text-indent": "" } as any)).toEqual({});
  });

  it("none", () => {
    expect(
      condenseStyles({ "text-indent": null, "text-align": null } as any)
    ).toEqual({});
    expect(condenseStyles({ textIndent: null } as any)).toEqual({});
  });
});

describe("getMarginFromStyle", () => {
  it("返回单值", () => {
    expect(getMarginFromStyle({ margin: 10 } as any)).toEqual(10);
    expect(getMarginFromStyle({ margin: "10px" })).toEqual(10);
    expect(
      getMarginFromStyle({
        marginLeft: 10,
        marginRight: 10,
        marginTop: "10px",
        marginBottom: "10px"
      } as any)
    ).toEqual(10);
  });

  it("返回多值", () => {
    expect(
      getMarginFromStyle(
        {
          marginLeft: 10,
          marginRight: 30,
          marginTop: "20px",
          marginBottom: "40px"
        } as any,
        false
      )
    ).toEqual([20, 30, 40, 10]);
    expect(
      getMarginFromStyle(
        { marginLeft: 10, marginTop: "20px", marginBottom: "40px" } as any,
        false
      )
    ).toEqual([20, 0, 40, 10]);
    expect(getMarginFromStyle({ margin: "10px" }, false)).toEqual([
      10,
      10,
      10,
      10
    ]);
    expect(getMarginFromStyle({ margin: "10px 20px" }, false)).toEqual([
      10,
      20,
      10,
      20
    ]);
    expect(getMarginFromStyle({ margin: "10px 20px 30px" }, false)).toEqual([
      10,
      20,
      30,
      20
    ]);
    expect(
      getMarginFromStyle({ margin: "10px 20px 30px 40px" }, false)
    ).toEqual([10, 20, 30, 40]);
  });

  it("既有margin, 又有marginLeft", () => {
    expect(
      getMarginFromStyle(
        { margin: "10px", marginLeft: 20, marginRight: 20 } as any,
        false
      )
    ).toEqual([10, 20, 10, 20]);
  });
});

describe("reactStyle2css", () => {
  it("default", () => {
    const style = {
      color: "#fff",
      fontSize: 12,
      borderColor: "#ccc"
    };

    const expected = "color:#fff;\nfont-size:12;\nborder-color:#ccc;\n";
    expect(reactStyle2style(style)).toEqual(expected);
    expect(style2ReactStyle(expected)).toEqual(style);
  });

  it("empty", () => {
    expect(reactStyle2style(null as any)).toEqual("");
    expect(reactStyle2style({})).toEqual("");
    expect(style2ReactStyle(null as any)).toEqual({});
    expect(style2ReactStyle("")).toEqual({});
  });

  it("unexpected", () => {
    expect(style2ReactStyle("a")).toEqual({});
  });
});

describe("noralizeReactStyle", () => {
  it("default", () =>
    expect(
      normalizeReactStyle({
        borderWidth: "1",
        width: 3,
        height: "0pt",
        xHeight: "3",
        x: "3%",
        z: 3
      } as any)
    ).toEqual({
      borderWidth: "1px",
      width: "3px",
      height: "0pt",
      xHeight: "3px",
      x: "3%",
      z: 3
    }));
});

describe("normalizeDimValue", () => {
  it("number", () => {
    expect(normalizeDimValue(3)).toEqual("3px");
    expect(normalizeDimValue(3.0)).toEqual("3px");
  });

  it("string", () => {
    expect(normalizeDimValue("3")).toEqual("3px");
    expect(normalizeDimValue(" 3.02 ")).toEqual("3.02px");
    expect(normalizeDimValue(" 3.0 ")).toEqual("3.0px");
    expect(normalizeDimValue("-")).toEqual(undefined);
  });

  it("undefined", () => {
    expect(normalizeDimValue(undefined)).toEqual(undefined);
  });

  it("preset", () => {
    expect(normalizeDimValue("3px")).toEqual("3px");
    expect(normalizeDimValue("3pt")).toEqual("3pt");
    expect(normalizeDimValue("3%")).toEqual("3%");
  });

  it("auto / inherit", () => {
    expect(normalizeDimValue("auto")).toEqual("auto");
    expect(normalizeDimValue("  auto ")).toEqual("auto");
    expect(normalizeDimValue(" inherit")).toEqual("inherit");
  });
});
