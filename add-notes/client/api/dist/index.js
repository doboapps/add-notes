'use strict';

var axios = require('axios');

var notesApi = {
    url: 'NO-URL',

    token: localStorage.getItem("token-add-notes") || 'NO-TOKEN',

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    registerUser: function registerUser(name, surname, email, password) {
        var _this = this;

        return Promise.resolve().then(function () {
            if (typeof name !== 'string') throw Error('user name is not a string');

            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof surname !== 'string') throw Error('user surname is not a string');

            if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.post(_this.url + '/users', { name: name, surname: surname, email: email, password: password }).then(function (_ref) {
                var status = _ref.status,
                    data = _ref.data;

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateUser: function authenticateUser(email, password) {
        var _this2 = this;

        return Promise.resolve().then(function () {
            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.post(_this2.url + '/auth', { email: email, password: password }).then(function (_ref2) {
                var status = _ref2.status,
                    data = _ref2.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                var _data$data = data.data,
                    id = _data$data.id,
                    token = _data$data.token;


                _this2.token = token;
                localStorage.setItem('token-add-notes', token);

                return id;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser: function retrieveUser(id) {
        var _this3 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            return axios.get(_this3.url + '/users/' + id, { headers: { authorization: 'Bearer ' + _this3.token } }).then(function (_ref3) {
                var status = _ref3.status,
                    data = _ref3.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} newEmail 
     * @param {string} newPassword 
     * 
     * @returns {Promise<boolean>}
     */
    updateUser: function updateUser(id, name, surname, email, password, newEmail, newPassword) {
        var _this4 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            if (typeof name !== 'string') throw Error('user name is not a string');

            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof surname !== 'string') throw Error('user surname is not a string');

            if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.patch(_this4.url + '/users/' + id, { name: name, surname: surname, email: email, password: password, newEmail: newEmail, newPassword: newPassword }, { headers: { authorization: 'Bearer ' + _this4.token } }).then(function (_ref4) {
                var status = _ref4.status,
                    data = _ref4.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser: function unregisterUser(id, email, password) {
        var _this5 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.delete(_this5.url + '/users/' + id, { headers: { authorization: 'Bearer ' + _this5.token }, data: { email: email, password: password } }).then(function (_ref5) {
                var status = _ref5.status,
                    data = _ref5.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} userId
     * @param {string} text 
     * 
     * @returns {Promise<string>}
     */
    addNote: function addNote(userId, text) {
        var _this6 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            if (typeof text !== 'string') throw Error('text is not a string');

            if ((text = text.trim()).length === 0) throw Error('text is empty or blank');

            return axios.post(_this6.url + '/users/' + userId + '/notes', { text: text }, { headers: { authorization: 'Bearer ' + _this6.token } }).then(function (_ref6) {
                var status = _ref6.status,
                    data = _ref6.data;

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} userId
     * @param {string} noteId 
     * 
     * @returns {Promise<Note>}
     */
    retrieveNote: function retrieveNote(userId, noteId) {
        var _this7 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            if (typeof noteId !== 'string') throw Error('note id is not a string');

            if (!(noteId = noteId.trim())) throw Error('note id is empty or blank');

            return axios.get(_this7.url + '/users/' + userId + '/notes/' + noteId, { headers: { authorization: 'Bearer ' + _this7.token } }).then(function (_ref7) {
                var status = _ref7.status,
                    data = _ref7.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * @param {string} userId
     * 
     * @returns {Promise<[Note]>}
     */
    listNotes: function listNotes(userId) {
        var _this8 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            return axios.get(_this8.url + '/users/' + userId + '/notes', { headers: { authorization: 'Bearer ' + _this8.token } }).then(function (_ref8) {
                var status = _ref8.status,
                    data = _ref8.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} userId
     * @param {string} noteId 
     * @param {string} text 
     * 
     * @returns {Promise<boolean>}
     */
    updateNote: function updateNote(userId, noteId, text) {
        var _this9 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            if (typeof noteId !== 'string') throw Error('note id is not a string');

            if (!(noteId = noteId.trim())) throw Error('note id is empty or blank');

            if (typeof text !== 'string') throw Error('text is not a string');

            if ((text = text.trim()).length === 0) throw Error('text is empty or blank');

            return axios.patch(_this9.url + '/users/' + userId + '/notes/' + noteId, { text: text }, { headers: { authorization: 'Bearer ' + _this9.token } }).then(function (_ref9) {
                var status = _ref9.status,
                    data = _ref9.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} userId
     * @param {string} noteId 
     *
     * @returns {Promise<boolean>}
     */
    removeNote: function removeNote(userId, noteId) {
        var _this10 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            if (typeof noteId !== 'string') throw Error('note id is not a string');

            if (!(noteId = noteId.trim())) throw Error('note id is empty or blank');

            return axios.delete(_this10.url + '/users/' + userId + '/notes/' + noteId, { headers: { authorization: 'Bearer ' + _this10.token } }).then(function (_ref10) {
                var status = _ref10.status,
                    data = _ref10.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} userId
     * @param {string} text 
     * 
     * @returns {Promise<[Note]>}
     */
    findNotes: function findNotes(userId, text) {
        var _this11 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user id is not a string');

            if (!(userId = userId.trim()).length) throw Error('user id is empty or blank');

            if (typeof text !== 'string') throw Error('text is not a string');

            if (!text.length) throw Error('text is empty');

            return axios.get(_this11.url + '/users/' + userId + '/notes?q=' + text, { headers: { authorization: 'Bearer ' + _this11.token } }).then(function (_ref11) {
                var status = _ref11.status,
                    data = _ref11.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    }
};

module.exports = notesApi;
