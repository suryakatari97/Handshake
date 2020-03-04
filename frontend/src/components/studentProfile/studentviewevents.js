import React, { Component } from "react";
import { Link } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import axios from "axios";
import "../../App.css";

class studentviewevents extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      searchString: "",
      displayAck: false,
      success: false
    };
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
  }
  searchChangeHandler(e) {
    this.setState({ searchString: e.target.value });
  }
  componentDidMount() {
    axios("/student/viewevents", {
      method: "get"
    }).then(response => {
      this.setState({
        events: this.state.events.concat(response.data.events) //events[0]
      });
      console.log(this.state.events);
    });
  }

  render() {
    let eventsList = this.state.events.map(viewevent => {
      let str = viewevent.timestamp;
      console.log(str);
      let date = str.substring(0, str.indexOf("T"));
      str = viewevent.timestamp;
      let time = str.substring(str.indexOf("T") + 1, str.indexOf("."));
      if (
        viewevent.company_name
          .toUpperCase()
          .includes(this.state.searchString.toUpperCase()) 
      ) {
        return (
          <tr key={viewevent.event_id}>
            <td>{viewevent.event_id}</td>
            <td>{viewevent.company_name}</td>
            <td>{viewevent.event_name}</td>
            <td>{viewevent.location}</td>
            <td>{viewevent.event_description}</td>
            <td>{viewevent.eligibility}</td>
            <td>
              {date} &nbsp; {time}
            </td>
            <td>
              <input
                type="button"
                className="btn btn-primary btn-sm"
                //onClick={}
                value="Register"
              />
            </td>
          </tr>
        );
      }
    });

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
              <button id="viewevents"
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </nav>
          <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div className="dash-one">
                <div className="dash-header">events</div>
                {this.state.events.length > 0 ? (
                  <div className="col-10">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Event ID</th>
                          <th>Company Name</th>
                          <th>Event Name</th>
                          <th>Location</th>
                          <th>Event Description</th>
                          <th>Eligibility</th>
                          <th>Posted On</th>
                        </tr>
                      </thead>
                      <tbody>{eventsList}</tbody>
                    </table>
                  </div>
                ) : (
                  <div>
                    <h4 style={{ margin: "3em" }}>No new events to display!</h4>
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

export default studentviewevents;
