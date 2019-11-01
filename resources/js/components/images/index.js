import React from 'react';
import ReactDOM from 'react-dom';
import Images from './Images';

if (document.getElementById('images-container')) {
	ReactDOM.render(<Images />, document.getElementById('images-container'))
}