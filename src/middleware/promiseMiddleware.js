/**
 * Promise middleware, makes it possible to fetch
 * async data before despatching an action

 */
import { pushPath } from 'redux-simple-router';

export default function promiseMiddleware({getState}) {
    return (next) => (action) => {
        if (action === undefined) {
            return;
        }
        const { promise, types, ...rest } = action;
        if (!promise) {
            return next(action); // eslint-disable-line consistent-return
        }
        const [REQUEST, SUCCESS, FAILURE] = types;

        next({ ...rest, type: REQUEST });
        return new Promise((resolve, reject) => { // eslint-disable-line consistent-return
            promise.then(
                (result) => {
                    next({ ...rest, result, type: SUCCESS });
                    resolve(result);
                },
                (error) => {
                    // Check if there is an active accesstoken
                    // If a request was made with an incorrect token
                    // it should have been deleted.
                    if (!sessionStorage.accessToken && !getState().auth.loading ) {
                        next(pushPath('/login', {nextPathname: getState().routing.path}));
                    } else {
                        next({ ...rest, error, type: FAILURE });
                        reject(error);
                    }
                }
            );
        });
    };
}
