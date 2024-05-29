let _HTMLTEXTELEMENTS = [];
let _UNITS = [];
let _COLORPALETS = []
let isDragabble = false;
let drabbleFullScreen = "";
let socket = "";
let room_id = "";
let prevHoverId = "";
const _FLEX_ = [{
    paletName: "Flex Direction",
    style: "flex-direction",
    type: "select",
    styleValues: ["row", "column", "row-reverse", "column-reverse", "inherit", "initial"],
    id: "inspex-flex-direction-dropdown",
    isMultiple: false,
    event: "change"
},
{
    paletName: "Align Items",
    style: "align-items",
    type: "select",
    styleValues: ["stretch", "normal", "flex-start", "flex-end", "center", "baseline", "initial", "inherit", "unset", "start", "end", "baseline"],
    id: "inspex-align-items-dropdown",
    isMultiple: false,
    event: "change"
},
{
    paletName: "Justify Content",
    style: "justify-content",
    type: "select",
    styleValues: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "stretch", "inherit", "initial", "unset"],
    id: "inspex-justify-content-dropdown",
    isMultiple: false,
    event: "change"
},
{
    paletName: "Align Self",
    style: "align-self",
    type: "select",
    styleValues: ["auto", "stretch", "center", "flex-end", "flex-start", "flex-end", "baseline", "initial", "inherit"],
    id: "inspex-align-self-dropdown",
    isMultiple: false,
    event: "change"
},
{
    paletName: "Align Content",
    style: "align-content",
    type: "select",
    styleValues: ["auto", "stretch", "center", "flex-end", "flex-start", "flex-end", "baseline", "initial", "inherit"],
    id: "inspex-align-content-dropdown",
    isMultiple: false,
    event: "change"
},
{
    paletName: "Flex",
    style: "flex",
    type: "input",
    styleValues: ["flex-grow", "flex-shrink", "flex-basis", "auto", "inherit", "initial", "none"],
    id: "inspex-flex-option-dropdown",
    isMultiple: false,
    event: "input",
    inputType: "text"
},
{
    paletName: "Flex Wrap",
    style: "flex-wrap",
    type: "select",
    styleValues: ["nowrap", "wrap", "wrap-reverse", "inherit", "initial"],
    id: "inspex-flex-wrap-dropdown",
    isMultiple: false,
    event: "change"
},
{
    paletName: "Flex Flow",
    style: "flex-flow",
    type: "select",
    styleValues: ["row", "row-reverse", "column", "column-reverse", "nowrap", "wrap", "wrap-reverse", "inherit", "initial"],
    id: "inspex-flex-flow-dropdown",
    isMultiple: false,
    event: "change"
},
{
    paletName: "Flex Basis",
    style: "flex-basis",
    type: "select",
    styleValues: ["number", "auto", "inherit", "initial", "none", "length", "percentage", "fill", "content"],
    id: "inspex-flex-basis-dropdown",
    isMultiple: false,
    event: "change"
},
{
    paletName: "Flex Grow",
    style: "flex-grow",
    type: "select",
    styleValues: ["number", "inherit", "initial"],
    id: "inspex-flex-grow-dropdown",
    isMultiple: false,
    event: "change"
}]

