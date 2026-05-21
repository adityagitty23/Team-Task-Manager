import {
  NavLink,
  useNavigate,
} from "react-router-dom"

import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Users,
  LogOut,
  ClipboardList,
} from "lucide-react"

function Sidebar({
  mobileOpen,
  setMobileOpen,
}) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")

    localStorage.removeItem("user")

    navigate("/")
  }

  const navClass = ({
    isActive,
  }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
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

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white/10 backdrop-blur-2xl border-r border-white/10 p-5 transition-transform duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 mb-10">
          
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <ClipboardList
              className="text-white"
              size={28}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              Team Task Manager
            </h1>

            <p className="text-slate-300 text-sm mt-1">
              Team Workspace
            </p>
          </div>
        </div>

        <nav className="space-y-3">

          <NavLink
            to="/dashboard"
            className={navClass}
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <LayoutDashboard size={22} />
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={navClass}
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <FolderKanban size={22} />
            Projects
          </NavLink>

          <NavLink
            to="/tasks"
            className={navClass}
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <ListTodo size={22} />
            Tasks
          </NavLink>

          <NavLink
            to="/team"
            className={navClass}
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <Users size={22} />
            Team
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-500/20 w-full transition-all duration-300 text-slate-300"
          >
            <LogOut size={22} />
            Logout
          </button>

        </nav>
      </aside>
    </>
  )
}

export default Sidebar