"use client";

import React from "react";

const TimeRequest = () => {
  return (
    <div className="p-6  min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-300">
        <h1 className="text-2xl font-semibold flex items-center">
          <span className="mr-2">\u23F0</span> Time Request
        </h1>
        <button className="bg-purple-500 text-white px-4 py-2 rounded">+ Add Time</button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mt-4 border-b">
        <button className="text-purple-600 font-semibold border-b-2 border-purple-600 pb-2">Pending</button>
        <button className="text-gray-500">Approved</button>
        <button className="text-gray-500">Rejected</button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mt-4">
        <button className="border p-2 rounded">\ud83d\udc65 Members</button>
        <button className="border p-2 rounded">\ud83d\udcc5 Projects</button>
        <button className="border p-2 rounded">\ud83c\udf10 Teams</button>
        <button className="border p-2 rounded">T Titles</button>
        <input type="text" className="border p-2 rounded" value="Oct 15, 2024 - Oct 20, 2024" readOnly />
      </div>

      {/* Table */}
      <div className="mt-4 bg-purple-600 text-white p-2 rounded-t">
        <div className="grid grid-cols-4 font-semibold p-2">
          <div>Member</div>
          <div>Project</div>
          <div>Requested Time</div>
          <div>Time Range</div>
        </div>
      </div>
      <div className="bg-purple-200 p-2 rounded-b">
        {["Sohail Imran", "Mirza Ammad", "Hina Fatima", "Tahira", "Iqra"].map((name, index) => (
          <div key={index} className="grid grid-cols-4 p-2 border-b border-purple-300 items-center">
            <div className="flex items-center">
              <img
                src="/avatar-placeholder.png"
                alt="avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              {name}
            </div>
            <div>Horizon</div>
            <div>{["00:30", "00:20", "00:40", "00:15", "00:25"][index]}</div>
            <div className="flex justify-between">
              6:00 - 12:30 Oct, 15 2024
              <button className="bg-white p-1 rounded">✔️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeRequest;