const _GRID_ = [
    {
        paletName: "Grid Column",
        style: "grid-column",
        type: "input",
        styleValues: [],
        id: "inspex-grid-columns-input",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Row",
        style: "grid-row",
        type: "input",
        styleValues: [],
        id: "inspex-grid-rows-input",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Area",
        style: "grid-area",
        type: "input",
        styleValues: [],
        id: "inspex-grid-area-input",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Template Columns",
        style: "grid-template-columns",
        type: "input",
        styleValues: [],
        id: "inspex-grid-template-columns",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Template Rows",
        style: "grid-template-rows",
        type: "input",
        styleValues: [],
        id: "inspex-grid-template-rows",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Template Areas",
        style: "grid-template-rows",
        type: "input",
        styleValues: [],
        id: "inspex-grid-template-rows",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Justify Content",
        style: "justify-content",
        type: "select",
        styleValues: ["start", "end", "center", "space-between", "space-around", "space-evenly", "stretch", "inherit", "initial", "unset"],
        id: "inspex-grid-justify-content",
        isMultiple: false,
        event: "change"
    },
    {
        paletName: "Align Content",
        style: "align-content",
        type: "select",
        styleValues: ["auto", "stretch", "center", "end", "start", "baseline", "initial", "inherit"],
        id: "inspex-grid-align-content",
        isMultiple: false,
        event: "change"
    },
    {
        paletName: "Align Items",
        style: "align-items",
        type: "select",
        styleValues: ["stretch", "normal", "start", "end", "center", "baseline", "initial", "inherit", "unset", "baseline"],
        id: "inspex-grid-align-items",
        isMultiple: false,
        event: "change"
    },
    {
        paletName: "Justify Item",
        style: "justify-items",
        type: "select",
        styleValues: [
            "normal",
            "stretch",
            "center",
            "start",
            "end",
            "flex-start",
            "flex-end",
            "self-start",
            "self-end",
            "left",
            "right",
            "baseline",
            "first baseline",
            "last baseline",
            "safe center",
            "unsafe center",
            "legacy right",
            "legacy left",
            "legacy center",
            "inherit",
            "initial",
            "revert",
            "revert-layer",
            "unset"
        ],
        id: "inspex-grid-justify-item",
        isMultiple: false,
        event: "change"
    },
    {
        paletName: "Place Item",
        style: "place-items",
        type: "select",
        styleValues: [
            "center",
            "normal start",
            "center normal",
            "start legacy",
            "end normal",
            "self-start legacy",
            "self-end normal",
            "flex-start legacy",
            "flex-end normal",
            "baseline normal",
            "first baseline legacy",
            "last baseline normal",
            "stretch legacy",
            "inherit",
            "initial",
            "revert",
            "revert-layer",
            "unset",
        ],
        id: "inspex-grid-place-item",
        isMultiple: false,
        event: "change"
    },
    {
        paletName: "Place Content",
        style: "place-content",
        type: "select",
        styleValues: [
            "center start",
            "start center",
            "end left",
            "flex-start center",
            "flex-end center",
            "baseline center",
            "first baseline space-evenly",
            "last baseline right",
            "space-between space-evenly",
            "space-around space-evenly",
            "space-evenly stretch",
            "stretch space-evenly",
            "inherit",
            "initial",
            "revert",
            "revert-layer",
            "unset",
        ],
        id: "inspex-grid-place-content",
        isMultiple: false,
        event: "change"
    },
    {
        paletName: "Grid Template Area",
        style: "grid-template-areas",
        type: "input",
        styleValues: [],
        id: "inspex-grid-template-areas",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Template",
        style: "grid-template",
        type: "input",
        styleValues: [],
        id: "inspex-grid-template",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Column Gap",
        style: "grid-column-gap",
        isMultiple: true,
        numberId: "#inspex-grid-column-gap-dropdown",
        unitId: "#inspex-grid-column-gap-unit"
    },
    {
        paletName: "Grid Row Gap",
        style: "grid-row-gap",
        isMultiple: true,
        numberId: "#inspex-grid-row-gap-dropdown",
        unitId: "#inspex-grid-row-gap-unit"
    },
    {
        paletName: "Grid Template",
        style: "grid-template",
        type: "input",
        styleValues: [],
        id: "inspex-grid-template",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Gap",
        style: "gap",
        type: "input",
        styleValues: [],
        id: "inspex-grid-gap",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Auto Columns",
        style: "grid-auto-columns",
        type: "input",
        styleValues: [],
        id: "inspex-auto-columns",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Auto Rows",
        style: "grid-auto-rows",
        type: "input",
        styleValues: [],
        id: "inspex-auto-rows",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Auto Flow",
        style: "grid-auto-flow",
        type: "select",
        styleValues: [
            "row",
            "column",
            "dense",
            "row dense",
            "column dense",
            "inherit",
            "initial",
            "revert",
            "revert-layer",
            "unset",
        ],
        id: "inspex-auto-flow",
        isMultiple: false,
        event: "change"
    },
    {
        paletName: "Grid",
        style: "grid",
        type: "input",
        styleValues: [],
        id: "inspex-grid-input",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Column Start",
        style: "grid-column-start",
        type: "input",
        styleValues: [],
        id: "inspex-column-start-input",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Column End",
        style: "grid-column-end",
        type: "input",
        styleValues: [],
        id: "inspex-column-end-input",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Row Start",
        style: "grid-row-start",
        type: "input",
        styleValues: [],
        id: "inspex-row-start-input",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
    {
        paletName: "Grid Row End",
        style: "grid-row-end",
        type: "input",
        styleValues: [],
        id: "inspex-row-end-input",
        isMultiple: false,
        event: "input",
        inputType: "text"
    },
]

const _CSS_ = [
    {
        sectionName: "Container Alignment",
        sectionId: "inspex-container-alignment-container",
        bodySectionId: "inspex-container-alignment-body-container",
        sectionProperties: {
            supportingProperties:
                [
                    {
                        paletName: "Width",
                        style: "width",
                        isMultiple: true,
                        numberId: "#inspex-width-dropdown",
                        unitId: "#inspex-width-unit"
                    },
                    {
                        paletName: "Height",
                        style: "height",
                        isMultiple: true,
                        numberId: "#inspex-height-dropdown",
                        unitId: "#inspex-height-unit"
                    },

                    {
                        paletName: "Padding",
                        style: "padding",
                        type: "input",
                        styleValues: [],
                        id: "inspex-padding-input",
                        isMultiple: false,
                        event: "input",
                        inputType: "text"
                    },
                    {
                        paletName: "Margin",
                        style: "margin",
                        type: "input",
                        styleValues: [],
                        id: "inspex-margin-input",
                        isMultiple: false,
                        event: "input",
                        inputType: "text"
                    },
                    {
                        paletName: "Border",
                        style: "border",
                        type: "input",
                        styleValues: [],
                        id: "inspex-border-input",
                        isMultiple: false,
                        event: "input",
                        inputType: "text"
                    },
                    {
                        paletName: "Border Radius",
                        style: "border-radius",
                        type: "input",
                        styleValues: [],
                        id: "inspex-border-radius-input",
                        isMultiple: false,
                        event: "input",
                        inputType: "text"
                    },
                    {
                        paletName: "Position",
                        style: "position",
                        type: "select",
                        styleValues: [
                            "static",
                            "relative",
                            "absolute",
                            "fixed",
                            "sticky",
                            "inherit",
                            "initial",
                            "revert",
                            "revert-layer",
                            "unset"
                        ],
                        id: "inspex-position-item",
                        isMultiple: false,
                        event: "change"
                    },
                    {
                        paletName: "Z-Index",
                        style: "z-index",
                        type: "input",
                        styleValues: [],
                        id: "inspex-z-index-input",
                        isMultiple: false,
                        event: "input",
                        inputType: "number"
                    },
                    {
                        paletName: "Top",
                        style: "top",
                        isMultiple: true,
                        numberId: "#inspex-top-dropdown",
                        unitId: "#inspex-top-unit"
                    },
                    {
                        paletName: "Right",
                        style: "right",
                        isMultiple: true,
                        numberId: "#inspex-right-dropdown",
                        unitId: "#inspex-right-unit"
                    },
                    {
                        paletName: "Bottom",
                        style: "bottom",
                        isMultiple: true,
                        numberId: "#inspex-bottom-dropdown",
                        unitId: "#inspex-bottom-unit"
                    },
                    {
                        paletName: "Left",
                        style: "left",
                        isMultiple: true,
                        numberId: "#inspex-left-dropdown",
                        unitId: "#inspex-left-unit"
                    },


                ]
        }
    },
    {
        sectionName: "Display Properties",
        sectionId: "inspex-all-display-container",
        bodySectionId: "inspex-display-body-container",
        sectionProperties: {
            mainProperty: {
                paletName: "Display",
                type: "select",
                style: "display",
                styleValues: ["block", "inline", "inline-block", "none", "flex", "inline-flex", "grid", "inline grid", "table", "inline-table", "table-row", "table-cell", "table-caption", "table-column", "table-column-group", "table-header-group", "table-footer-group", "table-row-group", "flex-inline", "ruby", "ruby-base", "ruby-text", "ruby-base-container", "ruby-text-cntainer", "contents", "flow-root", "list-item", "inherit", "initial", "unset", "run-in"],
                id: "inspex-display-dropdown",
                isMultiple: false,
                event: "change",
                isFullWidth: true
            },
            supportingProperties: {
                block: [],
                inline: [],
                "inline-block": [],
                none: [],
                flex: _FLEX_,
                "inline-flex": _FLEX_,
                grid: _GRID_,
                "inline-grid": _GRID_
            }

        }
    },
    {
        sectionName: "Text Properties",
        sectionId: "inspex-all-text-container",
        bodySectionId: "inspex-text-body-container",
        sectionProperties: {
            supportingProperties:
                [
                    {
                        paletName: "Text Align",
                        style: "text-align",
                        styleValues: ["center", "end", "justify", "left", "right", "start", "-webkit-auto", "-webkit-center", "-webkit-left", "-webkit-left", "-webkit-right", "inherit", "initial", "revert", "revert-layer", "unset"],
                        selector: "#inspex-text-align-dropdown",
                        isMultiple: false,
                        event: "change",
                        type: "select"
                    },
                    {
                        paletName: "Text Decoration",
                        style: "text-decoration",
                        styleValues: ["auto", "blink", "dashed", "dotted", "double", "line-through", "none", "overline", "solid", "underline", "wavy", "inherit", "initial", "revert", "revert-layer", "unset"],
                        selector: "#inspex-text-decoration-palet",
                        isMultiple: false,
                        event: "change",
                        type: "select"
                    },
                    {
                        paletName: "Font Weight",
                        style: "font-weight",
                        styleValues: [100, 200, 300, 400, 500, 600, 700, 800, 900],
                        selector: "#inspex-font-weight-dropdown",
                        isMultiple: false,
                        event: "change",
                        type: "select"
                    },

                    {
                        paletName: "Font Size",
                        style: "font-size",
                        isMultiple: true,
                        numberId: "#inspex-font-size-palet",
                        unitId: "#inspex-font-size-dropdown"
                    },
                    {
                        paletName: "Line Height",
                        style: "line-height",
                        isMultiple: true,
                        numberId: "#inspex-text-line-height-input",
                        unitId: "#inspex-text-line-height-dropdown",
                    },
                    {
                        paletName: "Letter Spacing",
                        style: "letter-spacing",
                        isMultiple: true,
                        numberId: "#inspex-text-letter-spacing-input",
                        unitId: "#inspex-text-letter-spacing-dropdown"
                    },
                    {
                        paletName: "Word Spacing",
                        style: "word-spacing",
                        isMultiple: true,
                        numberId: "#inspex-word-spacing-input",
                        unitId: "#inspex-word-spacing-dropdown"
                    },
                    {
                        paletName: "Text Indent",
                        style: "text-indent",
                        isMultiple: true,
                        numberId: "#inspex-text-indent-input",
                        unitId: "#inspex-text-indent-dropdown"
                    },
                    {
                        paletName: "White Space",
                        style: "white-space",
                        styleValues: ["normal", "nowrap", "pre", "pre-wrap", "pre-line", "break-space"],
                        selector: "#inspex-text-white-space-dropdown",
                        isMultiple: false,
                        type: "select",
                        event: "change"

                    },
                    {
                        paletName: "Text Transform",
                        style: "text-transform",
                        styleValues: ["capitilize", "lowercase", "uppercase", "none", "initial", "inherit"],
                        selector: "#inspex-text-transform-dropdown",
                        isMultiple: false,
                        type: "select",
                        event: "change"
                    },
                    {
                        paletName: "Font Family",
                        style: "font-family",
                        styleValues: ["Arial", "Helvetica", "Times New Roman", "Times", "Georgia", "Courier New", "Courier", "Verdana"],
                        selector: "#inspex-font-family-dropdown",
                        isMultiple: false,
                        type: "select",
                        event: "change"
                    },
                    {
                        paletName: "Font Style",
                        style: "font-style",
                        styleValues: ["normal", "italic", "oblique", "inherit", "initial"],
                        selector: "#inspex-font-style-dropdown",
                        isMultiple: false,
                        type: "select",
                        event: "change"
                    },
                    {
                        paletName: "Font Color",
                        style: "color",
                        selector: "inspex-font-color-palet",
                        type: "color"
                    }
                ]
        }
    }
]

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
            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble) {
                const unique_id = event.target.getAttribute("data-unique-id");
                if(unique_id != prevHoverId){
                    event.target.style.cursor = "pointer";
                    event.target.style.outline = "1px solid yellow";
                    const styles = [{name: "cursor", style: "pointer"}, {name: "outline", style: "1px solid red"}];
                    if(socket != ""){
                        socket.send(JSON.stringify({unique_id, styles, room_owner, event: "listen_change", room_id}));
                    }
                    prevHoverId = unique_id;
                }
               
            }
        }

        const mouseOut = (event) => {
            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble) {
                event.target.style.cursor = "unset";
                event.target.style.outline = 'none';
                const unique_id = event.target.getAttribute("data-unique-id");
                const styles = [{name: "cursor", style: "unset"}, {name: "outline", style: "none"}];
                if(socket != ""){
                    socket.send(JSON.stringify({unique_id, styles, room_owner, event: "listen_change", room_id}));
                }
            }
        }

        const mouseClick = (event) => {

            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble) {
                _invokeStylePalet(event.target);
                event.target.style.cursor = "pointer";
                event.target.style.outline = '1px solid red';
                event.inspex_clicked = true;
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

const changedStyles = {};


const _init_socket = () => {
     socket = new WebSocket("wss://7cb1-103-184-236-94.ngrok-free.app");
    socket.addEventListener('open', () => {
        console.log('Connected to the WebSocket server');
        const url = window.location.href;
        urlParams = new URLSearchParams(url.split('?')[1]);
        if(urlParams.get("inspex-join") != null){
            room_owner = "client";
            room_id = urlParams.get("inspex-join");
            socket.send(JSON.stringify({event: "join_room", client_id: "CL001", room_id: urlParams.get("inspex-join")}))
        }else{
            room_owner = "host";
            const domString = document.body.outerHTML;
            socket.send(JSON.stringify({ event: "create_room", client_id: "CL001", dom: domString}));
        }

    });


    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if(data.event == "exchange_dom"){
            room_id = data.room_id;
            applyUpdatedDom(data.processed_dom);
        }else if(data.event == "listen_change"){
            console.log("EVENT", data);
            const targetDiv = document.querySelector([`[data-unique-id="${data.unique_id}"]`]);
            if(targetDiv){
                for(let style of data.styles){
                    targetDiv.style.setProperty(style.name, style.style);
                }
            }
            
        }
    });
}

function applyUpdatedDom(updatedDomString) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = updatedDomString;
    document.body.innerHTML = tempDiv.innerHTML;
  }


const _invokeStylePalet = (event) => {

    //Remove already created DOM
    const isExist = document.getElementById("inspex-color-palet-container");
    const isExitMinimize = document.getElementById("inspex-minimized-window");
    if (isExist) {
        isExist.remove();
    }

    if (isExitMinimize) {
        isExitMinimize.remove();
    }

    //Create New Div 
    const container = document.createElement('div');
    container.id = "inspex-color-palet-container"

    //Get and set top & left (dragabble)
    const top = localStorage.getItem("inspex-top");
    const left = localStorage.getItem("inspex-left");

    //Defaul Box Styling
    const containerStyles = `position: fixed; top: ${top ? top : "50px"}; left: ${left ? left : "50px"}; z-index: 1000;`
    container.setAttribute("style", containerStyles)

    //Create Minimize div
    const minimize = document.createElement("div");
    minimize.classList.add("minimized-window");
    minimize.id = "inspex-minimized-window";

    //Fetch Content HTML File
    fetch(chrome.runtime.getURL('content.html'))
        .then(response => response.text())
        .then(html => {
            container.innerHTML += html;
            if (_HTMLTEXTELEMENTS.includes(event?.tagName?.toLowerCase())) {
                _invokeTextInput(event)

            }
            //Init All Palets
            const dragContainer = document.querySelector("#inspex-drag-me-container")

            // Make the container draggable
            _generateHTML(event);
            _invokeColorPalet(event, 'hex')
            makeDraggable(dragContainer, container, "inspex-palet");
            _closeEvent();
            _footerEvents(event);

            const cssButton = document.querySelector("#inspex-copy-css");
            cssButton.addEventListener("click", (e) => {
                console.log("CSS CLICKED", changedStyles)
                const bodyContainer = document.querySelector(".inspex-body-container");
                bodyContainer.style.display = "none";

                const generatedCSS = document.querySelector(".inspex-generated-css");
                generatedCSS.style.display = "block";

                const textArea = document.querySelector("#inspex-textarea-css");
                let cssString = '{\n';
                for (const key in changedStyles) {
                    cssString += `  ${key}: ${changedStyles[key]};\n`;
                }
                cssString += '}';
                textArea.innerHTML = cssString
                const copyButton = document.querySelector('#inspex-css-copy-btn');
                copyButton.addEventListener('click', function () {
                    textArea.select();
                    navigator.clipboard.writeText(cssString);
                    copyButton.innerHTML = "Copied"
                    copyButton.classList.add("inspex-copied-btn")
                    setTimeout(() => {
                        copyButton.classList.remove("inspex-copied-btn");
                        copyButton.innerHTML = "Copy";
                    }, 3000
                    )

                });

                const backButton = document.querySelector("#inspex-css-back-btn");
                backButton.addEventListener("click", () => {
                    generatedCSS.style.display = "none";
                    bodyContainer.style.display = "block";
                })

            })

        })
        .catch(error => console.error('Error fetching inner content:', error));


    // Append the container to the document body
    document.body.prepend(minimize);
    document.body.prepend(container);


}


