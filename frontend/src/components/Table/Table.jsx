import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { use, useMemo, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayStudents } from "../../store/features/studentsSlice.js";
// Pure JSX version – no shadcn/ui, no external icons.
// Drop this into any React app. Optional: Tailwind classes used for quick styling.

// ---------- Types (commented for JSX) ----------
// type Student = {
//   id: string;
//   name: string;
//   rollNo: string;
//   className: string; // e.g., "10"
//   section: string; // e.g., "A"
//   email: string;
//   phone: string;
//   status: "Active" | "Inactive" | "Alumni";
//   gpa: number;
//   joinedAt: string; // YYYY-MM-DD
// };

// const studentsData = [
//   { id: "1", name: "Aarav Verma", rollNo: "S1001", className: "10", section: "A", email: "aarav.verma@example.com", phone: "+91 98765 43210", status: "Active", gpa: 9.1, joinedAt: "2023-04-12" },
//   { id: "2", name: "Ananya Gupta", rollNo: "S1002", className: "10", section: "B", email: "ananya.g@example.com", phone: "+91 98111 22233", status: "Active", gpa: 8.6, joinedAt: "2022-06-01" },
//   { id: "3", name: "Kabir Singh", rollNo: "S1003", className: "9", section: "C", email: "kabir.singh@example.com", phone: "+91 99000 12345", status: "Inactive", gpa: 7.8, joinedAt: "2021-08-21" },
//   { id: "4", name: "Zoya Khan", rollNo: "S1004", className: "12", section: "A", email: "zoya.khan@example.com", phone: "+91 90012 67890", status: "Active", gpa: 9.5, joinedAt: "2024-01-15" },
//   { id: "5", name: "Ishaan Patel", rollNo: "S1005", className: "11", section: "B", email: "ishaan.patel@example.com", phone: "+91 91234 56780", status: "Alumni", gpa: 8.2, joinedAt: "2020-07-10" },
//   { id: "6", name: "Meera Nair", rollNo: "S1006", className: "9", section: "A", email: "meera.nair@example.com", phone: "+91 94567 89012", status: "Active", gpa: 9.0, joinedAt: "2023-02-05" },
//   { id: "7", name: "Rohan Das", rollNo: "S1007", className: "12", section: "C", email: "rohan.das@example.com", phone: "+91 93456 78012", status: "Active", gpa: 7.4, joinedAt: "2024-03-03" },
//   { id: "8", name: "Simran Kaur", rollNo: "S1008", className: "11", section: "A", email: "simran.kaur@example.com", phone: "+91 99887 66554", status: "Inactive", gpa: 6.9, joinedAt: "2022-11-19" },
//   { id: "9", name: "Arjun Mehta", rollNo: "S1009", className: "10", section: "C", email: "arjun.mehta@example.com", phone: "+91 97654 32100", status: "Active", gpa: 8.9, joinedAt: "2023-09-10" },
//   { id: "10", name: "Priya Iyer", rollNo: "S1010", className: "9", section: "B", email: "priya.iyer@example.com", phone: "+91 92345 67801", status: "Active", gpa: 9.3, joinedAt: "2023-12-20" },
// ];

