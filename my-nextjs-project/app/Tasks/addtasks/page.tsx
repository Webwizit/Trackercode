"use client";

import { FiSearch } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { FaListUl, FaEye, FaUserAlt, FaChartBar, FaUser, FaComment, FaCalendarAlt, FaSort } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TaskHeader() {
  const [columns, setColumns] = useState("Columns");
  const [priority, setPriority] = useState<string>("Normal");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [status, setStatus] = useState("OPEN");
  const [isOpen, setIsOpen] = useState(false);
  const statusOptions = [
    { label: "OPEN", color: "bg-gray-300 text-gray-700 hover:bg-gray-400" },
    { label: "IN PROGRESS", color: "bg-gray-300 text-gray-800 hover:bg-yellow-400 hover:text-black" },
    { label: "DONE", color: "bg-gray-300 text-gray-900 hover:bg-green-500 hover:text-white" },
    { label: "CLOSED", color: "bg-gray-300 text-gray-900 hover:bg-orange-500 hover:text-white" },
  ];
 


  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(event.target.value);
    setShowDatePicker(false); // Hide the date picker after selection
  };
  const priorityOptions = [
    { label: "Urgent", value: "Urgent", color: "text-red-500", icon: "🔺🔺" },
    { label: "High", value: "High", color: "text-orange-500", icon: "🔺" },
    { label: "Normal", value: "Normal", color: "text-blue-500", icon: "🔼🔼" },
    { label: "Low", value: "Low", color: "text-gray-500", icon: "🔽" },
  ];

  return (
    <div className="p-9 w-full mx-auto bg-white rounded-xl shadow-md">
    <div className="flex items-center justify-between pb-4 border-b">
      {/* Left Side: Title */}
      <div className="flex items-center space-x-2">
        <FaListUl size={30} className="text-2xl text-gray-800text-xl font-semibold flex items-center" />
        <h1 className="text-2xl font-semibold text-gray-800">Tasks</h1>
      </div>
           {/* Add Task Button */}
           <button
       
        className="bg-purple-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-700"
      >
        <IoMdAdd size={18} />
        Add a new task
      </button>
     </div>
      {/* Center: Filters */}
      <div className="mt-5 flex items-center space-x-3">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for tasks"
            className="border rounded-lg px-4 py-2 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FiSearch className="absolute right-3 top-3 text-gray-400" size={16} />
        </div>

        {/* Filter Buttons */}
        <Button className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
          <FaListUl size={14} />
          My tasks
        </Button>

        <Button className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
          <FaEye size={14} />
          Show
        </Button>

        <Button className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
          <FaUserAlt size={14} />
          Assignees
        </Button>

        <Button className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
          <FaChartBar size={14} />
          Board
        </Button>
      </div>
{/* Right Side: Columns Dropdown & Add Task Button */}
<div className="flex items-center mt-5 space-x-3">
  {/* Push to Right */}
  <div className="ml-auto">
    {/* Columns Dropdown */}
    <select
      value={columns}
      onChange={(e) => setColumns(e.target.value)}
      className="border rounded-lg px-3 py-2 text-sm bg-white text-gray-700"
    >
      <option>Columns</option>
      <option>List View</option>
      <option>Grid View</option>
    </select>
  </div>
</div>
<table className="min-w-full border rounded-lg mt-5">
        {/* Table Header */}
        <thead className="bg-purple-400 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Tasks</th>
            <th className="px-4 py-2 text-left">Task ID</th>
            <th className="px-4 py-2 text-left">Due Date</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Comments</th>
            <th className="px-4 py-2 text-left">Assignee</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-gray-100 text-gray-700">
            
          <tr className="border-t">
            <td className="px-4 py-3">Create a new Project and outline your tasks</td>
            <td className="px-4 py-3">GAWR-2</td>
             {/* Due Date Selection */}
             <td className="px-4 py-3">
              {showDatePicker ? (
                <input
                  type="date"
                  className="border rounded-lg px-2 py-1 text-gray-700"
                  onChange={handleDateChange}
                  autoFocus
                  onBlur={() => setShowDatePicker(false)} // Hide on blur
                />
              ) : (
                <span
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setShowDatePicker(true)}
                >
                  {dueDate ? dueDate : <FaCalendarAlt className="text-gray-600" />}
                </span>
              )}
            </td>

             {/* Priority Dropdown */}
             <td className="px-4 py-3 relative">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border rounded-lg px-2 py-1 text-gray-700 bg-white"
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </td>

            <td className="px-4 py-3 relative">
      <button
        className={`px-4 py-2 rounded-lg text-sm font-medium ${statusOptions.find((s) => s.label === status)?.color}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {status}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white border shadow-lg rounded-lg z-10">
          {statusOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => {
                setStatus(option.label);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-100 ${option.color}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </td>
            <td className="px-4 py-3">
              <FaComment className="text-gray-600" />
            </td>
            <td className="px-4 py-3">
              <button className="border px-2 py-1 rounded-lg">
                <FaUser />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
</div>
  );
}
 
   
  
