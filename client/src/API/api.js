function tokenConfig(method, body) {
    const config = {
        credentials: 'include',
        method,
        headers: {
            "Content-type": "application/json",
        },
    }
    // if (token) config.headers['x-auth-token'] = getAccessToken();
    if (body) config.body = body;
    return config;
}

export function logout() {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await fetch('/api/auth/logout', tokenConfig('GET', true));
            const data = await response.json();
            return resolve(data);
        } catch(error) {

        }
    })
}

export function verifyToken() {
    return new Promise(async (resolve, reject) => {        
        try {
            const response = await fetch('/api/auth/user', tokenConfig('GET'));
            const data = await response.json();
            // check for errors
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

export function signInRequest(data) {
    return new Promise(async (resolve, reject) => {
        const body = JSON.stringify(data);
        try {
            const response = await fetch('/api/auth', tokenConfig('POST', body));
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

export function registerRequest(data) {
    return new Promise(async (resolve, reject) => {
        const body = JSON.stringify(data);
        try {
            const response = await fetch('/api/users', tokenConfig('POST', body));
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

export function userProfileUpdate(data) {
    return new Promise(async (resolve, reject) => {
        const body = JSON.stringify(data);
        try {
            const response = await fetch('/api/users', tokenConfig('PUT', body));
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

/*

export function updateRequest({ id, firstName, lastName, email, shippingAddress }) {
    return new Promise(async (resolve, reject) => {
        // Request body
        const body = JSON.stringify({ id, firstName, lastName, email, shippingAddress });

        // set headers
        function tokenConfig() {
            const token = localStorage.getItem('token');
            const config = {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body
            };
            if (token) config.headers['x-auth-token'] = token;
            return config;
        }


        try {
            const response = await fetch('/api/users', tokenConfig());
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
*/