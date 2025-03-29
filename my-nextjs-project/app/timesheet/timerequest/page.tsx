"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Folder, Briefcase, Type, Plus, XCircle, CheckCircle } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";

// Define the structure of a Time Request
interface TimeRequest {
  id: number;
  name: string;
  project: string;
  time: string;
  range: string;
  date: string;
}

export default function TimeRequestHeader() {
  const [selectedTab, setSelectedTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const initialRequests: TimeRequest[] = [
    { id: 1, name: "Sohail Imran", project: "Horizon", time: "00:30", range: "6:00 - 12:30", date: "Oct 15, 2024" },
    { id: 2, name: "Mirza Ammad", project: "Horizon", time: "00:20", range: "6:00 - 12:30", date: "Oct 15, 2024" },
    { id: 3, name: "Hina Fatima", project: "Horizon", time: "00:40", range: "6:00 - 12:30", date: "Oct 15, 2024" },
    { id: 4, name: "Tahira", project: "Horizon", time: "00:15", range: "6:00 - 12:30", date: "Oct 15, 2024" },
    { id: 5, name: "Iqra", project: "Horizon", time: "00:25", range: "6:00 - 12:30", date: "Oct 15, 2024" },
  ];

  const [pendingRequests, setPendingRequests] = useState<TimeRequest[]>(initialRequests);
  const [approvedRequests, setApprovedRequests] = useState<TimeRequest[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<TimeRequest[]>([]);

  // Handle Approve
  const handleApprove = (id: number) => {
    const request = pendingRequests.find((r) => r.id === id);
    if (!request) return;

    setApprovedRequests((prev) => [...prev, request]);
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // Handle Reject
  const handleReject = (id: number) => {
    const request = pendingRequests.find((r) => r.id === id);
    if (!request) return;

    setRejectedRequests((prev) => [...prev, request]);
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // Get current tab data
  const getCurrentData = (): TimeRequest[] => {
    if (selectedTab === "approved") return approvedRequests;
    if (selectedTab === "rejected") return rejectedRequests;
    return pendingRequests;
  };

  return (
    <div className="p-9 w-full mx-auto bg-white rounded-xl shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-xl font-semibold flex items-center">
          <Calendar size={20} className="mr-2" /> Time Request
        </h2>
        <Button
          className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} className="mr-2" /> Add Time
        </Button>
      </div>
      
      {/*Add Time Dialog*/}
      <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-30 " aria-hidden="true" />
        <div className="relative bg-white rounded-xl p-6 w-full max-w-md mx-auto shadow-2xl transform transition-all duration-300">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b">
            <Dialog.Title className="text-xl font-bold text-gray-900">
              Add Time
            </Dialog.Title>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mt-4">
            {/* Member Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Member Name
              </label>
              <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition">
                <option>No member found</option>
              </select>
            </div>

            {/* Project Assigned */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Assigned
              </label>
              <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition">
                <option>No Project Assigned</option>
              </select>
            </div>

            {/* Add Time Request */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                + Add Time Request
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition"
                />
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition"
                />
              </div>
            </div>

            {/* Total Time Range */}
            <div>
             
              {/* Date Picker Input */}
              <div className="relative w-full">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#9A4AFD] focus:border-[#9A4AFD] transition"
                  />
                  <Calendar
                    size={16}
                    className="absolute left-3 top-3 text-gray-600"
                  />
                </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#9A4AFD] text-white px-4 py-2 rounded-lg transition hover:bg-purple-600 shadow-md"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </Dialog>

      {/* Tabs Section */}
      <Tabs defaultValue="pending" onValueChange={(val) => setSelectedTab(val as "pending" | "approved" | "rejected")} className="mb-4 mt-5">
        <TabsList className="flex border-b">
          <TabsTrigger value="pending" className={`mr-4 ${selectedTab === "pending" ? "text-[#9A4AFD] border-b-2 border-purple-500" : "text-gray-500"}`}>
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved" className={`mr-4 ${selectedTab === "approved" ? "text-[#9A4AFD] border-b-2 border-[#9A4AFD]" : "text-gray-500"}`}>
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className={`mr-4 ${selectedTab === "rejected" ? "text-[#9A4AFD] border-b-2 border-[#9A4AFD]" : "text-gray-500"}`}>
            Rejected
          </TabsTrigger>
        </TabsList>
      </Tabs>
       {/* Filters Section */}
       <div className="flex gap-2 flex-wrap py-2">
        <Button variant="outline" className="flex items-center">
          <Users size={16} className="mr-2" /> Members
        </Button>
        <Button variant="outline" className="flex items-center">
          <Folder size={16} className="mr-2" /> Projects
        </Button>
        <Button variant="outline" className="flex items-center">
          <Briefcase size={16} className="mr-2" /> Teams
        </Button>
        <Button variant="outline" className="flex items-center">
          <Type size={16} className="mr-2" /> Titles
        </Button>
        <Button variant="outline" className="flex items-center">
          <Calendar size={16} className="mr-2" /> Oct 15, 2024 - Oct 20, 2024
        </Button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-lg border border-gray-300 mt-5">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead className={`${selectedTab === "pending" ? "bg-[#9A4AFD]" : selectedTab === "approved" ? "bg-[#9A4AFD]" : "bg-[#9A4AFD]"} text-white`}>
            <tr>
              <th className="p-3">Member</th>
              <th className="p-3">Project</th>
              <th className="p-3">Requested Time</th>
              <th className="p-3">Time Range</th>
              {selectedTab === "pending" && <th className="p-3 text-center">Actions</th>}
              {selectedTab === "approved" && <th className="p-3 text-center">Approved</th>}
              {selectedTab === "rejected" && <th className="p-3 text-center">Rejected</th>}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {getCurrentData().map((request) => (
              <tr key={request.id} className="border-b bg-purple-200 hover:bg-gray-200">
                {/* Member */}
                <td className="p-3 font-semibold">{request.name}</td>
                {/* Project */}
                <td className="p-3 font-semibold">{request.project}</td>
                {/* Requested Time */}
                <td className="p-3 font-semibold">{request.time}</td>
                {/* Time Range */}
                <td className="p-3 font-semibold">
                  {request.range} <br /> <span className="text-sm text-gray-500">{request.date}</span>
                </td>
                {/* Actions (Only for Pending) */}
                {selectedTab === "pending" && (
                  <td className="p-3 text-center flex items-center justify-center space-x-3">
                    <button onClick={() => handleApprove(request.id)} className="text-green-600 hover:text-green-800 transition">
                      <CheckCircle size={24} />
                    </button>
                    <button onClick={() => handleReject(request.id)} className="text-red-600 hover:text-red-800 transition">
                      <XCircle size={24} />
                    </button>
                  </td>
                )}
                {selectedTab === "approved" && (
  <td className="p-3 font-semibold text-center">
    <span className="bg-green-500 text-white px-4 py-1 rounded-full">Approved</span>
  </td>
)}

{selectedTab === "rejected" && (
  <td className="p-3 font-semibold text-center">
    <span className="bg-red-500 text-white px-4 py-1 rounded-full">Rejected</span>
  </td>
)}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

 
    </div>
  );
}