const _generateHTML = (domSelector) => {

    const domSelectorStyles = getComputedStyle(domSelector);

    const mainContainer = document.getElementById('inspex-main-body-container');

    for (let section of _CSS_) {
        const bodyContainer = createDivWithId(section.bodySectionId);
        const mainSectionContainer = createDivWithId(section.sectionId);
        const parentDiv = createDivWithClasses("inspex-accordion-container");
        mainSectionContainer.classList.add("inspex-accordion-item", "inspex-section-container")
        const headerContainer = createDivWithClasses("inspex-accordion-header");
        const sectionHeading = document.createElement("span");
        sectionHeading.classList.add("inspex-accordion-header-text");
        sectionHeading.innerHTML = section.sectionName;
        const image = document.createElement("div");
        image.classList.add("inspex-accordion-arrow");
        image.innerHTML = `<svg fill="#000000" height="16px" width="16px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 330 330" xml:space="preserve">
   <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
       c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
       s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
   </svg>`;
        image.setAttribute("style", "width: 16px; height: 16px;")
        headerContainer.appendChild(sectionHeading)
        headerContainer.appendChild(image)
        parentDiv.appendChild(headerContainer)
        const mainProperty = section.sectionProperties?.mainProperty;
        const supportingProperties = section.sectionProperties?.supportingProperties;
        if (mainProperty) {
            const mainPropertyCurrentStyle = domSelectorStyles[mainProperty?.style];
            let inputElement;
            const flex1Col = createDivWithClasses('inspex-palet');
            flex1Col.style.setProperty("padding-bottom", "5px", "important")
            flex1Col.appendChild(createLabel(mainProperty?.paletName, mainProperty?.id));

            if (mainProperty?.type == "select") {
                const selectDiv = createDivWithClasses("");
                const selectorStyle = mainProperty?.style == "text-decoration" ? domSelectorStyles["text-decoration"]?.split(" ")[0] : domSelectorStyles[mainProperty?.style];
                if (!(mainProperty?.styleValues.includes(selectorStyle))) {
                    mainProperty?.styleValues.push(selectorStyle);
                }
                inputElement = createSelect(mainProperty?.id, mainProperty?.styleValues);
                inputElement.value = mainPropertyCurrentStyle;
                selectDiv.appendChild(inputElement);
                flex1Col.appendChild(selectDiv);
            }

            const isPrarentDisplayExist = checkFlexParent(domSelector.parentElement, ["flex", "inline-flex", "grid"]);
            _populateInputElements(supportingProperties[mainPropertyCurrentStyle], bodyContainer, domSelector);
            inputElement.addEventListener(mainProperty.event, (e) => {
                const new_property = e.target.value;
                changedStyles[mainProperty.style] = e.target.value
                domSelector.style.setProperty(mainProperty.style, new_property, "important");
                _populateInputElements(supportingProperties[new_property], bodyContainer, domSelector);
            })
            mainSectionContainer.appendChild(flex1Col);
        } else {
            _populateInputElements(supportingProperties, bodyContainer, domSelector)
        }

        mainSectionContainer.appendChild(bodyContainer);
        parentDiv.appendChild(mainSectionContainer)
        mainContainer.appendChild(parentDiv);
    }

    const accordionHeaders = document.querySelectorAll('.inspex-accordion-header');

    for (let [index, header] of accordionHeaders.entries()) {
        header.addEventListener('click', function () {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            const arrow = header.querySelector(".inspex-accordion-arrow");
            const display = getComputedStyle(accordionContent);
            if (display["display"] != 'none') {
                accordionContent.style.display = 'none';
                arrow.style.transform = "rotate(180deg)";
            } else {
                accordionContent.style.display = 'block';
                arrow.style.transform = "rotate(0deg)";
            }
        });
    }

}

