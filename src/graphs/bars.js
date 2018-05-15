const miniTextPanel = require( "../text/sprite-text" ).miniTextPanel;

AFRAME.registerComponent( "bar", {

    multiple: true,

    schema: { 
        width: { type: "number" },
        height: { type: "number" },
        value: { type: "string" },
        color: { type: "color", default: 0xF05053 },
    },

    init: function() {

        const TEXT_PANEL_OFFSET = 0.1;

        let self = this;
        let data = this.data;

        const geometry = new THREE.BoxGeometry( data.width, data.height, data.width );
        const material = new THREE.MeshToonMaterial( {color: data.color } );
        const mesh = new THREE.Mesh( geometry, material );
        const pos = data.position;

        this.el.setAttribute( "data-point", {
            value: data.value
        } );

        this.el.setObject3D( this.attrName, mesh );

        this.el.setAttribute( "pop-up-label", {
            text: data.value,
            position: { x: 0, y: data.height / 2 + 0.12, z: 0 }
        } );

        this.el.addEventListener( "stateadded", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                material.color.setHex( 0xF6903D );

            }

        } );

        this.el.addEventListener( "stateremoved", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                material.color.setHex( data.color );

            }

        } );

    }

} );

AFRAME.registerComponent( "bars", {

    schema: {
        size: { type: "vec3" },
        barWidth: { type: "number" },
        heights: { type: "array" },
        labels: { type: "array" },
        outSidePadding: { type: "number" }
    },
 
    init: function() {     

        let data = this.data;

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
                entity.setAttribute("position", {
                    x: X_START + BAR_STEP * i, y: Y_START + y / 2 + 0.001, z: Z_START - ROW_STEP * j 
                } );
                entity.setAttribute( "bar", {
                    width: data.barWidth / 2,
                    height: y,
                    value: label,
                    color: color
                });
                this.el.appendChild(entity);
            } 

        }

    },

} );