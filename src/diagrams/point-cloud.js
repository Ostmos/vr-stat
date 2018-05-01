AFRAME.registerComponent( "sphere", {

    multiple: true,

    schema: {
        radius: { type: "number", default: 0.05 },
        value: { type: "vec3" },
    },

    init: function() {

        const data = this.data;
        const radius = this.data.radius;

        const sphereGeometry = new THREE.BoxGeometry( radius, radius, radius );
        const sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xF05053} );
        const sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial );

        this.el.setObject3D( this.attrName, sphereMesh );

        const ent = document.createElement("a-entity", "")
        ent.setAttribute( "pop-up-label", {
            text: "x: " + Number.parseFloat(data.value.x).toFixed(1),
            position: { x: 0, y: radius * 2, z: -0 }
        } );
            /*" y:" + Number.parseFloat(data.value.y).toFixed(1) +
            " z:" + Number.parseFloat(data.value.z).toFixed(1),*/
        /* this.el.setAttribute( "pop-up-label", {
            text: Number.parseFloat(data.value.x).toFixed(1) +
            " y:" + Number.parseFloat(data.value.y).toFixed(1) +
            " z:" + Number.parseFloat(data.value.z).toFixed(1),
            position: { x: 0, y: radius * 2, z: -0 }
        } ); */
        this.el.appendChild( ent );

        this.el.addEventListener( "stateadded", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                console.log("hover")

            }

        } );

        this.el.addEventListener( "stateremoved", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                console.log("not hover")

            }

        } );

        this.el.addEventListener( "stateadded", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                sphereMaterial.color.setHex( 0xF6903D );

            }

        } );

        this.el.addEventListener( "stateremoved", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

                sphereMaterial.color.setHex( 0xF05053 );

            }

        } );

        this.camera = document.querySelector('[camera]');

    },


} );

AFRAME.registerComponent( "sphere-point-cloud", {

    schema: {
        size: { type: "vec3", default: {x: 1, y: 1, z: 1} },
        points: { type: "vec3", default: { x: [ 0.5 ], y: [ 0.5 ] , z: [ 0.5 ] }},
        labelPoints: { type: "vec3" }
    },
 
    init: function() {

        let data = this.data;
        let size = data.size;
        let points = data.points;
        let pointTexture = data.pointTexture;
        let labelPoints = data.labelPoints;

        const length = points.z.length;
        const origin = new THREE.Vector3( 
            -size.x / 2, -size.y / 2, -size.z / 2
        );

        let x, y, z;
        for( let i = 0; i < 200; i ++ ){
            x = origin.x + points.x[ i ];
            y = origin.y + points.y[ i ];
            z = origin.z + points.z[ i ];

            const entity = document.createElement( "a-entity");
            entity.setAttribute( "sphere", {
                value: { x: labelPoints.x[ i ], y: labelPoints.y[ i ], z: labelPoints.z[ i ] }
            });
            entity.setAttribute("position", {
                 x: x, y: y, z: z, 
            } );
            this.el.appendChild(entity);

        }

    }

} );

AFRAME.registerComponent( "sprite-point-cloud", {

    schema: {
        size: { type: "vec3", default: {x: 1, y: 1, z: 1} },
        points: { type: "vec3", default: { x: [ 0.5 ], y: [ 0.5 ] , z: [ 0.5 ] }},
        pointTexture: { type: "asset", default: "#sphere" }
    },
 
    init: function() {

        let data = this.data;
        let size = data.size;
        let points = data.points;
        let pointTexture = data.pointTexture;

        const length = points.z.length;
        const origin = new THREE.Vector3( 
            -size.x / 2, -size.y / 2, -size.z / 2
        );
        const geometry = new THREE.Geometry();
        for( let i = 0; i < length; i ++ ){
            geometry.vertices.push(
                {x: origin.x + points.x[ i ],
                y: origin.y + points.y[ i ],
                z: origin.z + points.z[ i ]
                } 
            ); 
        }

        var sprite = new THREE.TextureLoader().load( "../assets/textures/sphere_large.png" );
        let material = new THREE.PointsMaterial( { size: 0.05, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
        material.color.setHex( 0xfd5053 );

        this.mesh = new THREE.Points(geometry, material);
        this.el.setObject3D( "cloudMesh", this.mesh );
    }

} );