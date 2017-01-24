//import './shim';
import React from 'react';
import { render } from 'react-dom';
import document from 'global/document';
import createStore from './modules/store';
import Root from './components/Root';


const store = createStore();

render(<Root store={store} />, document.getElementById('root'));
