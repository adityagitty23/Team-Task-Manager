/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react"
import DashboardLayout from "../layouts/DashboardLayout"
import API from "../services/api"
import CreateTaskModal from "../components/CreateTaskModal"

import {
  ListTodo,
  Plus,
  CalendarDays,
  FolderKanban,
  User,
} from "lucide-react"

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] =
    useState(false)

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const loadData = async () => {
    try {
      const projectResponse = await API.get(
        "/projects"
      )

      setProjects(projectResponse.data)

      let allTasks = []

      for (const project of projectResponse.data) {
        const taskResponse = await API.get(
          `/tasks/project/${project._id}`
        )

        allTasks = [
          ...allTasks,
          ...taskResponse.data,
        ]
      }

      setTasks(allTasks)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const updateStatus = async (
    taskId,
    status
  ) => {
    try {
      await API.put(`/tasks/${taskId}`, {
        status,
      })

      loadData()
    } catch (error) {
      console.log(error)
    }
  }

  const getStatusColor = (status) => {
    if (status === "completed") {
      return "bg-green-500/20 text-green-400 border border-green-500/20"
    }

    if (status === "in-progress") {
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
    }

    return "bg-red-500/20 text-red-400 border border-red-500/20"
  }

  const getPriorityColor = (priority) => {
    if (priority === "high") {
      return "text-red-400"
    }

    if (priority === "medium") {
      return "text-yellow-400"
    }

    return "text-green-400"
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Tasks
          </h1>

          <p className="text-slate-300 mt-2 text-lg">
            Manage and track all your tasks
          </p>
        </div>

        {user?.role === "admin" && (
          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-xl shadow-blue-500/30 hover:scale-[1.02]"
          >
            <Plus size={22} />
            Create Task
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-14 text-center shadow-2xl">
          <ListTodo
            size={70}
            className="mx-auto text-blue-400"
          />

          <h2 className="text-3xl font-bold text-white mt-6">
            No Tasks Found
          </h2>

          <p className="text-slate-300 mt-3 text-lg">
            Create tasks to start managing
            workflow.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-7 shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {task.title}
                  </h2>

                  <p className="text-slate-300 mt-4 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                <div
                  className={`px-4 py-2 rounded-2xl text-sm whitespace-nowrap ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <FolderKanban
                    size={20}
                    className="text-blue-400"
                  />

                  <span>
                    {task.project?.title}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <User
                    size={20}
                    className="text-purple-400"
                  />

                  <span>
                    {task.assignedTo?.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={20}
                    className="text-yellow-400"
                  />

                  <span className="text-slate-300">
                    {new Date(
                      task.dueDate
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-400">
                    Priority:
                  </span>

                  <span
                    className={`font-semibold capitalize ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(
                      task._id,
                      e.target.value
                    )
                  }
                  className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option
                    value="todo"
                    className="bg-slate-900"
                  >
                    Todo
                  </option>

                  <option
                    value="in-progress"
                    className="bg-slate-900"
                  >
                    In Progress
                  </option>

                  <option
                    value="completed"
                    className="bg-slate-900"
                  >
                    Completed
                  </option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CreateTaskModal
          closeModal={() =>
            setShowModal(false)
          }
          fetchTasks={loadData}
          projects={projects}
        />
      )}
    </DashboardLayout>
  )
}

export default Tasks