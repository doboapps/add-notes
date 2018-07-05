import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Home, Landing, E404, Register, Login } from "../index";
import logic from "../../logic"

class Main extends Component {


    render(){

        return logic.isLogged() ?
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route path='/' render={() => <E404/>} />
             </Switch>
             :
             <Switch>
                <Route exact path="/" render={() => <Landing />} />
                <Route exact path="/register" render={() => <Register />} />
                <Route exact path="/login" render={() => <Login />} />

                <Route path='/' render={() => <E404/>} />
             </Switch>
    }
}

export default (Main)

