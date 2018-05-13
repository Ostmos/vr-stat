const miniTextPanel = require( "../text/sprite-text" ).miniTextPanel;

AFRAME.registerComponent( "bars2", {

    schema: {
        size: { type: "vec3" },
        barWidth: { type: "number" },
        heights: { type: "array" },
        labels: { type: "array" },
        outSidePadding: { type: "number" }
    },
 
    init: function() {     

        let data = this.data;

        console.log(data);

        const colors = [];

        for ( let i = 0; i < data.heights[ 0 ].length; i ++ ) {

            colors[ i ] = Math.random() * 0xFFFFFF;

        }

        const ROW_STEP = ( data.size.z - data.outSidePadding * 2 ) / ( data.heights[ 0 ].length - 1); 
        const BAR_STEP = ( data.size.x - data.outSidePadding * 2 ) / ( data.heights.length - 1); 

        const X_START = -data.size.x / 2 + data.outSidePadding;
        const Y_START = -data.size.y / 2; 
        const Z_START = data.size.z / 2 - data.outSidePadding; 

        let x, y, z, color;

        for ( let i = 0; i < data.heights.length; i ++ ) {

            for ( let j = 0; j < data.heights[ i ].length; j ++ ) {

                x = i; 
                y = data.heights[ i ][ j ];
                z = j;
                color = colors[ j ];
                label = data.labels[ i ][ j ];

                const entity = document.createElement( "a-entity");
                entity.setAttribute( "bar", {
                    width: data.barWidth / 2,
                    height: y,
                    value: label,
                    color: color
                });
                entity.setAttribute("position", {
                    x: X_START + BAR_STEP * i, y: Y_START + y / 2, z: Z_START - ROW_STEP * j 
                } );
                this.el.appendChild(entity);
            } 

        }

        const step = ( data.size.x - data.outSidePadding * 2 ) / ( data.heights.length - 1 );
        const start = new THREE.Vector3( -data.size.x / 2 + data.outSidePadding, -data.size.y / 2, 0 );

        for (let i = 0; i < data.heights.length; i++ ) {

            /*const entity = document.createElement( "a-entity");
            entity.setAttribute( "bar", {
                width: data.barWidth / 2,
                height: data.heights[ i ],
                value: data.values[ i ],
            });
            entity.setAttribute("position", {
                 x: start.x + i * step, y: start.y + data.heights[ i ] / 2, z: 0 
            } );
            this.el.appendChild(entity);
            */

        }

    },

    makeLines: function() {



    }

} );