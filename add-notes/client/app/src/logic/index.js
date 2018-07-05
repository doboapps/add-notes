const notesApi = require('notes-api')

notesApi.url = 'http://localhost:5000/api'

const logic = {
    userId: 'NO-ID',

    isLogged() {
        return localStorage.getItem("token-add-notes") ? true : false
    },

    registerUser(name, surname, email, password) {
        return notesApi.registerUser(name, surname, email, password)
    },

    login(email, password) {
        return notesApi.authenticateUser(email, password)
            .then(id => {
                this.userId = id
                localStorage.setItem('id-add-notes', id)
                return id
            })
    },

    logOut() {
        localStorage.removeItem("token-add-notes")
        localStorage.removeItem('id-add-notes')
    },

    getUser(id) {
        return notesApi.retrieveUser(id)
            .then(dataUser => {
                return dataUser
            })
    },

    addNote(userId,text){
        return notesApi.addNote(userId,text)
        .then(data => {
            return data
        })
    },

    retrieveNote(userId,noteId){
        return notesApi.retrieveNote(userId,noteId)
        .then(data => {
            return data
        })
    },

    removeNote(userId,noteId){
        return notesApi.removeNote(userId,noteId)
        .then(data => {
            return data
        })
    },

    retrieveNotes(userId){
        return notesApi.listNotes(userId)
        .then(status => {
            return status
        })
    }


}

export default logic