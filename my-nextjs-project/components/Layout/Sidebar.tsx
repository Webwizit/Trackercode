
"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaClock, FaChartBar, FaUsers, FaTasks, FaTools, FaSignInAlt, FaChevronDown, FaProjectDiagram,
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
  FaRegClock,
} from "react-icons/fa";

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});


  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !(prev?.[menu] || false) }));
  };


  return (
    <aside className="h-screen ps-3 text-white w-64 py-4">
      <nav>
        <ul className="space-y-2 p-0">
          <li className="active nav-link p-2 text-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24" fill="none">
<rect width="24" height="24" fill="url(#pattern0_11_171)"/>
<defs>
<pattern id="pattern0_11_171" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_11_171" transform="translate(-0.125 -0.125) scale(0.0125)"/>
</pattern>
<image id="image0_11_171" width="100" height="100" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEu0lEQVR4nO2dS4wURRjHmzdcRYQYCIKRkHBQEcJBopDVGIInzfoAvcpyUiSrJ8IaY8KRh3Dy4gljjFE4bnQjETYxenBXAZHD6nEOu0IIgov+SMUiO8x21fTs1Kunvl/St+r5f93/rup69TdFIQiCIAiCIAiCIAiCIAgZAmwE3gQOAu87OPYBzwFLHMS2BHgeGHAU20F9rRuLlADmA28AF/HHNeBj4KE5xLcSOAlc9xjfr8AedS/83OXqF/sgMEI4/gJ2dxDfi9rMUHwLLPd71+1mXCE8d9TTWCG+vcC/EeL7LbgpupkKWTNa+RvYbIlviy4Ti2+AeSENUS+z2IyaLho4Hzu4KrXYpSHqJWbiH+BnYLjL4xww2eainy2JbWebcyb1b3cbn7rGaYvOLyG7tiZ+AB5xqLUQOGzRO1ZyzglL+UPAAofxrQN+tOhtcKU1l+ZK1Yx1njTPGDQvlJRVTVkZX3mKbb2lpuz1odkawHsG8TGPmgMGzYmSshOGsvs8xjdm0Bz0pdksPmQQH/Go2W/QbJSUbRjK9nuMz9TjHPKl2SwuhrQghswgNURqyGykhswgNURqSHo1JPVubyO3XpZpYDjtcWB4toOBYXaG2KZO1DTCesdTJx9Y9I4WuRtSYXJxWo9cXUwuTmHnmZLYsjRELf7E5pwhtiwNma8XYWJxE3jSEFt+huggluvlyhhLuK9b4srTkCZTQtaUKWBXm5jyNUQHM089sWqFzPNuk+PAigrx5G1IS2Ab9B6tQeBIl8cQ8BbQByzuIAYxJCUQQ9ICMSQtEEPuuxnL1PhAb+Hs7/J4GdgOPCyGdP5UbgY+B2546mX9BOwHFkkNsRuxGDgF/EcYLgGbpMkyf28RY/rkumrK5B0y25BPiUcDWGt4UPIbh1TYPxuCLwyxZWlIu93lt/Sm5m6Oa2001Hvr8SJ3Q4DVlpf4H8ALVXpDFbXWAKctpnxYck52hrxmEFdfK231tPYyatD8rqT8VUPZt13H1qT5u0HzgC/NZvF3DeJXPGq+Y9C8WlJWLf2WccHHR5nANkuL8YprvTru7f0IM6r5W+MopkVqbQb409JidDTL0KuGPEG1sUy3nY7bc1nzz84QBfAl8ekrQlATQ9Zaelsh+MTXvailIQo9UxwyacA9hl2kAuk5QxRqItJzyo/Wl/gxV2OwnjSkaTvqgN7m6mNWWnUQPiubNQhC3QxpBlgFPA285GABbbcyAVhaxKTOhvQkYkhiiCGJUVdD6NWMcnUzhF7PKFcnQ8gho1xdDCGXjHJ1MIScMsrVxJDz5JJRLnVDyDCjXOqGnMgto1zqhozmllEudUMmDGUlo1wkQxq57ctKvYY0xBAxZERqyP9IDZEmazbyDplBakgNMspNROj2jsdMpJx6RrlRQ9mvPcX2aOyBYeoZ5Y5byqvE/gsdj9LVF8Lxpk5qkFFuR5tzphxNLo61mVwcD2JG6hnlFMD3sYMDXi1CkXJGOQXwVOQFquGgf3mUcka5e+hNB6psaC4DDxQxSDGjXDN6u6dKfhayZsQxI9WMcq2oP6PUi1Y+jRnXH8OGbabqkFGuTV6WPv2bQw7iG9TX+phRVBAEQRAEQRAEQRAEQRCK3uUuZ+KeWW6s/wsAAAAASUVORK5CYII="/>
</defs>
</svg>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {/* Timesheets Dropdown */}
          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
            <FaClock />
            <button onClick={() => toggleMenu("timesheets")} className="flex-1 text-left">
              Timesheets
            </button>
            <FaChevronDown
              className={`transition-transform ${openMenus["timesheets"] ? "rotate-180" : ""
                }`}
            />
          </li>
          {openMenus["timesheets"] && (
            <ul className="pl-6 space-y-1">
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaEdit />
                <Link href="/timesheets/view-edit" className="underline">
                  View & Edit Timesheet
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaRegClock />
                <Link href="/timesheets/time-request" className="underline">
                  Time Request
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaUsers />
                <Link href="/timesheets/time-editors" className="underline">
                  Time Editors
                </Link>
              </li>
            </ul>
          )}


          {/* Reports Dropdown */}
          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
            <FaChartBar />
            <button
              onClick={() => toggleMenu("reports")}
              className="flex-1 text-left hover:text-blue"
            >
              Reports
            </button>
            <FaChevronDown
              className={`transition-transform ${openMenus["reports"] ? "rotate-180" : ""
                }`}
            />
          </li>
          {openMenus["reports"] && (
            <ul className="pl-4 space-y-3">
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaClock />
                <Link href="/reports/tracked-hours" className="underline text-blue">
                  Tracked Hours
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaStream />
                <Link href="/reports/timeline" className="underline text-blue">
                  Timeline
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaClipboardList />
                <Link href="/reports/attendance" className="underline text-blue">
                  Attendance
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaChartBar />
                <Link href="/reports/activity-level" className="underline text-blue">
                  Activity Level
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaChartPie />
                <button
                  onClick={() => toggleMenu("statistics")}
                  className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all"
                >
                  Statistics
                </button>
                <FaChevronDown
                  className={`transition-transform ${openMenus["statistics"] ? "rotate-180" : ""
                    }`}
                />
              </li>
              {openMenus["statistics"] && (
                <ul className="pl-6 space-y-2">
                  <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                    <FaFileAlt />
                    <Link href="/reports/statistics/activity-description" className="underline text-blue">
                      Activity Description
                    </Link>
                  </li>
                  <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                    <FaGlobe />
                    <Link href="/reports/statistics/apps-websites" className="underline text-blue">
                      Apps & Websites
                    </Link>
                  </li>
                  <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-alll">
                    <FaTasks />
                    <Link href="/reports/statistics/tasks" className="underline text-blue">
                      Tasks
                    </Link>
                  </li>
                  <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                    <FaFile />
                    <Link href="/reports/statistics/all-reports" className="underline text-blue">
                      All Reports
                    </Link>
                  </li>
                </ul>
              )}
            </ul>

          )}

          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
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
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaUser />
                <Link href="/people/members" className="underline text-blue">
                  Member
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaUsersCog />
                <Link href="/people/teams" className="underline text-blue">
                  Team
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaIdBadge />
                <Link href="/people/titles" className="underline text-blue">
                  Title
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaEye />
                <Link href="/people/project-viewers" className="underline text-blue">
                  Project Viewers
                </Link>
              </li>
            </ul>
          )}


          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
            <FaTasks /> <Link href="/tasks">Tasks</Link>
          </li>

          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
            <FaTools /> <Link href="/tools">Tools</Link>
          </li>
          {/* Time Off Dropdown */}
          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
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
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaUmbrellaBeach />
                <Link href="/time-off/holidays" className="underline text-blue">
                  Holidays
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaSuitcaseRolling />
                <Link href="/time-off/leaves" className="underline text-blue">
                  Leaves
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaBalanceScale />
                <Link href="/time-off/leave-balance" className="underline text-blue">
                  Leave Balance
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaCalendarCheck />
                <Link href="/time-off/request" className="underline text-blue">
                  Request Time Off
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaRegCalendarAlt />
                <Link href="/time-off/calendar" className="underline text-blue">
                  Calendar
                </Link>
              </li>
            </ul>
          )}

          {/* Monitoring Dropdown */}
          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
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
              <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
                <FaCamera />
                <Link href="/monitoring/screenshots" className="underline text-white">
                  Screenshots
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaChartLine />
                <Link href="/monitoring/daily-activity" className="underline text-blue">
                  Daily Activity
                </Link>
              </li>
              <li className="fflex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaTachometerAlt />
                <Link href="/monitoring/productivity" className="underline text-blue">
                  Productivity
                </Link>
              </li>
            </ul>
          )}

          {/* Projects Dropdown */}
          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
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
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaFolderOpen />
                <Link href="/projects/active" className="underline text-blue">
                  Active Projects
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaLayerGroup />
                <Link href="/projects/group" className="underline text-blue">
                  Projects Group
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaFileContract />
                <Link href="/projects/contracts" className="underline text-blue">
                  Contracts
                </Link>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaArchive />
                <Link href="/projects/archive" className="underline text-blue">
                  Archive
                </Link>
              </li>
            </ul>
          )}




          {/* Communication Dropdown */}
          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
            <FaCommentAlt /> {/* Different icon for Communication */}
            <button
              onClick={() => toggleMenu("communication")}
              className="flex-1 text-left"
            >
              Communication
            </button>
            <FaChevronDown
              className={`transition-transform ${openMenus["communication"] ? "rotate-180" : ""
                }`}
            />
          </li>
          {openMenus["communication"] && (
            <ul className="pl-6 space-y-1">
              <li className="flex items-center gap-2 p-2 hover:bg-white hover:text-blue-800 transition-all">
                <FaComments /> {/* Different icon for Chat */}
                <Link href="/communication/chat" className="underline text-blue">
                  Chat
                </Link>
              </li>
            </ul>
          )}
          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
            <FaStream /> <Link href="/tools">Integeration</Link>
          </li>



          <li className="hover:bg-white hover:text-blue-800 p-2 flex items-center gap-2 transition-all">
            <FaSignInAlt /> <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
