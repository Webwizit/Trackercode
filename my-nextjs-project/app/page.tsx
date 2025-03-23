"use client"
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {

  const activities = [
    { avatar: 'HF', time: '0:00' },
    { avatar: 'HF', time: '0:00' },
    { avatar: 'HF', time: '0:00' },
  ];

  const productivityTasks = [
    { name: 'Figma', hours: '2hr', image: <Image src="/assets/images/figma.png" alt=""  width={50} height={50} style={{width: "auto", height: "40px"}} className="" /> },
    { name: 'Adobe XD', hours: '5hr', image: <Image src="/assets/images/adxd.png" alt="" width={50} height={50} style={{width: "auto", height: "40px"}} className="" /> },
    { name: 'JavaScript', hours: '5hr', image: <Image src="/assets/images/js.png" alt="" width={50} height={50} style={{width: "auto", height: "40px"}} className="" /> },
    { name: 'Jira', hours: '3hr', image: <Image src="/assets/images/jira.png" alt="" width={50} height={50} style={{width: "auto", height: "30px"}} className="" /> },
];


const productivityTasks2 = [
  { name: 'Facebook', hours: '2hr', image: <Image src="/assets/images/fb.png" alt=""  width={50} height={50} style={{width: "auto", height: "40px"}} className="" /> },
  { name: 'Youtube', hours: '5hr', image: <Image src="/assets/images/yt.png" alt="" width={50} height={50} style={{width: "auto", height: "40px"}} className="" /> },
  { name: 'Instagram', hours: '5hr', image: <Image src="/assets/images/insta.png" alt="" width={50} height={50} style={{width: "auto", height: "40px"}} className="" /> },
  { name: 'Twitter', hours: '3hr', image: <Image src="/assets/images/twtr.png" alt="" width={50} height={50} style={{width: "auto", height: "30px"}} className="" /> },
];


const attendanceUsers = [
  { name: 'Mirza Ammad', status: 'Active', color: 'blue' },
  { name: 'Tahira', status: 'Offline', color: 'orange' },
  { name: 'Hina Fatima', status: 'Active', color: 'pink' },
  { name: 'Sohail Imran', status: 'Active', color: 'purple' },
];


const onDrop = useCallback((acceptedFiles: File[]) => {
  console.log("Dropped files:", acceptedFiles);
  // Handle file upload logic here
}, []);

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
<div className="container-fluid">
  <div className="row">
    <div className="col-lg-6 mb-4">
      <div className="user-detail-card d-flex align-items-center p-3 border rounded">
        <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
          HR 
        </div>
        <div>
          <h5 className="mb-0">Hamza Rasheed</h5>
          <p className="mb-0 text-muted">Hamza's Workplace</p>
          <div className="owner-icon d-flex align-items-center">
            <i className="bi bi-person me-1"></i>
            Owner
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-6 mb-4">
      <div className="card py-5"></div>
    </div>
  </div>

  <div className="row">
    <div className="col-lg-6 mb-4">
      <div className="user-detail-card">
        <div className="card shadow-none border-0 bg-transparent">
          <h5 className="fw-bold mb-4">Onboarding</h5>
          <div className="position-relative">
            {/* Timeline Line */}
            <div
              className="position-absolute top-0 bottom-0 start-3 translate-middle bg-body d-none"
             
            ></div>

            {/* Timeline Items */}
            {[
              { time: '11:30 AM', role: 'Backend Developer' },
              { time: '12:30 PM', role: 'Backend Developer' },
              { time: '02:00 PM', role: 'UX/UI Designer' },
              { time: '04:00 PM', role: 'UX/UI Designer' }
            ].map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-4">
                <div
                  className="position-relative onboarding-rounded-circle"
                  style={{ width: '20px', height: '20px' }}
                >
                  <span
                    className="rounded-circle d-block position-absolute top-50 start-50 translate-middle"
                    style={{ width: '12px', height: '12px' }}
                  ></span>
                </div>
                <div className="ms-4">
                  <p className="mb-1 fw-bold">{item.time}</p>
                  <p className="mb-0 text-muted">{item.role}</p>
                </div>
                <div className="ms-auto d-flex onboarding-image-container">
                  {[1, 2, 3].map((imgIndex) => (
                    <Image
                      key={imgIndex}
                      src="/assets/images/chat-avatar.png"
                      alt={`Avatar ${imgIndex}`}
                      width={30}
                      height={30}
                      className="circle"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="col-lg-6 mb-4">
      <div className="card onboarding bg-transparent h-100">
        <h5 className="">Help</h5>
        <div className="icon d-flex justify-content-center">
        <Image src="/assets/images/agent.png" alt="" width={50} height={50} className="" />
        </div>
        <p className="card-text text-muted">
          Need Help? Search in Help Center or Contact us.
        </p>
        <div className="d-flex justify-content-center gap-4 help-btn-wrap">
          <a href="#" className="btn btn-custom">
            Go to Help Centre
          </a>
          <a href="#" className="btn btn-custom">
            Contact us
          </a>
        </div>
      </div>
    </div>
  </div>

  <div className="row mb-4">
      <div className="col-lg-12">
        <div className="card member-onboarding p-4">
          <div className="row">
            {/* Member Onboarding Status */}
            <div className="col-md-6 mb-4">
              <h5 className="fw-bold">Member Onboarding Status</h5>
              <div className="row px-lg-3 px-0">
                {[
                  { label: 'Invitation sent', count: 0 },
                  { label: 'Invitation Accepted', count: 0 },
                  { label: 'Logged In', count: 0 },
                  { label: 'Tracked Time', count: 0 }
                ].map((item, index) => (
                  <div key={index} className="col-6">
                    <p className="fw-bold">{item.label}</p>
                    <h6>{item.count}</h6>
                  </div>
                ))}
              </div>
            </div>

            {/* Invite New Members */}
            <div className="col-md-6 text-start pl-lg-4 pl-0">
              <div className="invite-member">
                <h5 className="fw-bold">Invite New Members</h5>
                <p>Invite Members by Email or Link</p>
                <button className="btn g-button">+ Invite</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      {/* Today's Activity Section */}
      <div className="col-lg-12 mb-4">
        <div className="card border border-2">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Today's Activity</h5>
            <div className="dropdown">
              <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="today-activity"
              >
                Today
              </button>
              <ul className="dropdown-menu">
                {['Yesterday', 'This Week', 'This Month'].map((item, index) => (
                  <li key={index}>
                    <a className="dropdown-item" href="javascript:void(0)">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-body text-center activity-card py-5">
            {activities.length === 0 ? (
              <div className="activity-icon">
                <img
                  src="https://tracker.webwizit.com/assets/projectmanager/img/Web-Analytics.svg"
                  alt="No Data"
                />
                <p className="no-data-text mt-2">No Data</p>
              </div>
            ) : (
              activities.map((activity, index) => (
                <div key={index} className="row align-items-center w-100 mb-4">
                  <div className="col-2">
                    <div className="avatar">{activity.avatar}</div>
                  </div>
                  <div className="col-6 text-center">
                    <p className="mb-0">{activity.time}</p>
                  </div>
                  <div className="col-4">
                    <div className="circle-progress"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Productivity Section */}
      <div className="col-lg-6 mb-4">
        <div className="card h-100 border border-2">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Productivity</h5>
            <div className="dropdown">
              <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="Productivity"
              >
                Today
              </button>
              <ul className="dropdown-menu">
                {['Yesterday', 'This Week', 'This Month'].map((item, index) => (
                  <li key={index}>
                    <a className="dropdown-item prod-item" href="javascript:void(0)">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-body text-center activity-card py-5">
            {productivityTasks.length === 0 ? (
              <>
                <div className="activity-icon">
                  <img src="/assets/img/Web-Analytics.svg" alt="No Data" />
                </div>
                <p className="no-data-text mt-2">
                  Productivity data of your employees will be displayed here.
                </p>
              </>
            ) : (
              productivityTasks.map((task, index) => (
                <div key={index} className="task-item d-flex align-items-center justify-content-between mb-4">
                  <div className="task-info d-flex align-items-center gap-3">
                    <div className="task-icon">
                    {task.image}
                    </div>
                    <p className="task-name">{task.name}</p>
                  </div>
                  <p className="task-hours">{task.hours}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>


      <div className="col-lg-6 mb-4">
        <div className="card h-100 border border-2">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Productivity</h5>
            <div className="dropdown">
              <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="Productivity"
              >
                Today
              </button>
              <ul className="dropdown-menu">
                {['Yesterday', 'This Week', 'This Month'].map((item, index) => (
                  <li key={index}>
                    <a className="dropdown-item prod-item" href="javascript:void(0)">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-body text-center activity-card py-5">
            {productivityTasks2.length === 0 ? (
              <>
                <div className="activity-icon">
                  <img src="/assets/img/Web-Analytics.svg" alt="No Data" />
                </div>
                <p className="no-data-text mt-2">
                  Productivity data of your employees will be displayed here.
                </p>
              </>
            ) : (
              productivityTasks2.map((task, index) => (
                <div key={index} className="task-item d-flex align-items-center justify-content-between mb-4">
                  <div className="task-info d-flex align-items-center gap-3">
                    <div className="task-icon">
                    {task.image}
                    </div>
                    <p className="task-name">{task.name}</p>
                  </div>
                  <p className="task-hours">{task.hours}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      {/* Top Members */}
      <div className="col-lg-4 mb-4">
        <div className="card h-100 border border-2">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Top Members</h5>
          </div>
          <div className="card-body text-center activity-card py-5 d-flex flex-column align-items-center ">
          <Image src="/assets/images/top-member.png" alt=""  width={50} height={50} className="" />
            <p className="no-data-text mt-2">
              Top members will appear here when they track time on the Desktop Tracker.
            </p>
          </div>
        </div>
      </div>

      {/* Attendance */}
      <div className="col-lg-4 mb-4">
        <div className="card h-100 border border-2">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Attendance</h5>
            <div className="dropdown">
              <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="Attendance"
              >
                Today
              </button>
              <ul className="dropdown-menu">
                {['Yesterday', 'This Week', 'This Month'].map((item, index) => (
                  <li key={index}>
                    <a className="dropdown-item" href="javascript:void(0)">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-body text-center activity-card py-5">
            {attendanceUsers.map((user, index) => (
              <div key={index} className="user-item d-flex justify-content-between">
                <div className="user-info d-flex align-items-center">
                  <div className={`user-avatar ${user.color} me-2`}>{user.name.charAt(0)}</div>
                  <p className="mb-0">{user.name}</p>
                </div>
                <p className={`status ${user.status.toLowerCase()} mb-0`}>{user.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="col-lg-4 mb-4">
        <div className="card h-100 border border-2">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Activity</h5>
            <div className="dropdown">
              <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Today
              </button>
              <ul className="dropdown-menu">
                {['Yesterday', 'This Week', 'This Month'].map((item, index) => (
                  <li key={index}>
                    <a className="dropdown-item" href="javascript:void(0)">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card-body text-center activity-card py-5 d-flex flex-column align-items-center ">
          <Image src="/assets/images/Web Analytics.png" alt=""  width={50} height={50} className="" />
            <p className="no-data-text mt-2">
              Activity level data will show here
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="row mb-4">
      <div className="col-lg-12">
        <div className="dropzone-wrap " id="drop-zone-main">
          <div
            {...getRootProps()}
            className="dropzone d-flex align-items-center flex-column bg-transparent border-0 text-center p-5 border-dashed border-gray-400 rounded-lg cursor-pointer"
          >
            <input {...getInputProps()} />
            <Image src="/assets/images/dropzone.png" alt=""  width={50} height={50} className="" />
          
            <p className="text-white">
              {isDragActive ? "Drop the files here..." : "Screenshots will appear here shortly after they are taken"}
            </p>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}
