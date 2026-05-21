/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react"
import API from "../services/api"

import {
  ListTodo,
  X,
} from "lucide-react"

function CreateTaskModal({
  closeModal,
  fetchTasks,
  projects,
}) {
  const [users, setUsers] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
    project: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const fetchUsers = async () => {
    try {
      const response = await API.get("/projects")

      const members = response.data.flatMap(
        (project) => project.members
      )

      const uniqueUsers = Array.from(
        new Map(
          members.map((user) => [
            user._id,
            user,
          ])
        ).values()
      )

      setUsers(uniqueUsers)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await API.post("/tasks", formData)

      fetchTasks()

      closeModal()
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 z-50">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl top-[-120px] right-[-120px]" />

        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center border border-white/10"
        >
          <X className="text-white" size={20} />
        </button>

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
            <ListTodo
              className="text-white"
              size={30}
            />
          </div>

          <h1 className="text-3xl font-bold text-white mt-7">
            Create Task
          </h1>

          <p className="text-slate-300 mt-3 text-lg">
            Assign and manage workflow tasks
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-400 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="description"
              placeholder="Task Description"
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-400 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <select
                name="priority"
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 text-white p-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option
                  value="low"
                  className="bg-slate-900"
                >
                  Low Priority
                </option>

                <option
                  value="medium"
                  className="bg-slate-900"
                >
                  Medium Priority
                </option>

                <option
                  value="high"
                  className="bg-slate-900"
                >
                  High Priority
                </option>
              </select>

              <input
                type="date"
                name="dueDate"
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 text-white p-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              name="assignedTo"
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 text-white p-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option
                value=""
                className="bg-slate-900"
              >
                Select Team Member
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
              className="w-full bg-white/10 border border-white/10 text-white p-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option
                value=""
                className="bg-slate-900"
              >
                Select Project
              </option>

              {projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                  className="bg-slate-900"
                >
                  {project.title}
                </option>
              ))}
            </select>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-2 rounded-2xl font-semibold text-lg shadow-xl shadow-blue-500/30 hover:scale-[1.02]"
              >
                Create Task
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="flex-1 bg-white/10 hover:bg-white/20 transition text-white py-3 rounded-2xl border border-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskModal