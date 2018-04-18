import * as fontCreator from "three-bmfont-text";
import * as fontLoader from "load-bmfont";

var SDFShader = require( '../shaders/sdf' );

export const GLYPH_HEIGHT = 0.11;
export const GLYPH_WIDTH = 0.198;
const TEXT_WIDTH_PX = 40;
const TEXT_BOX_WIDTH_PX = 300;
const TEXT_BOX_LONG_WIDTH_PX = 1000;
export const TEXT_BOX_WIDTH = TEXT_BOX_WIDTH_PX / TEXT_WIDTH_PX * GLYPH_WIDTH;  
export const TEXT_BOX_LONG_WIDTH = TEXT_BOX_LONG_WIDTH_PX / TEXT_WIDTH_PX * GLYPH_WIDTH;  

export function multiLabels( color, align, labels, callback ) {

    loadText ( color, function( font, fontTexture ) {

            let meshes = [];
            labels.forEach( function(label) {

                let fontGeometry = fontCreator( {
                    width: TEXT_BOX_WIDTH_PX,
                    font: font,
                    letterSpacing: 1,
                    align: align,
                    text: label 
                } );

                meshes.push( new THREE.Mesh( fontGeometry, fontTexture ) );

            } );

            callback(meshes);

    } );

}

export function singleLabel(color, align, label, callback) {

    loadText ( color, function( font, fontTexture ) {

        let fontGeometry = fontCreator( {
            width: TEXT_BOX_LONG_WIDTH_PX,
            font: font,
            letterSpacing: 1,
            align: align,
            text: label 
        } );

        let mesh = new THREE.Mesh( fontGeometry, fontTexture );

        callback(mesh);

    } );

} 

function loadText( color, callback ) {

    let textureLoader = new THREE.TextureLoader();
    textureLoader.load( './src/assets/fonts/dejavu/DejaVu-sdf.png', function(texture) {

        texture.needsUpdate = true;
        texture.anisotropy = 16;

        let fontTexture = new THREE.RawShaderMaterial( 
            SDFShader( {
                map: texture,
                side: THREE.DoubleSide,
                transparent: true,
                color: color 
            } )
        );

        fontLoader( './src/assets/fonts/dejavu/DejaVu-sdf.fnt', function ( err, font ) {

            callback( font, fontTexture );

        } );

    } );

}