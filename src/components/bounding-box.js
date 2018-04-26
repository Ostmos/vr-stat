AFRAME.registerComponent( "bounding-box", {

    schema: {
        size: { type: "vec3" },
    },

    init: function() {

        this.el.className = "bounding-box";

        const geometry = new THREE.BoxGeometry( this.data.size.x, this.data.size.y, this.data.size.z );
        const material = new THREE.MeshBasicMaterial( { color: 0x000, transparent: true, opacity: 0.0} );
        const mesh = new THREE.Mesh( geometry, material );

        this.el.addEventListener( "stateadded", function (evt) {

            // 0.7.0 evt.detail.state
            if ( evt.detail === "cursor-hovered" ) {

               // console.log("hover");

            } 

        } );

        this.el.addEventListener( "stateremoved", function (evt) {

            if ( evt.detail.state === "cursor-hovered" ) {

                // console.log("nothover");

            } 

        } );

    }

} );