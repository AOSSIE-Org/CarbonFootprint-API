// src/routes.js
import React from 'react';
import { render } from 'react-dom';
import { Route, IndexRoute, Router } from 'react-router';
import App from './components/index';

render(
    <Router>
        <Route path="/" component={App}/>
    </Router>,
    document.getElementById('root')
);
