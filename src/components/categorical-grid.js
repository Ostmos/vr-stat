const stat = require("../lib/stat");
const loadJSON = require("../lib/statJson").loadJSON;
const getColumn = require("../lib/statJson").getColumn;
const SpriteText = require("../lib/SpriteText");

AFRAME.registerComponent( "categorical-grid", {

    schema: {
    },
 
    init: function() {

        let el = this.el;

        var geometry = new THREE.BufferGeometry();
        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        var vertices = new Float32Array( [
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,

            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0
        ] );

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        var mesh = new THREE.Mesh( geometry, material );

        el.object3D.add(mesh);

    },

} );