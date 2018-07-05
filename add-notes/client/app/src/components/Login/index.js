import React,{ Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from "../../logic"
import {Form, Input, Button, Container, Col} from 'reactstrap'
import SweetAlert from 'sweetalert2-react';
import store from '../../redux/store'
import {login, dataUser} from '../../redux/actions/actionCreators'

class Login extends Component {

    state = {
        userEmail: "",
        password: "",
        showAlert: false,
        titleAlert:"", 
        textAlert:""
    }

    handleKeepEmail = ({target:{value:userEmail}}) => {
        this.setState({ userEmail })
    }

    handleKeepPassword = ({target:{value:password}}) => {
        this.setState({ password })
    }    

    handleLogin = e => {

        e.preventDefault()
        logic.login(this.state.userEmail, this.state.password)
            .then(userId => {

                logic.getUser(userId)
                .then(user=>{
                    store.dispatch(login(true))
                    store.dispatch(dataUser(user))
                    this.props.history.push('/')
                    
                })                  
            })
            .catch(e=>{
                if(e.toString()==="TypeError: Cannot read property 'id' of undefined")
                e="Credentials error"

                this.setState({
                    showAlert:true,
                    titleAlert:"Oooops!", 
                    textAlert:e.toString(),
                })
            })
    }



 render() {

        return (

            <div className="container-login" >
                <Container >
                    <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
                        <Form className=" text-center  form-login p-3 pl-5 pr-5 rounded " onSubmit={this.handleLogin}>
                            <h2 className="title" >Login </h2>
                            <hr className="my-4"/>
                            <Input className="m-3" value={this.state.userEmail} onChange={this.handleKeepEmail} type="text" placeholder="Email" autoFocus={true} />
                            <Input  className="m-3" value={this.state.password} onChange={this.handleKeepPassword} type="password" placeholder="Password" />
                            <Button outline className="m-3" type="submit" > Log me in</Button>
                        </Form>
                    </Col>
                </Container>
                <SweetAlert show={this.state.showAlert}
                            title={this.state.titleAlert}
                            text={this.state.textAlert}
                            onConfirm={() => {this.setState({ showAlert: false })}  } />
            </div>
        )
    }
}


export default withRouter(Login)
