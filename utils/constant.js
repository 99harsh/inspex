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

const changedStyles = {};