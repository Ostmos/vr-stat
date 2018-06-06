const JSONLoader = require( "../data/data-loader" ).JSONLoader;
const DebugCube = require( "../lib/utils" ).DebugCube;
const DataTable = require( "../data/data-table" ).DataTable;
const mediumText = require ( "../text/sprite-text" ).mediumText;
const Range = require( "../data/data-table" ).Range;

AFRAME.registerComponent( "bar-graph", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        zAxisLabel: { type: "string" },
        size: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
        series: { type: "array" },
        group: { type: "string" },
        nbrOfHeightSteps: { type: "number", default: 7 },
        heightsSuffix: { type: "string" },
        barWidth: { type: "number", default: 0.2 },
        axisToBarPadding: { type: "number", default: 0.2 },
    },
 
    init: function() {

        this.el.className = "chart";

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
        const allLinesRange = new Range();
        for ( let i = 0; i < this.data.series.length; i++ ) {

            const heightRange = table.getRange( this.data.series[i] );

            if ( heightRange.start < allLinesRange.start ) {

                allLinesRange.start = heightRange.start;

            } 
            if ( heightRange.end > allLinesRange.end ) {

                allLinesRange.end = heightRange.end;

            }

        }

        this.el.setAttribute( "categorical-grid", {
            size: this.data.size,
            categories: this.data.series,
            group: table.getColumn( this.data.group ),
            heightRange: [ allLinesRange.start, allLinesRange.end ],
            nbrOfHeightSteps: this.data.nbrOfheightSteps,
            heightsSuffix: this.data.heightsSuffix,
            xAxisLabel: this.data.xAxisLabel,
            yAxisLabel: this.data.yAxisLabel,
            zAxisLabel: this.data.zAxisLabel,
            padding: this.data.axisToBarPadding
        } );

    },

    makeBars: function( table ) {

        const self = this;

        // Bars
        const scaledHeights = table.makeScaleFitArray( this.data.heights, this.data.size.y );
        const values = table.getColumn( this.data.heights ).map( value => value + this.data.heightsSuffix );

        const scaledBars = table.makeScaleFitMatrix( this.data.series, this.data.size.y );
        const pointLabels = [];
        for ( let i = 0; i < this.data.series.length; i++ ) {

            const lineColumn = this.data.series[ i ];
            let points = table.getColumn( lineColumn );
            points = points.map( elem => elem + this.data.heightsSuffix );
            pointLabels.push( points );

        } 

        const bars = document.createElement( "a-entity" );
        bars.setAttribute( "bars", {
            size: this.data.size,
            barWidth: this.data.barWidth,
            heights: scaledBars, 
            labels: pointLabels,
            outSidePadding: this.data.axisToBarPadding
        } ); 
        bars.className = "hoverable";
        this.el.appendChild(bars);

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
