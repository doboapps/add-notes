import React,{ Component } from 'react'
import store from '../../redux/store'
import {Form, Input, Button, Container, Col} from 'reactstrap'
import logic from "../../logic"
import background from "../../images/note.png"
import remove from "../../images/delete.png"
import SweetAlert from 'sweetalert2-react';
import "./style.css"

class Home extends Component {

    constructor(){

        super()

        this.state ={
            noteText:"",
            notes:[],
            showAlert: false,
            titleAlert:"", 
            textAlert:""
        }
      
        store.subscribe(()=>{
            this.setState({})            
        })         
    }    


    handleKeepNote = ({target:{value:noteText}}) => {
        this.setState({ noteText })
    }
    
    handleAddNote = e => {
        e.preventDefault()


        logic.addNote(localStorage.getItem('id-add-notes'),this.state.noteText)
        .then(noteId=>{
            console.log('noteid: ', noteId);
            this.retrieveNotes()
            this.setState({noteText:""})
        })
        .catch(e=>{
            this.setState({
                showAlert:true,
                titleAlert:"Oooops!", 
                textAlert:e.toString(),
            })

        })

    }

    handleDeleteNote = (noteId) => {
        logic.removeNote(localStorage.getItem('id-add-notes'),noteId)
        .then(()=>{
           this.retrieveNotes()
        }).catch(e=>alert(e))

    }
    getNotes = () =>  this.state.notes.map(e => {
                        return <div className="note"  key={e.id}> 
                        <img className="background" src={background} alt="background note"/>
                        <h5>{e.text} <img className="remove" src={remove} alt="remove-note" onClick={()=>{this.handleDeleteNote(e.id)}}/></h5>
                        </div>
                      });
    

    retrieveNotes = ()=>{

         logic.retrieveNotes(localStorage.getItem('id-add-notes'))
        .then(notes=>{
           this.setState({notes})
        })
    }

    componentWillMount(){
        this.retrieveNotes()
    }

    render = () => {

        return <Container>
            <h2 className="title">Welcome  {`${store.getState().dataUser.name}  `}</h2>
            <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
                <Form className=" text-center  form-login p-3 pl-5 pr-5 rounded " onSubmit={this.handleAddNote}>
                    <Input  className="m-3" value={this.state.noteText} onChange={this.handleKeepNote} type="text" placeholder="write a note" />
                    <Button outline  className="m-3" type="submit" > Add Note</Button>
                </Form>
                {this.getNotes()}
            </Col>
            <SweetAlert show={this.state.showAlert}
                            title={this.state.titleAlert}
                            text={this.state.textAlert}
                            onConfirm={() => {this.setState({ showAlert: false })}  } />
            
            </Container>
    }
}

export default (Home)
