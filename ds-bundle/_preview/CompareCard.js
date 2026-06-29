var __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      module.exports = window.DuoVino;
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx2(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs : jsx2)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/previews/CompareCard.tsx
  var CompareCard_exports = {};
  __export(CompareCard_exports, {
    RegionVsRegion: () => RegionVsRegion
  });
  init_define_import_meta_env();

  // ds-shim:ds
  var ds_exports = {};
  __export(ds_exports, {
    default: () => ds_default
  });
  init_define_import_meta_env();
  __reExport(ds_exports, __toESM(require_ds_raw()));
  var g = window.DuoVino;
  var ds_default = "default" in g ? g.default : g;

  // .design-sync/previews/CompareCard.tsx
  var import_jsx_runtime = __toESM(require_react_shim(), 1);
  var MapMedia = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cmpmap", style: { background: "linear-gradient(135deg,#2e323e,#3a4150)" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cmppin" }) });
  var adelaideScores = { warmth: 2, sun: 4, rain: 3, diurnal: 4, risk: 2 };
  var brunelloScores = { warmth: 4, sun: 4, rain: 2, diurnal: 3, risk: 2 };
  var adelaideGrapes = [
    { name: "Sauvignon Blanc", color: "w", pct: 32 },
    { name: "Chardonnay", color: "w", pct: 28 },
    { name: "Pinot Noir", color: "r", pct: 24 },
    { name: "Shiraz", color: "r", pct: 16 }
  ];
  var adelaideNames = adelaideGrapes.map((g2) => g2.name);
  var a = {
    name: "Adelaide Hills",
    sub: "🇦🇺 Australia",
    media: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapMedia, {})
  };
  var b = {
    name: "Brunello di Montalcino",
    sub: "🇮🇹 Italy",
    media: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapMedia, {})
  };
  var rows = [
    {
      label: "Climate",
      full: true,
      cellFull: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_exports.RadarCompare,
        {
          a: adelaideScores,
          b: brunelloScores,
          aLabel: "Adelaide Hills",
          bLabel: "Brunello"
        }
      )
    },
    {
      label: "Principal grapes",
      cellA: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.GrapeBars, { grapes: adelaideGrapes, otherNames: ["Sangiovese"] }),
      cellB: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_exports.GrapeBars,
        {
          grapes: [{ name: "Sangiovese", color: "r", pct: 100 }],
          otherNames: adelaideNames
        }
      )
    },
    {
      label: "Style",
      cellA: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.StyleBarInline, { style: { white: 60, red: 40 } }),
      cellB: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.StyleBarInline, { style: { red: 100 } })
    },
    {
      label: "Winemaking",
      cellA: "Cool-fermented Sauvignon; barrel-worked Chardonnay; some sparkling",
      cellB: "100% Sangiovese; long mandatory oak & bottle ageing"
    },
    {
      label: "Quality",
      cellA: "Very good to outstanding",
      cellB: "Outstanding"
    },
    {
      label: "Price",
      cellA: "Premium",
      cellB: "Premium to super-premium"
    }
  ];
  var RegionVsRegion = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.CompareCard, { a, b, rows });
  return __toCommonJS(CompareCard_exports);
})();
