const JSONLoader = require( "../data/data-loader" ).JSONLoader;
const DataTable = require( "../data/data-table" ).DataTable;
const MediumText = require ( "../text/sprite-text" ).mediumText;

AFRAME.registerComponent( "scatter-plot", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        zAxisLabel: { type: "string" },
        size: { type: "vec3", default: { x: 2, y:2, z: 2 } },
        steps: { type: "vec3", default: { x: 6, y: 7, z: 6 } },
        xCol: { type: "string", default: "x" },
        yCol: { type: "string", default: "y" },
        zCol: { type: "string", default: "z" },
        xSuffix: { type: "string" },
        ySuffix: { type: "string" },
        zSuffix: { type: "string" } 
    },
 
    init: function() {

        let data = this.data;
        let self = this;

        this.makeTitle();

        // Load data
        new JSONLoader().loadJSON( this.data.src, jsonData => {

            const table = new DataTable( jsonData );

            this.makeGrid( table );
            this.makePoints( table );

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

        const xRange = table.getRange( this.data.xCol );
        const yRange = table.getRange( this.data.yCol );
        const zRange = table.getRange( this.data.zCol );

        // 3D Grid
        this.el.setAttribute("numerical-grid", {

            dimensions: this.data.size,
            steps: this.data.steps,
            xRange: [xRange.start, xRange.end],
            yRange: [yRange.start, yRange.end],
            zRange: [zRange.start, zRange.end],
            xAxisLabel: this.data.xAxisLabel,
            yAxisLabel: this.data.yAxisLabel,
            zAxisLabel: this.data.zAxisLabel,
            xSuffix: this.data.xSuffix,
            ySuffix: this.data.ySuffix,
            zSuffix: this.data.zSuffix,

        });

    },

    makePoints( table ) {

        table.floorToMinValue( this.data.xCol );
        table.floorToMinValue( this.data.yCol );
        table.floorToMinValue( this.data.zCol );

        const xScaledPoints = table.makeScaleFitArray( this.data.xCol, this.data.size.x );
        const yScaledPoints = table.makeScaleFitArray( this.data.yCol, this.data.size.y );
        const zScaledPoints = table.makeScaleFitArray( this.data.zCol, this.data.size.z );

        // Points
        this.el.setAttribute( "point-cloud", {
            
            dimensions: this.data.size ,
            points: { 
                x: xScaledPoints, 
                y: yScaledPoints,
                z: zScaledPoints
            }

        } );

    }

} );