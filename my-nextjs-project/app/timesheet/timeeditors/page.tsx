"use client";
import { useState } from "react";
import { ChevronDown } from "react-feather";

// Define TypeScript types
type ColumnKeys = "Project Member" | "Members" | "Hours Spent" | "Active Tasks" | "Notes" | "Actions" | "Estimate Hours" | "Budget Estimate";
type ColumnsState = Record<ColumnKeys, boolean>;

interface ColumnSelectorProps {
  columns: ColumnsState;
  setColumns: React.Dispatch<React.SetStateAction<ColumnsState>>;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ columns, setColumns }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Handle checkbox change
  const toggleColumn = (columnName: ColumnKeys) => {
    setColumns((prev: ColumnsState) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  return (
    <div className="relative">
      {/* Columns Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border px-4 py-2 rounded-lg bg-white shadow-sm flex items-center"
      >
        Columns <ChevronDown size={16} className="ml-2" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg p-2">
          {Object.keys(columns).map((col) => (
            <label key={col} className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-100">
              <input
                type="checkbox"
                checked={columns[col as ColumnKeys]}
                onChange={() => toggleColumn(col as ColumnKeys)}
                className="mr-2"
              />
              {col}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectTable: React.FC = () => {
  // Manage column visibility
  const [columns, setColumns] = useState<ColumnsState>({
    "Project Member": true,
    Members: true,
    "Hours Spent": true,
    "Active Tasks": true,
    Notes: true,
    Actions: true,
    "Estimate Hours": true,
    "Budget Estimate": true,
  });

  return (
    <div>
      {/* Column Selector */}
      <div className="flex justify-end mb-4">
        <ColumnSelector columns={columns} setColumns={setColumns} />
      </div>

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200 text-center align-middle">
            {columns["Project Member"] && <th className="border p-2">Project Member</th>}
            {columns["Members"] && <th className="border p-2">Members</th>}
            {columns["Hours Spent"] && <th className="border p-2">Hours Spent</th>}
            {columns["Active Tasks"] && <th className="border p-2">Active Tasks</th>}
            {columns["Notes"] && <th className="border p-2">Notes</th>}
            {columns["Actions"] && <th className="border p-2">Actions</th>}
            {columns["Estimate Hours"] && <th className="border p-2">Estimate Hours</th>}
            {columns["Budget Estimate"] && <th className="border p-2">Budget Estimate</th>}
          </tr>
        </thead>
        <tbody>
          <tr  className="text-center align-middle">
            {columns["Project Member"] && <td className="border p-2">John Doe</td>}
            {columns["Members"] && <td className="border p-2">4</td>}
            {columns["Hours Spent"] && <td className="border p-2">90</td>}
            {columns["Active Tasks"] && <td className="border p-2">5</td>}
            {columns["Notes"] && <td className="border p-2">No Data</td>}
            {columns["Actions"] && <td className="border p-2">...</td>}
            {columns["Estimate Hours"] && <td className="border p-2">100</td>}
            {columns["Budget Estimate"] && <td className="border p-2">$5000</td>}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
