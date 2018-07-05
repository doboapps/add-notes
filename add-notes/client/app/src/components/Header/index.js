import React,{ Component } from 'react'
import {Link,withRouter} from "react-router-dom"
import {   Navbar,  NavbarBrand, Nav,  NavLink } from 'reactstrap'
import logic from "../../logic"
import store from '../../redux/store'
import {login,logout,dataUser} from '../../redux/actions/actionCreators'
import "./style.css"
import home from "../../images/home.png"



class Header extends Component {

    constructor(){
        super()
        this.state = {
            login:false,
            name:"",
            surname:""

        }

        store.subscribe(()=>{
                this.setState({
                    login:store.getState().login,
                    name:store.getState().dataUser.name,
                    surname:store.getState().dataUser.surname

                })
        })       
    }
 
    handlerLogut = ()=>{

        logic.logOut()
        store.dispatch(logout())
    }

     componentDidMount(){
        if(logic.isLogged() && !store.getState().login)
        logic.getUser(localStorage.getItem("id-add-notes"))
        .then((user)=>{
            store.dispatch(login(true))
            store.dispatch(dataUser(user))
        })
        .catch(console.log())
    }


    render() {

        return  <Navbar className="navbar-logged"  light expand="md">
                    <NavbarBrand className="logo zi-1" tag={Link}  to="/" >
                        <img className="btn-home" src={home} alt="btn-home" />                    </NavbarBrand> } 
                    {this.state.login &&                        
                    <NavbarBrand className="name-user zi-1" >
                        {`${this.state.name} ${this.state.surname}`}
                    </NavbarBrand> } 
                    <Nav>
                        {this.state.login?                        
                        <ul className="zi-1">                        
                        <li>
                            <NavLink  onClick={this.handlerLogut} tag={Link}  to="/#" ><span className="logout-text">LogOut</span></NavLink>
                        </li>                        
                    </ul>
                        :
                    <ul className="zi-1">
                        <li>
                            <NavLink tag={Link} to="/login" ><span>Login</span></NavLink>
                        </li>
                        <li>
                            <NavLink tag={Link}  to="/register" ><span>Register</span></NavLink>
                        </li>
                    </ul>    
                        
                    }
                    </Nav>   
        </Navbar>
    }
}



export default withRouter(Header)
