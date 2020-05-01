const staxios = {

    get(url) {
        return fetch(url)
            .then(response => response.json())
    },

    post(url, object) {
        return fetch(url, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
    },

    put(url, object) {
        return fetch(url, {
                method: 'PUT',
                body: JSON.stringify(object),
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

    create(config) {
        let instance = {};
        instance.baseURL = config.baseURL;
        instance.get = function () {
            return fetch(this.baseURL)
                .then(response => response.json())
        }
        instance.post = function (object) {
            return fetch(this.baseURL, {
                    method: 'POST',
                    body: JSON.stringify(object),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => response.json())
        }
        instance.put = function (object) {
            return fetch(this.baseURL, {
                    method: 'PUT',
                    body: JSON.stringify(object),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => response.json())
        }
        instance.delete = function () {
            return fetch(this.baseURL, {
                method: 'DELETE'
            })
        }
        return instance;
    }
}

const object = {
    name: 'Stanislav',
    surname: 'Chernov',
    body: 'strong',
    alive: true
}

staxios.get('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

staxios.post('https://jsonplaceholder.typicode.com/posts', object)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

// staxios.put('https://jsonplaceholder.typicode.com/posts/1', object)
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// staxios.delete('https://jsonplaceholder.typicode.com/posts/1')
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

const instance = staxios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/posts'
})

instance.get()
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

instance.post()
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

// instance.put()
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// instance.delete()
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });