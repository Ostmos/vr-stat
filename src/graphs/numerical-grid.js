const Utils = require( "../lib/utils" );
const Range = require( "../data/data-table" ).Range;
const RectilinearGrid = require( "../graphs/grid" ).RectilinearGrid;
const LabelAxis = require( "../graphs/grid" ).LabelAxis;

AFRAME.registerComponent( "numerical-grid", {

    schema: {
        dimensions: { type: "vec3", default: { x: 1, y: 1, z: 1 } },
        steps: { type: "vec3", default: { x: 10, y: 10, z: 10 } },
        xRange: { type: "array", default: [ 0, 5 ] },
        yRange: { type: "array", default: [ 5, 10 ] },
        zRange: { type: "array", default: [ 0, 5 ] },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        zAxisLabel: { type: "string" },
        xSuffix: {type: "string" },
        ySuffix: {type: "string" },
        zSuffix: {type: "string" },
    },
 
    init: function() {

        let data = this.data;

        const Dim = Utils.THREEVec3( data.dimensions );
        const Steps = Utils.THREEVec3( data.steps );
        const StepLengths = Dim.clone().divide( Steps.clone().subScalar( 1 ) );

        this.meshes = [];
        // Creating three 2D-grids (xz, xy, zy) to form a 3D-grid

        const XZGrid = new RectilinearGrid(
            { x: Steps.x, y: Steps.z },
            { x: StepLengths.x, y: StepLengths.z },
            { x: Dim.x, y: Dim.z }
        );
        const XZMesh = XZGrid.mesh;
        XZMesh.position.set( 0, -Dim.y / 2, 0 );
        this.el.setObject3D( "xzMesh", XZMesh );
        this.meshes.push("xzMesh");

        const XYGrid = new RectilinearGrid(
            { x: Steps.x, y: Steps.y },
            { x: StepLengths.x, y: StepLengths.y },
            { x: Dim.x, y: Dim.y }
        );
        const XYMesh = XYGrid.mesh;
        XYMesh.rotation.set( -Math.PI / 2, 0, 0);
        XYMesh.position.set( 0, 0, -Dim.z / 2 );
        this.el.setObject3D( "xyMesh", XYMesh );
        this.meshes.push("xyMesh");

        const ZYGrid = new RectilinearGrid(
            { x: Steps.z, y: Steps.y },
            { x: StepLengths.z, y: StepLengths.y },
            { x: Dim.z, y: Dim.y }
        );
        const ZYMesh = ZYGrid.mesh;
        ZYMesh.rotation.set( -Math.PI / 2, 0, -Math.PI / 2);
        ZYMesh.position.set( -Dim.x / 2, 0, 0 );
        this.el.setObject3D( "zyMesh", ZYMesh );
        this.meshes.push("zyMesh");

        // Axis labels

        // X-axis
        const AxisPositionX = new THREE.Vector3( -Dim.x / 2, -Dim.y / 2, Dim.z / 2);
        const AxisDirectionX = new THREE.Vector3( 1, 0, 0 ).normalize();
        const LabelOffsetX = new THREE.Vector3( 0, 0, 0.08 );
        const RangeX = new Range( data.xRange[0], data.xRange[1] );
        const AxisX = new LabelAxis(
            AxisPositionX,
            AxisDirectionX,
            LabelOffsetX,
            Steps.x,
            StepLengths.x,
            Dim.x,
            RangeX,
            data.xSuffix
        );
        this.el.setObject3D( "xAxis", AxisX.mesh );
        this.meshes.push("xAxis");
        AxisX.setTitle( data.xAxisLabel, new THREE.Vector3( 0, 0, 0.4 ) ); 

        // Y-axis
        const AxisPositionY = new THREE.Vector3( -Dim.x / 2, -Dim.y / 2, Dim.z / 2);
        const AxisDirectionY = new THREE.Vector3( 0, 1, 0 ).normalize();
        const LabelOffsetY = new THREE.Vector3( -0.08, 0, 0.08 );
        const RangeY = new Range( data.yRange[0], data.yRange[1] );
        const AxisY = new LabelAxis(
            AxisPositionY,
            AxisDirectionY,
            LabelOffsetY,
            Steps.y,
            StepLengths.y,
            Dim.y,
            RangeY,
            data.ySuffix
        );
        this.el.setObject3D( "yAxis", AxisY.mesh );
        this.meshes.push("yAxis");
        AxisY.setTitle( data.yAxisLabel, new THREE.Vector3( -0.2, 0, 0.4 ), Math.PI / 2 ); 

        // Z-axis
        const AxisPositionZ = new THREE.Vector3( Dim.x / 2, -Dim.y / 2, -Dim.z / 2);
        const AxisDirectionZ = new THREE.Vector3( 0, 0, 1 ).normalize();
        const LabelOffsetZ = new THREE.Vector3( 0.08, 0, 0 );
        const RangeZ = new Range( data.zRange[0], data.zRange[1] );
        const AxisZ = new LabelAxis(
            AxisPositionZ,
            AxisDirectionZ,
            LabelOffsetZ,
            Steps.z,
            StepLengths.z,
            Dim.z,
            RangeZ,
            data.zSuffix
        );
        this.el.setObject3D( "zAxis", AxisZ.mesh );
        this.meshes.push("zAxis");
        AxisZ.setTitle( data.zAxisLabel, new THREE.Vector3( 0.4, 0, 0 ) ); 

    },

    remove: function() {

        // Might want to put all meshes in a group, it's easier to remove
        this.mesh.forEach( mesh => {

            this.el.removeObject3D( mesh );

        } );

    }

} );