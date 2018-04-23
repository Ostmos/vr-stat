function BarRow( heights, width, dimensions, step, padding ) {

    const Start = new THREE.Vector3( -dimensions.x / 2 + padding, -dimensions.y / 2, 0 );
    this.mesh = new THREE.Group(); 

    for (let i = 0; i < heights.length; i++ ) {

        const Geometry = new THREE.BoxGeometry( width / 2, heights[ i ], width / 2 );        
        const Material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
        const Mesh = new THREE.Mesh( Geometry, Material )
        Mesh.position.set( Start.x + i * step, Start.y + heights[ i ] / 2, 0 );
        this.mesh.add( Mesh );

    }

}

AFRAME.registerComponent( "bars", {

    schema: {
        dimensions: { type: "vec3" },
        width: { type: "number" },
        dataHeights: { type: "array" },
        padding: { type: "number" }
    },
 
    init: function() {
        let data = this.data;
        const Step = ( data.dimensions.x - data.padding * 2 ) / ( data.dataHeights.length - 1 );

        const bars = new BarRow( data.dataHeights, data.width, data.dimensions, Step, data.padding );
        this.el.setObject3D( "bars", bars.mesh );


    }

} );