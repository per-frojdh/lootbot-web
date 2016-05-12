import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middleware/promiseMiddleware';
import rootReducer from '../reducers';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {syncReduxAndRouter} from 'redux-simple-router';

/**
 *Some nice functional programming compose!
 *The order of the applied middlewares matter!
 */
const finalCreateStore = compose(
	applyMiddleware(promiseMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

/**
 * Configure the store.
 * @param {object} initialstate
 * @return {object} store
 */
export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    const history = createBrowserHistory();

    syncReduxAndRouter(history, store);

    if (module.hot) {
    // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return {store, history};
}
