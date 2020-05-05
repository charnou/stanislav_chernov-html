const staxios = {
    get(url) {
        return fetch(url)
            .then(response => response.json())
    },

    post(url, body) {
        return fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
            })
            .then(response => response.json())
    },

    put(url, body) {
        return fetch(url, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
    },

    delete(url) {
        return fetch(url, {
            method: 'DELETE'
        })
    },

    create() {
        let instance = {
            get(url) {
                return staxios.get(url)
            },
            post(url, body) {
                return staxios.post(url, body)
            },
            put(url, body) {
                return staxios.put(url, body)
            },
            delete(url) {
                return staxios.delete(url)
            }
        };
        return instance;
    }
}

const object = {
    name: 'Stanislav',
    surname: 'Chernov',
    body: 'strong',
    alive: true
}

staxios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
    .finally(() => {
        console.log(`GET`);
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });

staxios.post('https://jsonplaceholder.typicode.com/posts', object)
    .finally(() => {
        console.log(`POST`);
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });

staxios.put('https://jsonplaceholder.typicode.com/posts/11', object)
    .finally(() => {
        console.log(`PUT`);
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });

staxios.delete('https://jsonplaceholder.typicode.com/posts/1')
    .finally(() => {
        console.log(`DELETE`);
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });

const instance = staxios.create()

instance.get('https://jsonplaceholder.typicode.com/posts/1/comments')
    .finally(() => {
        console.log(`instance GET`);
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });


instance.post('https://jsonplaceholder.typicode.com/posts', object)
    .finally(() => {
        console.log(`instance POST`);
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });

instance.put('https://jsonplaceholder.typicode.com/posts/11', object)
    .finally(() => {
        console.log(`instance PUT`);
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });

instance.delete('https://jsonplaceholder.typicode.com/posts/1')
    .finally(() => {
        console.log(`instance DELETE`);
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });