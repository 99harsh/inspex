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
            makeDraggable(dragContainer, container, "inspex-palet");
            _closeEvent(event);
            _footerEvents(event);
            _invokeColorPalet(event, 'hex')
            _init_socket();

            const cssButton = document.querySelector("#inspex-copy-css");
            cssButton.addEventListener("click", (e) => {
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
    document.body.insertAdjacentElement("afterend", minimize);
    document.body.insertAdjacentElement("afterend", container);


}

const _invokeInspexPopup = (event) => {

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

const _invokeColorPalet = (event, format) => {
    const domSelectorStyles = getComputedStyle(event);
    for (let elementName of _COLORPALETS) {
        const unique_id =  event.getAttribute("data-unique-id");
        const inputColor = domSelectorStyles[elementName.style]
        const hexInputPalet = document.getElementById(elementName.hexSelector);
        const rgbaCopy = document.getElementById(elementName.rgbaCopy);
        const hexCopy = document.getElementById(elementName.hexCopy);
        const rgbaColor = _rgbToRgba(inputColor);
        hexInputPalet.value = _rgbaToHex(rgbaColor);
        let jscolor = new JSColor(`#${elementName.selector}`, { preset: 'large', position: 'right', value: rgbaColor })
        const input = document.getElementById(elementName.selector);

        input.addEventListener("click", (e)=>{
            jscolor.show();
        })
        
        jscolor.onChange = () => {
            hexInputPalet.value = jscolor.toHEXAString();
        }

        jscolor.onInput = () => {
            if(isSocketConnected){
                socket.send(JSON.stringify({unique_id, room_owner, client_id, event: "listen_change", room_id, styles:[{name: elementName.style, style: jscolor.toRGBAString()}]}))
            }
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


const _closeEvent = (domSelector) => {
    const closeButton = document.querySelector("#inspex-close");
    const unique_id =  domSelector.getAttribute("data-unique-id");
    const mainContainer = document.querySelector("#inspex-color-palet-container");
    const minimized = document.querySelector("#inspex-minimized-window")
    const minmizedCSS = document.querySelector(".minimized-window");
    closeButton.addEventListener("click", (e) => {
        minimized.innerHTML = `<p class='inspex-vertical-branding'>Inpex.dev</p>`;
        mainContainer.style.transform = "scale(0)";
        domSelector.style.setProperty("outline", "none");
        if(isSocketConnected){
            socket.send(JSON.stringify({event: "unlock_element", room_id, client_id, room_owner, unique_id}))
        }
        setTimeout(() => {
            minmizedCSS.style.setProperty("display", "block", "important")
        }, 300)
    })
    minimized.addEventListener("click", (e) => {

        minmizedCSS.style.setProperty("display", "none", "important")
        domSelector.style.setProperty("outline", "1px solid green");
        if(isSocketConnected){
            socket.send(JSON.stringify({event: "lock_element", room_id, client_id, room_owner, unique_id}))
        }
        setTimeout(() => {
            mainContainer.style.transform = "scale(1)";

        }, 300)
    })

}

const _footerEvents = (event) => {
    const unique_id =  event.getAttribute("data-unique-id");
    const computedStyle = window.getComputedStyle(event);
    const dragabbleCheckbox = document.querySelector("#inspex-dragabble-checkbox");
    const draggableLockHeightContainer = document.querySelector("#inspex-lock-height-container")
    const draggableLockHeightCheckbox = document.querySelector("#inspex-dragabble-lock-height-checkbox");
    let isLockHeight = false;
    const uniqueId = `inspex-lock-height-${Date.now()}`
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
                event.style.setProperty("z-index", "999", "important");
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
                        if(isSocketConnected){
                            socket.send(JSON.stringify({room_id, room_owner, client_id,  unique_id: uniqueId, event: "lock_height", styles:[{name: "height", style: event.getBoundingClientRect().height + "px"}]}))
                        }
                        lockHideIdContaner.style.setProperty("height", event.getBoundingClientRect().height + "px", "important")
                    } else {
                        if(isSocketConnected){
                            socket.send(JSON.stringify({room_id, room_owner, client_id,  unique_id: uniqueId, event: "lock_height", styles:[{name: "height", style: "auto"}]}))
                        }
                        lockHideIdContaner.style.setProperty("height", "auto", "important")
                    }
                })
            } else {
                const div = document.createElement("div");
               
                blankdiv.setAttribute("style", `width: ${event.getBoundingClientRect().width}px;`)
                blankdiv.id = uniqueId
                draggableLockHeightCheckbox.value = uniqueId;
                div.setAttribute("inspex-drag-container", "true");
                div.setAttribute("inspex-lock-height-id", uniqueId)
                div.setAttribute("style", "position: fixed; width:100%; height:100%; top:0; left:0; z-index: 999; overflow: hidden");
                isDragabble = true
                event.style.setProperty("width", computedStyle["width"], "important");
                event.style.setProperty("left", event.getBoundingClientRect().left + "px");
                event.style.setProperty("top", event.getBoundingClientRect().top + "px")
                event.style.setProperty("right", "auto", "important");
                event.style.setProperty("bottom", "auto", "important");
                event.style.setProperty("position", "fixed");
                event.parentElement.appendChild(div);
                event.insertAdjacentElement("afterend", blankdiv);
                div.appendChild(event)
                draggableLockHeightCheckbox.addEventListener("change", (e) => {
                    if (e.target.checked) {
                        if(isSocketConnected){
                            socket.send(JSON.stringify({room_id, client_id, room_owner, unique_id: uniqueId, event: "lock_height", styles:[{name: "height", style: event.getBoundingClientRect().height + "px"}]}))
                        }
                        blankdiv.style.setProperty("height", event.getBoundingClientRect().height + "px", "important");
                    } else {
                        if(isSocketConnected){
                            socket.send(JSON.stringify({room_id, client_id, room_owner,  unique_id: uniqueId, event: "lock_height", styles:[{name: "height", style: "auto"}]}))
                        }
                        blankdiv.style.setProperty("height", "auto", "important");
                    }
                })


            }
            event.style.setProperty("cursor", "move", "important");
            event.style.setProperty("outline", "1px solid rgba(235, 86, 142, 1)", "important")

            makeDraggable(event, event, "container");
            if(isSocketConnected){
                socket.send(JSON.stringify({event: "listen_drag", room_id, client_id, room_owner, unique_id, checked: true, lockheight_id: uniqueId}))
            }


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

    const createRoomBtn = document.querySelector("#inspex-create-room");
    const loadingText = document.querySelector("#inpsex-room-code-loading");
    const joinRoomBtn = document.querySelector("#inspex-join-room");


    if(room_id != ""){
        createRoomBtn.style.setProperty("display", "none");
        joinRoomBtn.style.setProperty("display", "none");
        if(room_owner == "host"){
            loadingText.innerHTML = "Room Id:- "+room_id;
            loadingText.style.setProperty("display", "block");
        }else{
            loadingText.innerHTML = "Connected";
            loadingText.style.setProperty("display", "block");
            loadingText.style.setProperty("color", "#4BB543");
        }
    }
}