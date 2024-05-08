window.onload = function () {
    console.log("Loaded", window.location.origin);
    if (window.location.origin == "https://www.google.com" || window.location.origin == "https://www.w3schools.com" || window.location.origin == "https://app.u4r.in") {
        _init()
    }
};

const _HTMLTEXTELEMENTS = ["h1", "h2", "h3", "h4", "h5", "span", "a", "button"];
const _UNITS = ["rem", "px", "em"];

const _init = () => {
    const container = document.getElementsByTagName('div');
    if (container) {
        console.log("Extension is working")
        container[0].addEventListener('mouseover', function (event) {
            if (event.target) {
                event.target.style.cursor = "pointer";
                event.target.style.outline = '1px solid red';
            }
        });

        // Add event listener for mouseout on the container
        container[0].addEventListener('mouseout', function (event) {
            if (event.target) {
                event.target.style.cursor = "none";
                event.target.style.outline = 'none';
            }
        });

        container[0].addEventListener('click', function (event) {
            if (event.target) {
                _invokeStylePalet(event.target)
            }
        })

        document.addEventListener('click', function (event) {
            const target = event.target;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'SPAN' || target.tagName === 'DIV' || target.tagName === 'P') {
                // stopRedirection(event);
            }
        }, true);

        function stopRedirection(event) {
            // Prevent the default behavior of the click event
            event.preventDefault();
            event.stopPropagation();
        }
    }
}


const _invokeStylePalet = (event) => {

    //Remove already created DOM
    const isExist = document.getElementById("inspex-color-palet-container");
    if (isExist) {
        isExist.remove();
    }

    //Get Existing Background Color
    const eventStyles = getComputedStyle(event);
    const inputColor = eventStyles["background-color"];
    //Create New Div 
    const container = document.createElement('div');
    container.id = "inspex-color-palet-container"

    //Get and set top & left (dragabble)
    const top = localStorage.getItem("inspex-top");
    const left = localStorage.getItem("inspex-left");

    //Defaul Box Styling
    container.style.position = 'fixed';
    container.style.top = top ? top : '50px'; // Adjust as needed
    container.style.left = left ? left : '50px'; // Adjust as needed
    container.style.backgroundColor = '#fff';
    container.style.borderRadius = "15px";
    container.style.zIndex = '9'; // Make sure it appears on top of other elements
    container.style.border = '1px solid #000';
    container.style.padding = '10px';

    //Fetch Content HTML File
    fetch(chrome.runtime.getURL('content.html'))
        .then(response => response.text())
        .then(html => {
            container.innerHTML += html;

            if (_HTMLTEXTELEMENTS.includes(event?.tagName?.toLowerCase())) {
                _invokeTextPalet(event);
            }

            //Init All Palets
            _invokeColorPalet("#inspex-background-editor", event, inputColor, "background-color")
        })
        .catch(error => console.error('Error fetching inner content:', error));


    // Append the container to the document body
    document.body.prepend(container);
    // Make the container draggable
    makeDraggable(container);
}


const _invokeColorPalet = (elementName, event, inputColor = 'rgba(0,0,0,0)', inputType) => {
    const jscolor = new JSColor(elementName, { preset: 'large', position: 'right', value: _rgbToRgba(inputColor) })
    jscolor.onChange = () => {

    }
    jscolor.onInput = () => {
        inputType == "background-color" ? event.style.backgroundColor = jscolor.toRGBAString(): "";
        inputType == "text-color" ? event.style.color = jscolor.toRGBAString() : "";
    }
}

const _invokeTextPalet = (event) => {
    const textInputContainerPalet = document.querySelector("#inspex-text-palet");
    const textInputPalet = document.querySelector("#inspex-text-name");
    const textInputFontSizePalet = document.querySelector("#inspex-font-size-palet");

    let text = event.innerHTML || event?.innerText;
    textInputPalet.value = extractInnerText(text);
    textInputPalet.value != "" ? textInputContainerPalet.style.display = "block" : "";

    const eventStyles = getComputedStyle(event);
    const inputColor = eventStyles["color"];
    const inputFontSize = eventStyles["font-size"];

    textInputFontSizePalet.value = inputFontSize;
    textInputFontSizePalet.addEventListener("input", (e)=>{
            event.style.fontSize = `${e.target.value} !important`;
    })

    _invokeColorPalet("#inspex-text-color-editor", event, inputColor, "text-color");
    
    textInputPalet.addEventListener("input", (e)=>{
        event.innerHTML = e.target.value;
    })
}

//Helper functions

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

function extractInnerText(htmlString) {
    // Create a temporary element to hold the HTML string
    var tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;

    // Get the text content from the temporary element
    var innerText = tempElement.textContent || tempElement.innerText;

    // Remove the temporary element
    tempElement.remove();

    return innerText;
}

// Function to make the container draggable
function makeDraggable(element) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
       // e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
       // e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = element.offsetTop - pos2 + 'px';
        element.style.left = element.offsetLeft - pos1 + 'px';
        localStorage.setItem("inspex-top", element.style.top)
        localStorage.setItem("inspex-left", element.style.left)
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}