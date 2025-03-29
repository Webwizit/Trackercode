"use client";
import Select from "react-select";
import { useState,useEffect } from "react";
import { IoMdClose, IoMdMore } from "react-icons/io";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Calendar, ChevronDown, Folder, Plus} from "lucide-react";
import { Dialog } from "@headlessui/react";
import { FiLayers } from "react-icons/fi";
import { MultiValue, ActionMeta } from "react-select";

interface Member {
    id: number;
    name: string;
  }
  
  interface Project {
    id?: number;
    name: string;
    billable: boolean;
    startDate: string;
    endDate: string;
    time_estimate: number;
    budget_estimate: number;
    notes: string;
    members: number[]; // Store selected member IDs
    manager: string;
    viewer: string;
    weeklyLimit: number;
    hourlyRate: number;
    screenshotMode: string;
  }
  
  export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState<string>("Project");
  const [actionMenuOpen, setActionMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const uniqueMembers = Array.from(new Map(members.map(m => [m.id, m])).values());

  // Open & Close Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
    // Initial project state
    const [projectData, setProjectData] = useState<Project>({
      name: "",
      billable: false,
      startDate: "",
      endDate: "",
      time_estimate: 0,
      budget_estimate: 0,
      notes: "",
      members: [], // Store IDs
      manager: "",
      viewer: "",
      weeklyLimit: 0,
      hourlyRate: 0,
      screenshotMode: "Default (Screenshot)",
    });
  
    // Fetch members from API
    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/members/")
        .then((res) => res.json())
        .then((data: Member[]) => {
          // Ensure unique members based on 'id'
          const uniqueMembers = Array.from(new Map(data.map(m => [m.id, m])).values());
          setMembers(uniqueMembers); // Now correctly typed
        })
        .catch((err) => console.error("Error fetching members:", err));
    }, []);
    
  
    // Fetch projects from API
    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/projects/")
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.error("Error fetching projects:", err));
    }, []);
  
    // Handle input change
    
    const handleChange = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value, type, checked } = e.target as HTMLInputElement;
  
      setProjectData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked :
          ["weeklyLimit", "hourlyRate", "time_estimate", "budget_estimate"].includes(name)
            ? Number(value) || 0
            : name === "members"
            ? (Array.isArray(value) ? value.map(Number) : []) // Convert members to IDs
            : value,
      }));
    };
    const handleMembersChange = (selectedOptions: any) => {
      setProjectData((prevData) => ({
        ...prevData,
        members: selectedOptions ? selectedOptions.map((option: any) => option.value) : [],
      }));
    };
    
    
    
    
  
    // Handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Submitting Project Data: ", projectData);
  
      const cleanData = {
        ...projectData,
        start_date: projectData.startDate,
        end_date: projectData.endDate,
        members: projectData.members, // Ensure IDs are sent
      };
  
      console.log("Final Clean Data before submitting:", cleanData);
  
      try {
        const response = await fetch("http://127.0.0.1:8000/api/createproject/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanData),
        });
  
        if (response.ok) {
          console.log("Project created successfully");
          setIsModalOpen(false);
        } else {
          const errorData = await response.json();
          console.error("Failed to create project:", errorData);
        }
      } catch (error) {
        console.error("Error submitting project:", error);
      }
    };

  return (  
    <div className="p-9 w-full mx-auto bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-xl font-semibold flex items-center">
          <Folder size={30} className="mr-2" /> Projects 
        </h1>
      </div>
      {/* Tab Navigation */}
      <div className="flex justify-between border-b pb-2">
  {/* Tabs (Left Side) */}
  <div className="flex">
    {["Active", "Inactive"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 ${
          activeTab === tab ? "border-b-2 border-[#9A4AFD] text-[#9A4AFD]" : "text-gray-500"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Right Side Buttons */}
  <div className="flex items-center gap-3">
    {/* Action Dropdown */}
      {/* Create Project Button */}
       <Button
            className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={openModal}
          >
            <Plus size={16} className="mr-2" /> Create Project
          </Button>
    <div className="relative">
      <button
           onClick={() => setActionMenuOpen(!actionMenuOpen)}
        className="border px-4 py-2 rounded-lg bg-white shadow-sm flex items-center"
      >
        Action <ChevronDown size={16} className="ml-2" />
      </button>

      {actionMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Sort Alphabetically</button>
          <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Archive All</button>
        </div>
      )}
    </div>
  </div>
</div>


      {/* Filter Buttons */}
      <div className="flex gap-2 my-4">
        <Button variant="outline">📂 Projects</Button>
        <Button variant="outline">👥 Group Projects</Button>
        <Button variant="outline">📄 Contracts</Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg shadow-md overflow-hidden">
      <table className="w-full border-collapse text-center">
        {/* Table Header */}
        <thead className="bg-[#9A4AFD] text-white ">
          <tr>
            <th className="px-4 py-3 text-center">Projects</th>
            <th className="px-4 py-3 text-center">Members</th>
            <th className="px-4 py-3 text-center">Hours Spent</th>
            <th className="px-4 py-3 text-center">Active Tasks</th>
            <th className="px-4 py-3 text-center">Notes</th>
            <th className="px-4 py-3 text-center">Estimate Hours</th>
            <th className="px-4 py-3 text-center">Budget Estimate</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project.id} className="bg-gray-50 text-center align-middle">
                <td className="px-4 py-3">{project.name}
                <br />
  <a href="/Tasks/addtasks" className="text-blue-500 hover:underline">
   Add New Tasks
  </a>
                </td>
                <td className="px-4 py-3">
                  {project.members.length > 0 ? (
                    project.members.map((member) => (
                      <div key={member} className="bg-purple-100 px-3 py-1 text-purple-600 rounded-md inline-block m-1">
                        {member}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500">No Members</span>
                  )}
                </td>
                <td className="px-4 py-3">0:00</td>
                <td className="px-4 py-3"> 0</td>
                <td className="px-4 py-3 text-gray-500">{project.notes || "No Data"}</td>
                
                <td className="border p-2">{project.time_estimate || "N/A"}</td>

                <td className="border p-2">${ project.budget_estimate || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr className="bg-gray-50 text-center">
             
            </tr>
          )}
        </tbody>
      </table>
      </div>
         {/* Projects Table (omitted for brevity) */}
      {/* ... */}

      {/* Create Project Modal */}
      
  <Dialog open={isModalOpen} onClose={closeModal} className="fixed inset-0 z-50 overflow-y-auto">
  <div className="flex items-center justify-center min-h-screen">
    <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
    <div className="relative bg-white rounded-xl p-6 w-full max-w-md mx-auto shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-center">
        <Dialog.Title className="text-lg font-semibold text-gray-800">New Project</Dialog.Title>
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition">
          <IoMdClose size={22} />
        </button>
      </div>
      <div className="flex space-x-6 border-b mt-4">
        {["Project", "Members", "Properties"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm font-medium ${activeTab === tab ? "border-b-2 border-purple-500 text-purple-500" : "text-gray-500"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className={activeTab === "Project" ? "block" : "hidden"}>
          <label className="block text-sm font-medium text-gray-700">Project Name *</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 space-x-2">
            <FiLayers size={18} className="text-gray-500" />
            <input type="text" name="name" className="w-full outline-none border-none" placeholder="Enter project name" onChange={handleChange} required />
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="billable" className="sr-only peer" onChange={handleChange} />
              <div className="w-10 h-5 bg-gray-300 peer-checked:bg-purple-500 rounded-full"></div>
            </label>
            <span className="text-sm text-gray-700">Billable</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <input type="date" name="startDate" className="border px-3 py-2 rounded-lg text-sm" onChange={handleChange} />
            <input type="date" name="endDate" className="border px-3 py-2 rounded-lg text-sm" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time Estimate (Hours)</label>
                    <input type="number" name="time_estimate" className="w-full border px-3 py-2 rounded-lg text-sm" placeholder="Enter hours" onChange={handleChange} min="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Budget ($)</label>
                    <input type="number" name="budget_estimate" className="w-full border px-3 py-2 rounded-lg text-sm" placeholder="Enter budget" onChange={handleChange} min="0" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Notes</label>
                  <textarea name="notes" rows={3} className="w-full border px-3 py-2 rounded-lg text-sm h-24" placeholder="Add notes here" onChange={handleChange}></textarea>
                </div>
        </div>
        
        <div className={activeTab === "Members" ? "block" : "hidden"}>
          <label className="block text-sm font-medium text-gray-700">Members *</label>
          <Select
    isMulti
    options={members.map((member) => ({ value: member.id, label: member.name }))}
    className="w-full text-sm"
    value={members
      .filter((member) => projectData.members.includes(member.id))
      .map((member) => ({ value: member.id, label: member.name }))}
    onChange={handleMembersChange}
  />

         
          <label className="block text-sm font-medium text-gray-700 mt-3">Project Manager</label>
          <select className="w-full border px-3 py-2 rounded-lg text-sm" name="manager" onChange={handleChange}>
            <option>Select Manager</option>
            <option>Manager 1</option>
          </select>
          <label className="block text-sm font-medium text-gray-700">Project viewer</label>
                  <select className="w-full border px-3 py-2 rounded-lg text-sm">
                <option>Select Viewers</option>
                    <option>Viewer 1</option>
                    <option>Viewer 2</option>
                  </select>
        </div>

        <div className={activeTab === "Properties" ? "block" : "hidden"}>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" className="border px-3 py-2 rounded-lg text-sm" name="weekly_limit" placeholder="Weekly limit per member" onChange={handleChange} />
            <input
  type="number"
  className="border px-3 py-2 rounded-lg text-sm"
  name="hourlyRate"
  placeholder="Hourly rate"
  onChange={handleChange}
/>

          </div>
          <label className="block text-sm font-medium text-gray-700 mt-3">Screenshot Mode</label>
          <select className="w-full border px-3 py-2 rounded-lg text-sm" name="screenshot_mode" onChange={handleChange}>
            <option>Default (Screenshot)</option>
            <option>Screenshot</option>
            <option>No Screenshot</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={closeModal} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">Cancel</button>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700">Create Project</button>
        </div>
      </form>
    </div>
  </div>
</Dialog>

    </div>
    
  );
}
