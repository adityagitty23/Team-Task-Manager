import {
  useEffect,
  useState,
} from "react"

import DashboardLayout from "../layouts/DashboardLayout"

import DashboardCards from "../components/DashboardCards"

import API from "../services/api"

function Dashboard() {
  const [stats, setStats] =
    useState({
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      overdueTasks: 0,
    })

  const [overdueTasks, setOverdueTasks] =
    useState([])

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          const statsResponse =
            await API.get(
              "/dashboard"
            )

          setStats(
            statsResponse.data
          )

          const overdueResponse =
            await API.get(
              "/tasks/overdue/all"
            )

          setOverdueTasks(
            overdueResponse.data
          )
        } catch (error) {
          console.log(error)
        }
      }

    fetchDashboard()
  }, [])

  return (
    <DashboardLayout>
      <DashboardCards
        stats={stats}
      />

      <div className="mt-8 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">
              {user?.role ===
              "admin"
                ? "Overdue Tasks"
                : "Your Tasks"}
            </h2>

            <p className="text-slate-300 mt-2">
              Monitor task
              progress
            </p>
          </div>

          <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-2xl">
            {
              overdueTasks.length
            }{" "}
            Tasks
          </div>
        </div>

        {overdueTasks.length ===
        0 ? (
          <div className="text-center py-10">
            <h3 className="text-2xl font-semibold text-white">
              No overdue tasks
            </h3>

            <p className="text-slate-300 mt-2">
              Everything is on
              track.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {overdueTasks.map(
              (task) => (
                <div
                  key={task._id}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {
                        task.title
                      }
                    </h3>

                    <p className="text-slate-300 mt-2">
                      {
                        task.project
                          ?.title
                      }
                    </p>
                  </div>

                  <div className="text-slate-300">
                    Due:{" "}
                    {new Date(
                      task.dueDate
                    ).toLocaleDateString()}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard