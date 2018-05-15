const JSONLoader = require( "../data/data-loader" ).JSONLoader;
const DataTable = require( "../data/data-table" ).DataTable;
const MediumText = require ( "../text/sprite-text" ).mediumText;

AFRAME.registerComponent( "scatter-graph", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        zAxisLabel: { type: "string" },
        size: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
        steps: { type: "vec3", default: { x: 6, y: 7, z: 6 } },
        xCol: { type: "string", default: "x" },
        yCol: { type: "string", default: "y" },
        zCol: { type: "string", default: "z" },
        xSuffix: { type: "string" },
        ySuffix: { type: "string" },
        zSuffix: { type: "string" }, 
        hoverableSpheres: { type: "boolean" },
    },
 
    init: function() {
        
        this.el.className = "chart";

        let data = this.data;
        this.size = data.size;
        let self = this;

        this.makeTitle();

        // Load data
        new JSONLoader().loadJSON( this.data.src, jsonData => {

            const table = new DataTable( jsonData );

            this.makeGrid( table );
            this.makePoints( table );
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
        if ( !this.data.hoverableSpheres ) {

            this.el.setAttribute( "sprite-point-cloud", {
                
                size: this.data.size ,
                points: { 
                    x: xScaledPoints, 
                    y: yScaledPoints,
                    z: zScaledPoints
                }

            } );

        } else {

            const xPoints = table.getColumn( this.data.xCol );
            const yPoints = table.getColumn( this.data.yCol );
            const zPoints = table.getColumn( this.data.zCol );

            // Points
            const ent = document.createElement("a-entity");
            ent.className = "hoverable";
            ent.setAttribute( "sphere-point-cloud", {
                
                size: this.data.size ,
                points: { 
                    x: xScaledPoints, 
                    y: yScaledPoints,
                    z: zScaledPoints
                },
                labelPoints: {
                    x: xPoints,
                    y: yPoints,
                    z: zPoints
                }

            } );
            this.el.appendChild( ent );

        }

    },

    makePanelBox: function() {

        const self = this;

        const panelBox = document.createElement("a-entity");
        panelBox.setAttribute( "panel-box", {
            size: { x: this.size.x, y: this.size.y, z: this.size.z },
            bottomOpacity: 0.2,
            sidesOpacity: 0.0,
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