"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaPaperPlane } from 'react-icons/fa';


import 'primereact/resources/themes/lara-light-blue/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { MultiSelect } from 'primereact/multiselect';
import { BiUpload } from "react-icons/bi";

import { Button, InputGroup, FormControl } from 'react-bootstrap';

export default function members() {

  // Use States 

  const [activeTab, setActiveTab] = useState("members");
  const [activeTab2, setActiveTab2] = useState("email");
  const [showModal, setShowModal] = useState(false);

  const [memberLimit, setMemberLimit] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  
  // for members table 
  const membersActivityData = [
    { task: "Design Homepage UI", assignedTo: "Hamza", assignedBy: "Hamza", deadline: 12-6-25, priority: "High", status: "In Progress", JobTitle:"ddd", Action:"Edit" },
    { task: "Backend API Development", assignedTo: "Usman", assignedBy: "Hamza", deadline: 12-6-25, priority: "High", status: "Not Started", JobTitle:"ddd", Action:"Edit"},
    { task: "Bug Fixing (Login Issue)", assignedTo: "Ali", assignedBy: "Hamza", deadline: 12-6-25, priority: "Medium", status: "Completed",Action:"Edit"},
    { task: "Content Writing (Landing Page)", assignedTo: "Azam", assignedBy: "Hamza", deadline: 12-6-25, priority: "Low", status: "In Progress",Action:"Edit" },
    { task: "SEO Optimization", assignedTo: "Farhan", assignedBy: "Hamza", deadline: 12-6-25, priority: "Medium", status: "Not Started", JobTitle:"ddd", Action:"Edit" },
  ];

  const [search, setSearch] = useState("");

  const filteredActivities = membersActivityData.filter((activity) =>
    activity.assignedTo.toLowerCase().includes(search.toLowerCase())
  );
  // for members table 

// for MultiSelect selectbox 
const [selectedCities, setSelectedCities] = useState([]);

const cities = [
    { name: 'Development Team', code: 'DT' },
    { name: 'Product Management', code: 'PM' },
    { name: 'Quality Assurance (QA)', code: 'QA' }
    
];


const [selectedProject, setSelectedProject] = useState([]);

const projects = [
    { name: 'Getting Started with WewWizTracker', code: 'DT' }
   
    
];
// for MultiSelect selectbox 


// for file Upload
const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }; 
// for file Upload 

// for copy links in invide modal 
const [copied, setCopied] = useState(false);
  const inviteLink = "https://www.webwork-tracker.com/app/join-invite/abc123";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  // for copy links in invide modal 


