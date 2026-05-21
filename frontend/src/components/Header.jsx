/* eslint-disable react-hooks/set-state-in-effect */
import {useEffect,useState,} from "react"

import { useNavigate } from "react-router-dom"

import {
  Menu,
  Bell,
  AlertTriangle,
} from "lucide-react"

import API from "../services/api"

function Header({ setMobileOpen }) {
  const navigate = useNavigate()

  const [notifications, setNotifications] =
    useState([])

  const [showNotifications, setShowNotifications] =
    useState(false)

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const loadNotifications = async () => {
    try {
      const response = await API.get(
        "/tasks/overdue/all"
      )

      setNotifications(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 md:px-6 py-4 flex items-center justify-between relative z-[100]">      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            setMobileOpen(true)
          }
          className="md:hidden"
        >
          <Menu className="text-white" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-white">
            Team Task Manager
          </h1>

          <p className="text-slate-300 text-sm">
            Manage your workflow
            efficiently
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() =>
            setShowNotifications(
              !showNotifications
            )
          }
          className="relative w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 hover:bg-white/20 transition"
        >
          <Bell
            className="text-white"
            size={20}
          />

          {notifications.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
              {notifications.length}
            </div>
          )}
        </button>

<div className="flex items-center gap-3">

          <div
            className={`hidden sm:flex items-center px-4 py-2 rounded-xl border text-sm font-semibold capitalize ${
              user?.role === "admin"
                ? "bg-blue-500/20 border-blue-500/20 text-blue-400"
                : "bg-green-500/20 border-green-500/20 text-green-400"
            }`}
          >
            {user?.role}
          </div>

          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30 uppercase">
            {user?.name?.charAt(0)}
          </div>

        </div>

        {showNotifications && (
          <div className="absolute top-16 right-0 w-[360px] bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-[9999]">
            <div className="p-5 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                Notifications
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Recent updates
              </p>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length ===
              0 ? (
                <div className="p-10 text-center">
                  <Bell
                    size={50}
                    className="mx-auto text-slate-500"
                  />

                  <p className="text-slate-400 mt-4">
                    No notifications
                  </p>
                </div>
              ) : (
                notifications.map((task) => (
                  <div
                    key={task._id}
                    className="p-5 border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center border border-red-500/20">
                        <AlertTriangle className="text-red-400" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-white font-semibold">
                          {task.title}
                        </h3>

                        <p className="text-slate-400 text-sm mt-1">
                          {
                            task.project
                              ?.title
                          }
                        </p>

                        <p className="text-red-400 text-sm mt-2">
                          Due:{" "}
                          {new Date(
                            task.dueDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() =>
                navigate(
                  "/notifications"
                )
              }
              className="w-full py-4 text-center text-blue-400 hover:bg-white/5 transition"
            >
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header