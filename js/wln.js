"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        return (__assign =
            Object.assign ||
            function (e) {
                for (var t, n = 1, o = arguments.length; n < o; n++)
                    for (var i in (t = arguments[n]))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                            (e[i] = t[i]);
                return e;
            }).apply(this, arguments);
    };
function withLineNumbers(e, t) {
    void 0 === t && (t = {});
    var n,
        o = __assign(
            {
                class: "codejar-linenumbers",
                wrapClass: "codejar-wrap",
                width: "49px",
                backgroundColor: "var(--greyer)",
                color: "var(--light)",
            },
            t
        );
    return function (t) {
        e(t),
            n ||
                ((n = init(t, o)),
                t.addEventListener("scroll", function () {
                    return (n.style.top = "-".concat(t.scrollTop, "px"));
                }));
        var i = t.textContent || " ",
            r = i.endsWith("\n") ? i.split("\n").slice(0, -1) : i.split("\n");
        n.innerText = r.reduce((e, t, n) => (e += n + 1 + "\n"), "").trim();
    };
}
export const wln = withLineNumbers;
function init(e, t) {
    var n = getComputedStyle(e),
        o = document.createElement("div");
    o.className = t.wrapClass;
    o.style.position = "relative";
    var i = document.createElement("div");
    i.className = t.class;
    o.appendChild(i);
    i.style.position = "absolute";
    i.style.top = "0px";
    i.style.left = "0px";
    i.style.bottom = "0px";
    i.style.width = t.width;
    i.style.overflow = "hidden";
    i.style.backgroundColor = t.backgroundColor;
    i.style.color = t.color || n.color;
    i.style.setProperty("mix-blend-mode", "unset");
    i.style.fontFamily = n.fontFamily;
    i.style.fontSize = n.fontSize;
    i.style.lineHeight = n.lineHeight;
    i.style.paddingTop = n.paddingTop;
    i.style.paddingLeft = n.paddingLeft;
    i.style.borderTopLeftRadius = n.borderTopLeftRadius;
    i.style.borderBottomLeftRadius = n.borderBottomLeftRadius;
    var r = document.createElement("div");
    r.style.position = "relative";
    r.style.top = "0px";
    i.appendChild(r);
    e.style.paddingLeft =
        "calc(" + t.width + " + " + i.style.paddingLeft + " + 15px)";
    e.style.whiteSpace = "pre";
    e.parentNode.insertBefore(o, e);
    o.appendChild(e);
    return r;
}
