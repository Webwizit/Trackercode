
"use client";
import { useState } from "react";
import Link from "next/link";
import { FaClock, FaChartBar, FaUsers, FaTasks, FaTools, FaSignInAlt, FaChevronDown,FaProjectDiagram, 
  FaCalendarAlt,
  FaComments,
  FaPlug,
  FaEye,
  FaFile,
  FaFileAlt,
  FaChartPie,
  FaClipboardList,
  FaStream,
  FaGlobe,
  FaIdBadge,
  FaUsersCog,
  FaUser,
  FaTachometerAlt,
  FaCamera,
  FaChartLine,
  FaRegCalendarAlt,
  FaCalendarCheck,
  FaBalanceScale,
  FaSuitcaseRolling,
  FaUmbrellaBeach,
  FaArchive,
  FaFileContract,
  FaLayerGroup,
  FaFolderOpen,
  FaCommentAlt,
  FaEdit,
  FaRegClock, } from "react-icons/fa";

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});


  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !(prev?.[menu] || false) }));
  };
  

  return (
    <aside className="w-64 h-screen bg-blue-700 text-white p-4">
      <nav>
        <ul className="space-y-2">
          <li className="p-2 rounded bg-white text-blue-700 font-bold">
            <Link href="/dashboard">Dashboard</Link>
          </li>
{/* Timesheets Dropdown */}
<li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
  <FaClock />
  <button onClick={() => toggleMenu("timesheets")} className="flex-1 text-left">
    Timesheets
  </button>
  <FaChevronDown
    className={`transition-transform ${
      openMenus["timesheets"] ? "rotate-180" : ""
    }`}
  />
</li>
{openMenus["timesheets"] && (
  <ul className="pl-6 space-y-1">
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaEdit />
      <Link href="/timesheets/view-edit" className="underline">
        View & Edit Timesheet
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaRegClock />
      <Link href="/timesheets/time-request" className="underline">
        Time Request
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaUsers />
      <Link href="/timesheets/time-editors" className="underline">
        Time Editors
      </Link>
    </li>
  </ul>
)}


{/* Reports Dropdown */}
<li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
  <FaChartBar />
  <button
    onClick={() => toggleMenu("reports")}
    className="flex-1 text-left hover:text-blue"
  >
    Reports
  </button>
  <FaChevronDown
    className={`transition-transform ${
      openMenus["reports"] ? "rotate-180" : ""
    }`}
  />
</li>
{openMenus["reports"] && (
 <ul className="pl-4 space-y-3">
 <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
   <FaClock />
   <Link href="/reports/tracked-hours" className="underline text-blue">
     Tracked Hours
   </Link>
 </li>
 <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
   <FaStream />
   <Link href="/reports/timeline" className="underline text-blue">
     Timeline
   </Link>
 </li>
 <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
   <FaClipboardList />
   <Link href="/reports/attendance" className="underline text-blue">
     Attendance
   </Link>
 </li>
 <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
   <FaChartBar />
   <Link href="/reports/activity-level" className="underline text-blue">
     Activity Level
   </Link>
 </li>
 <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
   <FaChartPie />
   <button
     onClick={() => toggleMenu("statistics")}
     className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all"
   >
     Statistics
   </button>
   <FaChevronDown
     className={`transition-transform ${
       openMenus["statistics"] ? "rotate-180" : ""
     }`}
   />
 </li>
 {openMenus["statistics"] && (
   <ul className="pl-6 space-y-2">
     <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
       <FaFileAlt />
       <Link href="/reports/statistics/activity-description" className="underline text-blue">
         Activity Description
       </Link>
     </li>
     <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
       <FaGlobe />
       <Link href="/reports/statistics/apps-websites" className="underline text-blue">
         Apps & Websites
       </Link>
     </li>
     <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-alll">
       <FaTasks />
       <Link href="/reports/statistics/tasks" className="underline text-blue">
         Tasks
       </Link>
     </li>
     <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
       <FaFile />
       <Link href="/reports/statistics/all-reports" className="underline text-blue">
         All Reports
       </Link>
     </li>
   </ul>
 )}
</ul>

)}

<li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
  <FaUsers />
  <button onClick={() => toggleMenu("people")} className="flex-1 text-left text-blue">
    People
  </button>
  <FaChevronDown
    className={`transition-transform ${openMenus["people"] ? "rotate-180" : ""}`}
  />
</li>

{openMenus["people"] && (
  <ul className="pl-6 space-y-2">
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaUser />
      <Link href="/people/members" className="underline text-blue">
        Member
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaUsersCog />
      <Link href="/people/teams" className="underline text-blue">
        Team
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaIdBadge />
      <Link href="/people/titles" className="underline text-blue">
        Title
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaEye />
      <Link href="/people/project-viewers" className="underline text-blue">
        Project Viewers
      </Link>
    </li>
  </ul>
)}


          <li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
            <FaTasks /> <Link href="/tasks">Tasks</Link>
          </li>

          <li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
            <FaTools /> <Link href="/tools">Tools</Link>
          </li>
                 {/* Time Off Dropdown */}
<li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
  <FaCalendarAlt />
  <button onClick={() => toggleMenu("timeOff")} className="flex-1 text-left text-blue">
    Time Off
  </button>
  <FaChevronDown
    className={`transition-transform ${openMenus["timeOff"] ? "rotate-180" : ""}`}
  />
</li>

{openMenus["timeOff"] && (
  <ul className="pl-6 space-y-2">
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaUmbrellaBeach />
      <Link href="/time-off/holidays" className="underline text-blue">
        Holidays
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaSuitcaseRolling />
      <Link href="/time-off/leaves" className="underline text-blue">
        Leaves
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaBalanceScale />
      <Link href="/time-off/leave-balance" className="underline text-blue">
        Leave Balance
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaCalendarCheck />
      <Link href="/time-off/request" className="underline text-blue">
        Request Time Off
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaRegCalendarAlt />
      <Link href="/time-off/calendar" className="underline text-blue">
        Calendar
      </Link>
    </li>
  </ul>
)}

          {/* Monitoring Dropdown */}
<li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
  <FaEye />
  <button onClick={() => toggleMenu("monitoring")} className="flex-1 text-left text-blue">
    Monitoring
  </button>
  <FaChevronDown
    className={`transition-transform ${openMenus["monitoring"] ? "rotate-180" : ""}`}
  />
</li>

{openMenus["monitoring"] && (
  <ul className="pl-6 space-y-2">
    <li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
      <FaCamera />
      <Link href="/monitoring/screenshots" className="underline text-white">
        Screenshots
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaChartLine />
      <Link href="/monitoring/daily-activity" className="underline text-blue">
        Daily Activity
      </Link>
    </li>
    <li className="fflex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaTachometerAlt />
      <Link href="/monitoring/productivity" className="underline text-blue">
        Productivity
      </Link>
    </li>
  </ul>
)}

         {/* Projects Dropdown */}
<li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
  <FaProjectDiagram />
  <button onClick={() => toggleMenu("projects")} className="flex-1 text-left text-blue">
    Projects
  </button>
  <FaChevronDown
    className={`transition-transform ${openMenus["projects"] ? "rotate-180" : ""}`}
  />
</li>

{openMenus["projects"] && (
  <ul className="pl-6 space-y-2">
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaFolderOpen />
      <Link href="/projects/active" className="underline text-blue">
        Active Projects
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaLayerGroup />
      <Link href="/projects/group" className="underline text-blue">
        Projects Group
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaFileContract />
      <Link href="/projects/contracts" className="underline text-blue">
        Contracts
      </Link>
    </li>
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaArchive />
      <Link href="/projects/archive" className="underline text-blue">
        Archive
      </Link>
    </li>
  </ul>
)}


  

       {/* Communication Dropdown */}
<li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
  <FaCommentAlt /> {/* Different icon for Communication */}
  <button
    onClick={() => toggleMenu("communication")}
    className="flex-1 text-left"
  >
    Communication
  </button>
  <FaChevronDown
    className={`transition-transform ${
      openMenus["communication"] ? "rotate-180" : ""
    }`}
  />
</li>
{openMenus["communication"] && (
  <ul className="pl-6 space-y-1">
    <li className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-blue-800 transition-all">
      <FaComments /> {/* Different icon for Chat */}
      <Link href="/communication/chat" className="underline text-blue">
        Chat
      </Link>
    </li>
  </ul>
)}
          <li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
            <FaStream /> <Link href="/tools">Integeration</Link>
          </li>

     

          <li className="hover:bg-white hover:text-blue-800 p-2 rounded flex items-center gap-2 transition-all">
            <FaSignInAlt /> <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
