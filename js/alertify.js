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