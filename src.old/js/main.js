import 'app-module-path/cwd';
import React from 'react';
import { render } from 'react-dom';
import document from 'global/document';
import { createStore } from './modules';
import Root from './components/Root';
import { init } from './modules/ui/actions';


const store = createStore();
store.dispatch(init());

render(<Root store={store} />, document.getElementById('root'));
