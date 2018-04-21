import * as stat from "../lib/stat";
import * as text from "../lib/text";

AFRAME.registerComponent( "axis", {

	schema: {
        positons: { type: "array", default: [0.0, 0.5, 1] },
        labels: { type: "array", default: ["No value", "No value", "No value"] }, 
		textAlignment: { type: "string", default: "left" },
        axisLength: { type: "number", default: 1 },
        axisEndPadding: { type: "number", default: 0 },
		showTicks: { type: "boolean" },
        label: { type: "string" },
		fontColor: { type: "color", default: "#000000" }
	},

	init: function () {

        let data = this.data;
        let el = this.el;
        let self = this;
        let arr = data.arr;

        const StepLength = 0.2;
        const StepPerMeter = 4;
        const Steps = data.axisLength * StepPerMeter; 

        this.labelPositions = this.data.positions;
        this.labels = this.data.labels;

        const MAX_GLYPHS = stat.longestString( this.labels );

        // Axis
        const MATERIAL = new THREE.LineBasicMaterial({
            color: 0x000000
        });
        let geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 0, data.axisLength, 0)
        );
        let line = new THREE.Line( geometry, MATERIAL ); 
        this.el.setObject3D( "line", line );

        // Labels
        const SCALE_FLIP = -0.005;
        const SCALE_NO_FLIP = 0.005;
        let offset = data.textAlignment === "left" ? 0 : text.TEXT_BOX_WIDTH;
        text.multiLabels( data.fontColor, data.textAlignment, this.labels, function( labelMeshes ) {

            for ( let i = 0; i < labelMeshes.length; i++ ) {

                let labelAnchor = new THREE.Object3D();
                labelAnchor.add( labelMeshes[i] );
                labelAnchor.scale.multiplyScalar( SCALE_FLIP );
                labelAnchor.position.y = self.labelPositions[i] - text.GLYPH_HEIGHT / 2;
                labelAnchor.position.x = offset;
                self.el.setObject3D( "label" + i, labelAnchor );

            }

        } );

        text.singleLabel (data.fontColor, "left", data.label, function (labelMesh) {

            let labelAnchor = new THREE.Object3D();
            labelAnchor.add( labelMesh );

            if ( data.textAlignment === "left" ) {

                labelAnchor.scale.multiplyScalar( SCALE_NO_FLIP );
                labelAnchor.rotation.set( 0, 0, Math.PI / 2 );
                labelAnchor.position.set( 
                    -MAX_GLYPHS * text.GLYPH_WIDTH,
                    -data.label.length * text.GLYPH_HEIGHT / 2 + data.axisLength / 2,
                    0
                );

            } else {

                labelAnchor.scale.multiplyScalar( SCALE_NO_FLIP );
                labelAnchor.rotation.set( 0, 0, -Math.PI / 2 );
                labelAnchor.position.set( 
                    MAX_GLYPHS * text.GLYPH_WIDTH,
                    data.label.length * text.GLYPH_HEIGHT / 2 + data.axisLength / 2,
                    0
                );

            }

            self.el.setObject3D( "label", labelAnchor );

        } );


    },

} );
