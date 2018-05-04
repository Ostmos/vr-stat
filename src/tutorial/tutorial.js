AFRAME.registerSystem( "tutorial", {

    schema: {
        
        checkpoint: { type: "asset", default: "#checkpoint" },
        
    },

    init: function() {

        const self = this;
        const el = this.el;

        this.makeCheckpoint( "0 0 -2" );
 
    },

    makeCheckpoint: function( position ) {

        const ent = document.createElement( "a-entity" );
        ent.setAttribute( "gltf-model", this.data.checkpoint );
        ent.setAttribute( "position", position );
        ent.setAttribute( "color", "#FFF" );

        const animation = document.createElement( "a-animation" );
        animation.setAttribute( "attribute", "rotation" );
        animation.setAttribute( "dur", 10000 );
        animation.setAttribute( "to", "360 0 0" );
        animation.setAttribute( "repeat", "indefinite" );
        ent.appendChild(animation);

        this.el.appendChild( ent );

    }
   
} );