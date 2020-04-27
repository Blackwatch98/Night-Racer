/**
 * @author Reece Aaron Lecrivain / http://reecenotes.com/
 */
import { FileLoader } from './FileLoader.js';

function AudioLoader( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

}

Object.assign( AudioLoader.prototype, {

	load: function ( url, onLoad, onProgress, onError ) {

		var loader = new FileLoader( this.manager );
		loader.setResponseType( 'arraybuffer' );
		loader.setPath( this.path );
		loader.load( url, function ( buffer ) {

			// Create a copy of the buffer. The `decodeAudioData` method
			// detaches the buffer when complete, preventing reuse.
			var bufferCopy = buffer.slice( 0 );

			var context = AudioContext.getContext();
			context.decodeAudioData( bufferCopy, function ( audioBuffer ) {

				onLoad( audioBuffer );

			} );

		}, onProgress, onError );

	},

	setPath: function ( value ) {

		this.path = value;
		return this;

	}

} );


export { AudioLoader };