const _populateInputElements = (supportingProperties, bodyContainer, domSelector) => {

    const domSelectorStyles = getComputedStyle(domSelector);
    bodyContainer.innerHTML = "";
    if (supportingProperties?.length > 0) {
        const flexRowPalet = createDivWithClasses('inspex-flex-row inspex-palet');
        for (let section of supportingProperties) {

            const flex1Col = createDivWithClasses('inspex-flex-50');
            const selectorStyle = section.style == "text-decoration" ? domSelectorStyles["text-decoration"]?.split(" ")[0] : domSelectorStyles[section.style];
            if (section.type == "select") {
                flex1Col.appendChild(createLabel(section.paletName, section.id));
                let inputElement;
                const divInput = createDivWithClasses(" ");
                if (!(section.styleValues.includes(selectorStyle))) {
                    section.styleValues.push(selectorStyle);
                }
                inputElement = createSelect(section.id, section.styleValues);
                inputElement.value = selectorStyle;
                inputElement.addEventListener(section.event, (e) => {
                    changedStyles[section.style] = e.target.value + " !important"
                    domSelector.style.setProperty(section.style, e.target.value, "important")
                })
                divInput.appendChild(inputElement);
                flex1Col.appendChild(divInput);
            } else if (section.type == "input" && !section.isMultiple) {
                flex1Col.appendChild(createLabel(section.paletName, section.id));
                let inputElement;
                const divInput = createDivWithClasses(" ");
                if (!(section.styleValues.includes(selectorStyle))) {
                    section.styleValues.push(selectorStyle);
                }
                inputElement = createInput(section.id, section.inputType);
                inputElement.value = selectorStyle;
                inputElement.addEventListener(section.event, (e) => {
                    changedStyles[section.style] = e.target.value + " !important"
                    domSelector.style.setProperty(section.style, e.target.value, "important")
                })
                divInput.appendChild(inputElement);
                flex1Col.appendChild(divInput);
            }
            else if (section.isMultiple) {
                flex1Col.appendChild(createLabel(section.paletName, section.numberId));
                const multipleFlexRowPalet = createDivWithClasses('inspex-flex-row');
                const filteredStyle = extractUnitNumber(selectorStyle);

                const inputDiv = createDivWithClasses('inspex-flex-1');
                const inputElement = createInput(section.numberId, "number");
                inputElement.value = filteredStyle.number;
                inputDiv.appendChild(inputElement)

                const dropdownDiv = createDivWithClasses('inspex-flex-1 inspex-odd-container');
                const inputDropdown = createSelect(section.unitId, _UNITS);
                inputDropdown.value = filteredStyle.unit;

                inputDropdown.addEventListener("input", (e) => {
                    changedStyles[section.style] = `${inputElement.value}${e.target.value} !important`
                    domSelector.style.setProperty(section.style, `${inputElement.value}${e.target.value}`, "important");
                })

                inputElement.addEventListener("input", (e) => {
                    changedStyles[section.style] = `${e.target.value}${inputDropdown.value} !important`
                    domSelector.style.setProperty(section.style, `${e.target.value}${inputDropdown.value}`, "important");
                })

                dropdownDiv.appendChild(inputDropdown);

                multipleFlexRowPalet.appendChild(inputDiv);
                multipleFlexRowPalet.appendChild(dropdownDiv);
                flex1Col.appendChild(multipleFlexRowPalet);
            }

            flexRowPalet.appendChild(flex1Col);

        }
        bodyContainer.appendChild(flexRowPalet);

    } else {
        const mainDiv = createDivWithId("main-supporing-dropdown");
    }
}

