/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Feature from '../feature.js';
import ItalicEngine from './italicengine.js';
import ButtonController from '../ui/button/button.js';
import ButtonView from '../ui/button/buttonview.js';
import Model from '../ui/model.js';

/**
 * Italic feature. It requires {@link basic-styles.ItalicEngine ItalicEngine feature}.
 * This feature creates also a UI component (`italic` button) and registers <kbd>CTRL+I</kbd> keystroke.
 *
 * @memberOf basic-styles
 * @extends ckeditor5.Feature
 */
export default class Italic extends Feature {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ItalicEngine ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;
		const command = editor.commands.get( 'italic' );

		// Create button model.
		const buttonModel = new Model( {
			isEnabled: true,
			isOn: false,
			label: t( 'Italic' ),
			icon: 'italic',
			iconAlign: 'left'
		} );

		// Bind button model to command.
		buttonModel.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

		// Execute command.
		this.listenTo( buttonModel, 'execute', () => editor.execute( 'italic' ) );

		// Add bold button to feature components.
		editor.ui.featureComponents.add( 'italic', ButtonController, ButtonView, buttonModel );

		// Set the CTRL+I keystroke.
		editor.keystrokes.set( 'CTRL+I', 'italic' );
	}
}
