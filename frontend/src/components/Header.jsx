/* eslint-disable react-hooks/set-state-in-effect */

import {
  Menu,
  Bell,
} from "lucide-react"

import {
  Link,
} from "react-router-dom"

import {
  useEffect,
  useState,
} from "react"

import API from "../services/api"

function Header({
  setMobileOpen,
}) {
  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const [count, setCount] =
    useState(0)

  const fetchNotifications =
    async () => {
      try {
        const response =
          await API.get(
            "/notifications"
          )

        const unread =
          response.data.filter(
            (
              notification
            ) =>
              !notification.isRead
          )

        setCount(
          unread.length
        )
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between">
      
      <div className="flex items-center gap-4">
        
        <button
          className="md:hidden"
          onClick={() =>
            setMobileOpen(true)
          }
        >
          <Menu className="text-white" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-white">
            Team Task Manager
          </h1>

          <p className="text-slate-300 text-sm">
            Manage workflow
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        
        <Link
          to="/notifications"
          className="relative bg-white/10 border border-white/10 p-3 rounded-xl hover:bg-white/20 transition"
        >
          <Bell className="text-white" />

          {count > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              {count}
            </div>
          )}
        </Link>

        <div className="hidden md:flex flex-col items-end">
          
          <p className="text-white font-semibold">
            {user?.name}
          </p>

          <span className="text-xs text-blue-300 uppercase">
            {user?.role}
          </span>
        </div>

        <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center font-bold uppercase text-white">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </div>
  )
}

export default Header