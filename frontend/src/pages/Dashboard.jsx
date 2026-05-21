/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react"

import DashboardLayout from "../layouts/DashboardLayout"
import DashboardCards from "../components/DashboardCards"
import API from "../services/api"

function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  })

  const [overdueTasks, setOverdueTasks] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const loadDashboard = async () => {
    try {
      const statsResponse = await API.get(
        "/dashboard"
      )

      setStats(statsResponse.data)

      const overdueResponse = await API.get(
        "/tasks/overdue/all"
      )

      setOverdueTasks(overdueResponse.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-3xl font-bold text-white">
            Loading Dashboard...
          </h1>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <DashboardCards stats={stats} />

      <div className="mt-8 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Overdue Tasks
            </h2>

            <p className="text-slate-300 mt-2">
              Tasks that require immediate attention
            </p>
          </div>

          <div className="bg-red-500/20 text-red-400 border border-red-500/20 px-5 py-3 rounded-2xl text-sm w-fit">
            {overdueTasks.length} Tasks
          </div>
        </div>

        {overdueTasks.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-3xl font-bold text-white">
              No Overdue Tasks
            </h3>

            <p className="text-slate-300 mt-3">
              Great job! Everything is on schedule.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {overdueTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {task.title}
                  </h3>

                  <p className="text-slate-300 mt-2">
                    {task.project?.title}
                  </p>
                </div>

                <div className="bg-red-500/20 text-red-400 border border-red-500/20 px-5 py-3 rounded-2xl w-fit">
                  Due:{" "}
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard