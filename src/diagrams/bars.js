const miniTextPanel = require( "../text/sprite-text" ).miniTextPanel;

AFRAME.registerComponent( "bar", {

    multiple: true,

    schema: { 
        width: { type: "number" },
        height: { type: "number" },
        value: { type: "string" },
        color: { type: "color" },
    },

    init: function() {

        const TEXT_PANEL_OFFSET = 0.1;

        this.el.className = "hoverable";

        let self = this;
        let data = this.data;

        const geometry = new THREE.BoxGeometry( data.width, data.height, data.width );
        const material = new THREE.MeshToonMaterial( {color: 0x604a4b } );
        const mesh = new THREE.Mesh( geometry, material );
        const pos = data.position;

        this.el.setObject3D( this.attrName, mesh );

        this.el.setAttribute( "pop-up-label", {
            text: data.value,
            position: { x: 0, y: data.height / 2 + 0.12, z: 0 }
        } );

        this.el.addEventListener( "stateadded", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                material.color.setHex( 0x604fff );

            }

        } );

        this.el.addEventListener( "stateremoved", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                material.color.setHex( 0x604a4b );

            }

        } );

    }

} );

AFRAME.registerComponent( "bars", {

    schema: {
        size: { type: "vec3" },
        barWidth: { type: "number" },
        heights: { type: "array" },
        value: { type: "array" },
        outSidePadding: { type: "number" }
    },
 
    init: function() {     

        let data = this.data;

        const step = ( data.size.x - data.outSidePadding * 2 ) / ( data.heights.length - 1 );
        const start = new THREE.Vector3( -data.size.x / 2 + data.outSidePadding, -data.size.y / 2, 0 );
        this.mesh = new THREE.Group(); 

        for (let i = 0; i < data.heights.length; i++ ) {

            const entity = document.createElement( "a-entity");
            entity.setAttribute( "bar", {
                width: data.barWidth / 2,
                height: data.heights[ i ],
                value: data.values[ i ],
            });
            entity.setAttribute("position", {
                 x: start.x + i * step, y: start.y + data.heights[ i ] / 2, z: 0 
            } );
            this.el.appendChild(entity);

        }

    }

} );