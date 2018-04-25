function BarRow( heights, barWidth, size, step, padding ) {

    const Start = new THREE.Vector3( -size.x / 2 + padding, -size.y / 2, 0 );
    this.mesh = new THREE.Group(); 

    for (let i = 0; i < heights.length; i++ ) {

        const Geometry = new THREE.BoxGeometry( 
            barWidth / 2, heights[ i ], barWidth / 2
        );        
        const Material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
        const Mesh = new THREE.Mesh( Geometry, Material )
        Mesh.position.set( Start.x + i * step, Start.y + heights[ i ] / 2, 0 );
        this.mesh.add( Mesh );

    }

}

AFRAME.registerComponent( "bars", {

    schema: {
        size: { type: "vec3" },
        barWidth: { type: "number" },
        heights: { type: "array" },
        outSidePadding: { type: "number" }
    },
 
    init: function() {
        let data = this.data;
        const Step = ( data.size.x - data.outSidePadding * 2 ) / ( data.heights.length - 1 );
        const bars = new BarRow( data.heights, data.barWidth, data.size, Step, data.outSidePadding );
        this.el.setObject3D( "bars", bars.mesh );


    }

} );