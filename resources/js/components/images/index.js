import React from 'react';
import ReactDOM from 'react-dom';
import Image from './Image';

if (document.getElementById('images-container')) {
	ReactDOM.render(<Image />, document.getElementById('images-container'))
}