!(function (e) {
  "function" == typeof define && define.amd ? define(e) : e();
})(function () {
  "use strict";
  var e = /^[a-zA-Z:_][a-zA-Z0-9:_.-]*$/,
    t = {
      revert: function () {},
    },
    n = new Map(),
    r = new Set();

  function i(e) {
    var t = n.get(e);
    return (
      t ||
        n.set(
          e,
          (t = {
            el: e,
            attributes: {},
          })
        ),
      t
    );
  }

  function o(e, t, n, r, i) {
    var o = n(e),
      u = {
        isDirty: !1,
        originalValue: o,
        virtualValue: o,
        mutations: [],
        el: e,
        observer: new MutationObserver(function () {
          var t = n(e);
          t !== u.virtualValue && ((u.originalValue = t), i(u));
        }),
        runMutations: i,
        setValue: r,
        getCurrentValue: n,
      };
    return (
      u.observer.observe(
        e,
        (function (e) {
          return "html" === e
            ? {
                childList: !0,
                subtree: !0,
                attributes: !0,
                characterData: !0,
              }
            : {
                childList: !1,
                subtree: !1,
                attributes: !0,
                attributeFilter: [e],
              };
        })(t)
      ),
      u
    );
  }

  function u(e) {
    var t = e.originalValue;
    return (
      e.mutations.forEach(function (e) {
        return (t = e.mutate(t));
      }),
      t
    );
  }

  function a(e, t) {
    var n = t.getCurrentValue(t.el);
    (t.virtualValue = e),
      e !== n && ((t.isDirty = !0), A || ((A = !0), requestAnimationFrame(S)));
  }

  function l(e) {
    a(
      (function (e) {
        return (
          v || (v = document.createElement("div")),
          (v.innerHTML = e),
          v.innerHTML
        );
      })(u(e)),
      e
    );
  }

  function s(e) {
    var t = (function (e, t) {
      return (
        t.mutations.forEach(function (t) {
          return t.mutate(e);
        }),
        e
      );
    })(new Set(e.originalValue.split(/\s+/).filter(Boolean)), e);
    a(Array.from(t).filter(Boolean).join(" "), e);
  }

  function c(e) {
    a(u(e), e);
  }
  var d = function (e) {
      return e.innerHTML;
    },
    f = function (e, t) {
      return (e.innerHTML = t);
    };

  function m(e) {
    var t = i(e);
    return t.html || (t.html = o(e, "html", d, f, l)), t.html;
  }
  var v,
    p = function (e, t) {
      return t ? (e.className = t) : e.removeAttribute("class");
    },
    b = function (e) {
      return e.className;
    };

  function h(e) {
    var t = i(e);
    return t.classes || (t.classes = o(e, "class", b, p, s)), t.classes;
  }

  function g(e, t) {
    var n = i(e);
    return (
      n.attributes[t] ||
        (n.attributes[t] = o(
          e,
          t,
          function (e) {
            return e.getAttribute(t) || "";
          },
          function (e, n) {
            return n ? e.setAttribute(t, n) : e.removeAttribute(t);
          },
          c
        )),
      n.attributes[t]
    );
  }

  function y(e, t, r) {
    if (r.isDirty) {
      r.isDirty = !1;
      var i = r.virtualValue;
      r.mutations.length ||
        (function (e, t) {
          var r,
            i,
            o = n.get(e);
          if (o)
            if ("html" === t)
              null == (r = o.html) ||
                null == (i = r.observer) ||
                i.disconnect(),
                delete o.html;
            else if ("class" === t) {
              var u, a;
              null == (u = o.classes) ||
                null == (a = u.observer) ||
                a.disconnect(),
                delete o.classes;
            } else {
              var l, s, c;
              null == (l = o.attributes) ||
                null == (s = l[t]) ||
                null == (c = s.observer) ||
                c.disconnect(),
                delete o.attributes[t];
            }
        })(e, t),
        r.setValue(e, i);
    }
  }
  var w,
    E,
    O,
    N,
    A = !1;

  function M(e, t) {
    e.html && y(t, "html", e.html),
      e.classes && y(t, "class", e.classes),
      Object.keys(e.attributes).forEach(function (n) {
        y(t, n, e.attributes[n]);
      });
  }

  function S() {
    (A = !1), n.forEach(M);
  }

  function L(e, t) {
    if ((e.elements.delete(t), "html" === e.kind)) {
      var n = m(t),
        r = n.mutations.indexOf(e);
      -1 !== r && n.mutations.splice(r, 1), n.runMutations(n);
    } else if ("class" === e.kind) {
      var i = h(t),
        o = i.mutations.indexOf(e);
      -1 !== o && i.mutations.splice(o, 1), i.runMutations(i);
    } else if ("attribute" === e.kind) {
      var u = g(t, e.attribute),
        a = u.mutations.indexOf(e);
      -1 !== a && u.mutations.splice(a, 1), u.runMutations(u);
    }
  }

  function x(e) {
    var t = new Set(e.elements),
      n = new Set();
    document.body.querySelectorAll(e.selector).forEach(function (r) {
      n.add(r),
        t.has(r) ||
          (function (e, t) {
            if ((e.elements.add(t), "html" === e.kind)) {
              var n = m(t);
              n.mutations.push(e), n.runMutations(n);
            } else if ("class" === e.kind) {
              var r = h(t);
              r.mutations.push(e), r.runMutations(r);
            } else if ("attribute" === e.kind) {
              var i = g(t, e.attribute);
              i.mutations.push(e), i.runMutations(i);
            }
          })(e, r);
    }),
      t.forEach(function (t) {
        n.has(t) || L(e, t);
      });
  }

  function T() {
    r.forEach(x);
  }

  function C(e) {
    return "undefined" == typeof document
      ? t
      : (r.add(e),
        x(e),
        {
          revert: function () {
            var t;
            (t = e),
              new Set(t.elements).forEach(function (e) {
                L(t, e);
              }),
              t.elements.clear(),
              r.delete(t);
          },
        });
  }

  function k(e, t) {
    return C({
      kind: "html",
      elements: new Set(),
      mutate: t,
      selector: e,
    });
  }

  function I(e, t) {
    return C({
      kind: "class",
      elements: new Set(),
      mutate: t,
      selector: e,
    });
  }

  function D(n, r, i) {
    return e.test(r)
      ? C(
          "class" === r || "className" === r
            ? {
                kind: "class",
                elements: new Set(),
                mutate: function (e) {
                  var t = i(Array.from(e).join(" "));
                  e.clear(),
                    t
                      .split(/\s+/g)
                      .filter(Boolean)
                      .forEach(function (t) {
                        e.add(t);
                      });
                },
                selector: n,
              }
            : {
                kind: "attribute",
                attribute: r,
                elements: new Set(),
                mutate: i,
                selector: n,
              }
        )
      : t;
  }
  function getElementByXpath(path) {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }
  function q(e) {
    window.parent.postMessage(e, window.EXP_PLATFORM_ORIGIN || "*");
  }
  let R, j;

  function _(elmnt, t) {
    let elm = elmnt;
    if (elm.tagName === "BODY") return "BODY";
    const names = [];
    while (elm.parentElement && elm.tagName !== "BODY") {
      if (elm.id) {
        names.unshift("#" + elm.getAttribute("id")); // getAttribute, because `elm.id` could also return a child element with name "id"
        break; // Because ID should be unique, no more is needed. Remove the break, if you always want a full path.
      } else {
        let c = 1,
          e = elm;
        for (; e.previousElementSibling; e = e.previousElementSibling, c++);
        names.unshift(elm.tagName + ":nth-child(" + c + ")");
      }
      elm = elm.parentElement;
    }
    return names.join(">");
  }

  function V(e, t, n) {
    let r = null,
      i = [],
      o = e,
      u = 0;
    for (; o && o !== R.root.parentElement; ) {
      let e = Y($(o)) ||
        Y(...B(o)) ||
        Y(...X(o)) ||
        Y(G(o)) || [
          {
            name: "*",
            penalty: 3,
          },
        ];
      const a = U(o);
      if (t === N.All) a && (e = e.concat(e.filter(W).map((e) => Z(e, a))));
      else if (t === N.Two)
        (e = e.slice(0, 1)),
          a && (e = e.concat(e.filter(W).map((e) => Z(e, a))));
      else if (t === N.One) {
        const [t] = (e = e.slice(0, 1));
        a && W(t) && (e = [Z(t, a)]);
      }
      for (let t of e) t.level = u;
      if ((i.push(e), i.length >= R.seedMinLength && ((r = z(i, n)), r))) break;
      (o = o.parentElement), u++;
    }
    return r || (r = z(i, n)), r;
  }

  function z(e, t) {
    const n = K(
      (function* e(t, n = []) {
        if (t.length > 0)
          for (let r of t[0]) yield* e(t.slice(1, t.length), n.concat(r));
        else yield n;
      })(e)
    );
    if (n.length > R.threshold) return t ? t() : null;
    for (let e of n) if (F(e)) return e;
    return null;
  }

  function H(e) {
    let t = e[0],
      n = t.name;
    for (let r = 1; r < e.length; r++)
      (n =
        t.level === (e[r].level || 0) - 1
          ? `${e[r].name} > ${n}`
          : `${e[r].name} ${n}`),
        (t = e[r]);
    return n;
  }

  function P(e) {
    return e.map((e) => e.penalty).reduce((e, t) => e + t, 0);
  }

  function F(e) {
    switch (j.querySelectorAll(H(e)).length) {
      case 0:
        throw new Error("Can't select any node with this selector: " + H(e));
      case 1:
        return !0;
      default:
        return !1;
    }
  }

  function $(e) {
    const t = e.getAttribute("id");
    return t && R.idName(t)
      ? {
          name:
            "#" +
            ie(t, {
              isIdentifier: !0,
            }),
          penalty: 0,
        }
      : null;
  }

  function B(e) {
    return Array.from(e.attributes)
      .filter((e) => R.attr(e.name, e.value))
      .map((e) => ({
        name:
          "[" +
          ie(e.name, {
            isIdentifier: !0,
          }) +
          '="' +
          ie(e.value) +
          '"]',
        penalty: 0.5,
      }));
  }

  function X(e) {
    return Array.from(e.classList)
      .filter(R.className)
      .map((e) => ({
        name:
          "." +
          ie(e, {
            isIdentifier: !0,
          }),
        penalty: 1,
      }));
  }

  function G(e) {
    const t = e.tagName.toLowerCase();
    return R.tagName(t)
      ? {
          name: t,
          penalty: 2,
        }
      : null;
  }

  function U(e) {
    const t = e.parentNode;
    if (!t) return null;
    let n = t.firstChild;
    if (!n) return null;
    let r = 0;
    for (; n && (n.nodeType === Node.ELEMENT_NODE && r++, n !== e); )
      n = n.nextSibling;
    return r;
  }

  function Z(e, t) {
    return {
      name: e.name + `:nth-child(${t})`,
      penalty: e.penalty + 1,
    };
  }

  function W(e) {
    return "html" !== e.name && !e.name.startsWith("#");
  }

  function Y(...e) {
    const t = e.filter(J);
    return t.length > 0 ? t : null;
  }

  function J(e) {
    return null != e;
  }

  function K(e) {
    return Array.from(e).sort((e, t) => P(e) - P(t));
  }

  function Q(e, t) {
    return j.querySelector(H(e)) === t;
  }
  "undefined" != typeof document &&
    (w ||
      (w = new MutationObserver(function () {
        T();
      })),
    T(),
    w.observe(document.body, {
      childList: !0,
      subtree: !0,
      attributes: !1,
      characterData: !1,
    })),
    (function (e) {
      (e[(e.All = 0)] = "All"),
        (e[(e.Two = 1)] = "Two"),
        (e[(e.One = 2)] = "One");
    })(N || (N = {}));
  const ee = /[ -,\.\/:-@\[-\^`\{-~]/,
    te = /[ -,\.\/:-@\[\]\^`\{-~]/,
    ne = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,
    re = {
      escapeEverything: !1,
      isIdentifier: !1,
      quotes: "single",
      wrap: !1,
    };

  function ie(e, t = {}) {
    const n = Object.assign(Object.assign({}, re), t);
    "single" != n.quotes && "double" != n.quotes && (n.quotes = "single");
    const r = "double" == n.quotes ? '"' : "'",
      i = n.isIdentifier,
      o = e.charAt(0);
    let u = "",
      a = 0;
    const l = e.length;
    for (; a < l; ) {
      const t = e.charAt(a++);
      let o = t.charCodeAt(0),
        s = void 0;
      if (o < 32 || o > 126) {
        if (o >= 55296 && o <= 56319 && a < l) {
          const t = e.charCodeAt(a++);
          56320 == (64512 & t)
            ? (o = ((1023 & o) << 10) + (1023 & t) + 65536)
            : a--;
        }
        s = "\\" + o.toString(16).toUpperCase() + " ";
      } else
        s = n.escapeEverything
          ? ee.test(t)
            ? "\\" + t
            : "\\" + o.toString(16).toUpperCase() + " "
          : /[\t\n\f\r\x0B]/.test(t)
          ? "\\" + o.toString(16).toUpperCase() + " "
          : "\\" == t ||
            (!i && (('"' == t && r == t) || ("'" == t && r == t))) ||
            (i && te.test(t))
          ? "\\" + t
          : t;
      u += s;
    }
    return (
      i &&
        (/^-[-\d]/.test(u)
          ? (u = "\\-" + u.slice(1))
          : /\d/.test(o) && (u = "\\3" + o + " " + u.slice(1))),
      (u = u.replace(ne, function (e, t, n) {
        return t && t.length % 2 ? e : (t || "") + n;
      })),
      !i && n.wrap ? r + u + r : u
    );
  }

  function oe(e, t) {
    if (!e) return null;
    var n = document.querySelector(e);
    if (!n) return null;
    for (var r = 0; r < t; r++) {
      var i;
      if (!(n = (null == (i = n) ? void 0 : i.parentElement) || null))
        return null;
    }
    return n;
  }

  function ue(e) {
    for (var t = [], n = e.parentElement; n; )
      t.push(n.tagName), (n = n.parentElement);
    return t.reverse(), t;
  }

  function ae(e) {
    return e.getAttributeNames().map(function (t) {
      return {
        name: t,
        value: e.getAttribute(t) || "",
      };
    });
  }
  var le, se, ce, de, fe, me;

  function ve(e, t, n, r) {
    if (n) {
      var i = window.pageXOffset,
        o = window.pageYOffset,
        u = n.getBoundingClientRect();
      Object.assign(e.style, {
        display: "block",
        top: o + u.top - 4 + "px",
        left: i + u.left - 4 + "px",
        width: u.width + 8 + "px",
        height: u.height + 8 + "px",
      }),
        (t.textContent = r.split(">")[r.split(">").length - 1] || "");
    } else e.style.display = "none";
  }
  function getElementByXpath(path) {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }

  function html2CanvasHelper(e, image, duplicateNode = null) {
    let pureWhite = true;

    return new Promise((resolve) => {
      html2canvas(duplicateNode, {
        allowTaint: true,
        useCORS: false,
        logging: false,
      })
        .then(async (canvas1) => {
          if (duplicateNode !== e) {
            document.body.removeChild(duplicateNode);
          }

          const imgData = canvas1
            .getContext("2d")
            .getImageData(0, 0, canvas1.width, canvas1.height);
          image = canvas1.toDataURL("image/png");

          for (let i = 0; i < imgData.data.length; i += 4) {
            const red = imgData.data[i];
            const green = imgData.data[i + 1];
            const blue = imgData.data[i + 2];
            if (red !== 255 || green !== 255 || blue !== 255) {
              pureWhite = false;
            }
          }

          if (pureWhite) {
            let canvas2 = await html2canvas(e, {
              allowTaint: true,
              useCORS: true,
              backgroundColor: "black",
            });
            image = canvas2.toDataURL("image/png");
          }

          resolve(image);
        })
        .catch((err) => {
          resolve(image);
        });
    });
  }

  function pe(e, t) {
    let loader = document.createElement("div");
    loader.classList.add("abtesting-loader");
    loader.style.cssText = `
    position: fixed;
  z-index: 999;
  height: 100%;
  width: 100%;
  background-color:gray;
  opacity:0.5;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display:flex;
  justify-content:center;
  align-items:center;
`;

    let spinner = document.createElement("div");
    spinner.classList.add("abtesting-spinner");

    spinner.style.cssText = `
    border: 8px solid white;
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;
    `;
    loader.appendChild(spinner);
    document.body.appendChild(loader);

    let image = "";
    let allImages = e.getElementsByTagName("img");
    let only1Image = e.tagName === "IMG";
    let duplicateNode = null;

    // 1. Direct image tag selection
    // 2. Image with anchor tag
    // 3. Image inside button
    if (allImages.length === 0 && !only1Image) {
      duplicateNode = e;
    } else if (only1Image) {
      const spanImageNameNode = document.createElement("span");
      const imgSrcArr = e.src.split("/");
      const imgName = imgSrcArr[imgSrcArr.length - 1];

      spanImageNameNode.innerText = `Image: ${
        e.alt && e.alt.length ? e.alt : imgName
      }`;
      spanImageNameNode.style.marginLeft = "4px";
      spanImageNameNode.style.marginRight = "4px";
      document.body.appendChild(spanImageNameNode);
      duplicateNode = spanImageNameNode;
    } else if (allImages.length) {
      duplicateNode = e.cloneNode(true);
      duplicateNode.querySelectorAll("img").forEach((img) => {
        const imgSrcArr = img.src.split("/");
        const imgName = imgSrcArr[imgSrcArr.length - 1];
        const spanImageNameNode = document.createElement("span");
        spanImageNameNode.innerText = `Image: ${
          img.alt && img.alt.length ? img.alt : imgName
        }`;
        spanImageNameNode.style.marginLeft = "4px";
        spanImageNameNode.style.marginRight = "10px";
        img.parentNode.replaceChild(spanImageNameNode, img);
      });

      document.body.appendChild(duplicateNode);
    }

    html2CanvasHelper(e, image, duplicateNode)
      .then((finalImg) => {
        document.body.removeChild(loader);
        t || (t = _(e)),
          q({
            event: "elementSelected",
            selector: t,
            display: e.tagName,
            dom: finalImg,
            breadcrumb: ue(e),
            innerHTML: e.innerHTML,
            attributes: ae(e),
          }),
          Ae(),
          ye(e, t);
      })
      .catch((err) => {
        document.body.removeChild(loader);

        // Since we don't want the visual editor to stop working due to issue in generating the goal's image,
        // added the same code to in catch block as well to open the element editing box
        t || (t = _(e)),
          q({
            event: "elementSelected",
            selector: t,
            display: e.tagName,
            dom: finalImg,
            breadcrumb: ue(e),
            innerHTML: e.innerHTML,
            attributes: ae(e),
          }),
          Ae(),
          ye(e, t);
      })
      .finally(() => {});
  }
  !le &&
    "undefined" != typeof window &&
    window.ResizeObserver &&
    (null ==
      (se = le =
        new ResizeObserver(function () {
          be && ye(be, _(be)), he && ge(he, _(he));
        })) ||
      se.observe(document.body)),
    "undefined" != typeof window &&
      ((ce = document.querySelector(".ab-designer-hover-outline"))
        ? (de = ce.querySelector("div"))
        : (((ce = document.createElement("div")).className =
            "ab-designer-hover-outline"),
          Object.assign(ce.style, {
            position: "absolute",
            border: "1px solid #aaaa44",
            zIndex: "999999",
            background: "rgba(255,255,0,0.2)",
            display: "none",
            pointerEvents: "none",
            cursor: "pointer",
          }),
          (de = document.createElement("div")),
          Object.assign(de.style, {
            position: "absolute",
            pointerEvents: "none",
            top: "100%",
            left: "0",
            background: "#333",
            color: "#fff",
            padding: "3px 6px",
            boxSizing: "border-box",
          }),
          ce.appendChild(de),
          document.body.appendChild(ce)),
      (fe = document.querySelector(".ab-designer-select-outline"))
        ? (me = fe.querySelector("div"))
        : (((fe = document.createElement("div")).className =
            "ab-designer-select-outline"),
          Object.assign(fe.style, {
            position: "absolute",
            border: "3px dashed #029dd1",
            backgrond: "rgba(2,157,209,0.05)",
            zIndex: "999998",
            display: "none",
            pointerEvents: "none",
          }),
          (me = document.createElement("div")),
          Object.assign(me.style, {
            position: "absolute",
            pointerEvents: "none",
            top: "100%",
            left: "-3px",
            background: "#029dd1",
            color: "#fff",
            padding: "3px 6px",
            boxSizing: "border-box",
          }),
          fe.appendChild(me),
          document.body.appendChild(fe)));
  var be = null,
    he = null;

  function ge(e, t) {
    (he = e || null), ve(ce, de, e, t);
  }

  function ye(e, t) {
    e !== be && le && (be && le.unobserve(be), e && le.observe(e)),
      (be = e || null),
      ve(fe, me, e, t);
  }
  var we = null;

  function Ee(e) {
    var t = e.target;
    if (t !== we)
      if (((we = t), t)) {
        var n = _(t);
        ge(t, n),
          q({
            event: "elementHover",
            selector: n,
            display: t.tagName,
            breadcrumb: ue(t),
          });
      } else
        q({
          event: "elementHover",
          selector: "",
          display: "",
          breadcrumb: [],
        });
  }

  function Oe(e) {
    e.preventDefault(), e.stopPropagation(), we && pe(we);
  }
  var Ne = !1;

  function Ae() {
    Ne &&
      ((Ne = !1),
      document.body.removeEventListener("mousemove", Ee),
      document.body.removeEventListener("click", Oe),
      (document.body.style.cursor = ""),
      ye(),
      ge());
  }
  window.addEventListener(
    "message",
    function (e) {
      if (
        window.EXP_PLATFORM_ORIGIN &&
        "*" !== window.EXP_PLATFORM_ORIGIN &&
        e.origin !== window.EXP_PLATFORM_ORIGIN
      )
        console.log("Ignoring message from invalid origin", e.origin);
      else {
        var n,
          r = e.data;
        r &&
          r.command &&
          ("injectCSS" === r.command
            ? ((n = r.css),
              E ||
                ((E = document.createElement("style")),
                document.head.appendChild(E)),
              (E.innerHTML = n))
            : "mutateDOM" === r.command
            ? (function (e) {
                O && O();
                var n = [];
                e.forEach(function (e) {
                  var r = (function (e) {
                    var n = e.selector,
                      r = e.action,
                      i = e.value,
                      o = e.attribute;
                    if ("html" === o) {
                      if ("append" === r)
                        return k(n, function (e) {
                          return e + i;
                        });
                      if ("set" === r)
                        return k(n, function () {
                          return i;
                        });
                    } else if ("class" === o) {
                      if ("append" === r)
                        return I(n, function (e) {
                          return e.add(i);
                        });
                      if ("remove" === r)
                        return I(n, function (e) {
                          return e.delete(i);
                        });
                      if ("set" === r)
                        return I(n, function (e) {
                          e.clear(), e.add(i);
                        });
                    } else {
                      if ("append" === r)
                        return D(n, o, function (e) {
                          return e + i;
                        });
                      if ("set" === r)
                        return D(n, o, function () {
                          return i;
                        });
                    }
                    return t;
                  })(e);
                  n.push(r.revert);
                }),
                  (O = function () {
                    n.forEach(function (e) {
                      return e();
                    });
                  });
              })(r.mutations)
            : "startInspecting" === r.command
            ? Ne ||
              ((Ne = !0),
              document.body.addEventListener("mousemove", Ee),
              document.body.addEventListener("click", Oe),
              (document.body.style.cursor = "pointer"),
              (we = null))
            : "stopInspecting" === r.command
            ? Ae()
            : "selectElement" === r.command
            ? (function (e, t) {
                void 0 === t && (t = 0);
                var n = oe(e, t);
                n ? pe(n, e) : ye();
              })(r.selector, r.ancestor || 0)
            : "hoverElement" === r.command
            ? (function (e, t) {
                void 0 === t && (t = 0);
                var n = oe(e, t);
                ge(n || void 0, n ? _(n) : void 0);
              })(r.selector, r.ancestor || 0)
            : "isReady" === r.command &&
              q({
                event: "visualDesignerReady",
              }));
      }
    },
    !1
  ),
    q({
      event: "visualDesignerReady",
    });
});