// for on bording tab 
const data = [
  {
    initials: 'HR',
    email: 'Hamzaraheed@gmail.com',
    accepted: true,
    loggedIn: false,
    trackedTime: false,
  },
  {
    initials: 'MA',
    email: 'Mirzaamnad@gmail.com',
    accepted: false,
    loggedIn: false,
    trackedTime: false,
  },
];
// for on bording tab 




  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 mt-4">
            <div className="d-flex align-items-center justify-content-between">
            <h4 className="fw-bold">Members</h4>
            
              {/* Search Bar */}
              <Form.Control
                type="text"
                placeholder="Search members here"
                className="mb-3 top-members-search g-shadow rounded-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            {/* Table */}
            <div className="table-responsive g-table-wrap g-t-scroll">
              <Table hover className="text-center g-table">
                <thead>
                  <tr className="text-white" style={{ backgroundColor: "#A54EF5" }}>
                  <th>Members</th>
              <th>Members Limit</th>
              <th>Hourly Rate</th>
              <th>Member Type</th>
              <th>Project</th>
              <th>Teams</th>
              <th>Job Title</th>
              <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
            {filteredActivities.map((activity, index) => (
              <tr key={index} style={{ backgroundColor: "#F7ECFF" }}>
                <td>{activity.task}</td>
                <td>{activity.assignedTo}</td>
                <td>{activity.assignedBy}</td>
                <td><span className="fw-bold">{activity.deadline}</span></td>
                <td>{activity.priority}</td>
                <td>{activity.status}</td>
                <td><span style={{ color: "blue", cursor: "pointer" }}>Edit</span></td>
              </tr>
            ))}
          </tbody>
              </Table>
            </div>
          </div>
        </div>

        <div className="row mt-3">
      
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <div className="d-flex align-items-center">
          {/* Members Tab */}
          <button
            className={`btn border-0 fw-bold ${
              activeTab === "members" ? "text-primary position-relative" : "text-muted"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Members <span className="badge bg-light text-dark">1</span>
            {activeTab === "members" && (
              <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 border border-primary"></div>
            )}
          </button>

          {/* Onboarding Status Tab */}
          <button
            className={`btn border-0 fw-bold mx-3 ${
              activeTab === "onboarding" ? "text-primary position-relative" : "text-muted"
            }`}
            onClick={() => setActiveTab("onboarding")}
          >
            Onboarding Status
            {activeTab === "onboarding" && (
              <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 border border-primary"></div>
            )}
          </button>

          {/* Archived Tab */}
          <button
            className={`btn border-0 fw-bold ${
              activeTab === "archived" ? "text-primary position-relative" : "text-muted"
            }`}
            onClick={() => setActiveTab("archived")}
          >
            Archived
            {activeTab === "archived" && (
              <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 border border-primary"></div>
            )}
          </button>
        </div>

        {/* Invite Button */}
        <button className="btn btn-sm text-white" style={{ backgroundColor: "#A463F2" }}>
          + Invite
        </button>
      </div>

      <div className="mt-3">
        {activeTab === "members" && <div className="p-3 border rounded">
           <div className="table-responsive">
        <table className="table align-middle" style={{minWidth:"1450px"}}>
          {/* Table Header */}
          <thead className="table-light">
            <tr>
              <th>Member</th>
              <th>Member Limit (wk)</th>
              <th>Hourly Rate</th>
              <th>Member Type</th>
              <th>Projects</th>
              <th>Team</th>
              <th>Job Title</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <tr>
              {/* Member Column */}
              <td className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center me-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#A463F2",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    SF
                  </div>
                  <div>
                    <div className="fw-bold">Sajjal Fatima</div>
                    <small className="text-muted">sajjalfatima232@gmail.com</small>
                  </div>
                </div>
              </td>

              {/* Member Limit Column - Changed to Input Field */}
              <td>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Limit"
                  value={memberLimit}
                  onChange={(e) => setMemberLimit(e.target.value)}
                />
              </td>

              {/* Hourly Rate Column */}
              <td>
                <div className="input-group input-group-sm">
                  <span className="input-group-text">💲</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Rate"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                  />
                </div>
              </td>

              {/* Member Type Column */}
              <td>Owner</td>

              {/* Projects Column */}
              <td>
                <button className="btn btn-sm text-white" style={{ backgroundColor: "#A6E3D7" }}>
                  Getting Started with...
                </button>
              </td>

              {/* Team Column */}
              <td>
                <select className="form-select form-select-sm">
                  <option>Select team</option>
                  <option>Development</option>
                  <option>Marketing</option>
                </select>
              </td>

              {/* Job Title Column */}
              <td>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Give new title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </td>

              {/* Actions Column - Changed to Dropdown */}
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    ⋮
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">Edit</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Remove</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">View Profile</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
          </div>}
        {activeTab === "onboarding" && <div className="p-3 border rounded">
          <div className="container mt-4">
      {/* Top Summary Component */}
      <div className="border rounded p-3 mb-4 d-flex justify-content-between text-center">
        <div>
          <strong>Invitation Sent</strong>
          <div>02</div>
        </div>
        <div>
          <strong>Invitation Accepted</strong>
          <div>01</div>
        </div>
        <div>
          <strong>Tracked Time</strong>
          <div>00</div>
        </div>
        <div>
          <strong>Outdated Tracker</strong>
          <div>00</div>
        </div>
      </div>

      {/* Table Component */}
      <div className="table-responsive g-table-wrap g-t-scroll">
      <Table bordered hover className="text-center text-center g-table table table-hover" style={{ backgroundColor: '#d8b6ff' }}>
        <thead style={{ backgroundColor: '#a34efc', color: 'white' }}>
          <tr>
            <th>Email</th>
            <th>Accepted Invitation</th>
            <th>Logged In</th>
            <th>Tracked Time</th>
            <th>Send Reminder</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>
                <span className="badge bg-light text-dark me-2" style={{ padding: '10px' }}>{user.initials}</span>
                {user.email}
              </td>
              <td className="text-center">{user.accepted ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}</td>
              <td className="text-center">{user.loggedIn ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}</td>
              <td className="text-center">{user.trackedTime ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}</td>
              <td>
                <FaPaperPlane color="#a34efc" style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
          
          </div>}
        {activeTab === "archived" && <div className="p-3 border rounded">📂 Archived Records</div>}
      </div>
    </div>

    <div className="container mt-3">
      {/* Invite Button to Open Modal */}
      <button
        className="btn btn-sm text-white"
        style={{ backgroundColor: "#A463F2" }}
        onClick={() => setShowModal(true)}
      >
        + Invite
      </button>

      {/* Invite Members Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-xl">
            <div className="modal-content p-3">
              {/* Modal Header */}
              <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
                <h5 className="fw-bold">Invite Members</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              {/* Tab Links */}
              <div className="d-flex mb-3">
                <button
                  className={`btn border-0 fw-bold ${
                    activeTab2 === "email" ? "text-primary position-relative" : "text-muted"
                  }`}
                  onClick={() => setActiveTab2("email")}
                >
                  By Email
                  {activeTab2 === "email" && (
                    <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 border border-primary"></div>
                  )}
                </button>

                <button
                  className={`btn border-0 fw-bold mx-3 ${
                    activeTab2 === "bulk" ? "text-primary position-relative" : "text-muted"
                  }`}
                  onClick={() => setActiveTab2("bulk")}
                >
                  Bulk Invite
                  {activeTab2 === "bulk" && (
                    <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 border border-primary"></div>
                  )}
                </button>

                <button
                  className={`btn border-0 fw-bold ${
                    activeTab2 === "link" ? "text-primary position-relative" : "text-muted"
                  }`}
                  onClick={() => setActiveTab2("link")}
                >
                  Copy Link
                  {activeTab2 === "link" && (
                    <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 border border-primary"></div>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              {activeTab2 === "email" && (
                <div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="fw-bold">Email</label>
                      <input type="email" className="form-control" placeholder="Example@gmail.com" />
                    </div>
                    <div className="col-md-4">
                      <label className="fw-bold">Team</label>
                      <div className="g-multiselect-wrapper">
            <MultiSelect
                value={selectedCities}
                options={cities}
                onChange={(e) => setSelectedCities(e.value)}
                optionLabel="name"
                placeholder="Select Team"
                filter
                display="chip" // shows selected values as chips
                className="w-full md:w-20rem"
            />
        </div>
                    </div>

                    <div className="col-md-4">
                      <label className="fw-bold">Project</label>
                      <div className="g-multiselect-wrapper">
            <MultiSelect
                value={selectedProject}
                options={projects}
                onChange={(e) => setSelectedProject(e.value)}
                optionLabel="name"
                placeholder="Select Project"
                filter
                display="chip" // shows selected values as chips
                className="w-full md:w-20rem"
            />
        </div>

        
                    </div>
                  </div>
                  <a href="#" className="text-primary">+ Add Email</a>
                </div>
              )}

              {activeTab2 === "bulk" && (
                <div className="text-center p-3 border rounded"><div className="mt-3">
                <p>
                  Upload <strong>CSV</strong>, <strong>XLSX</strong>, or <strong>XLSV</strong> files by following our{' '}
                  <a href="#" className="text-primary text-decoration-none">template format</a>.
                </p>
          
                <Form.Group controlId="formFile">
                  <Form.Control
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleFileChange}
                  />
                </Form.Group>
          
                {file && <p className="mt-2 text-success">Selected File: {file.name}</p>}
              </div></div>
              )}

              {activeTab2 === "link" && (
                <div className="text-center p-3 border rounded"><div className="mt-3">
                <p>Copy the link to this workspace and send to members:</p>
          
                <InputGroup>
                  <FormControl
                    readOnly
                    value={inviteLink}
                    className="rounded-start"
                  />
                  <Button
                    variant="primary"
                    onClick={handleCopy}
                    className="rounded-end"
                  >
                    <i className="bi bi-clipboard"></i> {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </InputGroup>
                
              </div></div>
              )}

              {/* Footer Buttons */}
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn text-white" style={{ backgroundColor: "#A463F2" }}>Invite</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Overlay */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
    </div>


  );
}
