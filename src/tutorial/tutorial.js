AFRAME.registerSystem( "tutorial", {

    init: function() {

        const self = this;
        const NBR_OF_ACTIONS = Object.keys( this.STEPS ).length;
        const actionsDone = 0;

        this.el.addEventListener( "movedTrigger", function(){
            if ( actionsDone === 0 ) {

                actionsDone ++;
            }
        } );

        this.el.addEventListener( "grabTrigger", function(){
            if ( actionsDone === 1) {

                actionsDone ++;
            }
        } );

        this.el.addEventListener( "rotationTrigger", function() {
            if ( actionsDone === 2 ) {

                actionsDone ++;
            }
        } );

    },

    moveAction: function() {
        console.log("move");
    },

    rotationAction: function() {
        console.log("rotation");
    },

    moveAction: function() {
        console.log("move");
    }

   
} );