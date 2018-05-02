// Cursor component is used by laser controller 
// Get raycaster
// Loop and find entities
//  If entity rotation or moveable
//      manipulate that object directyl 

AFRAME.registerComponent( "laser-controls-2", {

    dependencies: [ "raycaster" ],

    schema: {
    },

    init: function() {

        this.BUTTONS = {
            TRIGGER: 1,
            SAVE_BUTTON: 3
        }

        this.GRABBING_STATE = "grabbing";

        const el = this.el;

        el.setAttribute( "laser-controls", "" );
        el.setAttribute( "raycaster", {
            objects: ".hoverable, a-link",
            far: 10 
        } );

        this.raycaster = el.components.raycaster;
        this.els = this.raycaster.intersectedEls;

        this.onRotation = this.onRotation.bind( this );
        this.onButtonDown = this.onButtonDown.bind( this );
        this.onButtonUp = this.onButtonUp.bind( this );

        this.el.addEventListener( "axismove" , this.onRotation ); 
        this.el.addEventListener( "buttondown", this.onButtonDown );
        this.el.addEventListener( "buttonup", this.onButtonUp );

    },

    onRotation: function( evt ) {

        const intersectedEl = this.els[ 0 ];
        if( intersectedEl === undefined ) { return; }

        const rotationParent = this.findParent( intersectedEl, "chart" );
        if ( rotationParent === undefined ) { return; }

        const yAxisRotation = evt.detail.axis[ 0 ] * Math.PI / 2;
        const xAxisRotation = evt.detail.axis[ 1 ] * Math.PI / 2; 

        rotationParent.object3D.rotation.set( xAxisRotation, yAxisRotation, 0);

    },

    onButtonDown: function( evt ) {

        if ( evt.detail.id === this.BUTTONS.TRIGGER ) {

            const intersectedEl = this.els[ 0 ];
            if ( intersectedEl === undefined ) { return; }

            const moveParent = this.findParent( intersectedEl, "chart" );
            if ( moveParent == undefined ) { return; }

            this.intersectedEl = intersectedEl;
            this.moveParent = moveParent;

            this.el.addState( this.GRABBING_STATE );

            THREE.SceneUtils.attach( this.moveParent.object3D, this.el.sceneEl.object3D, this.el.object3D );


        }

    },

    onButtonUp: function( evt ) {

        if ( evt.detail.id === this.BUTTONS.TRIGGER ) {
            
            this.el.object3D.updateMatrixWorld();
            THREE.SceneUtils.detach( this.moveParent.object3D, this.el.object3D, this.el.sceneEl.object3D );

            this.intersectedEl = undefined;
            this.moveParent = undefined;

            this.el.removeState( this.GRABBING_STATE );
        }

    },

    onMove: function() {

        

    },

    findParent: function( el, className ) {

        if ( el === undefined ) { return; }

        const scene = this.el.sceneEl;

        while ( (el.parentNode !== undefined && !el.classList.contains( className ) && el !== scene ) ) {

            el = el.parentNode;

        }

        if ( !el.classList.contains( className ) ) { return; }

        return el;

    },  

} );