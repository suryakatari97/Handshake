import React, { Component } from "react";
import { Link } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import axios from "axios";
import "../../App.css";
import vieweventModal from "./vieweventModal";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class studentviewevents extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      searchString: "",
      displayAck: false,
      success: false,

      modal: false
    };
    // this.showModal = this.showModal.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
  }
  searchChangeHandler(e) {
    this.setState({ searchString: e.target.value });
  }
  showModal = () => {
    console.log("hello");
    this.setState({
      modal: !this.state.modal
    });
  };
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
  eventInfo = e => {
    e.preventDefault();
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={() => this.showModal()}>
        &times;
      </button>
    );
    let eventsList = this.state.events.map(viewevent => {
      let str = viewevent.timestamp;
      let str1 = viewevent.date_of_event;
      let d = str1.substring(0, str1.indexOf("T"));
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
          <div class="card w-100" id="eventscard">
            <div class="card-body">
              <div className="row">
                <h5 class="card-title col-5" id="eventtext">
                  Event name: {viewevent.event_name}{" "}
                </h5>
                <div className="col-4"></div>
                <div className="col-3">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    onClick={this.showModal}
                  >
                    View Event Details
                  </button>
                  <Modal
                    isOpen={this.state.modal}
                    toggle={() => this.showModal()}
                    className="modal-popup"
                    scrollable
                  >
                    <ModalHeader
                      toggle={() => this.showModal()}
                      close={closeBtn}
                    >
                      EventDetails
                    </ModalHeader>
                    <ModalBody className="modal-body">
                      <div className="form-group">
                        <h4 className="font-weight-bold">
                          Event Name: {viewevent.event_name}{" "}
                        </h4>
                      </div>
                      <div className="form-group">
                        <h4 className="font-weight-bold">
                          Event Description: {viewevent.event_description}
                        </h4>
                        <br />
                      </div>
                      <div className="form-group">
                        <h4 className="font-weight-bold">
                          Location:{viewevent.location}{" "}
                        </h4>
                      </div>
                      <div className="form-group">
                        <h4 className="font-weight-bold">
                          DATE: {d}
                        </h4>
                      </div>
                      <div className="form-group">
                        <h4 className="font-weight-bold">
                          TIME: {viewevent.time}
                        </h4>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      {/* <Button
                        color="secondary"
                        onClick={() => this.showModal()}
                      >
                        Cancel
                      </Button> */}
                    </ModalFooter>
                  </Modal>
                  {/* <vieweventModal
                    // viewevent={viewevent}
                    toggle={this.showModal}
                    modal={this.state.modal}
                  /> */}
                </div>
              </div>
              <p class="card-text" id="eventtext">
                Company Name: {viewevent.company_name}
              </p>
              {/* <p class="card-text" id="eventtext">
                location: {viewevent.location}
              </p>
              <p class="card-text" id="eventtext">
                event_description: {viewevent.event_description}
              </p> */}
              <p class="card-text" id="eventtext">
                eligibility: {viewevent.eligibility}
              </p>
              <div className="row">
                <div className="col-10"></div>
                <a href="#" class="btn btn-primary">
                  Register
                </a>
              </div>
            </div>
          </div>
        );
        {
          /* <td>{viewevent.event_id}</td>
            <td>{viewevent.company_name}</td>
            <td>{viewevent.event_name}</td>
            <td>{viewevent.location}</td>
            <td>{viewevent.event_description}</td>
            <td>{viewevent.eligibility}</td>
            <td>
              {date} &nbsp; {time}
            </td> */
        }
        // <td>
        //   <input
        //     type="button"
        //     className="btn btn-primary btn-sm"
        //     //onClick={}
        //     value="Register"
        //   />
        // </td>
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
              <button
                id="viewevents"
                className="btn btn-outline-dark my-2 my-sm-0"
                type="submit"
              >
                View Registered Events
              </button>
            </form>
          </nav>
          <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div className="dash-one">
                <h4 className="font-weight-bold">Events</h4>
                {this.state.events.length > 0 ? (
                  <div className="col-10">
                    {/* <table className="table table-striped table-bordered">
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
                      </thead> */}
                    {eventsList}
                    {/* </table> */}
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
