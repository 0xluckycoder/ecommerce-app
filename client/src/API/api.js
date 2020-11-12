// function logout() {
// dispatch({ type: ACTIONS.LOGOUT_SUCCESS });
// }
export function verifyToken() {
    return new Promise(async (resolve, reject) => {
        
        function tokenConfig() {
            const token = localStorage.getItem('token');
            const config = {
              method: 'GET',
              headers: {
                "Content-type": "application/json"
              }
            };
            if (token) config.headers['x-auth-token'] = token;
            return config;
        }
        
        try {
            const response = await fetch('/api/auth/user', tokenConfig());
            const data = await response.json();
            // check for errors
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve({ data });                
            }
          
        } catch (error) {
            return reject({ error });
        }
    });
}

export function signInRequest({ email, password }) {

    return new Promise(async (resolve, reject) => {

        // Request body
        const body = JSON.stringify({ email, password });
    
        // Headers
        const config = {
            method: 'POST',
            headers: {
            "Content-type": "application/json"
            },
            body
        };

        try {
            const response = await fetch('/api/auth', config);
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch (error) {
            return reject({ error });
        }
    });
}

export function registerRequest({ firstName, lastName, email, shippingAddress, password }) {

    return new Promise(async (resolve, reject) => {
        // Request body
        const body = JSON.stringify({ firstName, lastName, email, shippingAddress, password });

        // Headers
        const config = {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body
        };

        try {
            const response = await fetch('/api/users', config);
            const data = await response.json();
            if (data.error) {
                return reject({error: data.error});
            } else {
                return resolve(data);
            }
        } catch (error) {
            return reject({ error });
        }
    });
}