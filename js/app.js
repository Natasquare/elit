import { CodeJar } from "https://medv.io/codejar/codejar.js";
import { wln } from "./wln.js";
window.root = getComputedStyle(document.documentElement);
window.db = window.localStorage;
window.post = (e, t) =>
    fetch(e, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
    });
alertify.defaults = {
    autoReset: !0,
    basic: !1,
    closable: !0,
    closableByDimmer: !0,
    invokeOnCloseOff: !1,
    frameless: !1,
    defaultFocusOff: !1,
    maintainFocus: !0,
    maximizable: !1,
    modal: !0,
    movable: !0,
    moveBounded: !1,
    overflow: !0,
    padding: !0,
    pinnable: !1,
    pinned: !0,
    preventBodyShift: !1,
    resizable: !0,
    startMaximized: !1,
    transition: "pulse",
    transitionOff: !1,
    tabbable:
        'button:not(:disabled):not(.ajs-reset),[href]:not(:disabled):not(.ajs-reset),input:not(:disabled):not(.ajs-reset),select:not(:disabled):not(.ajs-reset),textarea:not(:disabled):not(.ajs-reset),[tabindex]:not([tabindex^="-"]):not(:disabled):not(.ajs-reset)',
    notifier: {
        delay: 3,
        position: "bottom-right",
        closeButton: !1,
        classes: {
            base: "alertify-notifier",
            prefix: "ajs-",
            message: "ajs-message",
            top: "ajs-top",
            right: "ajs-right",
            bottom: "ajs-bottom",
            left: "ajs-left",
            center: "ajs-center",
            visible: "ajs-visible",
            hidden: "ajs-hidden",
            close: "ajs-close",
        },
    },
    glossary: {
        title: '<a class="hover-underline-animation">Elit</a>',
        ok: "OK",
        cancel: "Cancel",
    },
    theme: { input: "ajs-input", ok: "ajs-ok", cancel: "ajs-cancel" },
    hooks: { preinit: function (e) {}, postinit: function (e) {} },
};
alertify.a ||
    alertify.dialog("a", function () {
        return {
            main: function (e) {
                this.message = e;
            },
            setup: function () {
                return {
                    buttons: [{ text: "OK", key: 27 }],
                    focus: { element: 0 },
                };
            },
            prepare: function () {
                this.setContent(this.message);
            },
        };
    });
window.alert = alertify.a;
const highlight = (e) => {
    const t = e.textContent;
    e.innerHTML = hljs.highlight("js", t).value;
};
window.jar = CodeJar(document.querySelector(".editor"), wln(highlight), {
    tab: " ".repeat(4),
});
window.beautify = () => {
    const e = $(".editor")[0].textContent.trim();
    if (!e) return alertify.warning("There's nothing to beautify");
    try {
        jar.updateCode(js_beautify(e, {})),
            alertify.success("Beautified the code!");
    } catch (e) {
        alertify.error("Failed to beautify the code");
    }
};
window.ce = () => {
    if (!$(".editor")[0].textContent.trim())
        return alertify.warning("There's nothing to clear");
    jar.updateCode(""), alertify.success("Cleared the editor!");
};
window.copy = () => {
    const e = $(".editor")[0].textContent;
    if (!e.trim()) return alertify.warning("There's nothing to copy!");
    navigator.clipboard.writeText(e).then(
        () => {
            alertify.success("Copied!");
        },
        (e) => {
            alertify.error("Failed to copy the code");
        }
    );
};
window.save = () => {
    const e = $(".editor")[0].textContent.trim();
    if (!e) return alertify.warning("There's no code to save");
    try {
        db.setItem("code", e), alertify.success("Saved!");
    } catch (e) {
        alertify.error("Couldn't save your code");
    }
};
window.load = () => {
    const e = db.getItem("code").trim();
    if (!e) return alertify.warning("There are no saved codes");
    try {
        jar.updateCode(e), alertify.success("Loaded your code!");
    } catch (e) {
        alertify.error("Could't load your code");
    }
};
window.run = () => {
    const e = $(".editor")[0].textContent.trim();
    if (!e) return alertify.warning("There's no code to run");
    post("https://emkc.org/api/v2/piston/execute", {
        language: "js",
        version: "16.3.0",
        files: [{ content: e }],
    }).then((e) => {
        e.json().then((e) => {
            alert(
                `<pre>${
                    e.run.output?.trim() || "Your code ran without any outputs."
                }</pre>`
            );
        });
    });
};
$(document).ready(function () {
    $("#loader").css({ opacity: "0" }),
        setTimeout(async () => {
            $("#loader").remove();
        }, 500);
});
const text = $("div.text svg text"),
    path = $("div.text svg path");
text.hover(
    () => path.attr("fill", root.getPropertyValue("--main")),
    () => path.attr("fill", root.getPropertyValue("--light"))
);
