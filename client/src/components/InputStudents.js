import axios from 'axios'
import React from 'react'

class InputStudents extends React.Component {
    state={
        firstname:'',
        lastname:'',
        place:''
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit = () =>{
        axios.post('http://localhost:3030/students', this.state)
        .then(res=>{
            console.log("successfully added");
            this.setState({firstname:'' , lastname:'', place:''})
        });
      window.location='/';
    }
    render() {
        return(
        <div class="row text-center">
            <div class="col-md-4">
                <form onSubmit={()=>this.handleSubmit()}>
                    <input required name='firstname' value={this.state.firstname} placeholder="firstname" class="form-control " onChange={(e)=>this.handleChange(e)}/>
                    <input required name='lastname' value={this.state.lastname}  placeholder="lastname"  class="form-control " onChange={(e)=>this.handleChange(e)}/>
                    <input required name='place' value={this.state.place}  placeholder="place"  class="form-control " onChange={(e)=>this.handleChange(e)}/>
                    <button class="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
        )
    }
}

export default InputStudents
