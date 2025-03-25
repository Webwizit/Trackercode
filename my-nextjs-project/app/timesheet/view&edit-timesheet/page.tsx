"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { jsPDF } from "jspdf";
import { Bell, Mail, User, Clock, ChevronDown, Plus, Edit, ArrowBigDown, Folder, ListChecks, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


// Helper to format the date as "Mon 21,2025"
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const weekday = date.toLocaleString("en-US", { weekday: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${weekday} ${day},${year}`;
}

// Helper to convert a 24-hour time string (HH:mm:ss) to 12-hour format with AM/PM
function formatTime(timeString: string): string {
  const [hourStr, minuteStr] = timeString.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

// Helper to compute total time difference in "Xh Ym" format
function computeTimeDifference(start: string, end: string): string {
  if (!start || !end) return "0h 0m";
  const [startHour, startMinute, startSecond] = start.split(":").map(Number);
  const [endHour, endMinute, endSecond] = end.split(":").map(Number);
  const startDate = new Date(0, 0, 0, startHour, startMinute, startSecond);
  const endDate = new Date(0, 0, 0, endHour, endMinute, endSecond);
  let diff = (endDate.getTime() - startDate.getTime()) / 1000;
  if (diff < 0) diff += 24 * 3600;
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

const ViewEditsheet = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [timeEntries, setTimeEntries] = useState<any[]>([]);
  const teams = ["Development", "Product Management", "Quality Assurance"];
  const [date, setDate] = useState('Oct 15, 2024 - Oct 20, 2024');

  // Fetch time entries from the Django API
  const fetchTimeEntries = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/addtime/");
      if (!res.ok) throw new Error("Failed to fetch time entries");
      const data = await res.json();
      setTimeEntries(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch on mount and when modal closes (i.e. after a new entry is added)
  useEffect(() => {
    fetchTimeEntries();
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entry = {
      date: formData.get("date"),
      project: formData.get("project"),
      task: formData.get("task"),
      start_time: formData.get("startTime"),
      end_time: formData.get("endTime"),
      activity_description: formData.get("activityDescription"),
    };

    try {
      const res = await fetch("http://localhost:8000/api/addtime/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) {
        throw new Error("Failed to save entry");
      }
      setIsModalOpen(false); // Close modal on successful submission
    } catch (error) {
      console.error(error);
    }
  };

  // Export data as CSV
  const exportAsCSV = () => {
    if (!timeEntries.length) return;
    // Create CSV header
    const header = ["Date", "Time", "Project", "Task", "Amount", "Total Time"];
    const rows = timeEntries.map((entry) => {
      const date = formatDate(entry.date);
      const time = `${formatTime(entry.start_time)} - ${formatTime(entry.end_time)}`;
      const project = entry.project;
      const task = entry.task;
      const amount = "0 USD";
      const totalTime = computeTimeDifference(entry.start_time, entry.end_time);
      return [date, time, project, task, amount, totalTime];
    });
    // Convert rows to CSV string
    const csvContent =
      [header, ...rows]
        .map((row) =>
          row
            .map((cell) => `"${cell}"`)
            .join(",")
        )
        .join("\n");
    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "time_entries.csv";
    a.click();
    URL.revokeObjectURL(url);
    setExportDropdownOpen(false);
  };

  // Export data as PDF using jsPDF
  const exportAsPDF = () => {
    if (!timeEntries.length) return;
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(14);
    doc.text("Time Entries", 14, 15);
    doc.setFontSize(10);
    // Table header
    doc.text("Date", 14, y);
    doc.text("Time", 50, y);
    doc.text("Project", 90, y);
    doc.text("Task", 120, y);
    doc.text("Amount", 150, y);
    doc.text("Total Time", 180, y);
    y += 7;
    // Table rows
    timeEntries.forEach((entry) => {
      const date = formatDate(entry.date);
      const time = `${formatTime(entry.start_time)} - ${formatTime(entry.end_time)}`;
      const project = entry.project;
      const task = entry.task;
      const amount = "0 USD";
      const totalTime = computeTimeDifference(entry.start_time, entry.end_time);
      doc.text(date, 14, y);
      doc.text(time, 50, y);
      doc.text(project, 90, y);
      doc.text(task, 120, y);
      doc.text(amount, 150, y);
      doc.text(totalTime, 180, y);
      y += 7;
      // Add new page if necessary
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save("time_entries.pdf");
    setExportDropdownOpen(false);
  };

  return (
    <div className="p-4 w-full mx-auto bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-2">
          <Clock size={24} />
          <h1 className="text-xl font-bold">Time Sheet</h1>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="cursor-pointer text-black fill-black" />
          <Mail className="cursor-pointer text-black fill-semiblack" />
          <Avatar>
            <AvatarImage src="/assets/images/avtr.jpg" alt="User Avatar" />
            <AvatarFallback>HR</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 py-4 flex-wrap">
      <Button variant="outline" className="flex items-center">
        <User size={16} className="mr-2" /> Hamza Rasheed
      </Button>
      <Button variant="outline" className="flex items-center">
        <Folder size={16} className="mr-2" /> Projects
      </Button>
      <Button variant="outline" className="flex items-center">
        <ListChecks size={16} className="mr-2" /> Tasks
      </Button>
      <Button variant="outline" className="flex items-center">
        <Calendar size={16} className="mr-2" /> {date}
        <ChevronDown size={16} className="ml-2" />
      </Button>
    </div>
      
      {/* Actions */}
      <div className="flex justify-between py-4">
        <Button className="flex items-center bg-purple-600 text-white hover:bg-purple-700"
        onClick={() => setIsModalOpen(true)}>
          <Plus size={16} className="mr-2" /> Add Time
        </Button>
       
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center">
            <Edit size={16} className="mr-2" /> Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                Columns <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Total Time</DropdownMenuItem>
              <DropdownMenuItem>Amount Owed</DropdownMenuItem>
              <DropdownMenuItem>Paid Leave</DropdownMenuItem>
              <DropdownMenuItem>Absent</DropdownMenuItem>
              <DropdownMenuItem>Holiday</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

     

      {/* Summary Table Section */}
      <div className="border rounded-md p-4 bg-white mt-10">
        <div className="grid grid-cols-5 text-center text-lg font-medium text-black-700">
          <div>Total Time</div>
          <div>Amount Owned</div>
          <div>Paid Leave</div>
          <div>Absent</div>
          <div>Holiday</div>
        </div>
        <div className="grid grid-cols-5 text-center text-md mt-2 text-gray-500">
          <div>0:00</div>
          <div>$0.00</div>
          <div>0:00</div>
          <div>2</div>
          <div>--</div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="border rounded-md overflow-hidden mt-10">
        <table className="w-full text-md text-left">
          <thead className="bg-[#9A4AFD] text-white">
            <tr>
              <th className="p-3 pl-8">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Project</th>
              <th className="p-3">Task</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Total Time</th>
            </tr>
          </thead>
          <tbody className="bg-purple-100">
            {timeEntries && timeEntries.length > 0 ? (
              timeEntries.map((entry, index) => (
                <tr key={index}>
                  <td className="p-1 pl-6">{formatDate(entry.date)}</td>
                  <td className="p-1 pl-3">
                    {formatTime(entry.start_time)} - {formatTime(entry.end_time)}
                  </td>
                  <td className="p-1 pl-6">{entry.project}</td>
                  <td className="p-1">{entry.task}</td>
                  <td className="p-1 pl-3">0 USD</td>
                  <td className="p-1 pl-3">
                    {computeTimeDifference(entry.start_time, entry.end_time)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3" colSpan={6}>
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    {/* Modal for "Add Time" */}
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="relative bg-white rounded-xl p-6 w-full max-w-md mx-auto shadow-2xl transform transition-all duration-300">
          {/* Header with accent background */}
          <div className="flex justify-between items-center rounded-t-xl bg-[#9A4AFD] px-4 py-3">
            <Dialog.Title className="text-2xl font-bold text-white">
              Add Time
            </Dialog.Title>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <IoMdClose size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition"
                required
              />
            </div>

            {/* Project Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project
              </label>
              <select
                name="project"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition"
                required
              >
                <option value="">Select Project</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 2">Project 2</option>
              </select>
            </div>

            {/* Task Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task
              </label>
              <select
                name="task"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition"
                required
              >
                <option value="">Select Task</option>
                <option value="Task 1">Task 1</option>
                <option value="Task 2">Task 2</option>
              </select>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  type="time"
                  name="startTime"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition"
                  required
                />
                <input
                  type="time"
                  name="endTime"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition"
                  required
                />
              </div>
            </div>

            {/* Activity Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Activity Description
              </label>
              <textarea
                name="activityDescription"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition"
                rows={3}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#9A4AFD] to-indigo-600 hover:from-indigo-600 hover:to-[#9A4AFD] text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </Dialog>
    </div>
  );
};

export default ViewEditsheet;
