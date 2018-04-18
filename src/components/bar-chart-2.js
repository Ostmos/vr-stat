AFRAME.registerComponent( "bar-chart-2", {

    schema: {
        src: { type: "asset", default: "empty" },
        title: { type: "string" },
        xLabel: { type: "string" },
        yLabel: { type: "string" },
        suffix: { type: "string" },
        yScale: { type: "number", default: 1.0 },
        barWidth: { type: "number", default: 0.5 },
        barPadding: { type: "number", default: 0.1 },
        fontSize: { type: "number", default: 2 }
    },
 
    init: function() {
        var self = this;

        fetch( this.data.src )
        .then( ( response ) => response.json() )
        .then( function( jsonData ) {

            self.plot( jsonData );

        } );

    },

    plot: function( jsonData ) {

        let axis = document.createElement( "a-entity" );
        axis.setAttribute("axis", {
            arr: [0, 1, 2], 
            textAligment: "right"
        } );
        axis.setAttribute( "rotation" ,
            { x: 0, y: 90, z: 0 }
        );

        this.el.appendChild( axis );
    } 

} );