const _invokeColorPalet = (event, format) => {
    const domSelectorStyles = getComputedStyle(event);
    for (let elementName of _COLORPALETS) {
        const inputColor = domSelectorStyles[elementName.style]
        const hexInputPalet = document.getElementById(elementName.hexSelector);
        const rgbaCopy = document.getElementById(elementName.rgbaCopy);
        const hexCopy = document.getElementById(elementName.hexCopy);
        const rgbaColor = _rgbToRgba(inputColor);
        hexInputPalet.value = _rgbaToHex(rgbaColor)
        let jscolor = new JSColor(`#${elementName.selector}`, { preset: 'large', position: 'right', value: rgbaColor })
        jscolor.onChange = () => {
            hexInputPalet.value = jscolor.toHEXAString();
        }
        jscolor.onInput = () => {
            event.style.setProperty(elementName.style, jscolor.toRGBAString(), "important");
            changedStyles[elementName.style] = jscolor.toHEXAString();
        }

        rgbaCopy.addEventListener("click", (e) => {
            rgbaCopy.classList.add("inspex-copied-color-palet")
            navigator.clipboard.writeText(jscolor.toRGBAString());
            setTimeout(() => {
                rgbaCopy.classList.remove("inspex-copied-color-palet");
            }, 3000)
        })
        hexCopy.addEventListener("click", (e) => {
            hexCopy.classList.add("inspex-copied-color-palet")
            navigator.clipboard.writeText(hexInputPalet.value);
            setTimeout(() => {
                hexCopy.classList.remove("inspex-copied-color-palet");
            }, 3000)
        })


    }
}

