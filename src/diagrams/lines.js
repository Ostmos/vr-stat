const SmallText = require( "../text/sprite-text" ).smallTextPanel;

AFRAME.registerComponent( "line-point", {

    schema: {
        label: { type: "string", default: "lorem" },
        color: { type: "color", default: 0x000000 },
        hoverColor: { type: "color", default: 0xF6903D }
    },

    init: function() {

        this.el.className = "hoverable";

        this.CUBE_SIZE = 0.04;
        this.cubeColor = this.data.color;
        this.cubeHoverColor = this.data.hoverColor;
        this.cubeMaterial = new THREE.MeshBasicMaterial( { color: this.cubeColor } );

        this.makeCube();
        this.attachHoverLabel();

        this.onStateAdded = this.onStateAdded.bind(this);
        this.onStateRemoved = this.onStateRemoved.bind(this);

        this.el.addEventListener( "stateadded", this.onStateAdded );
        this.el.addEventListener( "stateremoved", this.onStateRemoved );

    },

    onStateAdded: function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                this.cubeMaterial.color.setHex( this.cubeHoverColor );

            }

    },

    onStateRemoved: function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                this.cubeMaterial.color.setHex( this.cubeColor );

            }

    },

    attachHoverLabel: function() {

        this.el.setAttribute( "pop-up-label", {
            text: this.data.label,
            position: { x: 0, y: this.CUBE_SIZE * 1.5, z: 0 }
        } );

    },

    makeCube: function() {

        const size = this.CUBE_SIZE;
        const cubeGeometry = new THREE.BoxGeometry( size, size, size );
        const cubeMesh = new THREE.Mesh( cubeGeometry, this.cubeMaterial );
        this.el.setObject3D( "cube", cubeMesh );

    }

} );

AFRAME.registerComponent( "lines", {

    schema: {
        size: { type: "vec3" },
        heights: { type: "array" },
        pointLabels: { type: "array" },
        lineLabels: { type: "array" }
    },
 
    init: function() {
        
        let data = this.data;

        this.makeLines();

    },

    makeLines: function() {

        const heights = this.data.heights;
        const size = this.data.size;
        let pointLabels = this.data.pointLabels;

        // Step length between each line on the z-axis
        const NBR_OF_LINES = heights.length;
        const LINE_STEP =  size.z / ( NBR_OF_LINES - 1 );

        // TODO: make more reliable 
        // Step length between each point on the x-axis
        const NBR_OF_POINTS = heights[ 0 ].length;
        const POINT_STEP = size.x / ( NBR_OF_POINTS - 1 );

        const X_START = -size.x / 2;
        const Y_START = -size.y / 2; 
        const Z_START = size.z / 2;

        const lineGroup = new THREE.Group();

        let x, y, z;

        for ( let i = 0; i < NBR_OF_LINES; i ++ ) {

            x = X_START;
            z = Z_START - LINE_STEP * i;  
            const linePoints = [];
            var lineMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff * Math.random() } );

            for ( let j = 0; j < NBR_OF_POINTS; j ++ ) {

                y = Y_START + heights[ i ][ j ];
                linePoints.push( x, y, z ); 
                this.makePointCube( x, y, z, pointLabels[ i ][ j ] );
                x += POINT_STEP;

            }

            // Create a typed array for better performance
            const bufferGeometry = new THREE.BufferGeometry();
            const linePoints32 = new Float32Array( linePoints );
            // 3 values for each vertex: x, y, z
            const bufferAttribute = new THREE.Float32BufferAttribute( linePoints32, 3 );
            bufferGeometry.addAttribute( 'position', bufferAttribute );
            const mesh = new THREE.Line( bufferGeometry, lineMaterial );
            lineGroup.add( mesh );
        
        }

        this.el.setObject3D( "lineGroup", lineGroup );
            
    },

    makePointCube: function( x, y, z, label ) {

        const cube = document.createElement( "a-entity" );
        cube.setAttribute( "line-point", { label: label } );
        cube.setAttribute( "position", { x: x, y: y, z: z} );
        this.el.appendChild( cube );

    }

} );