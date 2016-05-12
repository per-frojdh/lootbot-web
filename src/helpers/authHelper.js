/**
 *This auth helper should check the accesstoken
 * Funcionality:
 * Gettoken
 * deletetoken
 * checktoken
 * check agains backend if token is in cache
 *
*/

export const AuthHelper = {
    getStorage: () => {
        return {
            accessToken: sessionStorage.accessToken,
            user: sessionStorage.userName,
        };
    },

    setStorage: (accessToken, user) => {
        sessionStorage.accessToken = accessToken;
        sessionStorage.userName = user;
    },

    deleteStorage: () => {
        return (delete sessionStorage.accessToken && delete sessionStorage.userName);
    },
    // An alternative could be having a call to the api here to se if the user is authenticated
    // against the backend
    isAuthenticated: () => {
        return sessionStorage.accessToken;
    },
};