const _invokeTextInput = (event) => {
    const text = extractInnerText(event.innerText || event.innerHTML);
    if (text != "") {
        const textContainer = document.querySelector("#inspex-text-input-container");
        const textInput = document.querySelector("#inspex-text-type-input");
        textInput.value = text;
        textInput.addEventListener("input", (e) => {
            event.innerText = e.target.value;
            if (isDragabble) {
                event.style.setProperty("width", event.getBoundingClientRect().width + "px", "important")
            }
        })
        textContainer.style.setProperty("display", "block", "important");
    }
}

const _closeEvent = () => {
    const closeButton = document.querySelector("#inspex-close");
    const mainContainer = document.querySelector("#inspex-color-palet-container");
    const minimized = document.querySelector("#inspex-minimized-window")
    const minmizedCSS = document.querySelector(".minimized-window");
    closeButton.addEventListener("click", (e) => {
        minimized.innerHTML = `<p class='inspex-vertical-branding'>Inpex.dev</p>`;
        mainContainer.style.transform = "scale(0)";
        setTimeout(() => {
            minmizedCSS.style.setProperty("display", "block", "important")
        }, 300)
    })
    minimized.addEventListener("click", (e) => {
        minmizedCSS.style.setProperty("display", "none", "important")
        setTimeout(() => {
            mainContainer.style.transform = "scale(1)";

        }, 300)
    })

}

const _footerEvents = (event) => {
    const computedStyle = window.getComputedStyle(event);
    const dragabbleCheckbox = document.querySelector("#inspex-dragabble-checkbox");
    const draggableLockHeightContainer = document.querySelector("#inspex-lock-height-container")
    const draggableLockHeightCheckbox = document.querySelector("#inspex-dragabble-lock-height-checkbox");
    let isLockHeight = false;
    dragabbleCheckbox.addEventListener("change", (e) => {
        draggableLockHeightContainer.style.setProperty("display", "block");
        const blankdiv = document.createElement("div");
        if (e.target.checked) {
            if (event.getAttribute("inspex-drag-container") || event.parentElement.getAttribute("inspex-drag-container")) {
                isDragabble = true;
                event.parentElement.setAttribute("style", "position: fixed; width:100%; height:100%; top:0; left:0;")
                event.style.setProperty("width", computedStyle["width"], "important");
                event.style.setProperty("left", event.getBoundingClientRect().left + "px");
                event.style.setProperty("top", event.getBoundingClientRect().top + "px")
                event.style.setProperty("z-index", "10", "important");
                event.style.setProperty("right", "auto", "important");
                event.style.setProperty("bottom", "auto", "important");
                event.style.setProperty("position", "fixed");
                const lockHideIdContaner = document.querySelector(`#${event.parentElement?.getAttribute("inspex-lock-height-id")}`);
                if (lockHideIdContaner.style.height != "auto" && lockHideIdContaner.style.height != "") {
                    draggableLockHeightCheckbox.checked = true;
                    draggableLockHeightCheckbox.value = event.parentElement?.getAttribute("inspex-lock-height-id");
                }
                draggableLockHeightCheckbox.addEventListener("change", (e) => {
                    if (e.target.checked) {
                        lockHideIdContaner.style.setProperty("height", event.getBoundingClientRect().height + "px", "important")
                    } else {
                        lockHideIdContaner.style.setProperty("height", "auto", "important")
                    }
                })
            } else {
                const div = document.createElement("div");
                const uniqueId = `inspex-lock-height-${Date.now()}`
                blankdiv.setAttribute("style", `width: ${event.getBoundingClientRect().width}px;`)
                blankdiv.id = uniqueId
                draggableLockHeightCheckbox.value = uniqueId;
                div.setAttribute("inspex-drag-container", "true");
                div.setAttribute("inspex-lock-height-id", uniqueId)
                div.setAttribute("style", "position: fixed; width:100%; height:100%; top:0; left:0;");
                isDragabble = true
                event.style.setProperty("width", computedStyle["width"], "important");
                event.style.setProperty("left", event.getBoundingClientRect().left + "px");
                event.style.setProperty("top", event.getBoundingClientRect().top + "px")
                event.style.setProperty("z-index", "10", "important");
                event.style.setProperty("right", "auto", "important");
                event.style.setProperty("bottom", "auto", "important");
                event.style.setProperty("position", "fixed");
                event.parentElement.appendChild(div);
                event.insertAdjacentElement("afterend", blankdiv);
                div.appendChild(event)
                draggableLockHeightCheckbox.addEventListener("change", (e) => {
                    if (e.target.checked) {
                        blankdiv.style.setProperty("height", event.getBoundingClientRect().height + "px", "important");
                    } else {
                        blankdiv.style.setProperty("height", "auto", "important");
                    }
                })


            }
            event.style.setProperty("cursor", "move", "important");
            event.style.setProperty("outline", "1px solid rgba(235, 86, 142, 1)", "important")


            makeDraggable(event, event, "container");
        } else {
            isDragabble = false;
            event.style.setProperty("cursor", "unset", "important");
            event.style.setProperty("outline", "none", "important")
            event.parentElement.setAttribute("style", "");
            draggableLockHeightContainer.style.setProperty("display", "none", "important");
        }
    })

    event.addEventListener("mousedown", (e) => {
        e.preventDefault()
    })
}

