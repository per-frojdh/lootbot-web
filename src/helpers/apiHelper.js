/**
* This is a helper method for making async requets to an API
* I want this method to make it possible to make calls like
* [GET, POST, PUT, PATCH, DELETE]
* Given an endpoint, data,
* should return a promise.
*
* Some stuff can already be set here like
* headers, baseurl, this should be set in an config file
* which should be imported here
* think about how to get the x-auth-token, store it and send with every reequest
*
* This uses superagent: http://visionmedia.github.io/superagent/
*/

import request from 'superagent';
import { AuthHelper } from './authHelper';

export const ApiHelper = {

    // Configuration (This will be replaced with a settings file).
    // As for now, replace this with the uri for your own API.
    uriBase: 'http://localhost/rutger/api/',

    login: (url, opts) => {
        return new Promise((resolve, reject) => {
            const req = request.post(ApiHelper.uriBase + url);
            const {username, password} = opts;
            req.auth(username, password);
            req.end((err, res) => {
                if (err) {
                    reject((res && res.body) || err);
                } else {
                    AuthHelper.setStorage(res.body[0], username);
                    resolve(res.body);
                }
            });
        });
    },

    logout: (url) => {
        return new Promise((resolve, reject) =>{
            const req = request.delete(ApiHelper.uriBase + url);
            req.set('X-Auth-Token', sessionStorage.accessToken);
            req.end((err, res) => {
                if (err) {
                    if (res.statusCode === 401) {
                        AuthHelper.deleteStorage();
                    }
                    reject((res && res.body) || err);
                } else {
                    AuthHelper.deleteStorage();
                    resolve(res.body);
                }
            });
        });
    },

    get: (url) => {
        return new Promise((resolve, reject) => {
            const req = request.get(ApiHelper.uriBase + url);
            req.set('X-Auth-Token', sessionStorage.accessToken);

            req.end((err, res) => {
                if (err) {
                    if (res.statusCode === 401) {
                        AuthHelper.deleteStorage();
                    }
                    reject((res && res.body) || err);
                } else {
                    resolve(res.body);
                }
            });
        });
    },

    post: (url, opts) => {
        return new Promise((resolve, reject) => {
            const req = request.post(ApiHelper.uriBase + url);
            req.set('X-Auth-Token', sessionStorage.accessToken);
            if (opts) {
                req.send(opts);
            }

            req.end((err, res) => {
                if (err) {
                    if (res.statusCode === 401) {
                        AuthHelper.deleteStorage();
                    }
                    reject((res && res.body) || err);
                } else {
                    resolve(res.body);
                }
            });
        });
    },

    put: (url, opts) => {
        return new Promise((resolve, reject) => {
            const req = request.put(ApiHelper.uriBase + url);
            req.set('X-Auth-Token', sessionStorage.accessToken);
            if (opts) {
                req.send(opts);
            }

            req.end((err, res) => {
                if (err) {
                    if (res.statusCode === 401) {
                        AuthHelper.deleteStorage();
                    }
                    reject((res && res.body) || err);
                } else {
                    resolve(res.body);
                }
            });
        });
    },
};
