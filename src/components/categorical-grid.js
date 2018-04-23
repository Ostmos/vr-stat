const Utils = require( "../lib/utils" );
const Range = require( "../charts/data" ).Range;
const SimpleGrid = require( "../charts/grid" ).SimpleGrid;
const CategoricalPlane = require( "../charts/grid" ).CategoricalPlane;
const LabelAxis = require( "../charts/grid" ).LabelAxis;

AFRAME.registerComponent( "categorical-grid", {

    schema: {
        dimensions: { type: "vec3" },
        categories: { type: "array" },
        ySteps: { type: "number", default: 7 },
        yRange: { type: "array", default: [ 5, 10 ] },
        ySuffix: {type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
    },
 
    init: function() {

        let data = this.data;
        this.mesh = [];

        const Dim = data.dimensions;
        console.log(Dim);
        const YStepLength = Dim.y / ( data.ySteps - 1 );

        const XYGrid = new SimpleGrid( data.ySteps, YStepLength, Dim ).mesh;
        XYGrid.rotation.set( Math.PI / 2, 0, 0 );
        XYGrid.position.set( 0, 0, -Dim.z / 2 );
        this.el.setObject3D( "xyGrid", XYGrid );

        // Cleaner solution needed
        const ZYLayout = new THREE.Vector3( Dim.z, Dim.y, Dim.x );
        const ZYGrid = new SimpleGrid( data.ySteps, YStepLength, ZYLayout ).mesh;
        ZYGrid.rotation.set( Math.PI / 2, 0, Math.PI / 2 );
        ZYGrid.position.set( -Dim.x / 2, 0, 0 );
        this.el.setObject3D( "zyGrid", ZYGrid );

        const XZPlane = new CategoricalPlane( data.categories.length, 0.4, Dim ).mesh; 
        XZPlane.position.set( 0, -Dim.y / 2, 0 );
        this.el.setObject3D( "xzPlane", XZPlane );

        // Y-axis
        const AxisPositionY = new THREE.Vector3( -Dim.x / 2, -Dim.y / 2, Dim.z / 2);
        const AxisDirectionY = new THREE.Vector3( 0, 1, 0 ).normalize();
        const RangeY = new Range( data.yRange[0], data.yRange[1] );
        const LabelOffsetY = new THREE.Vector3( -0.08, 0, 0.08 );
        const AxisY = new LabelAxis(
            AxisPositionY,
            AxisDirectionY,
            LabelOffsetY,
            data.ySteps,
            YStepLength,
            Dim.y,
            RangeY,
            data.ySuffix
        );
        this.el.setObject3D( "yAxis", AxisY.mesh );
        this.mesh.push("yAxis");
        AxisY.setTitle( data.yAxisLabel, new THREE.Vector3( -0.2, 0, 0.4 ), Math.PI / 2 ); 

    },

    remove: function() {

        // Might want to put all meshes in a group, it's easier to remove
        this.mesh.forEach( mesh => {

            this.el.removeObject3D( mesh );

        } );

    }

} );