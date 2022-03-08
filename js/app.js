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
