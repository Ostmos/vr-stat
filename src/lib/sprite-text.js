const SpriteText = {

   // Text mesh created by using the canvas as a texture 
   makeText: function(text = "Lorem", debug = false, fontFamily = "Courier New", fontSize = 128, color = "black" ) {
        
        const Canvas = document.createElement( "canvas" );
        const Ctx = Canvas.getContext("2d");
        Canvas.width = 512;
        Canvas.height = 512;
        Ctx.textAlign = "center";
        Ctx.textBaseline = "middle";
        // Threejs resizes texture if it's not power by two
        let width = Ctx.measureText(text).width * fontSize; 
        
        if ( debug ) {

            Ctx.rect(0, 0, Canvas.width, Canvas.height);
            Ctx.stroke();

        }

        Ctx.font = String(fontSize).concat( "px ", fontFamily );
        Ctx.fillStyle = color;
        Ctx.fillText( text, Canvas.width / 2, Canvas.height / 2 );

        const Texture  = new THREE.CanvasTexture( Canvas );
        const SpriteMaterial = new THREE.SpriteMaterial( { map: Texture } );
        const Sprite = new THREE.Sprite( SpriteMaterial ); 
        Sprite.scale.set(0.2, 0.2, 0.2);
        return Sprite;
        
   }

}

module.exports = SpriteText;