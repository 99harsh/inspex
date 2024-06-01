let _HTMLTEXTELEMENTS = [];
let _UNITS = [];
let _COLORPALETS = []
let isDragabble = false;
let drabbleFullScreen = "";

const _init = () => {
    chrome.storage.sync.get(null, (result) => {
        _HTMLTEXTELEMENTS = result._HTMLTEXTELEMENTS
        _UNITS = result._UNITS;
        _COLORPALETS = result._COLORPALETS
        //  _CSS_ = result._CSS_
    });

    const container = document.getElementsByTagName('body');
    if (container) {
        function hasAncestor(element, id, className, minimizeContainer) {
            while (element) {
                if (element.id === id || element.classList.contains(className) || minimizeContainer === element.id) {
                    return true;
                }
                element = element.parentElement;
            }
            return false;
        }

        const moveOver = (event) => {
            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble) {
                event.target.style.cursor = "pointer";
                event.target.style.outline = '1px solid red';

            }
        }

        const mouseOut = (event) => {
            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble) {
                event.target.style.cursor = "unset";
                event.target.style.outline = 'none';
            }
        }

        const mouseClick = (event) => {

            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble) {
                _invokeInspexPopup(event.target);
                event.target.style.cursor = "pointer";
                event.target.style.outline = '1px solid red';
                event.inspex_clicked = true;
            }
        }

        const documentClickEvent = (event) => {
            const target = event.target;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'SPAN' || target.tagName === 'DIV' || target.tagName === 'P') {
                event.preventDefault();
            }
        }


        chrome.runtime.onMessage.addListener((message) => {
            if (message === "OFF") {
                container[0].removeEventListener("mouseover", moveOver);
                container[0].removeEventListener("mouseout", mouseOut);
                container[0].removeEventListener("click", mouseClick);
                document.removeEventListener("click", documentClickEvent)
                const isExist = document.getElementById("inspex-color-palet-container");
                const isExitMinimize = document.getElementById("inspex-minimized-window");
                if (isExist) {
                    isExist.remove();
                    container[0].classList.remove("inspex-body")
                }

                if (isExitMinimize) {
                    isExitMinimize.remove();
                }
            } else {
                container[0].classList.add("inspex-body");
                container[0].addEventListener('mouseover', moveOver);
                // Add event listener for mouseout on the container
                container[0].addEventListener('mouseout', mouseOut);
                container[0].addEventListener('click', mouseClick)
                document.addEventListener('click', documentClickEvent);
            }
        });
    }
}

_init()