import {
  NavLink,
  useNavigate,
} from "react-router-dom"

import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Users,
  Bell,
  LogOut,
  ClipboardList,
} from "lucide-react"

function Sidebar({
  mobileOpen,
  setMobileOpen,
}) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    )

    localStorage.removeItem(
      "user"
    )

    navigate("/")
  }

  const navClass = ({
    isActive,
  }) =>
    `flex items-center gap-3 p-4 rounded-2xl transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-white/10 text-slate-300"
    }`

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 w-64 h-screen bg-white/10 backdrop-blur-xl border-r border-white/10 p-5 transition-transform duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
            <ClipboardList className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Team Task
            </h1>

            <p className="text-slate-300 text-sm">
              Manager
            </p>
          </div>
        </div>

        <nav className="space-y-3">
          <NavLink
            to="/dashboard"
            className={navClass}
          >
            <LayoutDashboard />
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={navClass}
          >
            <FolderKanban />
            Projects
          </NavLink>

          <NavLink
            to="/tasks"
            className={navClass}
          >
            <ListTodo />
            Tasks
          </NavLink>

          <NavLink
            to="/team"
            className={navClass}
          >
            <Users />
            Team
          </NavLink>

          <NavLink
            to="/notifications"
            className={navClass}
          >
            <Bell />
            Notifications
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-red-500 text-slate-300"
          >
            <LogOut />
            Logout
          </button>
        </nav>
      </div>
    </>
  )
}

export default Sidebar