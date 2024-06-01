let _HTMLTEXTELEMENTS = [];
let _UNITS = [];
let _COLORPALETS = []
let isDragabble = false;
let drabbleFullScreen = "";
let socket = {};
let lockId = "";
let selectedId = "";
let prevHoverId = ""
let room_id = "";
let room_owner = "host";

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
            const unique_id = event.target.getAttribute("data-unique-id");
            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble && unique_id != selectedId && lockId != unique_id) {
                if (unique_id != prevHoverId) {
                    event.target.style.cursor = "pointer";
                    event.target.style.outline = "1px solid yellow";
                    const styles = [{ name: "cursor", style: "pointer" }, { name: "outline", style: "1px solid red" }];
                    if (socket != "") {
                        socket.send(JSON.stringify({ unique_id, styles, room_owner, event: "listen_change", room_id }));
                    }
                    prevHoverId = unique_id;
                }

            }
        }

        const mouseOut = (event) => {
            const unique_id = event.target.getAttribute("data-unique-id");
            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble && selectedId != unique_id && lockId != unique_id) {
                event.target.style.cursor = "unset";
                event.target.style.outline = 'none';
                const styles = [{ name: "cursor", style: "unset" }, { name: "outline", style: "none" }];
                if (socket != "") {
                    socket.send(JSON.stringify({ unique_id, styles, room_owner, event: "listen_change", room_id }));
                }
            }
        }

        const mouseClick = (event) => {
            const unique_id = event.target.getAttribute("data-unique-id");
            if (event.target?.id?.includes("inspex") || unique_id == lockId || Array.from(event.target.classList).some(className => className.startsWith('inspex')) || unique_id == null ) {
                return;
            }
            console.log("event", unique_id)
            if (unique_id != selectedId && selectedId != "") {
                const prevSelected = document.querySelector(`[data-unique-id=${selectedId}]`);
                if (prevSelected) {
                    prevSelected.style.outline = "none";
                    prevSelected.style.cursor = "unset";
                    socket.send(JSON.stringify({event: "unlock_element", room_id, room_owner, unique_id: selectedId}))
                }
            }
            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble) {
                _invokeStylePalet(event.target);
                event.target.style.cursor = "pointer";
                event.target.style.outline = '1px solid green';
                event.inspex_clicked = true;
                selectedId = unique_id;
                socket.send(JSON.stringify({event: "lock_element", room_id, room_owner, unique_id}))
            }
        }

        const documentClickEvent = (event) => {
            const target = event.target;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'SPAN' || target.tagName === 'DIV' || target.tagName === 'P') {
                event.preventDefault();
                //event.stopPropagation();
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
                _init_socket()
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