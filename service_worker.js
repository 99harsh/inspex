chrome.runtime.onInstalled.addListener(() => {
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
    console.log("ON INSTALasLAED")
    chrome.action.setBadgeText({
        text: "OFF",
    });
    chrome.storage.sync.set({
        _HTMLTEXTELEMENTS: ["h1", "h2", "h3", "h4", "h5", "span", "a", "button", "p", "td", "input", "select"],
        _UNITS: ["px", "%", "rem", "em", "vh", "vw", "vmin", "vmax", "ch", "ex", "cm", "mm", "in", "pt", "pc"],
        _COLORPALETS: [{
            selector: "inspex-font-color-palet",
            style: "color"
        },
        {
            selector: "inspex-background-color-palet",
            style: "background-color"
        }],

        _CSS_: _CSS_

    });
});



chrome.action.onClicked.addListener(async (tab) => {

    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, nextState);
    });
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });

});


