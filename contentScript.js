let _HTMLTEXTELEMENTS = [];
let _UNITS = [];
let _COLORPALETS = []
let _CSS_ = []
let isDragabble = false;
let drabbleFullScreen = "";

const _init = () => {
    chrome.storage.sync.get(null, (result) => {
        _HTMLTEXTELEMENTS = result._HTMLTEXTELEMENTS
        _UNITS = result._UNITS;
        _COLORPALETS = result._COLORPALETS
        _CSS_ = result._CSS_
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
            }else{
                container[0].addEventListener('mouseover', moveOver);
                // Add event listener for mouseout on the container
                container[0].addEventListener('mouseout', mouseOut);
                container[0].addEventListener('click', mouseClick)
                document.addEventListener('click', documentClickEvent);
            }
          });
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

_init()