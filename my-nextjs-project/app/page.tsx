"use client";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";

export default function Home() {
  const users = [
    { name: "Jenny Wilson", email: "w.lawson@example.com", time: "just now", location: "Austin", image: "/assets/images/recent-log.svg" },
    { name: "Devon Lane", email: "dat.roberts@example.com", time: "2 hr ago", location: "New York", image: "/assets/images/recent-log.svg" },
    { name: "Jane Cooper", email: "jgraham@example.com", time: "2 hr ago", location: "Toledo", image: "/assets/images/recent-log.svg" },
    { name: "Dianne Russell", email: "curtis.d@example.com", time: "1 hr ago", location: "Naperville", image: "/assets/images/recent-log.svg" },
  ];


  // for chart 
  const data = [
    { day: "Mon", value: 2, color: "#DCCEFF" },
    { day: "Tue", value: 8, color: "#AFA5BD" },
    { day: "Wed", value: 6, color: "#002D99" },
    { day: "Thu", value: 4, color: "#FFEE33" },
    { day: "Fri", value: 3, color: "#A36A00" },
    { day: "Sat", value: 5, color: "#B084F9" },
    { day: "Sun", value: 6, color: "#FF66B2" },
  ];


  const Invite_members = [
    { name: "Invitation Sent", value: 3, color: "#B084F9" },
    { name: "Accepted", value: 19, color: "#FFEE33" },
    { name: "Logged In", value: 15, color: "#66B3FF" },
    { name: "Tracked Time", value: 15, color: "#A36A00" },
  ];
  // for chart 


  // for members table 
  const membersData = [
    { rank: 1, name: "Hamza", role: "Team Lead", score: 98, taskDone: 120, activityHours: 45 },
    { rank: 2, name: "Ali", role: "Developer", score: 95, taskDone: 110, activityHours: 42 },
    { rank: 3, name: "Usman", role: "UX Designer", score: 92, taskDone: 105, activityHours: 40 },
    { rank: 4, name: "Anees", role: "QA Engineer", score: 90, taskDone: 98, activityHours: 38 },
    { rank: 5, name: "Azam", role: "Marketing", score: 88, taskDone: 70, activityHours: 37 },
  ];

  const [search, setSearch] = useState("");

  const filteredMembers = membersData.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  // for members table 


  // for members activity table 

  const membersActivityData = [
    { task: "Design Homepage UI", assignedTo: "Hamza", assignedBy: "Hamza", deadline: 12-6-25, priority: "High", status: "In Progress" },
    { task: "Backend API Development", assignedTo: "Usman", assignedBy: "Hamza", deadline: 12-6-25, priority: "High", status: "Not Started" },
    { task: "Bug Fixing (Login Issue)", assignedTo: "Ali", assignedBy: "Hamza", deadline: 12-6-25, priority: "Medium", status: "Completed" },
    { task: "Content Writing (Landing Page)", assignedTo: "Azam", assignedBy: "Hamza", deadline: 12-6-25, priority: "Low", status: "In Progress" },
    { task: "SEO Optimization", assignedTo: "Farhan", assignedBy: "Hamza", deadline: 12-6-25, priority: "Medium", status: "Not Started" },
  ];

  const [search2, setSearch2] = useState("");

  const filteredActivities = membersActivityData.filter((activity) =>
    activity.assignedTo.toLowerCase().includes(search.toLowerCase())
  );
  // for members activity table 


  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Dropped files:", acceptedFiles);
    // Handle file upload logic here
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="container-fluid">
      <div className="row mt-4 mb-4">
        <div className="col-lg-12 mb-5">
          <Card className="d-flex flex-row align-items-center p-3 border-0 rounded-3 g-shadow">
            <div className="d-flex align-items-center me-3 bg-primary text-white rounded-circle justify-content-center" style={{ width: "50px", height: "50px", fontWeight: "bold", fontSize: "18px" }}>
              HR
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-0">Hamza Rasheed</h6>
              <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>Hamza’s Workplace</p>
              <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>
                <i className="bi bi-person" /> Owner
              </p>
            </div>
            <div className="text-end">
              <p className="mb-0" style={{ fontSize: "14px" }}>25th March 2025</p>
              <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>Tuesday</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="row">
        {[
          { src: "/assets/images/pm.svg", title: "Project Management" },
          { src: "/assets/images/tm.svg", title: "Task Management" },
          { src: "/assets/images/rtm.svg", title: "Real-Time Monitoring" },
          { src: "/assets/images/um.svg", title: "User Management" },
        ].map((item, index) => (
          <div key={index} className="col-lg-3 mb-4">
            <div className="card dashboard-top-cards p-3 text-center">
              <Image src={item.src} alt={item.title} width={50} height={50} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
              </div>
            </div>
          </div>
        ))}
        <div className="col-lg-8 mb-4">
          <div className="chart-container g-shadow h-100" style={{ width: "100%", height: 300, padding: 20, background: "#FCFCFF", borderRadius: 10 }}>
            <h4 style={{ marginBottom: 10, fontWeight: "bold" }}>Task Request</h4>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data} barCategoryGap="25%">
                <XAxis dataKey="day" tick={{ fill: "#666" }} />
                <YAxis domain={[0, 8]} />
                <Tooltip />
                {data.map((entry, index) => (
                  <Bar key={index} dataKey="value" fill={entry.color} radius={[10, 10, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card p-3 g-shadow border-0 rounded-3 text-white h-100" style={{ backgroundColor: "#A259FF" }}>
            <h6 className="fw-bold">Recent Login</h6>
            <p className="mb-3" style={{ fontSize: "14px" }}>Recent login details</p>
            <ul className="list-unstyled">
              {users.map((user, index) => (
                <li key={index} className="d-flex align-items-center mb-3">
                  <img src={user.image} alt={user.name} className="rounded-circle me-2" width="40" height="40" />
                  <div className="flex-grow-1">
                    <h6 className="mb-0 text-white" style={{ fontSize: "14px" }}>{user.name}</h6>
                    <p className="mb-0 text-white-50" style={{ fontSize: "12px" }}>{user.email}</p>
                  </div>
                  <div className="text-end">
                    <p className="mb-0 text-white" style={{ fontSize: "12px" }}>{user.time}</p>
                    <p className="mb-0 text-white-50" style={{ fontSize: "12px" }}>{user.location}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mb-0 fw-bold text-white-50" style={{ fontSize: "14px", cursor: "pointer" }}>SEE ALL &gt;</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">

            <Card className="d-flex justify-content-center g-shadow h-100 invite-member-card" >
              <Card.Body className="text-center">
                {/* Header with Icon */}
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title className="fw-bold">Invite New Members</Card.Title>
                  <div className="p-2 rounded-circle" style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", background: "#EDDFFE " }}>
                    <Image src="/assets/images/invite.svg" alt="" width={50} height={50} />
                  </div>
                </div>

                {/* Subtitle */}
                <p className="mt-2">Invite Members by Email or Link</p>

                {/* Invite Button */}
                <Button style={{ backgroundColor: "#A54EF5", border: "none", padding: "8px 16px", borderRadius: "6px" }}>
                  + Invite
                </Button>
              </Card.Body>
            </Card>

          </div>
          <div className="col-lg-8">
            <div className="chart-container g-shadow" style={{ width: "100%", height: 350, padding: 20, background: "#FCFCFF", borderRadius: 10 }}>
              <h4 style={{ textAlign: "center", fontWeight: "bold", marginBottom: 10 }}>Invite Members</h4>

              <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "10px" }}>
                {Invite_members.map((entry, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: 20, height: 10, backgroundColor: entry.color, borderRadius: 2 }}></div>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>{entry.value}</span>
                  </div>
                ))}
              </div>

              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={Invite_members} barCategoryGap="30%">
                  <XAxis dataKey="name" tick={{ fill: "#666" }} />
                  <YAxis domain={[0, 20]} />
                  <Tooltip />
                  <Legend />
                  {Invite_members.map((entry, index) => (
                    <Bar key={index} dataKey="value" fill={entry.color} radius={[5, 5, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 mt-4">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="fw-bold">Top Members</h4>

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
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Score</th>
                    <th>Task Done</th>
                    <th>Activity Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.rank} style={{ backgroundColor: "#F7ECFF" }}>
                      <td className="fw-bold">{member.rank}</td>
                      <td>{member.name}</td>
                      <td>{member.role}</td>
                      <td>{member.score}</td>
                      <td style={{ color: member.taskDone >= 100 ? "green" : "inherit" }}>{member.taskDone}</td>
                      <td>{member.activityHours}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>





          <div className="col-lg-12 mt-4">
            <div className="d-flex align-items-center justify-content-between">
            <h4 className="fw-bold">Members Activity</h4>

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
                  <th>Task Name</th>
              <th>Assigned To</th>
              <th>Assigned By</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Status</th>
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
      </div>
    </div>


  );
}
