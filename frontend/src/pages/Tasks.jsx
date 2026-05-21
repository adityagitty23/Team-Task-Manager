import {
  useEffect,
  useState,
} from "react"

import DashboardLayout from "../layouts/DashboardLayout"

import API from "../services/api"

import CreateTaskModal from "../components/CreateTaskModal"

import {
  Plus,
  ClipboardList,
} from "lucide-react"

function Tasks() {
  const [tasks, setTasks] =
    useState([])

  const [projects, setProjects] =
    useState([])

  const [showModal, setShowModal] =
    useState(false)

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const projectResponse =
            await API.get(
              "/projects"
            )

          setProjects(
            projectResponse.data
          )

          let allTasks = []

          for (const project of projectResponse.data) {
            const taskResponse =
              await API.get(
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

    fetchData()
  }, [])

  const reloadTasks =
    async () => {
      try {
        const projectResponse =
          await API.get(
            "/projects"
          )

        setProjects(
          projectResponse.data
        )

        let allTasks = []

        for (const project of projectResponse.data) {
          const taskResponse =
            await API.get(
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

  const updateStatus =
    async (
      taskId,
      status
    ) => {
      try {
        await API.put(
          `/tasks/${taskId}`,
          { status }
        )

        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId
              ? {
                  ...task,
                  status,
                }
              : task
          )
        )
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        
        <div>
          <h1 className="text-4xl font-bold text-white">
            Tasks
          </h1>

          <p className="text-slate-300 mt-2">
            Manage and track tasks
          </p>
        </div>

        {user?.role ===
          "admin" && (
          <button
            onClick={() =>
              setShowModal(
                true
              )
            }
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-4 rounded-2xl flex items-center gap-3"
          >
            <Plus size={22} />
            Create Task
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white/10 border border-white/10 rounded-3xl p-14 text-center">
          
          <ClipboardList
            size={70}
            className="mx-auto text-blue-400"
          />

          <h2 className="text-3xl font-bold text-white mt-6">
            No Tasks Found
          </h2>

          <p className="text-slate-300 mt-2">
            Create your first task
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {tasks.map(
            (task) => (
              <div
                key={
                  task._id
                }
                className="bg-white/10 border border-white/10 rounded-3xl p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {
                        task.title
                      }
                    </h2>

                    <p className="text-slate-300 mt-2">
                      {
                        task.description
                      }
                    </p>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-2xl text-sm capitalize ${
                      task.status ===
                      "completed"
                        ? "bg-green-500/20 text-green-400"
                        : task.status ===
                          "in-progress"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {
                      task.status
                    }
                  </div>
                </div>

                <div className="mt-5 space-y-2 text-sm text-slate-300">
                  
                  <p>
                    Project:{" "}
                    {
                      task.project
                        ?.title
                    }
                  </p>

                  <p>
                    Assigned To:{" "}
                    {
                      task
                        .assignedTo
                        ?.name
                    }
                  </p>

                  <p>
                    Priority:{" "}
                    {
                      task.priority
                    }
                  </p>

                  <p>
                    Due Date:{" "}
                    {new Date(
                      task.dueDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-5">
                  
                  <select
                    value={
                      task.status
                    }
                    onChange={(
                      e
                    ) =>
                      updateStatus(
                        task._id,
                        e.target
                          .value
                      )
                    }
                    className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
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
            )
          )}
        </div>
      )}

      {showModal && (
        <CreateTaskModal
          closeModal={() =>
            setShowModal(
              false
            )
          }
          fetchTasks={
            reloadTasks
          }
          projects={
            projects
          }
        />
      )}
    </DashboardLayout>
  )
}

export default Tasks