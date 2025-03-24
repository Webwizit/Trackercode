
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage } from "@fortawesome/free-solid-svg-icons";


export default function Header() {
  return (
    <header id="header" className="header d-flex align-items-center">
      
      {/* <div className="d-flex align-items-center justify-content-between">
        <Link href="/" className="logo d-flex align-items-center">
          <span className="d-none d-lg-block">WEBWIZ </span>
        </Link>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div> */}

      <div className="search-bar d-flex align-items-center gap-2">
        <Image src="/assets/images/dashboard-icon.png" alt="" width={50} height={50} style={{ width: "auto", height: "22px" }} className="" />
        <h3 className="page-title mb-0">Dashboard</h3>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <Link href="#" className="nav-link nav-icon search-bar-toggle">
              <i className="bi bi-search"></i>
            </Link>
          </li>

          {/* Notifications Dropdown */}
          <li className="nav-item dropdown">
            <Link href="#" className="nav-link nav-icon" data-bs-toggle="dropdown">
              <Image src="/assets/images/Notification.png" alt="" width={50} height={50} className="h-icons" />   <span className="badge bg-primary badge-number">4</span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <Link href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li className="dropdown-footer">
                <Link href="#">Show all notifications</Link>
              </li>
            </ul>
          </li>

          {/* Messages Dropdown */}
          <li className="nav-item dropdown">
            <Link href="#" className="nav-link nav-icon" data-bs-toggle="dropdown">
              <Image src="/assets/images/h-chat.png" alt="" width={50} height={50} className="h-icons" />
              <span className="badge bg-success badge-number">3</span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li className="dropdown-header">
                You have 3 new messages
                <Link href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link>
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li className="message-item">a
                <Link href="#">
                  <Image src="/assets/projectmanager/img/profile-img.jpg" alt="Profile" width={40} height={40} className="rounded-circle" />
                  <div>
                    <h4>Maria Hudson</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>4 hrs. ago</p>
                  </div>
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li className="dropdown-footer">
                <Link href="#">Show all messages</Link>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link href="#" className="nav-link nav-icon" data-bs-toggle="dropdown">
              <Image src="/assets/images/Settings.png" alt="" width={50} height={50} className="h-icons" />

            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li className="dropdown-header">
                You have 3 new messages
                <Link href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link>
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li className="message-item">
                <Link href="#">
                  <Image src="/assets/projectmanager/img/profile-img.jpg" alt="Profile" width={40} height={40} className="rounded-circle" />
                  <div>
                    <h4>Maria Hudson</h4>
                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    <p>4 hrs. ago</p>
                  </div>
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li className="dropdown-footer">
                <Link href="#">Show all messages</Link>
              </li>
            </ul>
          </li>

          {/* Profile Dropdown */}
          <li className="nav-item dropdown pe-3">
            <Link href="#" className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
              <Image src="/assets/images/profile-img.jpg" alt="Profile" width={40} height={40} className="rounded-circle" />
              <span className="d-none d-md-block dropdown-toggle ps-2">Hamza</span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Kevin Anderson</h6>
                <span>Web Designer</span>
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li>
                <Link href="users-profile.php" className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li>
                <Link href="#" className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </Link>
              </li>
            </ul>


          </li>
        </ul>
      </nav>
    </header>

  );
}