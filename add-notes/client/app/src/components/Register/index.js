import React,{ Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Container, Col } from 'reactstrap'
import logic from "../../logic"
import SweetAlert from 'sweetalert2-react';

class Register extends Component {
    state = {
        userName: "",
        userSurname: "",
        userEmail: "",
        password: "",
        repeatPassword: "",
        showAlert: false,
        redirectAlert:false,
        titleAlert:"",
        textAlert:""
    }


    
    handleKeepName = ({target:{value:userName}}) => {
        this.setState({ userName })
    }

    handleKeepEmail = ({target:{value:userEmail}})=> {
        this.setState({ userEmail })
    }

    handleKeepSurname = ({target:{value:userSurname}}) => {
        this.setState({ userSurname })
    }

    handleKeepPassword = ({target:{value:password}}) => {
        this.setState({ password })
        this.comparePassword(password, this.state.repeatPassword)
    }

    handleKeepRepeatPassword =  ({target:{value:repeatPassword}}) => {
        this.setState({ repeatPassword })
        this.comparePassword(this.state.password, repeatPassword)
    }

    comparePassword(pass, repeatPass) {

        if (pass !== repeatPass) 
            this.setState({
                notMatchingMessage: "Passwords don't match"
            })
        else  this.setState({
                notMatchingMessage: ""
              })        
    }


    handleSweetAlertMsg(titleAlert,textAlert,redirectAlert){
        this.setState({
            showAlert:true, titleAlert, textAlert,redirectAlert
        })    
    }

    handleRegister = (e) => {
        e.preventDefault();
        if (this.state.notMatchingMessage === '') {

            logic.registerUser(this.state.userName, this.state.userSurname, this.state.userEmail, this.state.password)
                .then(res => {
                    if (res === true) 
                        this.handleSweetAlertMsg("Success!","Congratulations! Successful registration","/login")
        
                    else  this.handleSweetAlertMsg("Ooops!","An error has occurred",undefined)                    

                }).catch(e => { this.handleSweetAlertMsg("Ooops!",e,undefined)  })
        } else {

            this.handleSweetAlertMsg("Oooops!","Passwords do not match",undefined)
        }
    }

    render() {

        return (<div className="container-register" >
            <Container >

                <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>

                    <Form className=" text-center  form-register p-3 pl-5 pr-5 rounded " onSubmit={this.handleRegister}>
                        <h2 className="title" >Register </h2>
                        <hr className="my-4" />
                        <Input className="m-3" value={this.state.userName} onChange={this.handleKeepName} type="text" placeholder="Name" autoFocus={true} />
                        <Input className="m-3" value={this.state.userSurname} onChange={this.handleKeepSurname} type="text" placeholder="Surname" autoFocus={true} />
                        <Input className="m-3" value={this.state.UserEmail} onChange={this.handleKeepEmail} type="text" placeholder="Email" />
                        <Input className="m-3" value={this.state.password} onChange={this.handleKeepPassword} type="password" placeholder="Password" />
                        <Input className="m-3" value={this.state.repeatPassword} onChange={this.handleKeepRepeatPassword} type="password" placeholder="Repeat Password" />
                        <p>{this.state.notMatchingMessage}</p>

                        <Button outline className="m-2" type="submit" > Register</Button>
                    </Form>
                    <SweetAlert
                        show={this.state.showAlert}
                        title={this.state.titleAlert}
                        text={this.state.textAlert}
                        onConfirm={() => {
                                        this.setState({ showAlert: false })
                                        if(this.state.redirectAlert)
                                        this.props.history.push(this.state.redirectAlert)
     
                                    }
                        }
                    />
                </Col>
 
            </Container>
        </div>
        )
    }
}

export default withRouter(Register)
