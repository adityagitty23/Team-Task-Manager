import {
  useEffect,
  useState,
} from "react"

import {
  useParams,
} from "react-router-dom"

import DashboardLayout from "../layouts/DashboardLayout"

import API from "../services/api"

function MemberProfile() {
  const { id } = useParams()

  const [tasks, setTasks] =
    useState([])

  useEffect(() => {
    const fetchTasks =
      async () => {
        try {
          const response =
            await API.get(
              `/tasks/member/${id}`
            )

          setTasks(
            response.data
          )
        } catch (error) {
          console.log(error)
        }
      }

    fetchTasks()
  }, [id])

  return (
    <DashboardLayout>
      <div className="bg-white/10 border border-white/10 rounded-3xl p-8">
        
        <h1 className="text-4xl font-bold text-white">
          Member Tasks
        </h1>

        <p className="text-slate-300 mt-2">
          Assigned tasks and progress
        </p>

        <div className="mt-8 space-y-5">
          {tasks.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
              
              <h2 className="text-2xl font-bold text-white">
                No Tasks Found
              </h2>

              <p className="text-slate-300 mt-2">
                This member has no assigned tasks.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {task.title}
                    </h2>

                    <p className="text-slate-300 mt-2">
                      {task.description}
                    </p>

                    <div className="mt-4 space-y-2 text-slate-400">
                      
                      <p>
                        Project:{" "}
                        {task.project?.title}
                      </p>

                      <p>
                        Priority:{" "}
                        {task.priority}
                      </p>

                      <p>
                        Due Date:{" "}
                        {new Date(
                          task.dueDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`px-5 py-3 rounded-2xl text-sm capitalize ${
                      task.status ===
                      "completed"
                        ? "bg-green-500/20 text-green-400"
                        : task.status ===
                          "in-progress"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {task.status}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MemberProfile