var Ie = Object.defineProperty, Ne = Object.defineProperties;
var De = Object.getOwnPropertyDescriptors;
var _ = Object.getOwnPropertySymbols;
var Y = Object.prototype.hasOwnProperty, K = Object.prototype.propertyIsEnumerable;
var J = Math.pow, G = (e, t, n) => t in e ? Ie(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, E = (e, t) => {
    for (var n in t || (t = {}))
        Y.call(t, n) && G(e, n, t[n]);
    if (_)
        for (var n of _(t))
            K.call(t, n) && G(e, n, t[n]);
    return e;
}, N = (e, t) => Ne(e, De(t));
var Q = (e, t) => {
    var n = {};
    for (var r in e)
        Y.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && _)
        for (var r of _(e))
            t.indexOf(r) < 0 && K.call(e, r) && (n[r] = e[r]);
    return n;
};
var m = (e, t, n) => new Promise((r, o) => {
    var s = (c) => {
        try {
            i(n.next(c));
        } catch (l) {
            o(l);
        }
    }, a = (c) => {
        try {
            i(n.throw(c));
        } catch (l) {
            o(l);
        }
    }, i = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(s, a);
    i((n = n.apply(e, t)).next());
});
function se(e, t) {
    return e[13] = 1, e[14] = t >> 8, e[15] = t & 255, e[16] = t >> 8, e[17] = t & 255, e;
}
const ie = "p".charCodeAt(0), ce = "H".charCodeAt(0), le = "Y".charCodeAt(0), ue = "s".charCodeAt(0);
let L;
function Pe() {
    const e = new Int32Array(256);
    for (let t = 0; t < 256; t++) {
        let n = t;
        for (let r = 0; r < 8; r++)
            n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
        e[t] = n;
    }
    return e;
}
function Re(e) {
    let t = -1;
    L || (L = Pe());
    for (let n = 0; n < e.length; n++)
        t = L[(t ^ e[n]) & 255] ^ t >>> 8;
    return t ^ -1;
}
function Fe(e) {
    const t = e.length - 1;
    for (let n = t; n >= 4; n--)
        if (e[n - 4] === 9 && e[n - 3] === ie && e[n - 2] === ce && e[n - 1] === le && e[n] === ue)
            return n - 3;
    return 0;
}
function fe(e, t, n = !1) {
    const r = new Uint8Array(13);
    t *= 39.3701, r[0] = ie, r[1] = ce, r[2] = le, r[3] = ue, r[4] = t >>> 24, r[5] = t >>> 16, r[6] = t >>> 8, r[7] = t & 255, r[8] = r[4], r[9] = r[5], r[10] = r[6], r[11] = r[7], r[12] = 1;
    const o = Re(r), s = new Uint8Array(4);
    if (s[0] = o >>> 24, s[1] = o >>> 16, s[2] = o >>> 8, s[3] = o & 255, n) {
        const a = Fe(e);
        return e.set(r, a), e.set(s, a + 13), e;
    } else {
        const a = new Uint8Array(4);
        a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 9;
        const i = new Uint8Array(54);
        return i.set(e, 0), i.set(a, 33), i.set(r, 37), i.set(s, 50), i;
    }
}
const Ue = "AAlwSFlz", _e = "AAAJcEhZ", ke = "AAAACXBI";
function $e(e) {
    let t = e.indexOf(Ue);
    return t === -1 && (t = e.indexOf(_e)), t === -1 && (t = e.indexOf(ke)), t;
}
const M = "[modern-screenshot]", v = typeof window != "undefined", Be = v && "Worker" in window, de = v && "atob" in window, Le = v && "btoa" in window;
var ae;
const W = v ? (ae = window.navigator) == null ? void 0 : ae.userAgent : "", me = W.includes("Chrome"), V = W.includes("AppleWebKit") && !me, ge = W.includes("Firefox"), Oe = (e) => e && "__CONTEXT__" in e, Me = (e) => e.constructor.name === "CSSFontFaceRule", We = (e) => e.constructor.name === "CSSImportRule", T = (e) => e.nodeType === 1, R = (e) => typeof e.className == "object", he = (e) => R(e) && e.tagName === "IMAGE", q = (e) => T(e) && typeof e.style != "undefined" && !R(e), Ve = (e) => e.nodeType === 8, qe = (e) => e.nodeType === 3, D = (e) => e.tagName === "IMG", $ = (e) => e.tagName === "VIDEO", je = (e) => e.tagName === "CANVAS", Z = (e) => e.tagName === "TEXTAREA", He = (e) => e.tagName === "INPUT", ze = (e) => e.tagName === "STYLE", Xe = (e) => e.tagName === "SCRIPT", Ge = (e) => e.tagName === "SELECT", Ye = (e) => e.tagName === "SLOT", Ke = (e) => e.tagName === "IFRAME", b = (...e) => console.warn(M, ...e), Je = (e) => console.time(`${M} ${e}`), Qe = (e) => console.timeEnd(`${M} ${e}`), Ze = (e) => {
    var n;
    const t = (n = e == null ? void 0 : e.createElement) == null ? void 0 : n.call(e, "canvas");
    return t && (t.height = t.width = 1), t && "toDataURL" in t && Boolean(t.toDataURL("image/webp").includes("image/webp"));
}, O = (e) => e.startsWith("data:");
function we(e, t) {
    if (e.match(/^[a-z]+:\/\//i))
        return e;
    if (v && e.match(/^\/\//))
        return window.location.protocol + e;
    if (e.match(/^[a-z]+:/i) || !v)
        return e;
    const n = B().implementation.createHTMLDocument(), r = n.createElement("base"), o = n.createElement("a");
    return n.head.appendChild(r), n.body.appendChild(o), t && (r.href = t), o.href = e, o.href;
}
function B(e) {
    var t;
    return (t = e && T(e) ? e == null ? void 0 : e.ownerDocument : e) != null ? t : window.document;
}
function pe(e, t, n) {
    const r = B(n).createElementNS("http://www.w3.org/2000/svg", "svg");
    return r.setAttributeNS(null, "width", e.toString()), r.setAttributeNS(null, "height", t.toString()), r.setAttributeNS(null, "viewBox", `0 0 ${e} ${t}`), r;
}
function ye(e) {
    const t = new XMLSerializer().serializeToString(e).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/ug, "");
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function et(e, t = "image/png", n = 1) {
    return m(this, null, function* () {
        try {
            return yield new Promise((r, o) => {
                e.toBlob((s) => {
                    s ? r(s) : o(new Error("Blob is null"));
                }, t, n);
            });
        } catch (r) {
            if (de)
                return b("Failed canvas to blob", { type: t, quality: n }, r), tt(e.toDataURL(t, n));
            throw r;
        }
    });
}
function tt(e) {
    var i, c;
    const [t, n] = e.split(","), r = (c = (i = t.match(/data:(.+);/)) == null ? void 0 : i[1]) != null ? c : void 0, o = window.atob(n), s = o.length, a = new Uint8Array(s);
    for (let l = 0; l < s; l += 1)
        a[l] = o.charCodeAt(l);
    return new Blob([a], { type: r });
}
function be(e, t) {
    return new Promise((n, r) => {
        const o = new FileReader();
        o.onload = () => n(o.result), o.onerror = () => r(o.error), o.onabort = () => r(new Error(`Failed read blob to ${t}`)), t === "dataUrl" ? o.readAsDataURL(e) : t === "arrayBuffer" && o.readAsArrayBuffer(e);
    });
}
const nt = (e) => be(e, "dataUrl"), rt = (e) => be(e, "arrayBuffer");
function I(e, t) {
    const n = B(t).createElement("img");
    return n.decoding = "sync", n.loading = "eager", n.src = e, n;
}
function P(e, t) {
    return new Promise((n) => {
        const { timeout: r, ownerDocument: o, onError: s } = t != null ? t : {}, a = typeof e == "string" ? I(e, B(o)) : e;
        let i = null, c = null;
        function l() {
            n(a), i && clearTimeout(i), c == null || c();
        }
        if (r && (i = setTimeout(l, r)), $(a)) {
            const u = a.currentSrc || a.src;
            if (!u)
                return a.poster ? P(a.poster, t).then(n) : l();
            if (a.readyState >= 2)
                return l();
            const f = l, d = (g) => {
                b(
                    "Failed video load",
                    u,
                    g
                ), s == null || s(g), l();
            };
            c = () => {
                a.removeEventListener("loadeddata", f), a.removeEventListener("error", d);
            }, a.addEventListener("loadeddata", f, { once: !0 }), a.addEventListener("error", d, { once: !0 });
        } else {
            const u = he(a) ? a.href.baseVal : a.currentSrc || a.src;
            if (!u)
                return l();
            const f = () => m(this, null, function* () {
                if (D(a) && "decode" in a)
                    try {
                        yield a.decode();
                    } catch (g) {
                        b(
                            "Failed to decode image, trying to render anyway",
                            a.dataset.originalSrc || u,
                            g
                        );
                    }
                l();
            }), d = (g) => {
                b(
                    "Failed image load",
                    a.dataset.originalSrc || u,
                    g
                ), l();
            };
            if (D(a) && a.complete)
                return f();
            c = () => {
                a.removeEventListener("load", f), a.removeEventListener("error", d);
            }, a.addEventListener("load", f, { once: !0 }), a.addEventListener("error", d, { once: !0 });
        }
    });
}
function ot(e, t) {
    return m(this, null, function* () {
        q(e) && (D(e) || $(e) ? yield P(e, { timeout: t }) : yield Promise.all(
            ["img", "video"].flatMap((n) => Array.from(e.querySelectorAll(n)).map((r) => P(r, { timeout: t })))
        ));
    });
}
const Se = function () {
    let t = 0;
    const n = () => (
        // eslint-disable-next-line no-bitwise
        `0000${(Math.random() * J(36, 4) << 0).toString(36)}`.slice(-4)
    );
    return () => (t += 1, `u${n()}${t}`);
}();
function at(e) {
    return {
        time: (t) => e && Je(t),
        timeEnd: (t) => e && Qe(t),
        warn: (...t) => e && b(...t)
    };
}
function st(e) {
    return {
        cache: e ? "no-cache" : "force-cache"
    };
}
function A(e, t) {
    return m(this, null, function* () {
        return Oe(e) ? e : it(e, N(E({}, t), { autoDestruct: !0 }));
    });
}
function it(e, t) {
    return m(this, null, function* () {
        var d, g, h, C;
        const { scale: n = 1, workerUrl: r, workerNumber: o = 1 } = t || {}, s = Boolean(t == null ? void 0 : t.debug), a = (d = e.ownerDocument) != null ? d : v ? window.document : void 0, i = (h = (g = e.ownerDocument) == null ? void 0 : g.defaultView) != null ? h : v ? window : void 0, c = /* @__PURE__ */ new Map(), l = N(E({
            // Options
            width: 0,
            height: 0,
            quality: 1,
            type: "image/png",
            scale: n,
            backgroundColor: null,
            style: null,
            filter: null,
            maximumCanvasSize: 0,
            timeout: 3e4,
            progress: null,
            debug: s,
            fetch: E({
                requestInit: st((C = t == null ? void 0 : t.fetch) == null ? void 0 : C.bypassingCache),
                placeholderImage: "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                bypassingCache: !1
            }, t == null ? void 0 : t.fetch),
            font: {},
            drawImageInterval: 100,
            workerUrl: null,
            workerNumber: o,
            onCloneNode: null,
            onEmbedNode: null,
            onCreateForeignObjectSvg: null,
            autoDestruct: !1
        }, t), {
            // InternalContext
            __CONTEXT__: !0,
            log: at(s),
            node: e,
            ownerDocument: a,
            ownerWindow: i,
            dpi: n === 1 ? null : 96 * n,
            svgStyleElement: Ce(a),
            defaultComputedStyles: /* @__PURE__ */ new Map(),
            workers: [
                ...new Array(
                    Be && r && o ? o : 0
                )
            ].map(() => {
                const w = new Worker(r);
                return w.onmessage = (p) => m(this, null, function* () {
                    var x, z, U, X;
                    const { url: S, result: y } = p.data;
                    y ? (z = (x = c.get(S)) == null ? void 0 : x.resovle) == null || z.call(x, y) : (X = (U = c.get(S)) == null ? void 0 : U.reject) == null || X.call(U, new Error(`Error receiving message from worker: ${S}`));
                }), w.onmessageerror = (p) => {
                    var y, x;
                    const { url: S } = p.data;
                    (x = (y = c.get(S)) == null ? void 0 : y.reject) == null || x.call(y, new Error(`Error receiving message from worker: ${S}`));
                }, w;
            }),
            fontFamilies: /* @__PURE__ */ new Set(),
            fontCssTexts: /* @__PURE__ */ new Map(),
            acceptOfImage: `${[
                Ze(a) && "image/webp",
                "image/svg+xml",
                "image/*",
                "*/*"
            ].filter(Boolean).join(",")};q=0.8`,
            requests: c,
            drawImageCount: 0,
            tasks: []
        });
        l.log.time("wait until load"), yield ot(e, l.timeout), l.log.timeEnd("wait until load");
        const { width: u, height: f } = ct(e, l);
        return l.width = u, l.height = f, l;
    });
}
function Ce(e) {
    if (!e)
        return;
    const t = e.createElement("style"), n = t.ownerDocument.createTextNode(`
.______background-clip--text {
  background-clip: text;
  -webkit-background-clip: text;
}
`);
    return t.appendChild(n), t;
}
function ct(e, t) {
    let { width: n, height: r } = t;
    if (T(e) && (!n || !r)) {
        const o = e.getBoundingClientRect();
        n = n || o.width || Number(e.getAttribute("width")) || 0, r = r || o.height || Number(e.getAttribute("height")) || 0;
    }
    return { width: n, height: r };
}
function lt(e, t) {
    return m(this, null, function* () {
        const {
            log: n,
            timeout: r,
            drawImageCount: o,
            drawImageInterval: s
        } = t;
        n.time("image to canvas");
        const a = yield P(e, { timeout: r }), { canvas: i, context2d: c } = ut(e.ownerDocument, t), l = () => {
            try {
                c == null || c.drawImage(a, 0, 0, i.width, i.height);
            } catch (u) {
                b("Failed to drawImage", u);
            }
        };
        l();
        for (let u = 0; u < o; u++)
            yield new Promise((f) => {
                setTimeout(() => {
                    l(), f();
                }, u + s);
            });
        return t.drawImageCount = 0, n.timeEnd("image to canvas"), i;
    });
}
function ut(e, t) {
    const { width: n, height: r, scale: o, backgroundColor: s, maximumCanvasSize: a } = t, i = e.createElement("canvas");
    i.width = Math.floor(n * o), i.height = Math.floor(r * o), i.style.width = `${n}px`, i.style.height = `${r}px`, a && (i.width > a || i.height > a) && (i.width > a && i.height > a ? i.width > i.height ? (i.height *= a / i.width, i.width = a) : (i.width *= a / i.height, i.height = a) : i.width > a ? (i.height *= a / i.width, i.width = a) : (i.width *= a / i.height, i.height = a));
    const c = i.getContext("2d");
    return c && s && (c.fillStyle = s, c.fillRect(0, 0, i.width, i.height)), { canvas: i, context2d: c };
}
function ft(e, t, n) {
    ee(e, t, ":before", n), ee(e, t, ":after", n);
}
function ee(e, t, n, r) {
    const o = e.ownerDocument, s = r.getComputedStyle(e, n), a = s.getPropertyValue("content");
    if (!a || a === "none")
        return;
    const i = Se();
    try {
        t.className = `${t.className} ${i}`;
    } catch (f) {
        return;
    }
    const c = o.createElement("style"), l = `.${i}:${n}`, u = s.cssText ? dt(s) : mt(s);
    c.appendChild(
        o.createTextNode(`${l}{${u}}`)
    ), t.appendChild(c);
}
function dt(e) {
    const t = e.getPropertyValue("content");
    return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function mt(e) {
    return Array.from(e).map((t) => {
        const n = e.getPropertyValue(t), r = e.getPropertyPriority(t);
        return `${t}: ${n}${r ? " !important" : ""};`;
    }).join(" ");
}
function gt(e, t) {
    Z(e) && (t.innerHTML = e.value), (Z(e) || He(e) || Ge(e)) && (t.value = e.value);
}
function ht(e, t) {
    var u;
    const { defaultComputedStyles: n, ownerDocument: r } = t;
    if (n.has(e))
        return n.get(e);
    let o = t.sandbox;
    if (o || r && (o = r.createElement("iframe"), o.id = `__SANDBOX__-${Se()}`, o.width = "0", o.height = "0", o.style.visibility = "hidden", o.style.position = "fixed", r.body.appendChild(o), (u = o.contentWindow) == null || u.document.write('<!DOCTYPE html><meta charset="UTF-8"><title></title><body>'), t.sandbox = o), !o)
        return {};
    const s = o.contentWindow;
    if (!s)
        return {};
    const a = s.document, i = a.createElement(e);
    a.body.appendChild(i), i.textContent = " ";
    const c = s.getComputedStyle(i), l = {};
    for (let f = c.length - 1; f >= 0; f--) {
        const d = c.item(f);
        d === "width" || d === "height" ? l[d] = "auto" : l[d] = c.getPropertyValue(d);
    }
    return a.body.removeChild(i), n.set(e, l), l;
}
const wt = [
    "transitionProperty",
    "all",
    // svg: all
    "d",
    // svg: d
    "content"
    // Safari shows pseudoelements if content is set
];
function pt(e, t, n, r, o) {
    const s = n.style, a = ht(e.tagName, o);
    s.transitionProperty = "none";
    for (let i = t.length - 1; i >= 0; i--) {
        const c = t.item(i);
        if (wt.includes(c))
            continue;
        const l = t.getPropertyValue(c), u = t.getPropertyPriority(c);
        if (r && c.startsWith("margin") && l) {
            s.setProperty(c, "0", u);
            continue;
        }
        if (c === "background-clip" && l === "text" && n.classList.add("______background-clip--text"), !(a[c] === l && !e.getAttribute(c) && !u) && (s.setProperty(c, l, u), c.startsWith("border") && c.endsWith("style"))) {
            const f = c.replace("style", "width");
            s.getPropertyValue(f) || s.setProperty(f, "0");
        }
    }
    me && (s.fontKerning === "auto" && (s.fontKerning = "normal"), s.overflow === "hidden" && s.textOverflow === "ellipsis" && e.scrollWidth === e.clientWidth && (s.textOverflow = "clip"));
}
function yt(e, t) {
    var n;
    try {
        if ((n = e == null ? void 0 : e.contentDocument) != null && n.body)
            return j(e.contentDocument.body, t);
    } catch (r) {
        b("Failed to clone iframe", r);
    }
    return e.cloneNode(!1);
}
function Ee(e) {
    if (e.ownerDocument)
        try {
            const o = e.toDataURL();
            if (o !== "data:,")
                return I(o, e.ownerDocument);
        } catch (o) {
        }
    const t = e.cloneNode(!1), n = e.getContext("2d"), r = t.getContext("2d");
    try {
        return n && r && r.putImageData(
            n.getImageData(0, 0, e.width, e.height),
            0,
            0
        ), t;
    } catch (o) {
        b("Failed to clone canvas", o);
    }
    return t;
}
function bt(e) {
    return m(this, null, function* () {
        if (e.ownerDocument && !e.currentSrc && e.poster)
            return I(e.poster, e.ownerDocument);
        const t = e.cloneNode(!1);
        t.crossOrigin = "anonymous", e.currentSrc && e.currentSrc !== e.src && (t.src = e.currentSrc);
        const n = t.ownerDocument;
        if (n) {
            let r = !0;
            if (yield P(t, {
                onError: () => r = !1
            }), !r)
                return e.poster ? I(e.poster, e.ownerDocument) : t;
            t.currentTime = e.currentTime, yield new Promise((s) => {
                t.addEventListener("seeked", s, { once: !0 });
            });
            const o = n.createElement("canvas");
            o.width = e.offsetWidth, o.height = e.offsetHeight;
            try {
                const s = o.getContext("2d");
                s && s.drawImage(t, 0, 0, o.width, o.height);
            } catch (s) {
                return b("Failed to clone video", s), e.poster ? I(e.poster, e.ownerDocument) : t;
            }
            return Ee(o);
        }
        return t;
    });
}
function St(e) {
    const t = e.cloneNode(!1);
    return e.currentSrc && e.currentSrc !== e.src && (t.src = e.currentSrc, t.srcset = ""), t.loading === "lazy" && (t.loading = "eager"), t;
}
function Ct(e, t) {
    return je(e) ? Ee(e) : Ke(e) ? yt(e, t) : D(e) ? St(e) : $(e) ? bt(e) : e.cloneNode(!1);
}
function te(e, t, n) {
    return m(this, null, function* () {
        T(t) && (ze(t) || Xe(t)) || n.filter && !n.filter(t) || e.appendChild(yield j(t, n));
    });
}
function ne(e, t, n) {
    return m(this, null, function* () {
        var o, s;
        const r = (s = T(e) ? (o = e.shadowRoot) == null ? void 0 : o.firstChild : void 0) != null ? s : e.firstChild;
        for (let a = r; a; a = a.nextSibling)
            if (!Ve(a))
                if (T(a) && Ye(a) && typeof a.assignedNodes == "function") {
                    const i = a.assignedNodes();
                    for (let c = 0; c < i.length; c++)
                        yield te(t, i[c], n);
                } else
                    yield te(t, a, n);
    });
}
function Et(e, t) {
    const { backgroundColor: n, width: r, height: o, style: s } = t;
    if (n && (e.backgroundColor = n), r && (e.width = `${r}px`), o && (e.height = `${o}px`), s)
        for (const a in s)
            e[a] = s[a];
}
function j(e, t, n = !1) {
    return m(this, null, function* () {
        const { ownerDocument: r, ownerWindow: o, fontFamilies: s } = t;
        if (r && qe(e))
            return r.createTextNode(e.data);
        if (r && o && T(e) && (q(e) || R(e))) {
            const i = o.getComputedStyle(e);
            if (i.display === "none")
                return r.createComment(e.tagName.toLowerCase());
            const c = yield Ct(e, t), l = c.style;
            return pt(e, i, c, n, t), n && Et(l, t), l.getPropertyValue("font-family").split(",").filter(Boolean).map((u) => u.toLowerCase()).forEach((u) => s.add(u)), ft(e, c, o), gt(e, c), $(e) || (yield ne(e, c, t)), c;
        }
        const a = e.cloneNode(!1);
        return yield ne(e, a, t), a;
    });
}
function Tt(e) {
    if (e.ownerDocument = void 0, e.ownerWindow = void 0, e.svgStyleElement = void 0, e.defaultComputedStyles.clear(), e.sandbox) {
        try {
            e.sandbox.remove();
        } catch (t) {
        }
        e.sandbox = void 0;
    }
    e.workers = [], e.fontFamilies.clear(), e.fontCssTexts.clear(), e.requests.clear(), e.tasks = [];
}
function At(e) {
    const i = e, { url: t, timeout: n, responseType: r } = i, o = Q(i, ["url", "timeout", "responseType"]), s = new AbortController(), a = n ? setTimeout(() => s.abort(), n) : void 0;
    return fetch(t, E({ signal: s.signal }, o)).then((c) => {
        if (!c.ok)
            throw new Error("Failed fetch, not 2xx response", { cause: c });
        switch (r) {
            case "dataUrl":
                return c.blob().then(nt);
            case "text":
            default:
                return c.text();
        }
    }).finally(() => clearTimeout(a));
}
function k(e, t) {
    const { url: n, requestType: r = "text", responseType: o = "text", imageDom: s } = t;
    let a = n;
    const {
        timeout: i,
        acceptOfImage: c,
        requests: l,
        fetch: {
            requestInit: u,
            bypassingCache: f,
            placeholderImage: d
        },
        workers: g
    } = e;
    let h;
    if (l.has(n))
        h = l.get(n);
    else {
        f && (a += (/\?/.test(a) ? "&" : "?") + new Date().getTime()), r === "image" && V && e.drawImageCount++;
        const C = E({
            url: a,
            timeout: i,
            responseType: o,
            headers: r === "image" ? { accept: c } : void 0
        }, u);
        h = {
            type: r,
            resovle: void 0,
            reject: void 0,
            response: null
        }, h.response = (g.length ? new Promise((w, p) => {
            g[l.size & g.length - 1].postMessage(E({ rawUrl: n }, C)), h.resovle = w, h.reject = p;
        }) : At(C)).catch((w) => {
            if (l.delete(n), r === "image" && d)
                return b("Failed to fetch image base64, trying to use placeholder image", a), typeof d == "string" ? d : d(s);
            throw w;
        }), l.set(n, h);
    }
    return h.response;
}
function Te(e, t, n, r) {
    return m(this, null, function* () {
        if (!Ae(e))
            return e;
        for (const [o, s] of vt(e, t))
            try {
                const a = yield k(
                    n,
                    {
                        url: s,
                        requestType: r ? "image" : "text",
                        responseType: "dataUrl"
                    }
                );
                e = e.replace(xt(o), `$1${a}$3`);
            } catch (a) {
                b("Failed to fetch css data url", o, a);
            }
        return e;
    });
}
function Ae(e) {
    return /url\((['"]?)([^'"]+?)\1\)/.test(e);
}
const ve = /url\((['"]?)([^'"]+?)\1\)/g;
function vt(e, t) {
    const n = [];
    return e.replace(ve, (r, o, s) => (n.push([s, we(s, t)]), r)), n.filter(([r]) => !O(r));
}
function xt(e) {
    const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function It(e, t) {
    return m(this, null, function* () {
        const {
            ownerDocument: n,
            svgStyleElement: r,
            fontFamilies: o,
            fontCssTexts: s,
            tasks: a,
            font: i
        } = t;
        if (!(!n || !r || !o.size))
            if (i && i.cssText) {
                const c = oe(i.cssText, t);
                r.appendChild(n.createTextNode(`${c}
`));
            } else {
                const c = Array.from(n.styleSheets).filter((u) => {
                    try {
                        return "cssRules" in u && Boolean(u.cssRules.length);
                    } catch (f) {
                        return b(`Error while reading CSS rules from ${u.href}`, f), !1;
                    }
                });
                yield Promise.all(
                    c.flatMap((u) => Array.from(u.cssRules).map((f, d) => m(this, null, function* () {
                        if (We(f)) {
                            let g = d + 1;
                            const h = f.href;
                            let C = "";
                            try {
                                C = yield k(t, {
                                    url: h,
                                    requestType: "text",
                                    responseType: "text"
                                });
                            } catch (p) {
                                b(`Error fetch remote css import from ${h}`, p);
                            }
                            const w = C.replace(
                                ve,
                                (p, S, y) => p.replace(y, we(y, h))
                            );
                            for (const p of Dt(w))
                                try {
                                    u.insertRule(
                                        p,
                                        p.startsWith("@import") ? g += 1 : u.cssRules.length
                                    );
                                } catch (S) {
                                    b("Error inserting rule from remote css import", { rule: p, error: S });
                                }
                        }
                    })))
                ), c.flatMap((u) => Array.from(u.cssRules)).filter((u) => Me(u) && Ae(u.style.getPropertyValue("src")) && u.style.getPropertyValue("font-family").split(",").filter(Boolean).map((f) => f.toLowerCase()).some((f) => o.has(f))).forEach((u) => {
                    const f = u, d = s.get(f.cssText);
                    d ? r.appendChild(n.createTextNode(`${d}
`)) : a.push(
                        Te(
                            f.cssText,
                            f.parentStyleSheet ? f.parentStyleSheet.href : null,
                            t
                        ).then((g) => {
                            g = oe(g, t), s.set(f.cssText, g), r.appendChild(n.createTextNode(`${g}
`));
                        })
                    );
                });
            }
    });
}
const Nt = /(\/\*[\s\S]*?\*\/)/gi, re = /((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;
function Dt(e) {
    if (e == null)
        return [];
    const t = [];
    let n = e.replace(Nt, "");
    for (; ;) {
        const s = re.exec(n);
        if (!s)
            break;
        t.push(s[0]);
    }
    n = n.replace(re, "");
    const r = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, o = new RegExp(
        "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",
        "gi"
    );
    for (; ;) {
        let s = r.exec(n);
        if (s)
            o.lastIndex = r.lastIndex;
        else if (s = o.exec(n), s)
            r.lastIndex = o.lastIndex;
        else
            break;
        t.push(s[0]);
    }
    return t;
}
const Pt = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Rt = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function oe(e, t) {
    const { font: n } = t, r = n ? n == null ? void 0 : n.preferredFormat : void 0;
    return r ? e.replace(Rt, (o) => {
        for (; ;) {
            const [s, , a] = Pt.exec(o) || [];
            if (!a)
                return "";
            if (a === r)
                return `src: ${s};`;
        }
    }) : e;
}
function Ft(e, t) {
    if (D(e)) {
        const n = e.currentSrc || e.src;
        if (!O(n))
            return [
                k(t, {
                    url: n,
                    imageDom: e,
                    requestType: "image",
                    responseType: "dataUrl"
                }).then((r) => {
                    r && (e.srcset = "", e.dataset.originalSrc = n, e.src = r || "");
                })
            ];
        (V || ge) && n.includes("data:image/svg+xml") && t.drawImageCount++;
    } else if (R(e) && !O(e.href.baseVal)) {
        const n = e.href.baseVal;
        return [
            k(t, {
                url: n,
                imageDom: e,
                requestType: "image",
                responseType: "dataUrl"
            }).then((r) => {
                r && (e.dataset.originalSrc = n, e.href.baseVal = r || "");
            })
        ];
    }
    return [];
}
const Ut = [
    "background-image",
    "border-image-source",
    "-webkit-border-image",
    "-webkit-mask-image",
    "list-style-image"
];
function _t(e, t) {
    return Ut.map((n) => {
        const r = e.getPropertyValue(n);
        return r ? ((V || ge) && r.includes("data:image/svg+xml") && t.drawImageCount++, Te(r, null, t, !0).then((o) => {
            !o || r === o || e.setProperty(
                n,
                o,
                e.getPropertyPriority(n)
            );
        })) : null;
    }).filter(Boolean);
}
function xe(e, t) {
    const { tasks: n } = t;
    T(e) && (D(e) || he(e)) && n.push(...Ft(e, t)), q(e) && n.push(..._t(e.style, t)), e.childNodes.forEach((r) => {
        xe(r, t);
    });
}
function kt(e, t) {
    return m(this, null, function* () {
        const n = yield A(e, t);
        if (T(n.node) && R(n.node))
            return n.node;
        const {
            log: r,
            tasks: o,
            svgStyleElement: s,
            font: a,
            progress: i,
            autoDestruct: c,
            onCloneNode: l,
            onEmbedNode: u,
            onCreateForeignObjectSvg: f
        } = n;
        r.time("clone node");
        const d = yield j(n.node, n, !0);
        r.timeEnd("clone node"), l == null || l(d), a !== !1 && T(d) && (r.time("embed web font"), yield It(d, n), r.timeEnd("embed web font")), r.time("embed node"), xe(d, n);
        const g = o.length;
        let h = 0;
        const C = () => m(this, null, function* () {
            for (; ;) {
                const p = o.pop();
                if (!p)
                    break;
                try {
                    yield p;
                } catch (S) {
                    b("Failed to run task", S);
                }
                i == null || i(++h, g);
            }
        });
        i == null || i(h, g), yield Promise.all([...Array(4)].map(C)), r.timeEnd("embed node"), u == null || u(d);
        const w = $t(d, n);
        return s && w.insertBefore(s, w.children[0]), c && Tt(n), f == null || f(w), w;
    });
}
function $t(e, t) {
    const { width: n, height: r } = t, o = pe(n, r, e.ownerDocument), s = o.ownerDocument.createElementNS(o.namespaceURI, "foreignObject");
    return s.setAttributeNS(null, "x", "0%"), s.setAttributeNS(null, "y", "0%"), s.setAttributeNS(null, "width", "100%"), s.setAttributeNS(null, "height", "100%"), s.append(e), o.appendChild(s), o;
}
function H(e, t) {
    return m(this, null, function* () {
        const n = yield A(e, t), r = yield kt(n), o = ye(r);
        n.autoDestruct || (n.svgStyleElement = Ce(n.ownerDocument));
        const s = I(o, r.ownerDocument);
        return yield lt(s, n);
    });
}
function Ot(e, t) {
    return m(this, null, function* () {
        const n = yield A(e, t), { log: r, type: o, quality: s, dpi: a } = n, i = yield H(n);
        r.time("canvas to blob");
        const c = yield et(i, o, s);
        if (["image/png", "image/jpeg"].includes(o) && a) {
            const l = yield rt(c.slice(0, 33));
            let u = new Uint8Array(l);
            return o === "image/png" ? u = fe(u, a) : o === "image/jpeg" && (u = se(u, a)), new Blob([u, c.slice(33)], { type: o });
        }
        return r.timeEnd("canvas to blob"), c;
    });
}
function F(e, t) {
    return m(this, null, function* () {
        const n = yield A(e, t), { log: r, quality: o, type: s, dpi: a } = n, i = yield H(n);
        r.time("canvas to data url");
        let c = i.toDataURL(s, o);
        if (["image/png", "image/jpeg"].includes(s) && a && de && Le) {
            const [l, u] = c.split(",");
            let f = 0, d = !1;
            if (s === "image/png") {
                const y = $e(u);
                y >= 0 ? (f = Math.ceil((y + 28) / 3) * 4, d = !0) : f = 33 / 3 * 4;
            } else
                s === "image/jpeg" && (f = 18 / 3 * 4);
            const g = u.substring(0, f), h = u.substring(f), C = window.atob(g), w = new Uint8Array(C.length);
            for (let y = 0; y < w.length; y++)
                w[y] = C.charCodeAt(y);
            const p = s === "image/png" ? fe(w, a, d) : se(w, a), S = window.btoa(String.fromCharCode(...p));
            c = [l, ",", S, h].join("");
        }
        return r.timeEnd("canvas to data url"), c;
    });
}
function Bt(e, t) {
    return m(this, null, function* () {
        const n = yield A(e, t), { width: r, height: o, ownerDocument: s } = n, a = yield F(n), i = pe(r, o, s), c = i.ownerDocument.createElementNS(i.namespaceURI, "image");
        return c.setAttributeNS(null, "href", a), c.setAttributeNS(null, "height", "100%"), c.setAttributeNS(null, "width", "100%"), i.appendChild(c), ye(i);
    });
}
function Mt(e, t) {
    return m(this, null, function* () {
        const n = yield A(e, t), { ownerDocument: r, width: o, height: s, scale: a, type: i } = n, c = i === "image/svg+xml" ? yield Bt(n) : yield F(n), l = I(c, r);
        return l.width = Math.floor(o * a), l.height = Math.floor(s * a), l.style.width = `${o}px`, l.style.height = `${s}px`, l;
    });
}
function Wt(e, t) {
    return m(this, null, function* () {
        return F(
            yield A(e, N(E({}, t), { type: "image/jpeg" }))
        );
    });
}
function Vt(e, t) {
    return m(this, null, function* () {
        const n = yield A(e, t), r = yield H(n);
        return r.getContext("2d").getImageData(0, 0, r.width, r.height).data;
    });
}
function qt(e, t) {
    return m(this, null, function* () {
        return F(
            yield A(e, N(E({}, t), { type: "image/png" }))
        );
    });
}
function jt(e, t) {
    return m(this, null, function* () {
        return F(
            yield A(e, N(E({}, t), { type: "image/webp" }))
        );
    });
}
export {
    it as createContext,
    Tt as destroyContext,
    Ot as domToBlob,
    H as domToCanvas,
    F as domToDataUrl,
    kt as domToForeignObjectSvg,
    Mt as domToImage,
    Wt as domToJpeg,
    Vt as domToPixel,
    qt as domToPng,
    Bt as domToSvg,
    jt as domToWebp,
    P as loadMedia,
    ot as waitUntilLoad
};
