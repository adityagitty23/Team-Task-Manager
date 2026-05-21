import {
  useEffect,
  useState,
} from "react"

import DashboardLayout from "../layouts/DashboardLayout"

import API from "../services/api"

import {
  Bell,
  CheckCircle2,
} from "lucide-react"

function Notifications() {
  const [notifications, setNotifications] =
    useState([])

  useEffect(() => {
    const fetchNotifications =
      async () => {
        try {
          const response =
            await API.get(
              "/notifications"
            )

          setNotifications(
            response.data
          )
        } catch (error) {
          console.log(error)
        }
      }

    fetchNotifications()
  }, [])

  const markAsRead =
    async (id) => {
      try {
        await API.put(
          `/notifications/${id}/read`
        )

        setNotifications(
          (prev) =>
            prev.map(
              (
                notification
              ) =>
                notification._id ===
                id
                  ? {
                      ...notification,
                      isRead: true,
                    }
                  : notification
            )
        )
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 mb-8">
        
        <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center">
          <Bell className="text-white" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white">
            Notifications
          </h1>

          <p className="text-slate-300 mt-1">
            Latest updates and alerts
          </p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white/10 border border-white/10 rounded-3xl p-14 text-center">
          
          <Bell
            size={70}
            className="mx-auto text-blue-400"
          />

          <h2 className="text-3xl font-bold text-white mt-6">
            No Notifications
          </h2>

          <p className="text-slate-300 mt-2">
            You're all caught up.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {notifications.map(
            (
              notification
            ) => (
              <div
                key={
                  notification._id
                }
                className="bg-white/10 border border-white/10 rounded-3xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {
                        notification.title
                      }
                    </h2>

                    <p className="text-slate-300 mt-2">
                      {
                        notification.message
                      }
                    </p>

                    <p className="text-slate-400 mt-3 text-sm">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  {!notification.isRead ? (
                    <button
                      onClick={() =>
                        markAsRead(
                          notification._id
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl text-white flex items-center gap-2"
                    >
                      <CheckCircle2
                        size={18}
                      />

                      Mark Read
                    </button>
                  ) : (
                    <div className="bg-green-500/20 text-green-400 px-5 py-3 rounded-2xl">
                      Read
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </DashboardLayout>
  )
}

export default Notifications