const statusChip = (status) => {
  const base = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs";
  if (status === "Active") return base + " bg-green-50 text-green-700 border-green-200";
  if (status === "Inactive") return base + " bg-amber-50 text-amber-700 border-amber-200";
  return base + " bg-slate-50 text-slate-700 border-slate-200"; // Alumni
};
function Students() {
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const studentsData = useSelector(state => state.students)
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [klass, setKlass] = useState("all");
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState({ key: "name", dir: "asc" }); // key in Student, dir asc|desc

  useEffect(() => {
    let data = null
    console.log()


    async function fetchStudents() {
      const token=localStorage.getItem('token')
      data = (await axios.post('http://localhost:3000/api/student',{},{headers:{
"Authorization":`Bearer ${token}`
      }}))
      dispatch(displayStudents(data.data))
    }
    fetchStudents()



  }, [dispatch])


  const allClasses = useMemo(() => {
    const set = new Set(studentsData.map((s) => s.className));
    return ["all", ...Array.from(set).sort((a, b) => Number(a) - Number(b))];
  }, [studentsData]);

  const toggleSort = (key) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = studentsData.filter((s) => {
      const matchesQ =
        !q ||
        [s.name, s.rollNo, s.className, s.section, s.email, s.phone]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesStatus = status === "all" || s.status === status;
      const matchesClass = klass === "all" || s.className === klass;
      return matchesQ && matchesStatus && matchesClass;
    });

    if (sort) {
      rows = rows.sort((a, b) => {
        const valA = a[sort.key];
        const valB = b[sort.key];
        if (typeof valA === "number" && typeof valB === "number") {
          return sort.dir === "asc" ? valA - valB : valB - valA;
        }
        return sort.dir === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return rows;
  }, [query, status, klass, sort, studentsData]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);
  const allVisibleSelected = visible.length > 0 && visible.every((r) => selected[r.id]);
  const someVisibleSelected = visible.some((r) => selected[r.id]);

  const toggleSelectAllVisible = (checked) => {
    const next = { ...selected };
    visible.forEach((r) => (next[r.id] = !!checked));
    setSelected(next);
  };

  const clearSelection = () => setSelected({});



  const exportCSV = () => {
    const rows = filtered.map((s) => [
      s.id,
      s.name,
      s.rollNo,
      `${s.className}-${s.section}`,
      s.email,
      s.phone,
      s.status,
      s.gpa,
      s.joinedAt,
    ]);
    const header = ["ID", "Name", "Roll No", "Class", "Email", "Phone", "Status", "GPA", "Joined At"];
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(","))
      .join("");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `students_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  //deleting the student
  async function deleteStudent() {
    const student = visible.filter((s) => s._id == arguments[0])[0]
    if (confirm(`Are you sure to delete : ${student.name}`)) {
      const data = (await axios.delete(`/api/student/${student.email}`)).data
      if (data.status === 200)
      {
      alert('Student deleted')
      navigate('/loggedin/Students')
      }
    else
      alert('student is not delete')

    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.2 }}
      className="p-6"
    >


      <div className="max-w-7xl min-w-325 min-w-325 mx-auto">
        <div className="rounded-2xl border shadow-sm bg-white">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Students</h2>
                <p className="text-sm text-gray-500">Manage student records, filter, sort and export.</p>
              </div>
              <div className="flex items-center gap-2">
                {someVisibleSelected && (
                  <button className="px-3 py-2 rounded-lg border" onClick={clearSelection}>Clear selection</button>
                )}
                <button className="px-3 py-2 rounded-lg border" onClick={exportCSV}>Export CSV</button>
                <NavLink to="/loggedin/Addstudent" className="px-3 py-2 rounded-lg text-white bg-black rounded-2xl" >Add Student</NavLink>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="p-4 sm:p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative w-full md:max-w-sm">
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  placeholder="Search by name, roll no, email..."
                  className="w-full pl-3 pr-3 py-2 rounded-lg border"
                />
              </div>

              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                className="px-3 py-2 rounded-lg border"
              >
                <option value="all">All status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Alumni">Alumni</option>
              </select>

              <select
                value={klass}
                onChange={(e) => { setKlass(e.target.value); setPage(1); }}
                className="px-3 py-2 rounded-lg border"
              >
                {allClasses.map((c) => (
                  <option key={c} value={c}>{c === "all" ? "All classes" : `Class ${c}`}</option>
                ))}
              </select>

              <select
                value={String(perPage)}
                onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                className="px-3 py-2 rounded-lg border"
              >
                {[5, 10, 20, 50].map(n => (
                  <option key={n} value={n}>{n} / page</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="p-4">
            <div className="overflow-auto rounded-xl border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="w-12 p-3">
                      <input
                        type="checkbox"
                        checked={!!visible.length && allVisibleSelected}
                        onChange={(e) => toggleSelectAllVisible(e.target.checked)}
                      />
                    </th>
                    <th className="p-3 min-w-[220px]">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("name")}>Name  </button>
                    </th>
                    <th className="p-3">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("rollNo")}>R. No  </button>
                    </th>
                    <th className="p-3">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("className")}>Class  </button>
                    </th>
                    <th className="p-3">Section</th>
                    <th className="p-3 min-w-[240px]">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("status")}>Status  </button>
                    </th>
                    <th className="p-3">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("gpa")}>GPA  </button>
                    </th>
                    <th className="p-3">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("joinedAt")}>Joined  </button>
                    </th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((s) => (
                    <tr key={s._id} className="border-t hover:bg-gray-50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={!!selected[s.id]}
                          onChange={(e) => setSelected((prev) => ({ ...prev, [s.id]: e.target.checked }))}
                          aria-label={`Select ${s.name}`}
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span className="font-medium">{s.name}</span>
                          <span className="text-xs text-gray-500">{s.email}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono">{s.rollNo}</td>
                      <td className="p-3">{s.className}</td>
                      <td className="p-3">{s.section}</td>
                      <td className="p-3 hidden md:table-cell">{s.email}</td>
                      <td className="p-3 hidden lg:table-cell">{s.phone}</td>
                      <td className="p-3"><span className={statusChip(s.status)}>{s.status}</span></td>
                      <td className="p-3 font-semibold">{s.gpa.toFixed(1)}</td>
                      <td className="p-3">{new Date(s.joinedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })}</td>
                      <td className="p-3 text-right">
                        <div className="inline-flex gap-2">
                          <button className="px-2 py-1 rounded border">View</button>
                          <button className="px-2 py-1 rounded border">Edit</button>
                          <button onClick={() => deleteStudent(s._id)} className="px-2 py-1 rounded border">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {visible.length === 0 && (
                    <tr>
                      <td colSpan={11} className="p-6 text-center text-gray-500">No records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer / Pagination */}
          <div className="px-4 pb-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{start + 1}</span>–
              <span className="font-medium">{Math.min(start + perPage, filtered.length)}</span> of
              <span className="font-medium"> {filtered.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-2 rounded-lg border ${pageSafe === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pageSafe === 1}
              >
                Prev
              </button>
              <div className="px-3 py-2 text-sm rounded-lg border bg-white">Page {pageSafe} / {totalPages}</div>
              <button
                className={`px-3 py-2 rounded-lg border ${pageSafe === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={pageSafe === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <p className="pt-3 text-xs text-gray-500">Tip: Use the search box to quickly find students by name, roll number, email, or phone.</p>
      </div>
    </motion.div>
  );
}



// Pure JSX version – no shadcn/ui, no external icons.
// Drop this into any React app. Optional: Tailwind classes used for quick styling.

// ---------- Types (commented for JSX) ----------
// type Teacher = {
//   id: string;
//   name: string;
//   rollNo: string;
//   className: string; // e.g., "10"
//   section: string; // e.g., "A"
//   email: string;
//   phone: string;
//   status: "Active" | "Inactive" | "Alumni";
//   gpa: number;
//   joinedAt: string; // YYYY-MM-DD
// };

const MOCK_Teachers = [
  { id: "1", name: "Aarav Verma", Id: "S1001", gender: "M", Degree: "Phd", email: "aarav.verma@example.com", phone: "+91 98765 43210", status: "Active", gpa: 9.1, joinedAt: "2023-04-12" },
  { id: "2", name: "Ananya Gupta", Id: "S1002", gender: "F", Degree: "B.tech", email: "ananya.g@example.com", phone: "+91 98111 22233", status: "Active", gpa: 8.6, joinedAt: "2022-06-01" },
  { id: "3", name: "Kabir Singh", Id: "S1003", gender: "M", Degree: "M.tech", email: "kabir.singh@example.com", phone: "+91 99000 12345", status: "Inactive", gpa: 7.8, joinedAt: "2021-08-21" },
  { id: "4", name: "Zoya Khan", Id: "S1004", gender: "F", Degree: "Mca", email: "zoya.khan@example.com", phone: "+91 90012 67890", status: "Active", gpa: 9.5, joinedAt: "2024-01-15" },
  { id: "5", name: "Ishaan Patel", Id: "S1005", gender: "M", Degree: "Bca", email: "ishaan.patel@example.com", phone: "+91 91234 56780", status: "Alumni", gpa: 8.2, joinedAt: "2020-07-10" },
  { id: "6", name: "Meera Nair", Id: "S1006", gender: "F", Degree: "Bsc", email: "meera.nair@example.com", phone: "+91 94567 89012", status: "Active", gpa: 9.0, joinedAt: "2023-02-05" },
  { id: "7", name: "Rohan Das", Id: "S1007", gender: "M", Degree: "B.tech", email: "rohan.das@example.com", phone: "+91 93456 78012", status: "Active", gpa: 7.4, joinedAt: "2024-03-03" },
  { id: "8", name: "Simran Kaur", Id: "S1008", gender: "F", Degree: "Msc", email: "simran.kaur@example.com", phone: "+91 99887 66554", status: "Inactive", gpa: 6.9, joinedAt: "2022-11-19" },
  { id: "9", name: "Arjun Mehta", Id: "S1009", gender: "M", Degree: "B.tech", email: "arjun.mehta@example.com", phone: "+91 97654 32100", status: "Active", gpa: 8.9, joinedAt: "2023-09-10" },
  { id: "10", name: "Priya Iyer", Id: "S1010", gender: "F", Degree: "Phd", email: "priya.iyer@example.com", phone: "+91 92345 67801", status: "Active", gpa: 9.3, joinedAt: "2023-12-20" },
];

// 

function Teachers() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [klass, setKlass] = useState("all");
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState({ key: "name", dir: "asc" }); // key in Teacher, dir asc|desc

  const gender = useMemo(() => {
    const set = new Set(MOCK_Teachers.map((s) => s.gender));
    return ["all", ...Array.from(set).sort((a, b) => Number(a) - Number(b))];
  }, []);

  const toggleSort = (key) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = MOCK_Teachers.filter((s) => {
      const matchesQ =
        !q ||
        [s.name, s.Id, s.gender, s.Degree, s.email, s.phone]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesStatus = status === "all" || s.status === status;
      const matchesGender = klass === "all" || s.gender === klass;
      return matchesQ && matchesStatus && matchesGender;
    });

    if (sort) {
      rows = rows.sort((a, b) => {
        const valA = a[sort.key];
        const valB = b[sort.key];
        if (typeof valA === "number" && typeof valB === "number") {
          return sort.dir === "asc" ? valA - valB : valB - valA;
        }
        return sort.dir === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return rows;
  }, [query, status, klass, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  const allVisibleSelected = visible.length > 0 && visible.every((r) => selected[r.id]);
  const someVisibleSelected = visible.some((r) => selected[r.id]);

  const toggleSelectAllVisible = (checked) => {
    const next = { ...selected };
    visible.forEach((r) => (next[r.Id] = !!checked));
    setSelected(next);
  };

  const clearSelection = () => setSelected({});

  const exportCSV = () => {
    const rows = filtered.map((s) => [
      s.id,
      s.name,
      s.Id,
      `${s.gender}-${s.Degree}`,
      s.email,
      s.phone,
      s.status,
      s.gpa,
      s.joinedAt,
    ]);
    const header = ["ID", "Name", "Id", "Class", "Email", "Phone", "Status", "Joined At"];
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(","))
      .join("");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Teachers_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.2 }}
      className="p-6"
    >
      <div className="max-w-7xl mx-auto min-w-325">
        <div className="rounded-2xl border shadow-sm bg-white">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Teachers</h2>
                <p className="text-sm text-gray-500">Manage Teacher records, filter, sort and export.</p>
              </div>
              <div className="flex items-center gap-2">
                {someVisibleSelected && (
                  <button className="px-3 py-2 rounded-lg border" onClick={clearSelection}>Clear selection</button>
                )}
                <button className="px-3 py-2 rounded-lg border" onClick={exportCSV}>Export CSV</button>
                <button className="px-3 py-2 rounded-lg text-white bg-black rounded-2xl">Add Teacher</button>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="p-4 sm:p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative w-full md:max-w-sm">
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  placeholder="Search by name, Id, email..."
                  className="w-full pl-3 pr-3 py-2 rounded-lg border"
                />
              </div>

              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                className="px-3 py-2 rounded-lg border"
              >
                <option value="all">All status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Alumni">Alumni</option>
              </select>

              <select
                value={klass}
                onChange={(e) => { setKlass(e.target.value); setPage(1); }}
                className="px-3 py-2 rounded-lg border"
              >
                {gender.map((c) => (
                  <option key={c} value={c}>{c === "all" ? "gender" : `Class ${c}`}</option>
                ))}
              </select>

              <select
                value={String(perPage)}
                onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                className="px-3 py-2 rounded-lg border"
              >
                {[5, 10, 20, 50].map(n => (
                  <option key={n} value={n}>{n} / page</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="p-4">
            <div className="overflow-auto rounded-xl border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="w-12 p-3">
                      <input
                        type="checkbox"
                        checked={!!visible.length && allVisibleSelected}
                        onChange={(e) => toggleSelectAllVisible(e.target.checked)}
                      />
                    </th>
                    <th className="p-3 min-w-[220px]">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("name")}>Name  </button>
                    </th>
                    <th className="p-3">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("id")}>Id  </button>
                    </th>
                    <th className="p-3">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("className")}>Gender  </button>
                    </th>
                    <th className="p-3">Degree</th>
                    <th className="p-3 min-w-[240px]">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("status")}>Status  </button>
                    </th>

                    <th className="p-3">
                      <button className="flex items-center gap-1" onClick={() => toggleSort("joinedAt")}>Joined  </button>
                    </th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((s) => (
                    <tr key={s.Id} className="border-t hover:bg-gray-50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={!!selected[s.Id]}
                          onChange={(e) => setSelected((prev) => ({ ...prev, [s.Id]: e.target.checked }))}
                          aria-label={`Select ${s.name}`}
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span className="font-medium">{s.name}</span>
                          <span className="text-xs text-gray-500">{s.email}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono">{s.Id}</td>
                      <td className="p-3">{s.gender}</td>
                      <td className="p-3">{s.Degree}</td>
                      <td className="p-3 hidden md:table-cell">{s.email}</td>
                      <td className="p-3 hidden lg:table-cell">{s.phone}</td>
                      <td className="p-3"><span className={statusChip(s.status)}>{s.status}</span></td>
                      <td className="p-3">{new Date(s.joinedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })}</td>
                      <td className="p-3 text-right">
                        <div className="inline-flex gap-2">
                          <button className="px-2 py-1 rounded border">View</button>
                          <button className="px-2 py-1 rounded border">Edit</button>
                          <button className="px-2 py-1 rounded border">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {visible.length === 0 && (
                    <tr>
                      <td colSpan={11} className="p-6 text-center text-gray-500">No records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer / Pagination */}
          <div className="px-4 pb-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{start + 1}</span>–
              <span className="font-medium">{Math.min(start + perPage, filtered.length)}</span> of
              <span className="font-medium"> {filtered.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-2 rounded-lg border ${pageSafe === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pageSafe === 1}
              >
                Prev
              </button>
              <div className="px-3 py-2 text-sm rounded-lg border bg-white">Page {pageSafe} / {totalPages}</div>
              <button
                className={`px-3 py-2 rounded-lg border ${pageSafe === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={pageSafe === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <p className="pt-3 text-xs text-gray-500">Tip: Use the search box to quickly find Teachers by name, Id, email, or phone.</p>
      </div>
    </motion.div>
  );
}


export { Teachers, Students }