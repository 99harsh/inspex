window.onload = function () {
    if (window.location.origin == "https://www.google.com" || window.location.origin == "https://www.w3schools.com" || window.location.origin == "https://app.u4r.in"
        || window.location.origin == "https://codepen.io"
    ) {
        _init()
    }
};

const _HTMLTEXTELEMENTS = ["h1", "h2", "h3", "h4", "h5", "span", "a", "button", "p", "td", "input", "select"];
const _UNITS = ["px", "%", "rem", "em", "vh", "vw", "vmin", "vmax", "ch", "ex", "cm", "mm", "in", "pt", "pc"];
const _COLORPALETS = [{
    selector: "inspex-font-color-palet",
    style: "color"
},
{
    selector: "inspex-background-color-palet",
    style: "background-color"
}]
const _CSS_ = [
    {
        sectionName: "Display",
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
                flex: [{
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
                    id: "inspex-justify-content-dropdown",
                    isMultiple: false,
                    event: "change"
                },
                {
                    paletName: "Flex",
                    style: "flex",
                    type: "select",
                    styleValues: ["flex-grow", "flex-shrink", "flex-basis", "auto", "inherit", "initial", "none"],
                    id: "inspex-flex-option-dropdown",
                    isMultiple: false,
                    event: "change"
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
            }

        }
    },
    {
        sectionName: "Text",
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
let isDragabble = false;
let drabbleFullScreen = "";

const _init = () => {
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
        container[0].addEventListener('mouseover', function (event) {
            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble) {
                event.target.style.cursor = "pointer";
                event.target.style.outline = '1px solid red';

            }
        });

        // Add event listener for mouseout on the container
        container[0].addEventListener('mouseout', function (event) {

            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble) {
                event.target.style.cursor = "unset";
                event.target.style.outline = 'none';
            }
        });

        container[0].addEventListener('click', function (event) {
            if (event.target && !hasAncestor(event.target, 'inspex-root-container', "jscolor-wrap", "inspex-minimized-window") && !isDragabble) {
                _invokeStylePalet(event.target);
                event.target.style.cursor = "pointer";
                event.target.style.outline = '1px solid red';
                event.inspex_clicked = true;
            }
        })

        document.addEventListener('click', function (event) {
            const target = event.target;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'SPAN' || target.tagName === 'DIV' || target.tagName === 'P') {
                event.preventDefault();
            }
        }, true);
    }
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
            _invokeColorPalet(event)
            makeDraggable(dragContainer, container, "inspex-palet");
            _closeEvent();
            _footerEvents(event);
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
        mainSectionContainer.classList.add("inspex-section-container")
        const mainProperty = section.sectionProperties?.mainProperty;
        const supportingProperties = section.sectionProperties?.supportingProperties;
        if (mainProperty) {
            const mainPropertyCurrentStyle = domSelectorStyles[mainProperty?.style];
            let inputElement;
            const flex1Col = createDivWithClasses('inspex-palet');
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
                domSelector.style.setProperty(mainProperty.style, new_property, "important");
                _populateInputElements(supportingProperties[new_property], bodyContainer, domSelector);
            })
            mainSectionContainer.appendChild(flex1Col);
        } else {
            _populateInputElements(supportingProperties, bodyContainer, domSelector)
        }

        mainSectionContainer.appendChild(bodyContainer);
        mainContainer.appendChild(mainSectionContainer);
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
                    domSelector.style.setProperty(section.style, `${inputElement.value}${e.target.value}`, "important");
                })

                inputElement.addEventListener("input", (e) => {
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

const _invokeColorPalet = (event) => {
    const domSelectorStyles = getComputedStyle(event);
    for (let elementName of _COLORPALETS) {
        const inputColor = domSelectorStyles[elementName.style]
        const jscolor = new JSColor(`#${elementName.selector}`, { preset: 'large', position: 'right', value: _rgbToRgba(inputColor) })
        jscolor.onChange = () => {

        }
        jscolor.onInput = () => {
            event.style.setProperty(elementName.style, jscolor.toRGBAString(), "important")
        }
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