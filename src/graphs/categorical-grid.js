const Utils = require( "../lib/utils" );
const Range = require( "../data/data-table" ).Range;
const SimpleGrid = require( "../graphs/grid" ).SimpleGrid;
const CategoryAxis = require( "../graphs/grid" ).CategoryAxis;
const LabelAxis = require( "../graphs/grid" ).LabelAxis;

AFRAME.registerComponent( "categorical-grid", {

    schema: {
        size: { type: "vec3" },
        categories: { type: "array" },
        group: { type: "array" },
        heightRange: { type: "array", default: [ 5, 10 ] },
        nbrOfHeightSteps: { type: "number", default: 7 },
        heightsSuffix: {type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        zAxisLabel: { type: "string" },
        padding: { type: "number" }
    },
 
    init: function() {

        let data = this.data;
        this.mesh = [];

        const Dim = data.size;
        const YStepLength = Dim.y / ( data.nbrOfHeightSteps - 1 );

        const XYGrid = new SimpleGrid( data.nbrOfHeightSteps, YStepLength, Dim ).mesh;
        XYGrid.rotation.set( Math.PI / 2, 0, 0 );
        XYGrid.position.set( 0, 0, -Dim.z / 2 );
        this.el.setObject3D( "xyGrid", XYGrid );

        // Cleaner solution needed
        const ZYLayout = new THREE.Vector3( Dim.z, Dim.y, Dim.x );
        const ZYGrid = new SimpleGrid( data.nbrOfHeightSteps, YStepLength, ZYLayout ).mesh;
        ZYGrid.rotation.set( Math.PI / 2, 0, Math.PI / 2 );
        ZYGrid.position.set( -Dim.x / 2, 0, 0 );
        this.el.setObject3D( "zyGrid", ZYGrid );

        // Y-axis
        const AxisPositionY = new THREE.Vector3( -Dim.x / 2, -Dim.y / 2, Dim.z / 2);
        const AxisDirectionY = new THREE.Vector3( 0, 1, 0 ).normalize();
        const RangeY = new Range( data.heightRange[0], data.heightRange[1] );
        const LabelOffsetY = new THREE.Vector3( -0.08, 0, 0.08 );
        const AxisY = new LabelAxis(
            AxisPositionY,
            AxisDirectionY,
            LabelOffsetY,
            data.nbrOfHeightSteps,
            YStepLength,
            Dim.y,
            RangeY,
            data.heightsSuffix
        );
        this.el.setObject3D( "yAxis", AxisY.mesh );
        this.mesh.push("yAxis");
        AxisY.setTitle( data.yAxisLabel, new THREE.Vector3( -0.2, 0, 0.4 ), Math.PI / 2 ); 

        // X-axis
        const Step = (Dim.x - data.padding * 2) / (data.categories.length - 1);
        const AxisPositionX = new THREE.Vector3( ( -Dim.x / 2 ) + data.padding, -Dim.y / 2, Dim.z / 2);
        const AxisDirectionX = new THREE.Vector3( 1, 0, 0 ).normalize();
        const LabelOffsetX = new THREE.Vector3( 0, 0, 0.2 );
        //start, direction, stepLength, length, categories, labelOffset
        const AxisX = new CategoryAxis(
            AxisPositionX,
            AxisDirectionX,
            Step,
            Dim.x,
            data.categories,
            LabelOffsetX,
        );
        this.el.setObject3D( "xAxis", AxisX.mesh );
        this.mesh.push("xAxis");
        AxisX.setTitle( data.xAxisLabel, new THREE.Vector3( -data.padding, -0.1, 0.4 ) ); 

        // Z-axis
        const StepZ = (Dim.z - data.padding * 2) / (data.group.length - 1);
        const AxisPositionZ = new THREE.Vector3( ( Dim.x / 2 ), -Dim.y / 2, Dim.z / 2 - data.padding );
        const AxisDirectionZ = new THREE.Vector3( 0, 0, -1 ).normalize();
        const LabelOffsetZ = new THREE.Vector3( 0.2, 0, 0 );
        //start, direction, stepLength, length, categories, labelOffset
        const AxisZ = new CategoryAxis(
            AxisPositionZ,
            AxisDirectionZ,
            StepZ,
            Dim.z,
            data.group,
            LabelOffsetZ,
        );
        this.el.setObject3D( "zAxis", AxisZ.mesh );
        this.mesh.push("zAxis");
        AxisZ.setTitle( data.zAxisLabel, new THREE.Vector3( 0.4, 0, 0 ) ); 
    },

    remove: function() {

        // Might want to put all meshes in a group, it's easier to remove
        this.mesh.forEach( mesh => {

            this.el.removeObject3D( mesh );

        } );

    }

} );