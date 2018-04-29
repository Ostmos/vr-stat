AFRAME.registerComponent( "hoverable", {

    schema: {
        normalColor: { "type": "color" },
        hoveredColor: { "type": "color" },
        offset: { "type": "vec3"}
    },

    init: function() {

        const parent = this.el.parentNode;

        this.el.className = "hoverable";

        this.el.addEventListener( "stateadded", function (evt) {

            if ( evt.detail.state === "cursor-hovered" && data.value ) {

                mesh.material.color.setHex( self.data.color );
                const textPanelMesh = miniTextPanel( data.value ).mesh;
                textPanelMesh.position.set( 0, data.height / 2 + TEXT_PANEL_OFFSET, 0 );
                self.el.setObject3D( "textPanel", textPanelMesh ); 
                self.el.parentNode.addState("cursor-hovered");

            } 

        } );

        this.el.addEventListener( "stateremoved", function (evt) {

            if ( evt.detail.state === "cursor-hovered" ) {

                mesh.material.color.setHex( 0x000000 );
                self.el.removeObject3D( "textPanel");
                self.el.parentNode.removeState("cursor-hovered");

            } 

        } );

    }

} );