//check parent if X property is applied on parent or not
const checkFlexParent = (element, properties) => {
    // Traverse up the DOM hierarchy until we reach the body element
    while (element && element.tagName !== 'BODY') {
        // Check if the current element has a computed style
        const computedStyle = window.getComputedStyle(element);
        // Check if the computed display style is flex or inline-flex
        if (properties.includes(computedStyle.display)) {
            return { isParent: true, parentProperty: computedStyle.display }; // Flex parent is available
        }

        // Move up to the parent element
        element = element.parentElement;
    }

    return { isParent: false }; // Flex parent is not available
}

//convert rgb to rgba
const _rgbToRgba = (rgbString) => {
    rgbString = rgbString.trim(" ")
    const rgbRegex = /^rgb\((\d+), (\d+), (\d+)\)$/;

    let match = rgbString.match(rgbRegex);
    if (match) {
        // Extract RGB values
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);

        // Return RGBA string with alpha 0
        return `rgba(${r},${g},${b},1)`;
    }

    // Check if the color is in RGBA format
    const rgbaRegex = /^rgba\((\d+), (\d+), (\d+), (\d+(\.\d+)?)\)$/;
    match = rgbString.match(rgbaRegex);
    if (match) {
        const alpha = parseFloat(match[4]);
        if (alpha === 0) {
            // If alpha is 0, change it to 1
            return `rgba(${match[1]},${match[2]},${match[3]},1)`;
        }
    }
    // If color is already in RGBA format with alpha not equal to 0, return it unchanged
    return rgbString;
}

const _rgbaToHex = (rgbaString, forceRemoveAlpha = false) => {
    return "#" + rgbaString.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
        .split(',') // splits them at ","
        .filter((string, index) => !forceRemoveAlpha || index !== 3)
        .map(string => parseFloat(string)) // Converts them to numbers
        .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
        .map(number => number.toString(16)) // Converts numbers to hex
        .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
        .join("") // Puts the array to togehter to a string
}

//extract inner text from the html elements
const extractInnerText = (htmlString) => {
    // Create a temporary element to hold the HTML string
    var tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;

    // Get the text content from the temporary element
    var innerText = tempElement.textContent || tempElement.innerText;

    // Remove the temporary element
    tempElement.remove();

    return innerText;
}

//extract number and unit from string
const extractUnitNumber = (string) => {
    const regex = /^(\d*\.?\d+)(\D+)$/;

    // Match the number and unit using the regular expression
    const matches = string.match(regex);

    if (matches && matches.length === 3) {
        // Extract the number and unit from the matched groups
        const number = parseFloat(matches[1]);
        const unit = matches[2];

        // Return an object with the extracted properties
        return {
            number: number,
            unit: unit
        };
    } else {
        // Return null if the font-size string does not match the expected format
        return { number: 0, unit: "px" };
    }
}

// Function to create a div element with specified classes
const createDivWithClasses = (classes) => {
    var div = document.createElement('div');
    div.className = classes;
    return div;
}

const createDivWithId = (id) => {
    const div = document.createElement("div");
    div.id = id;
    return div;
}

// Function to create a label element
const createLabel = (text, forAttribute) => {
    const div = document.createElement("div");
    div.classList.add("inspex-label-container")
    const label = document.createElement('label');
    label.textContent = text;
    label.classList.add("inspex-label")
    if (forAttribute) {
        label.setAttribute('for', forAttribute);
    }
    div.appendChild(label);
    return div;
}

// Function to create a select element
const createSelect = (id, selectData) => {
    const select = document.createElement('select');
    select.className = 'inspex-select-dropdown';
    if (id) {
        select.id = id;
    }
    for (let option of selectData) {
        const optionSelector = document.createElement("option");
        optionSelector.text = option;
        optionSelector.value = option;
        select.appendChild(optionSelector);
    }
    return select;
}

const createInput = (id, type) => {
    const input = document.createElement('input');
    input.className = 'inspex-text-input';
    input.type = type;
    if (id) {
        input.id = id;
    }
    return input;
}

// Function to make the container draggable
const makeDraggable = (element, mainContainer, action) => {
    let isDragging = false;
    let offsetX, offsetY;

    // Function to handle mouse down event
    function handleMouseDown(event) {
        if ((isDragabble && action == "container") || action == "inspex-palet") {
            isDragging = true;
            let rect = mainContainer.getBoundingClientRect();
            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;
        }
    }

    // Function to handle mouse move event
    function handleMouseMove(event) {
        if (isDragging) {
            let x = event.clientX - offsetX;
            let y = event.clientY - offsetY;
            mainContainer.style.left = x + 'px';
            mainContainer.style.top = y + 'px';
            if (action == "inspex-palet") {
                localStorage.setItem("inspex-top", mainContainer.style.top)
                localStorage.setItem("inspex-left", mainContainer.style.left)
            }
        }
    }

    // Function to handle mouse up event
    function handleMouseUp() {
        isDragging = false;
    }
    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

_init()