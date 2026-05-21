import {
  useEffect,
  useState,
} from "react"

import API from "../services/api"

import {
  ClipboardList,
  X,
} from "lucide-react"

function CreateTaskModal({
  closeModal,
  fetchTasks,
  projects,
}) {
  const [users, setUsers] =
    useState([])

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      assignedTo: "",
      project: "",
    })

  useEffect(() => {
    const loadUsers =
      async () => {
        try {
          const response =
            await API.get(
              "/users"
            )

          setUsers(
            response.data
          )
        } catch (error) {
          console.log(error)
        }
      }

    loadUsers()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })
  }

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault()

    try {
      await API.post(
        "/tasks",
        formData
      )

      fetchTasks()

      closeModal()
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Failed to create task"
      )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-1">
      <div className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-3xl p-6 relative">
        
        <button
          onClick={closeModal}
          className="absolute top-5 right-5"
        >
          <X className="text-white" />
        </button>

        <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center">
          <ClipboardList className="text-white" />
        </div>

        <h1 className="text-3xl font-bold text-white mt-4">
          Create Task
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 mt-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-400 p-4 rounded-2xl outline-none"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-400 p-3 rounded-2xl outline-none h-20 resize-none"
          />

          <select
            name="priority"
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
          >
            <option
              value="low"
              className="bg-slate-900"
            >
              Low
            </option>

            <option
              value="medium"
              className="bg-slate-900"
            >
              Medium
            </option>

            <option
              value="high"
              className="bg-slate-900"
            >
              High
            </option>
          </select>

          <input
            type="date"
            name="dueDate"
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
          />

          <select
            name="assignedTo"
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
          >
            <option
              value=""
              className="bg-slate-900"
            >
              Select Member
            </option>

            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
                className="bg-slate-900"
              >
                {user.name}
              </option>
            ))}
          </select>

          <select
            name="project"
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
          >
            <option
              value=""
              className="bg-slate-900"
            >
              Select Project
            </option>

            {projects.map(
              (project) => (
                <option
                  key={project._id}
                  value={project._id}
                  className="bg-slate-900"
                >
                  {project.title}
                </option>
              )
            )}
          </select>

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl text-white font-semibold">
              Create
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-white/10 hover:bg-white/20 transition py-4 rounded-2xl text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTaskModal