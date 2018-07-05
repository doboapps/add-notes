const login = value =>{
    return {
        type:"LOGIN",
        loginValue:value
    }
}

const logout = () =>{
    return {
        type:"LOGOUT",
    }
}

const dataUser = dataUser =>{
    return {
        type:"DATAUSER",
        dataUser
    }
}

export {login,logout,dataUser}