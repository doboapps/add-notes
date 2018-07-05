import { createStore } from 'redux'

const reducer = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                login: action.loginValue
            }
        case "LOGOUT":
            return {
                ...state,
                login: false,
                dataUser:{}
            }
        case "DATAUSER":
            return {
                ...state,
                dataUser: action.dataUser
            }  
        
    }
    
    return state
}

export default createStore(reducer, { login:false,dataUser:{} })