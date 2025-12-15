import { useEffect, useState } from "react";

/* =========================================================
   SIMULATED BACKEND (JS MIRROR OF appointment_service.py)
========================================================= */

let appointmentsDB = [
  {
    id: 1,
    name: "Someshwar",
    date: "2025-12-05",
    time: "09:00 AM",
    duration: "30 min",
    doctorName: "Dr. Rajesh Kumar",
    status: "Confirmed",
    mode: "In-Person",
  },
  {
    id: 2,
    name: "vasanth",
    date: "2025-12-05",
    time: "10:00 AM",
    duration: "45 min",
    doctorName: "Dr. Priya Sharma",
    status: "Scheduled",
    mode: "In-Person",
  },
  {
    id: 3,
    name: "srinivas",
    date: "2025-12-06",
    time: "11:30 AM",
    duration: "30 min",
    doctorName: "Dr. Rajesh Kumar",
    status: "Upcoming",
    mode: "Video Call",
  },
  {
    id: 4,
    name: "Datta sai",
    date: "2025-12-07",
    time: "01:00 PM",
    duration: "20 min",
    doctorName: "Dr. Anjali Mehta",
    status: "Cancelled",
    mode: "In-Person",
  },
  {
    id: 5,
    name: "pooja",
    date: "2025-12-08",
    time: "03:00 PM",
    duration: "30 min",
    doctorName: "Dr. Rajesh Kumar",
    status: "Scheduled",
    mode: "Video Call",
  },
  {
    id: 6,
    name: "rakshitha",
    date: "2025-12-17",
    time: "10:45 AM",
    duration: "30 min",
    doctorName: "Dr. Priya Sharma",
    status: "Upcoming",
    mode: "In-Person",
  },
  {
    id: 7,
    name: "vyshnavi",
    date: "2025-12-15",
    time: "12:30 PM",
    duration: "25 min",
    doctorName: "Dr. Anjali Mehta",
    status: "Confirmed",
    mode: "In-Person",
  },
  {
    id: 8,
    name: "supraja",
    date: "2025-12-18",
    time: "02:00 PM",
    duration: "35 min",
    doctorName: "Dr. Rajesh Kumar",
    status: "Upcoming",
    mode: "Video Call",
  },
  {
    id: 9,
    name: "sanjana",
    date: "2025-12-14",
    time: "09:30 AM",
    duration: "30 min",
    doctorName: "Dr. Priya Sharma",
    status: "Confirmed",
    mode: "In-Person",
  },
  {
    id: 10,
    name: "harish",
    date: "2025-12-16",
    time: "11:00 AM",
    duration: "20 min",
    doctorName: "Dr. Anjali Mehta",
    status: "Scheduled",
    mode: "In-Person",
  },

];

/* Query Simulation */
function get_appointments(date = null) {
  if (!date) return [...appointmentsDB];
  return appointmentsDB.filter(a => a.date === date);
}

/* Mutation Simulation */
function update_appointment_status(id, newStatus) {
  appointmentsDB = appointmentsDB.map(a =>
    a.id === id ? { ...a, status: newStatus } : a
  );
}

/* =========================================================
   MAIN COMPONENT (UI PRESERVED)
========================================================= */

export default function EMR_Frontend_Assignment() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL");

  const today = "2025-12-05";

  useEffect(() => {
    setAppointments(get_appointments());
  }, []);

  /* Calendar Filtering */
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setActiveTab("ALL");
    setAppointments(get_appointments(date));
  };

  /* Tab Filtering */
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    let data = selectedDate
      ? get_appointments(selectedDate)
      : get_appointments();

    if (tab === "TODAY") {
      data = data.filter(a => a.date === today);
    } else if (tab === "UPCOMING") {
      data = data.filter(a => a.date > today);
    } else if (tab === "PAST") {
      data = data.filter(a => a.date < today);
    }

    setAppointments(data);
  };

  /* Status Update */
  const confirmAppointment = (id) => {
    update_appointment_status(id, "Confirmed");
    setAppointments(
      selectedDate ? get_appointments(selectedDate) : get_appointments()
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex gap-6">

      {/* ================= LEFT CALENDAR ================= */}
      <aside className="w-1/4 bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold mb-4">Calendar</h3>

        <div className="grid grid-cols-7 text-xs text-center text-gray-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {Array.from({ length: 30 }, (_, i) => {
            const date = `2025-12-${String(i + 1).padStart(2, "0")}`;
            return (
              <div
                key={date}
                onClick={() => handleDateClick(date)}
                className={`py-2 rounded-full cursor-pointer
                  ${
                    selectedDate === date
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-100"
                  }`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-sm space-y-2">
          <Legend color="green" label="Confirmed" />
          <Legend color="blue" label="Scheduled" />
          <Legend color="gray" label="Completed" />
          <Legend color="red" label="Cancelled" />
        </div>
      </aside>

      {/* ================= RIGHT PANEL ================= */}
      <main className="w-3/4 space-y-5">

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Appointment Management</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            + New Appointment
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <StatCard title="Confirmed" value={appointments.filter(a => a.status === "Confirmed").length} />
          <StatCard title="Upcoming" value={appointments.filter(a => a.date > today).length} />
          <StatCard title="Virtual" value={appointments.filter(a => a.mode === "Video Call").length} />
          <StatCard title="Total" value={appointments.length} />
        </div>

        <div className="flex gap-3">
          {["ALL", "TODAY", "UPCOMING", "PAST"].map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="bg-white rounded-xl shadow divide-y">
          {appointments.map(a => (
            <div key={a.id} className="p-5 flex justify-between">
              <div>
                <p className="font-semibold text-lg">{a.name}</p>
                <p className="text-sm text-gray-600">
                  {a.date} • {a.time} • {a.duration}
                </p>
                <p className="text-sm">{a.doctorName} • {a.mode}</p>
                <p className="text-xs text-gray-500">Status: {a.status}</p>
              </div>

              {a.status !== "Confirmed" && (
                <button
                  onClick={() => confirmAppointment(a.id)}
                  className="text-blue-600 hover:underline"
                >
                  Confirm
                </button>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   REUSABLE UI COMPONENTS
========================================================= */

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Legend({ color, label }) {
  const colors = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    gray: "bg-gray-500",
    red: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${colors[color]}`} />
      <span>{label}</span>
    </div>
  );
}
