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

        // return fetch(url)
        //     .then(response => response.json())
    },

    post(url, body) {
        return this.sendRequest('POST', url, body);

        // return fetch(url, {
        //         method: 'POST',
        //         body: JSON.stringify(body),
        //     })
        //     .then(response => response.json())
    },

    put(url, body) {
        return this.sendRequest('PUT', url, body);

        // return fetch(url, {
        //         method: 'PUT',
        //         body: JSON.stringify(object),
        //         headers: {
        //             "Content-type": "application/json; charset=UTF-8"
        //         }
        //     })
        //     .then(response => response.json())
    },

    delete(url) {
        return this.sendRequest('DELETE', url);

        // return fetch(url, {
        //     method: 'DELETE'
        // })
    },

    create() {
        let instance = {};
        instance.sendRequest = this.sendRequest;
        instance.get = this.get;
        instance.post = this.post;
        instance.put = this.put;
        instance.delete = this.delete;
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
    .then((response) => {
        console.log(`GET`);
        console.log(response);
    })
    .catch((error) => {
        console.log(`GET`);
        console.error(error);
    });

staxios.post('https://jsonplaceholder.typicode.com/posts', object)
    .then((response) => {
        console.log(`POST`);
        console.log(response);
    })
    .catch((error) => {
        console.log(`POST`);
        console.error(error);
    });


staxios.put('https://jsonplaceholder.typicode.com/posts/11', object)
    .then((response) => {
        console.log(`PUT`);
        console.log(response);
    })
    .catch((error) => {
        console.log(`PUT`);
        console.error(error);
    });

staxios.delete('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => {
        console.log(`DELETE`);
        console.log(response);
        console.log('Delete success');
    })
    .catch((error) => {
        console.log(`DELETE`);
        console.error(error);
    });

const instance = staxios.create()

instance.get('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => {
        console.log(`instance GET`);
        console.log(response);
    })
    .catch((error) => {
        console.log(`instance GET`);
        console.error(error);
    });