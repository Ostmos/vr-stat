import * as stat from "../lib/stat";
import * as text from "../lib/text";

AFRAME.registerComponent( "axis", {

	schema: {
		arr: { type: "array" },
        axisLength: { type: "number", default: 1 },
        startOnZero: { type: "boolean", default: true },
        type: { type: "string", default: "numerical" },
        unit: { type: "string" },
        decimals: { type: "number", default: 2 },
        label: { type: "string" },
		fontColor: { type: "color", default: "#000000" },
		textAlignment: { type: "string", default: "left" },
		showTicks: { type: "boolean" }
	},

	init: function () {

        let data = this.data;
        let el = this.el;
        let self = this;
        let arr = data.arr;

        const STEP_LENGTH = 0.2;
        const STEPS_PER_METER = 4;
        const STEPS = data.axisLength * STEPS_PER_METER; 

        // Numerical and categorical
        if ( data.type === "numerical" ) {

            if ( data.startOnZero ) {
                arr.push( 0 );
            }

            let steps = stat.interpolate( arr, STEPS );

            this.labelPositions = stat.scaleFit( steps, data.axisLength ); 
            if ( !data.startOnZero ) {
                this.labelPositions = stat.offset(
                    -this.labelPositions[0] ,
                    this.labelPositions 
                );
            }

            let labels = stat.decimalPrecision( steps, data.decimals );
            if ( data.unit.length > 0 ) {
                labels = stat.suffix( labels, data.unit );
            }
            this.labels = labels;

        } else {

            this.labels = arr;
            let positions = stat.stepArray( arr.length - 1, STEP_LENGTH );
            positions = stat.scaleFit( positions, data.axisLength - STEP_LENGTH * 2 );
            this.labelPositions = positions;
            this.labelPositions = stat.offset( STEP_LENGTH , positions );

        }

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
