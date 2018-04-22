const Utils = require( "../lib/utils" );
const SpriteText = require ( "../charts/sprite-text" ).SpriteText;
const TextProperties = require ( "../charts/sprite-text" ).TextProperties;

function DebugCube( component ) {
        
    const Geometry = new THREE.BoxGeometry( 0.05, 0.05, 0.05 );
    const Material = new THREE.MeshBasicMaterial( {color: 0x000000 } );
    const Cube = new THREE.Mesh( Geometry, Material );
    Cube.position.set( 0, 0, 0 );
    component.setObject3D("debugCube", Cube);

}

function RectilinearGrid( steps, stepLength, layout) {

        const Origin = new THREE.Vector2( -layout.x / 2, layout.y / 2 );

        let Vertices = [];
        for ( let i = 0; i < steps.y; i++ ) {

            Vertices.push( Origin.x, 0, Origin.y - i * stepLength.y ); 
            Vertices.push( Origin.x + layout.x, 0 , Origin.y - i * stepLength.y ); 

        }
        for ( let i = 0; i < steps.x; i++ ) {

            Vertices.push( Origin.x + i * stepLength.x , 0, Origin.y ); 
            Vertices.push( Origin.x + i * stepLength.x, 0 , Origin.y - layout.y ); 

        }
        const Vertices32 = new Float32Array( Vertices );

        const Geometry = new THREE.BufferGeometry();
        Geometry.addAttribute( 'position', new THREE.BufferAttribute( Vertices32, 3 ) );
        const Material = new THREE.LineBasicMaterial( { color: 0x99AAB5 } );
        this.mesh = new THREE.LineSegments( Geometry, Material );

}

function Range( start, end ) {

    this.start = start;
    this.end = end;

}

Range.prototype.evenStepLength = function( steps ) {

    return ( this.end - this.start ) / ( steps - 1 );

}

function LabelAxis( start, direction, labelOffset, steps, stepLength, length, range, suffix ) {

        const LabelValueStep = range.evenStepLength( steps ); 

        let currentValue = range.start;
        let text = "";
        let scaledDirection = direction.multiplyScalar( stepLength );
        let point = start.add( labelOffset );

        const Properties = new TextProperties();
        this.mesh = new THREE.Group(); 

        for( let i = 0; i < steps; i++ ) {
            
            text = ( currentValue ).toFixed( 2 ).concat( suffix );
            let spriteText = new SpriteText( text, Properties );
            spriteText.mesh.position.set( point.x, point.y, point.z );
            this.mesh.add( spriteText.mesh );
            point.add( direction );
            currentValue += LabelValueStep;

        }

}

AFRAME.registerComponent( "numerical-grid", {

    schema: {
        dimensions: { type: "vec3", default: { x: 1, y: 1, z: 1 } },
        steps: { type: "vec3", default: { x: 10, y: 10, z: 10 } },
        xRange: { type: "array", default: [ 0, 5 ] },
        yRange: { type: "array", default: [ 5, 10 ] },
        zRange: { type: "array", default: [ 0, 5 ] },
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

    },

    remove: function() {

        // Might want to put all meshes in a group, it's easier to remove
        this.mesh.forEach( mesh => {

            this.el.removeObject3D( mesh );

        } );

    }

} );