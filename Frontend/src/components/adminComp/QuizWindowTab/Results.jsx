import React, { useState } from "react";
import {
  X,
  Search,
  Download,
  FileText,
  FileImage,
  FileSpreadsheet,
  BarChart3,
} from "lucide-react";

const ResultsTab = ({ open = true, onClose, colorMode, quiz }) => {
  if (!open) return null;
  const [activeTab, setActiveTab] = useState("scores");

  const students = [
    {
      _id: 1,
      name: "Abhishek Kumar",
      email: "abhishek.kumar@example.com",
      rollNo: "CS101",
      score: 48,
      totalMarks: 50,
      percentage: 96,
      status: "Passed",
      submittedAt: "04 Jun 2026, 10:15 AM",
    },
    {
      _id: 2,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      rollNo: "CS102",
      score: 46,
      totalMarks: 50,
      percentage: 92,
      status: "Passed",
      submittedAt: "04 Jun 2026, 10:17 AM",
    },
    {
      _id: 3,
      name: "Aman Verma",
      email: "aman.verma@example.com",
      rollNo: "CS103",
      score: 44,
      totalMarks: 50,
      percentage: 88,
      status: "Passed",
      submittedAt: "04 Jun 2026, 10:18 AM",
    },
    {
      _id: 4,
      name: "Priya Singh",
      email: "priya.singh@example.com",
      rollNo: "CS104",
      score: 42,
      totalMarks: 50,
      percentage: 84,
      status: "Passed",
      submittedAt: "04 Jun 2026, 10:20 AM",
    },
    {
      _id: 5,
      name: "Neha Gupta",
      email: "neha.gupta@example.com",
      rollNo: "CS105",
      score: 40,
      totalMarks: 50,
      percentage: 80,
      status: "Passed",
      submittedAt: "04 Jun 2026, 10:22 AM",
    },
    {
      _id: 6,
      name: "Rohit Yadav",
      email: "rohit.yadav@example.com",
      rollNo: "CS106",
      score: 37,
      totalMarks: 50,
      percentage: 74,
      status: "Passed",
      submittedAt: "04 Jun 2026, 10:25 AM",
    },
    {
      _id: 7,
      name: "Sneha Mishra",
      email: "sneha.mishra@example.com",
      rollNo: "CS107",
      score: 34,
      totalMarks: 50,
      percentage: 68,
      status: "Passed",
      submittedAt: "04 Jun 2026, 10:28 AM",
    },
    {
      _id: 8,
      name: "Vikas Patel",
      email: "vikas.patel@example.com",
      rollNo: "CS108",
      score: 31,
      totalMarks: 50,
      percentage: 62,
      status: "Passed",
      submittedAt: "04 Jun 2026, 10:30 AM",
    },
    {
      _id: 9,
      name: "Anjali Kumari",
      email: "anjali.kumari@example.com",
      rollNo: "CS109",
      score: 26,
      totalMarks: 50,
      percentage: 52,
      status: "Passed",
      submittedAt: "04 Jun 2026, 10:32 AM",
    },
    {
      _id: 10,
      name: "Karan Raj",
      email: "karan.raj@example.com",
      rollNo: "CS110",
      score: 22,
      totalMarks: 50,
      percentage: 44,
      status: "Failed",
      submittedAt: "04 Jun 2026, 10:35 AM",
    },
    {
      _id: 11,
      name: "Pooja Kumari",
      email: "pooja.kumari@example.com",
      rollNo: "CS111",
      score: 0,
      totalMarks: 50,
      percentage: 0,
      status: "Absent",
      submittedAt: "--",
    },
    {
      _id: 12,
      name: "Aditya Sinha",
      email: "aditya.sinha@example.com",
      rollNo: "CS112",
      score: 18,
      totalMarks: 50,
      percentage: 36,
      status: "Failed",
      submittedAt: "04 Jun 2026, 10:40 AM",
    },
  ];

  return (
    <div>
      {/* Toolbar */}
      <div
        className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 px-5 border-b ${
          colorMode ? "border-slate-700" : "border-slate-200"
        }`}
      >
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search
            size={16}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              colorMode ? "text-slate-500" : "text-slate-400"
            }`}
          />

          <input
            type="text"
            placeholder="Search student..."
            className={`w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none transition ${
              colorMode
                ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                : "bg-white border-slate-300 text-slate-900 focus:border-indigo-500"
            }`}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <span
            className={`text-sm ${
              colorMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            0 Results
          </span>

          <div className="relative">
            <select
              className={`cursor-pointer rounded-xl border px-4 py-2 text-sm outline-none ${
                colorMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-300 text-slate-900"
              }`}
            >
              <option value="">Export As</option>
              <option value="pdf">PDF</option>
              <option value="word">Word</option>
              <option value="image">Image</option>
            </select>
          </div>

          <button className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-95">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Content */}

      <div
        className={`flex-1 px-5 py-3 max-h-[420px] overflow-y-auto ${
          colorMode ? "bg-slate-900" : "bg-slate-50/50"
        }`}
      >
        {false ? (
          <div
            className={`h-full rounded-2xl border border-dashed flex flex-col items-center justify-center text-center ${
              colorMode ? "border-slate-700" : "border-slate-300"
            }`}
          >
            <FileSpreadsheet
              size={48}
              className={colorMode ? "text-slate-600" : "text-slate-400"}
            />

            <h3
              className={`mt-4 text-lg font-semibold ${
                colorMode ? "text-white" : "text-slate-900"
              }`}
            >
              Scores Content Area
            </h3>

            <p
              className={`mt-2 max-w-md text-sm ${
                colorMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Student score table, filters, analytics, ranking cards and export
              data will appear here.
            </p>

            <div className="flex gap-3 mt-5">
              <div className="rounded-xl border px-3 py-2 text-xs flex items-center gap-2">
                <FileText size={14} />
                PDF
              </div>

              <div className="rounded-xl border px-3 py-2 text-xs flex items-center gap-2">
                <FileText size={14} />
                Word
              </div>

              <div className="rounded-xl border px-3 py-2 text-xs flex items-center gap-2">
                <FileImage size={14} />
                Image
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`overflow-hidden rounded-2xl border ${
              colorMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className={colorMode ? "bg-slate-700/50" : "bg-slate-50"}>
                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Rank
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Student
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Roll No
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Score
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Percentage
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Status
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Submitted
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students?.length > 0 ? (
                    students.map((student, index) => (
                      <tr
                        key={student._id || index}
                        className={`border-t transition-colors ${
                          colorMode
                            ? "border-slate-700 hover:bg-slate-700/30"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {/* Rank */}
                        <td
                          className={`px-4 py-3 ${
                            colorMode ? "text-slate-200" : "text-slate-700"
                          }`}
                        >
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                              index === 0
                                ? "bg-yellow-100 text-yellow-700"
                                : index === 1
                                  ? "bg-slate-200 text-slate-700"
                                  : index === 2
                                    ? "bg-orange-100 text-orange-700"
                                    : colorMode
                                      ? "bg-slate-700 text-slate-300"
                                      : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>

                        {/* Student Name */}
                        <td className="px-4 py-3">
                          <div>
                            <p
                              className={`font-medium ${
                                colorMode ? "text-slate-100" : "text-slate-900"
                              }`}
                            >
                              {student.name}
                            </p>

                            <p
                              className={`text-xs ${
                                colorMode ? "text-slate-400" : "text-slate-500"
                              }`}
                            >
                              {student.email}
                            </p>
                          </div>
                        </td>

                        {/* Roll */}
                        <td
                          className={`px-4 py-3 ${
                            colorMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          {student.rollNo}
                        </td>

                        {/* Score */}
                        <td
                          className={`px-4 py-3 font-medium ${
                            colorMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {student.score}/{student.totalMarks}
                        </td>

                        {/* Percentage */}
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              student.percentage >= 80
                                ? "bg-emerald-100 text-emerald-700"
                                : student.percentage >= 50
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.percentage}%
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              student.status === "Passed"
                                ? "bg-emerald-100 text-emerald-700"
                                : student.status === "Absent"
                                  ? "bg-slate-100 text-slate-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>

                        {/* Submitted */}
                        <td
                          className={`px-4 py-3 text-sm ${
                            colorMode ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {student.submittedAt}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className={`py-12 text-center ${
                          colorMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        No score records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsTab;
