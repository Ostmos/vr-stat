AFRAME.registerSystem('intersection-handler', {

    schema: {

    },  
  
    init: function () {

        this.intersectObjects = [];

    },

    addIntersectionObject( object ) {

        this.intersectObjects.push( object );

    }

  
} );
