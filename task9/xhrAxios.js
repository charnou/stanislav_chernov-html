const staxios = {

    sendRequest(method, url, body = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest;

            xhr.open(method, url);

            xhr.responseType = 'json';

            xhr.setRequestHeader('Content-type', 'application/json')

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(`${xhr.status} ${xhr.statusText}`);
                }
            }

            xhr.onerror = () => {
                reject(`${xhr.status} ${xhr.statusText}`);
            };

            if (method == 'DELETE') {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(body));
            }
        })
    },

    get(url) {
        return this.sendRequest('GET', url);
    },

    post(url, body) {
        return this.sendRequest('POST', url, body);
    },

    put(url, body) {
        return this.sendRequest('PUT', url, body);
    },

    delete(url) {
        return this.sendRequest('DELETE', url);
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