function TextProperties( fontFamily = "Courier New", fontSize = 64, fontColor = "black", rotation = 0 ) {

    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.rotation = rotation;

}

TextProperties.prototype.toContextFont = function() {

    return String( this.fontSize ).concat( "px ", this.fontFamily );

}

function SpriteText( text = "Lorem", properties, panel ) {

    let canvasSize = 128;

    this.canvas = document.createElement( "canvas" );
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = canvasSize;
    this.canvas.height = canvasSize;
    this.ctx.font = properties.toContextFont(); 

    let scale = 1;
    const TextWidth = this.ctx.measureText( text ).width;
    if ( TextWidth > canvasSize ) {

        while (TextWidth > canvasSize * scale ) {
            scale *= 2;
        }

        this.canvas.width = canvasSize * scale;
        this.canvas.height = canvasSize * scale;
        this.ctx.font = properties.toContextFont();

    }

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // Panel
    if ( panel ) {

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, this.canvas.height / 4, this.canvas.width, this.canvas.height / 2);

    }

    this.ctx.fillStyle = properties.fontColor;
    this.ctx.fillText( text, this.canvas.width / 2, this.canvas.height / 2 );


    const Texture = new THREE.CanvasTexture( this.canvas );
    const SpriteMaterial = new THREE.SpriteMaterial( { map: Texture, rotation: properties.rotation } );
    this.mesh = new THREE.Sprite( SpriteMaterial ); 
    this.mesh.scale.set(scale * 0.2, scale * 0.2, scale * 0.2);
   
    // Use for debug 
    // this.ctx.rect(0, 0, this.canvas.width, canvas.height);
    // this.ctx.stroke(); 

}

SpriteText.prototype.write = function( text ) {

    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.clearRect( 0, 0, width, height );
    this.ctx.fillText( text, this.canvas.width / 2, this.canvas.height / 2 );

}

// Factory methods
function smallText( text, rotation = 0 ) {

    const Properties = new TextProperties( "Courier New", 48, "black", rotation);
    return new SpriteText( text, Properties ); 
    
}

function mediumText( text, rotation = 0 ) {

    const Properties = new TextProperties( "Courier New", 64, "black", rotation );
    return new SpriteText( text, Properties ); 

}

function largeText( text, rotation = 0 ) {

    const Properties = new TextProperties( "Courier New", 128, "black", rotation );
    return new SpriteText( text ); 

}

function miniTextPanel( text, rotation = 0 ) {

    const Properties = new TextProperties( "Courier New", 36, "white", rotation);
    return new SpriteText( text, Properties, true ); 
    
}

function smallTextPanel( text, rotation = 0 ) {

    const Properties = new TextProperties( "Courier New", 48, "white", rotation);
    return new SpriteText( text, Properties, true ); 
    
}

function mediumTextPanel( text, rotation = 0 ) {

    const Properties = new TextProperties( "Courier New", 64, "white", rotation );
    return new SpriteText( text, Properties, true ); 

}

function largeTextPanel( text, rotation = 0 ) {

    const Properties = new TextProperties( "Courier New", 128, "white", rotation );
    return new SpriteText( text, Properties, true ); 

}

module.exports = {
    TextProperties: TextProperties,
    SpriteText: SpriteText,
    smallText: smallText,
    mediumText: mediumText,
    largeText: largeText,
    miniTextPanel: miniTextPanel,
    smallTextPanel: smallTextPanel,
    mediumTextPanel: mediumTextPanel,
    largeTextPanel: largeTextPanel
}