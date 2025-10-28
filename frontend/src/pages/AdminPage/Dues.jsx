import React from "react";
import { Eye, Edit2, Check } from "lucide-react";
import AuthLayoutAdmin from "../../layout/AuthLayoutAdmin";

export default function DuesTable() {
  return (
  
    <div className="px-1">
      <div className="bg-white shadow-md rounded-xl p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Dues</h2>
          <div className="flex gap-2">
            <select className="border rounded-md px-3 py-1 text-sm">
              <option>III Year</option>
              <option>II Year</option>
              <option>I Year</option>
            </select>
            <select className="border rounded-md px-3 py-1 text-sm">
              <option>50% Paid</option>
              <option>Not Paid</option>
              <option>Fully Paid</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              className="border rounded-md px-3 py-1 text-sm"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm">
              Add
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-600">
                <th className=" py-4 px-10">Name</th>
                <th className=" py-4 px-10">Class</th>
                <th className=" py-4 px-10">Total</th>
                <th className=" py-4 px-10">Pending</th>
                <th className=" py-4 px-10">50% Paid</th>
                <th className=" py-4 px-10">Edit</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "John", year: "III", total: 38000, pending: 12000 },
                { name: "Arjun Kumar", year: "III", total: 38000, pending: 14000 },
                { name: "Rahul Verma", year: "III", total: 38000, pending: 11000 },
                { name: "Sneha", year: "III", total: 38000, pending: 15000 },
              ].map((student, index) => (
                <tr key={index} className="border-b text-sm hover:bg-gray-50">
                  <td className="py-2 px-10">{student.name}</td>
                  <td className="py-2 px-10">{student.year}</td>
                  <td className="py-2 px-10">{student.total}</td>
                  <td className="py-2 px-10">{student.pending}</td>
                  <td className="py-2 px-10 text-green-600">
                    <Check className="w-4 h-4 inline" />
                  </td>
                  <td className="py-2 px-3 flex gap-2">
                    <button className="text-gray-600 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-green-600">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <button className="border rounded px-2 py-1">&lt;</button>
            <span>Page 1 of 2</span>
            <button className="border rounded px-2 py-1">&gt;</button>
          </div>
          <span>Total Students: 8</span>
        </div>
      </div>
    </div>
 
    
  );
}
