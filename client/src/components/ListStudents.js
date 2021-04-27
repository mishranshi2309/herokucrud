import React from 'react'
import axios from 'axios'
class ListStudents extends React.Component {

    state={
        students :[],
        ufirstname:'',
        ulastname:'',
        uplace:'',
        uid:''
    }
    getstudents = () =>{
        axios.get('http://localhost:3030/')
        .then(res=>{ 
            this.setState({students: res.data});
        })
    }
    componentDidMount  = ()=>{
          this.getstudents();  
    }    
    handleDelete =(id)=>{
        axios.get(`http://localhost:3030/student/${id}`)
        .then(res=>{
            window.location='/';
        })
    }
    handleUpdate =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handlemodalUpdate=(id)=>{
      console.log("id"+id);
        axios.put(`http://localhost:3030/student/${this.state.uid}`,{firstname:this.state.ufirstname, lastname:this.state.ulastname, place:this.state.uplace})
        .then(res=>{
          console.log(res);
            this.setState({ufirstname:'',lastname:'', place:' '})
            window.location='/';
        })
    }
    render() {
        return(
            
            <div style={{width:"100%"}}>
            {                
                this.state.students.map(student=>(
                    <div class="card" style={{width:"400px", marginLeft:"95px", padding:"50px"}}>
                    <div class="card-body bg-success">
                      <h3 class="card-title">FirstName: {student.firstname}</h3>
                      <p class="card-text">Lastname : {student.lastname}</p>
                      
                      {/* update  */}

                      <div class="container">
  <button type="button" style={{ marginLeft:"-871px"}} class="btn btn-info" data-toggle="modal" data-target="#myModal" onClick={()=>{this.setState({uid:student._id , ufirstname:student.firstname, ulastname:student.lastname, uplace:student.place})}}>Open Modal</button>


  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
     
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          UPDATE
        </div>
        <div class="modal-body">
          <p>
              <input required name='ufirstname' value={this.state.ufirstname} placeholder="firstname" class="form-control " onChange={(e)=>this.handleUpdate(e)}/>
                <input required name='ulastname' value={this.state.ulastname}  placeholder="lastname"  class="form-control " onChange={(e)=>this.handleUpdate(e)}/>
                <input required name='uplace' value={this.state.uplace}  placeholder="place"  class="form-control " onChange={(e)=>this.handleUpdate(e)}/></p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-danger"  onClick={(e)=>this.handlemodalUpdate(student._id)}>UPDATE</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" onClick={()=>{this.setState({ufirstname:'',ulastname:'',uplace:''})}}>Close</button>
        </div>
      </div>
      
    </div>
  </div>
  
</div>

                    {/* end update */}
                      <button class="btn btn-danger" onClick={()=>{this.handleDelete(student._id)}}>DELETE</button>
                    </div>
                    
                  </div>
                ))
            }
            </div>


        )
    }
}

export default ListStudents
