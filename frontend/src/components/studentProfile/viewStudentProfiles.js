import React, { Component } from 'react';
import StudentNavbar from "./StudentNavbar";
import axios from "axios";
import "../../App.css";

 class viewStudentProfiles extends Component {
   constructor() {
     super();
     this.state = {
       profiles: [],
       searchString: ""
     };
     this.searchChangeHandler = this.searchChangeHandler.bind(this);
   }
   searchChangeHandler(e) {
     this.setState({ searchString: e.target.value });
   }
   componentDidMount(){
       axios("/student/viewStudentProfiles",{
           method: "get"
       }).then(response => {
           this.setState({
               profiles:  this.state.profiles.concat(response.data.profiles)
           });
           console.log(this.state.profiles);
       })
   }
   render() {
       let studentProfile = this.state.profiles.map(student => {
           if (
               student.first_name.toUpperCase()
               .includes(this.state.searchString.toUpperCase()) || 
               student.last_name.toUpperCase()
               .includes(this.state.searchString.toUpperCase()) ||
               student.college_name.toUpperCase()
               .includes(this.state.searchString.toUpperCase()) ||
               student.major.toUpperCase()
               .includes(this.state.searchString.toUpperCase())
           ) {
               return (
                 <tr>
                   <td>{student.first_name}</td>
                   <td>{student.last_name}</td>
                   <td>{student.college_name}</td>
                   <td>{student.major}</td>
                   <td>
                     <input
                       type="button"
                       className="btn btn-primary btn-sm"
                       //onClick={}
                       value="view Profile"
                     />
                   </td>
                 </tr>
               );
           }
       })
     return (
       <div className="viewevent">
         <StudentNavbar />
         <div className="container">
           <nav class="navbar navbar-light bg-light">
             <form class="form-inline">
               <input
                 class="form-control mr-sm-2"
                 type="search"
                 onChange={this.searchChangeHandler}
                 value={this.state.searchString}
                 placeholder="Search"
                 aria-label="Search"
               />
               {/* <button
                 id="viewevents"
                 className="btn btn-outline-success my-2 my-sm-0"
                 type="submit"
               >
                 Search
               </button> */}
             </form>
           </nav>
           <div className="row justify-content-center align-items-center">
             <div className="col-12">
               <div className="dash-one">
                 <div className="dash-header">Student Profiles</div>
                 {this.state.profiles.length > 0 ? (
                   <div className="col-10">
                     <table className="table table-striped table-bordered">
                       <thead>
                         <tr>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>College Name</th>
                           <th>Major</th>
                         </tr>
                       </thead>
                       <tbody>{studentProfile}</tbody>
                     </table>
                   </div>
                 ) : (
                   <div>
                     <h4 style={{ margin: "3em" }}>No students to display!</h4>
                   </div>
                 )}
               </div>
             </div>
           </div>
         </div>
       </div>
     );
   }
 }


export default viewStudentProfiles;