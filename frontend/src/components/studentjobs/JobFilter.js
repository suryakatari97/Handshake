import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { getID } from "../auth/HelperApis";
import swal from "sweetalert";

class JobFilter extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      keyword: "",
      location: "",
      modal: false,
      modal1: false,
      file: null,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    axios.defaults.withCredentials = true;
    console.log("in componentDidMount");

    //List of all jobs posted
    await axios("/jobs/getJobDetails", {
      method: "get",
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(res => {
        const { jobs } = res.data;
        this.setState({ jobs: jobs });
        //console.log(jobs);
      })
      .catch(error => console.log(error.response.data));
  }

  //handle upload for resume
  handleUpload = event => {
    //console.log(event.target.files);
    this.setState({ file: event.target.files });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //    async onSubmit(e) {
  //      e.preventDefault();
  //      const jobSearch = {
  //        keyword: this.state.keyword,
  //        location: this.state.location
  //      };
  //      console.log(jobSearch);

  //      //List of all filtered posted
  //      await axios.post("/getSearchedJobDetails", jobSearch).then(res => {
  //        const { jobs } = res.data;
  //        this.setState({ jobs: jobs });
  //        console.log(jobs);
  //      });
  //    }

  showModal = () => {
    console.log("hello");
    this.setState({
      modal: !this.state.modal
    });
  };

  showModal1 = () => {
    console.log("hello");
    this.setState({
      modal1: !this.state.modal1
    });
  };

  uploadFile = async job_id => {
    const student_id = getID();
    if(this.state.file !== null) {
      const formData = new FormData();
      formData.append("job_id", job_id);
      formData.append("student_id", student_id);
      formData.append("file", this.state.file[0]);//file[0]
      await axios("/resume/upload", {
        method: "post",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } } //??
      }).then(response =>
        swal({
          title: "Congratulations!",
          text: "You Successfully successfully uploadedyour resume!",
          icon: "success",
          button: "OK"
        })
      );
    }
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={() => this.showModal()}>
        &times;
      </button>
    );
    const closeBtn1 = (
      <button className="close" onClick={() => this.showModal1()}>
        &times;
      </button>
    );

    let jobDetails = this.state.jobs.map(job => {
      return (
        <div class="col w-75" id="eventscard">
          <div class="card">
            <div class="card-body">
              <div className="row">
                <h5 class="card-title col-7">{job.job_title}</h5>
                {/* <div className="col-6"></div> */}
                <div className="col-3">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    onClick={() => this.showModal()} //changed this.showmodal
                  >
                    View Job Details
                  </button>
                  {/* MODAL CODE FOR VIEW JOB DETAILS */}
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
                      Job Details
                    </ModalHeader>
                    <ModalBody className="modal-body">
                      <div className="form-group">
                        <h4>Title : {job.job_title}</h4>
                      </div>
                      <div className="form-group">
                        <h4>Job Description: {job.job_description}</h4>
                      </div>
                      <div className="form-group">
                        <h4>Location : {job.location} </h4>
                      </div>
                      <div className="form-group">
                        <h4>
                          Application deadline :
                          <Moment format="YYYY/MM/DD">
                            {job.app_deadline}
                          </Moment>
                        </h4>
                      </div>
                    </ModalBody>
                  </Modal>
                  {/* END OF VIEW JOB DETAILS MODAL */}
                </div>
              </div>

              <p class="card-text">
                <strong>{job.company_name}</strong>,{" "}
                <strong>{job.location}</strong>
              </p>
              <p class="card-text">
                <strong>Salary:</strong> {job.salary}
              </p>
              <p class="card-text">
                <strong>Posted on : </strong>
                <Moment format="YYYY/MM/DD">{job.posting_date}</Moment>
                <strong> Application Deadline : </strong>
                <Moment format="YYYY/MM/DD">{job.app_deadline}</Moment>
              </p>

              <p class="card-text">
                <strong>Job Details : </strong>
                {job.job_description}
              </p>
              <div className="col-10"></div>
              {/* <a
                 href="/studentApplyJob"
                 class="btn btn-primary"
                 onClick={this.apply(job.job_id)}
               >
                 Apply
               </a> */}
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => this.showModal1()} //changed this.showmodal1
              >
                Apply
              </button>
              {/* MODAL CODE  FOR RESUME UPLOADING  */}
              <Modal
                isOpen={this.state.modal1}
                toggle={() => this.showModal1()}
                className="modal-popup"
                scrollable
              >
                <ModalHeader toggle={() => this.showModal1()} close={closeBtn1}>
                  Upload
                </ModalHeader>
                <ModalBody className="modal-body">
                  <div>
                    <form
                      onSubmit={() => this.uploadFile(job.job_id)}
                    >
                      <div className="form-group row">
                        <label
                          htmlFor="url"
                          className="col-sm-2 col-form-label"
                        >
                          Upload File:
                        </label>
                        <div className="col-sm-5">
                          <input
                            label="upload file"
                            type="file"
                            required
                            onChange={this.handleUpload}
                          />
                        </div>
                      </div>
                      <div className="form-group row text-center">
                        <div className="col-sm-5">
                          <button
                            type="submit"
                            className="btn btn-primary align-center"
                            style={{ marginTop: "2em" }}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </div>
        //  </div>
      );
    });

    return (
      <div className="container">
        <form onSubmit={this.onSubmit} className="container">
          <div className="form-row align-items-center">
            <div className="form-group col-md-4">
              {/* <label className="sr-only" for="inlineFormInput">Keyword</label> */}
              <input
                type="text"
                className="form-control mb-2"
                name="keyword"
                placeholder="Search Employers, Jobs, Keywords.."
                value={this.state.keyword}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-4">
              {/* <label className="sr-only" for="inlineFormInput">Location</label> */}
              <input
                type="text"
                className="form-control mb-2"
                name="location"
                placeholder="Location"
                value={this.state.location}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-2">
              <button type="submit" className="btn btn-primary mb-2">
                Submit Search
              </button>
            </div>
          </div>
        </form>
        <div>
          <h4>Jobs</h4>
          {jobDetails}
        </div>
      </div>
    );
  }
}

export default JobFilter;
