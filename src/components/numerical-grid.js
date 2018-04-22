const Utils = require( "../lib/utils" );
const SpriteText = require ( "../lib/sprite-text" );

AFRAME.registerComponent( "numerical-grid", {

    schema: {
        dimensions: { type: "vec3", default: { x: 1, y: 1, z: 1 } },
        steps: { type: "vec3", default: { x: 10, y: 10, z: 10 } },
        xRange: { type: "array", default: [ 0, 5 ] },
        yRange: { type: "array", default: [ 0, 5 ] },
        zRange: { type: "array", default: [ 0, 5 ] },
        xSuffix: {type: "string" },
        ySuffix: {type: "string" },
        zSuffix: {type: "string" },
        debug: {type: "boolean" }
    },
 
    init: function() {

        let data = this.data;

        if ( data.debug ) {

            this.debugCube();

        }

        const Dim = Utils.THREEVec3( data.dimensions );
        const Steps = Utils.THREEVec3( data.steps );
        const StepLengths = Dim.clone().divide( Steps.clone().subScalar( 1 ) );

        // Creating three 2D-grids (xz, xy, zy) to form a 3D-grid

        const XZGrid = this.makeXYGrid(
            { x: Steps.x, y: Steps.z },
            { x: StepLengths.x, y: StepLengths.z },
            { x: Dim.x, y: Dim.z }
        );
        XZGrid.position.set( 0, -Dim.y / 2, 0 );
        this.el.setObject3D( "xzGrid", XZGrid );

        const XYGrid = this.makeXYGrid(
            { x: Steps.x, y: Steps.y },
            { x: StepLengths.x, y: StepLengths.y },
            { x: Dim.x, y: Dim.y }
        );
        XYGrid.rotation.set( -Math.PI / 2, 0, 0);
        XYGrid.position.set( 0, 0, -Dim.z / 2 );
        this.el.setObject3D( "xyGrid", XYGrid );

        const ZYGrid = this.makeXYGrid(
            { x: Steps.z, y: Steps.y },
            { x: StepLengths.z, y: StepLengths.y },
            { x: Dim.z, y: Dim.y }
        );
        ZYGrid.rotation.set( -Math.PI / 2, 0, -Math.PI / 2);
        ZYGrid.position.set( -Dim.x / 2, 0, 0 );
        this.el.setObject3D( "zyGrid", ZYGrid );

        // Create labels
        const Series = {

            x: { start: data.xRange[ 0 ], end: data.xRange[ 1 ], suffix: data.xSuffix },
            y: { start: data.yRange[ 0 ], end: data.yRange[ 1 ], suffix: data.ySuffix },
            z: { start: data.zRange[ 0 ], end: data.zRange[ 1 ], suffix: data.zSuffix },

        };

        // X
        const AxisPositionX = new THREE.Vector3( -Dim.x / 2, -Dim.y / 2, Dim.z / 2);
        const AxisDirectionX = new THREE.Vector3( 1, 0, 0 ).normalize();
        const LabelOffsetX = new THREE.Vector3( 0, 0, 0.08 );
        this.makeAxisLabels(
            "x",
            AxisPositionX,
            AxisDirectionX,
            LabelOffsetX,
            Steps.x,
            StepLengths.x,
            Dim.x,
            Series.x,
        );

        // Y
        const AxisPositionY = new THREE.Vector3( -Dim.x / 2, -Dim.y / 2, Dim.z / 2);
        const AxisDirectionY = new THREE.Vector3( 0, 1, 0 ).normalize();
        const LabelOffsetY = new THREE.Vector3( -0.08, 0, 0.08 );
        this.makeAxisLabels(
            "y",
            AxisPositionY,
            AxisDirectionY,
            LabelOffsetY,
            Steps.y,
            StepLengths.y,
            Dim.y,
            Series.y,
        );

        // Z
        const AxisPositionZ = new THREE.Vector3( Dim.x / 2, -Dim.y / 2, -Dim.z / 2);
        const AxisDirectionZ = new THREE.Vector3( 0, 0, 1 ).normalize();
        const LabelOffsetZ = new THREE.Vector3( 0.08, 0, 0 );
        this.makeAxisLabels(
            "z",
            AxisPositionZ,
            AxisDirectionZ,
            LabelOffsetZ,
            Steps.z,
            StepLengths.z,
            Dim.z,
            Series.z,
        );

    },

    makeXYGrid: function( steps = { x: 10 , y: 10 }, stepLength = { x: 0.1111, y: 0.1111 }, layout = { x: 1, y: 1} ) {

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
        const LineMesh = new THREE.LineSegments( Geometry, Material );
        return LineMesh;

    },

    makeAxisLabels: function( id, start, direction, labelOffset, steps, stepLength, length, serie ) {

        const LabelValueStep = ( serie.end - serie.start ) / ( steps - 1 );
        let text = "";
        let scaledDirection = direction.multiplyScalar( stepLength );
        let point = start.add( labelOffset );

        for( let i = 0; i < steps; i++ ) {
            
            text = ( LabelValueStep * i ).toFixed( 2 ).concat( serie.suffix );
            const TextMesh = SpriteText.makeText( text, this.data.debug );
            
            TextMesh.position.set( point.x, point.y, point.z );
            this.el.setObject3D( id.concat(i) , TextMesh );
            point.add( direction );

        }

    },

    debugCube: function() {
        
        const Geometry = new THREE.BoxGeometry( 0.05, 0.05, 0.05 );
        const Material = new THREE.MeshBasicMaterial( {color: 0x000000 } );
        const Cube = new THREE.Mesh( Geometry, Material );
        Cube.position.set( 0, 0, 0 );
        this.el.setObject3D("debugCube", Cube);

    }

} );