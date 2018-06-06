const spriteText = require( "../text/sprite-text" ).smallTextPanel;

AFRAME.registerComponent( "pop-up-label", {

    schema: {
        text: { type: "string" },
        position: { type: "vec3" }
    },

    init: function() {

        const el = this.el;
        const data = this.data;
        const text = this.text;
        const position = data.position;

        const label = spriteText( this.data.text ).mesh;
        label.material.visible = false;

        label.position.set( position.x, position.y, position.z );
        this.el.setObject3D( "label", label );

        el.addEventListener( "stateadded", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                label.material.visible = true; 

            }

        } );

        el.addEventListener( "stateremoved", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                label.material.visible = false;

            }

        } );

    }

} );