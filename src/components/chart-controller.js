AFRAME.registerComponent('chart-controller', {

    init: function () {

      const el = this.el;
      const self = this;

        this.el.addEventListener( "axismove" , function( evt ) {

            const yAxisRotation = evt.detail.axis[ 0 ] * Math.PI / 2;
            const xAxisRotation = evt.detail.axis[ 1 ] * Math.PI / 2; 

            self.el.emit('rotation', { xAxisRotation: xAxisRotation, yAxisRotation: yAxisRotation} );

        } );

        this.el.addEventListener( "triggerdown" , function( evt ) {

            // TODO save data point on controller

        } );

    },

  });