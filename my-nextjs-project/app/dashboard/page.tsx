"use client";

import React from "react";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          {/* Replace with your logo if available */}
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="ml-2 text-2xl font-bold text-blue-600">
            Dashboard
          </span>
        </div>
        <div>
          <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
            Profile
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6">
          <nav>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Users
              </h3>
              <p className="mt-2 text-3xl font-bold text-blue-600">1,200</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-700">Revenue</h3>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                $32,000
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-700">Orders</h3>
              <p className="mt-2 text-3xl font-bold text-blue-600">350</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Recent Activity
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">
                    User John Doe signed up
                  </span>
                  <span className="text-gray-400 text-sm">2 minutes ago</span>
                </li>
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">
                    Order #1234 placed
                  </span>
                  <span className="text-gray-400 text-sm">10 minutes ago</span>
                </li>
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">
                    Payment received for Order #1233
                  </span>
                  <span className="text-gray-400 text-sm">1 hour ago</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
