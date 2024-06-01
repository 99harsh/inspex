
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
    const unique_id =  element.getAttribute("data-unique-id");

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
            if(action == "container"){
                socket.send(JSON.stringify({event: "listen_change", room_id,unique_id, room_owner, styles: [{name: "left", style: x+"px"}, {name: "top", style: y+"px"}] }))
            }
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