function listenForClicks() {
    document.addEventListener("click", (e) => {
        function actions(tabs) {
            switch(e.target.id) {
                case "LoadDiff":
                    browser.tabs.executeScript({code: `document.querySelectorAll('.load-diff-button').forEach(node => node.click());`})
                    break;

                default:
                    console.error(`Option ${e.target.id} is no supprted!`)
                    break;
            }       
        }

        if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
            // Ignore when click is not on a button within <div id="popup-content">.
            return;
        }
        browser.tabs
            .query({ active: true, currentWindow: true })
            .then(actions)
            .catch(reportError);
    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs
    .executeScript({ file: "/content_scripts/github-gl.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
