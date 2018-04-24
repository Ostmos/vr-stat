const SmallText = require( "../charts/sprite-text" ).smallText;

function LineGroup( heights, dimensions, labels ) {

    const Spacing = dimensions.z / ( heights.length - 1);

    // Change this 
    const Length = heights[ 0 ].length;
    const Step = dimensions.x / ( Length - 1 );

    const Origin = new THREE.Vector3( -dimensions.x / 2, -dimensions.y / 2, dimensions.z / 2 );

    this.mesh = new THREE.Group();

    let z = Origin.z;
    for ( let i = 0; i < heights.length; i++ ) {
        const Vertices = new Array();

        z = Origin.z - Spacing * i;
        let x = Origin.x;
        let y = 0;

        for ( let j = 0; j < heights[ i ].length; j++ ) {

            y = Origin.y + heights[ i ][ j ];
            Vertices.push( x, y, z ); 
            x += Step;

        }

        // Label at end of line
        const LineLabel = SmallText( labels[ i ] );
        // Offset should be vector
        LineLabel.mesh.position.set( x - Step + 0.1, y, z );
        this.mesh.add(LineLabel.mesh);


        const Vertices32 = new Float32Array( Vertices );
        const Geometry = new THREE.BufferGeometry();
        Geometry.addAttribute( 'position', new THREE.BufferAttribute( Vertices32, 3 ) );
        const Material = new THREE.LineBasicMaterial( { color: ( 0xFFFFFF * Math.random() ) } );
        this.mesh.add( new THREE.Line( Geometry, Material ) );
    }


}

AFRAME.registerComponent( "lines", {

    schema: {
        dimensions: { type: "vec3" },
        heights: { type: "array" },
        labels: { type: "array" }
    },
 
    init: function() {
        
        let data = this.data;

        const Lines = new LineGroup( data.heights, data.dimensions, data.labels );
        this.el.setObject3D("lines", Lines.mesh);

    }

} );