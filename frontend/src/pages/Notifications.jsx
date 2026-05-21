/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react"

import DashboardLayout from "../layouts/DashboardLayout"
import API from "../services/api"

import {
  Bell,
  AlertTriangle,
} from "lucide-react"

function Notifications() {
  const [notifications, setNotifications] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const loadNotifications = async () => {
    try {
      const response = await API.get(
        "/tasks/overdue/all"
      )

      const overdueNotifications =
        response.data.map((task) => ({
          id: task._id,
          title: task.title,
          project: task.project?.title,
          date: task.dueDate,
        }))

      setNotifications(overdueNotifications)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-3xl font-bold text-white">
            Loading Notifications...
          </h1>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
          <Bell className="text-white" size={32} />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white">
            Notifications
          </h1>

          <p className="text-slate-300 mt-1">
            Stay updated with overdue tasks
          </p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-14 text-center shadow-2xl">
          <Bell
            size={70}
            className="mx-auto text-blue-400"
          />

          <h2 className="text-3xl font-bold text-white mt-6">
            No Notifications
          </h2>

          <p className="text-slate-300 mt-3 text-lg">
            You're all caught up.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-7 shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center border border-red-500/20">
                  <AlertTriangle className="text-red-400" />
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">
                    {notification.title}
                  </h2>

                  <p className="text-slate-300 mt-2">
                    Project:{" "}
                    {notification.project}
                  </p>

                  <p className="text-slate-400 mt-2">
                    Due Date:{" "}
                    {new Date(
                      notification.date
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-red-500/20 text-red-400 border border-red-500/20 px-5 py-3 rounded-2xl text-sm w-fit">
                  Overdue
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}

export default Notifications