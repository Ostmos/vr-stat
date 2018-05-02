const JSONLoader = require( "../data/data-loader" ).JSONLoader;
const DebugCube = require( "../lib/utils" ).DebugCube;
const DataTable = require( "../data/data-table" ).DataTable;
const mediumText = require ( "../text/sprite-text" ).mediumText;

AFRAME.registerComponent( "bar-chart", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        size: { type: "vec3", default: { x: 5, y: 2, z: 0.5 } },
        categories: { type: "string", default: "x" },
        heights: { type: "string", default: "y" },
        nbrOfHeightSteps: { type: "number", default: 7 },
        heightsSuffix: { type: "string" },
        barWidth: { type: "number", default: 0.2 },
        axisToBarPadding: { type: "number", default: 0.1 },
    },
 
    init: function() {

        this.size = this.data.size;

        this.makeTitle();

        // Load json data
        new JSONLoader().loadJSON( this.data.src, jsonData => {

            // Convert json data to table form
            const table = new DataTable( jsonData ); 

            this.makeGrid( table );
            this.makeBars( table );
            this.makePanelBox();

            this.el.setAttribute( "rotation-component", "" );

        } );

    },

    makeTitle: function() {

        // Title
        const title = mediumText( this.data.title ).mesh;
        const titleHeightOffset = 0.2;
        const titleHeight = this.data.size.y / 2 + titleHeightOffset;
        title.position.set( 0, titleHeight, 0 );
        this.el.setObject3D( "title", title );

    },

    makeGrid: function( table ) {

        // 3D categorical grid
        const heightsRange = table.getRange( this.data.heights );

        this.el.setAttribute( "categorical-grid", {
            size: this.data.size,
            categories: table.getColumn( this.data.categories ),
            heightRange: [ heightsRange.start, heightsRange.end ],
            nbrOfHeightSteps: this.data.nbrOfheightSteps,
            heightsSuffix: this.data.heightsSuffix,
            xAxisLabel: this.data.xAxisLabel,
            yAxisLabel: this.data.yAxisLabel,
            padding: this.data.axisToBarPadding
        } );

    },

    makeBars: function( table ) {

        const self = this;

        // Bars
        const scaledHeights = table.makeScaleFitArray( this.data.heights, this.data.size.y );
        const values = table.getColumn( this.data.heights ).map( value => value + this.data.heightsSuffix );

        const bars = document.createElement( "a-entity" );
        bars.setAttribute( "bars", {
            size: this.data.size,
            barWidth: this.data.barWidth,
            heights: scaledHeights, 
            values: values,
            outSidePadding: this.data.axisToBarPadding 
        } ); 
        bars.className = "hoverable";
        bars.addEventListener( "stateadded", function( evt ) { 
            if ( evt.detail.state == "cursor-hovered" ) {
                self.el.addState("rotatable");
            }
        } );
        bars.addEventListener( "stateremoved", function( evt ) { 
            if ( evt.detail.state == "cursor-hovered" ) {
                self.el.removeState("rotatable");
            }
        } );
        this.el.appendChild(bars);

    },

    makePanelBox: function() {

        const self = this;

        const panelBox = document.createElement("a-entity");
        panelBox.setAttribute( "panel-box", {
            size: { x: this.size.x, y: this.size.y, z: this.size.z },
            sidesOpacity: 0
        } );
        panelBox.className = "hoverable";
        panelBox.addEventListener( "stateadded", function( evt ) { 
            if ( evt.detail.state == "cursor-hovered" ) {
                self.el.addState("rotatable");
            }
        } );
        panelBox.addEventListener( "stateremoved", function( evt ) { 
            if ( evt.detail.state == "cursor-hovered" ) {
                self.el.removeState("rotatable");
            }
        } );
        this.el.appendChild( panelBox );

    }

} );
