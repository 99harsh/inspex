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
    const unique_id = domSelector?.getAttribute("data-unique-id");
    console.log("DOk", domSelector, unique_id)
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
                    if(isRoomCreated){
                        socket.send(JSON.stringify({unique_id, room_owner,room_id, event: "listen_change", styles:[{name: section.style, style: e.target.value}]}))
                    }
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
                    if(isRoomCreated){
                        socket.send(JSON.stringify({unique_id, room_owner, room_id, event: "listen_change", styles:[{name: section.style, style: e.target.value}]}, room_id))
                    }
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
                    if(isRoomCreated){
                        socket.send(JSON.stringify({unique_id, room_owner, room_id, event: "listen_change", styles:[{name: section.style, style: `${inputElement.value}${e.target.value}`}]}, room_id))
                    }
                })

                inputElement.addEventListener("input", (e) => {
                    changedStyles[section.style] = `${e.target.value}${inputDropdown.value} !important`
                    domSelector.style.setProperty(section.style, `${e.target.value}${inputDropdown.value}`, "important");
                    if(isRoomCreated){
                        socket.send(JSON.stringify({unique_id, room_owner,room_id, event: "listen_change", styles:[{name: section.style, style: `${e.target.value}${inputDropdown.value}`}]}, room_id))
                    }
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

const _invokeTextInput = (event) => {
    const text = extractInnerText(event.innerText || event.innerHTML);
    const unique_id =  event?.getAttribute("data-unique-id");
    if (text != "") {
        const textContainer = document.querySelector("#inspex-text-input-container");
        const textInput = document.querySelector("#inspex-text-type-input");
        textInput.value = text;
        textInput.addEventListener("input", (e) => {
            event.innerText = e.target.value;
            if(isRoomCreated){
                socket.send(JSON.stringify({unique_id, room_owner, room_id, event: "listen_innertext_change", text: e.target.value}))
            }
            if (isDragabble) {
                event.style.setProperty("width", event.getBoundingClientRect().width + "px", "important")
            }
        })
        textContainer.style.setProperty("display", "block", "important");
    }
}