import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import getRoutes from './routes.jsx';
import { Router} from 'react-router';

const {store, history} = configureStore();

// bootstrap requires jQuery to be in a global scope.

require('foundation');
require('./stylesheets/main.scss');

ReactDOM.render(
	<Provider store = {store}>
        <Router history = {history}>
            {getRoutes()}
        </Router>
	</Provider>
	, document.getElementById('root')
);
