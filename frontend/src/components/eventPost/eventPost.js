import React, { Component } from "react";
import axios from "axios";
import NavEvent from "./NavEvent";

class eventPost extends Component {
  constructor() {
    super();
    this.state = {
      event_name: "",
      date_of_event: "",
      event_description: "",
      location: "",
      time: "",
      eligibility: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newEventPost = {
      event_name: this.state.event_name,
      date_of_event: this.state.date_of_event,
      event_description: this.state.event_description,
      time: this.state.time,
      location: this.state.location,
      eligibility: this.state.eligibility
    };
    console.log(newEventPost);
    axios
      .post("/events/addEventPost", newEventPost)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    return (
      <div class="container">
        <NavEvent />
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add an Event</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <p>Event Name: </p>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Event Name"
                  name="event_name"
                  value={this.state.event_name}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <p>Date of the Event: </p>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  placeholder="Event Date"
                  name="date_of_event"
                  value={this.state.date_of_event}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <p>Event Description: </p>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Event Description"
                  name="event_description"
                  value={this.state.event_description}
                  onChange={this.onChange}
                />
              </div>

              <div>
                <p>Event time: </p>
                <input
                  type="time"
                  placeholder="Time"
                  name="time"
                  className="form-control form-control-lg"
                  value={this.state.time}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <p>Event Location: </p>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <p>Event Eligibility: </p>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Eligibility"
                  name="eligibility"
                  value={this.state.eligibility}
                  onChange={this.onChange}
                />
              </div>

              <br></br>
              <div>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Add Event"
                />{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default eventPost;
