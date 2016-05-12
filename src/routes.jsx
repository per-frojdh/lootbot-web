import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {App, Login, Home} from './components';
import {AuthHelper} from './helpers/authHelper';


export default function getRoutes() {
    /**
     * Check if the user is authenticated.
     * @param { object } nextState
     * @param { function } replaceState
     */
    const requireAuth = (nextState, replaceState) => {
        if (!AuthHelper.isAuthenticated()) {
            replaceState({ nextPathname: nextState.location.pathname }, '/login');
        }
    };
    return (
        <Route path="/" component={App}>
            // Routes that requires login
            <IndexRoute component={Home} onEnter = {requireAuth}/>
            <Route path="login" component={Login}/>
        </Route>
    );
}
