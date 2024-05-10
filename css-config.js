const a = {
    sectionName: "Display",
        sectionProperties: {
        mainProperty:{
            paletName: "Display",
            type: "select",
            style: "display",
            styleValues: ["block","inline","inline-block","none","flex","inline-flex","grid","inline grid","table","inline-table","table-row","table-cell","table-caption","table-column","table-column-group","table-header-group","table-footer-group","table-row-group","flex-inline","ruby","ruby-base","ruby-text","ruby-base-container","ruby-text-cntainer","contents","flow-root","list-item","inherit","initial","unset","run-in"],
            id: "inspex-display-dropdown",
            isMultiple: false,
            event: "change",
            isFullWidth: true
        },
        currentValue: "flex",
        supportingProperties:{
            block:[],
            inline: [],
            "inline-block": [],
            none: [], 
            flex: [{
                paletName: "Flex Direction",
                style: "flex-direction",
                type: "select",
                styleValues:["row","column","row-reverse","column-reverse","inherit","initial"],
                id: "inspex-flex-direction-dropdown",
                isMultiple: false,
                event: "change"
            },
            {
                paletName: "Align Items",
                style: "align-items",
                type: "select",
                styleValues: ["stretch","normal","flex-start","flex-end","center","baseline","initial","inherit","unset","start","end","baseline"],
                id: "inspex-align-items-dropdown",
                isMultiple: false,
                event: "change"
            },
            {
                paletName: "Justify Content",
                style: "justify-content",
                type: "select",
                styleValues:["flex-start","flex-end","center","space-between","space-around","space-evenly","stretch","inherit","initial","unset"],
                id: "inspex-justify-content-dropdown",
                isMultiple: false,
                event: "change"
            },
            {
                paletName: "Flex",
                style:"flex",
                type: "select",
                styleValues:["flex-grow","flex-shrink","flex-basis","auto","inherit","initial","none"],
                id: "inspex-flex-option-dropdown",
                isMultiple: false,
                event: "change"
            },
            {
                paletName: "Flex Wrap",
                style:"flex-wrap",
                type: "select",
                styleValues:["nowrap","wrap","wrap-reverse","inherit","initial"],
                id: "inspex-flex-wrap-dropdown",
                isMultiple: false,
                event: "change"
            },
            {
                paletName: "Flex Flow",
                style:"flex-flow",
                type: "select",
                styleValues:["row","row-reverse","column","column-reverse","nowrap","wrap","wrap-reverse","inherit","initial"],
                id: "inspex-flex-flow-dropdown",
                isMultiple: false,
                event: "change"
            },
            {
                paletName: "Flex Basis",
                style:"flex-basis",
                type: "select",
                styleValues:["number","auto","inherit","initial","none","length","percentage","fill","content"],
                id: "inspex-flex-basis-dropdown",
                isMultiple: false,
                event: "change"
            },
            {
                paletName: "Flex Grow",
                style:"flex-grow",
                type: "select",
                styleValues:["number","inherit","initial"],
                id: "inspex-flex-grow-dropdown",
                isMultiple: false,
                event: "change"
            }]
        }

    }
}