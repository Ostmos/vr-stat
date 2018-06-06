const JSONLoader = require( "../data/data-loader" ).JSONLoader;
const DataTable = require( "../data/data-table" ).DataTable;
const Range = require( "../data/data-table" ).Range;
const MediumText = require ( "../text/sprite-text" ).mediumText;

AFRAME.registerComponent( "line-graph", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        size: { type: "vec3", default: { x: 2, y: 1, z: 1 } },
        lines: { type: "array" },
        lineLabels: { type: "array" },
        time: { type: "string" },
        nbrOfHeightSteps: {type: "number", default: 7},
        heightsSuffix: {type: "string" },
        axisToBarPadding: { type: "number", default: 0.2 },
    },
 
    init: function() {
        
        this.el.className = "chart";
        
        this.size = this.data.size;

        this.makeTitle();

        new JSONLoader().loadJSON( this.data.src, jsonData => {

            const table = new DataTable( jsonData );

            this.makeGrid( table );
            this.makeLines( table );
            this.makePanelBox();

            this.el.setAttribute( "rotation-component", "" );

        } );

    },

    makeTitle: function() {

        // Title
        const Text = MediumText( this.data.title ).mesh;
        const TextOffset = 0.2;
        Text.position.set( 0, this.data.size.y / 2 + TextOffset, 0 );
        this.el.setObject3D( "title", Text );

    },

    makeGrid: function( table ) {

        const allLinesRange = new Range();
        for ( let i = 0; i < this.data.lines.length; i++ ) {

            const heightRange = table.getRange( this.data.lines[i] );

            if ( heightRange.start < allLinesRange.start ) {

                allLinesRange.start = heightRange.start;

            } 
            if ( heightRange.end > allLinesRange.end ) {

                allLinesRange.end = heightRange.end;

            }

        }

        const times = table.getColumn( this.data.time );
        times.sort();

        // 3D Grid
        this.el.setAttribute( "categorical-grid", {
            size: this.data.size,
            nbrOfHeightSteps: this.data.nbrOfHeightSteps,
            heightRange: [ allLinesRange.start, allLinesRange.end ],
            heightsSuffix: this.data.heightsSuffix,
            xAxisLabel: this.data.xAxisLabel,
            yAxisLabel: this.data.yAxisLabel,
            categories: times,
            padding: this.data.axisToBarPadding
        } );


    },

    makeLines: function( table ) {

        const scaledLines = table.makeScaleFitMatrix( this.data.lines, this.data.size.y );
        const pointLabels = [];
        for ( let i = 0; i < this.data.lines.length; i++ ) {

            const lineColumn = this.data.lines[ i ];
            let points = table.getColumn( lineColumn );
            points = points.map( elem => elem + this.data.heightsSuffix );
            pointLabels.push( points );

        } 

        this.el.setAttribute( "lines", {
            size: this.data.size,
            heights: scaledLines,
            pointLabels: pointLabels,
            lineLabels: this.data.lineLabels,
            outSidePadding: this.data.axisToBarPadding
        } ); 

    },

    makePanelBox: function() {

        const self = this;

        const panelBox = document.createElement("a-entity");
        panelBox.setAttribute( "panel-box", {
            size: { x: this.size.x, y: this.size.y, z: this.size.z },
            sidesOpacity: 0.2
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