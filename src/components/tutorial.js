AFRAME.registerComponent( "tutorial", {

    init: function() {

        this.STATES = {

            TELEPORT: "teleport",
            MOVE_DIAGRAM: "move-diagram",
            ROTATE_DIAGRAM: "rotate-diagram",

        }

    },

    nextState: function( state ) {

        const state = this.STATES;

        switch ( state ) {

            case state.TELEPORT: 
                break;

            case state.MOVE_DIAGRAM:
                break;

            case state.ROTATE_DIAGRAM: 
                break;

        }

    }
   
} );