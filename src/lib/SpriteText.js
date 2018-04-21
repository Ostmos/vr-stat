var SpriteText = {

   // Text mesh created by using the canvas as a texture 
   createText: function(text = "lorem", fontFamily = "Courier New", fontSize = 68, color = "white" ) {
        
        const Canvas = document.createElement( "canvas" );
        let context = Canvas.getContext("2d");
        // Threejs resizes texture if it's not power by two
        context.canvas.width = 256;
        context.canvas.height = 128;

        context.font = String(fontSize).concat( "px ", fontFamily );
        context.fillStyle = color;
        context.fillText( text, 0, fontSize );

        let texture  = new THREE.CanvasTexture( Canvas );
        const SpriteMaterial = new THREE.SpriteMaterial( { map: texture } );
        const Sprite = new THREE.Sprite( SpriteMaterial ); 
        return Sprite;
        
   } 

}

module.exports = SpriteText;