import { useState } from "react"
import API from "../services/api"

import {
  FolderKanban,
  X,
} from "lucide-react"

function CreateProjectModal({
  closeModal,
  fetchProjects,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await API.post("/projects", formData)

      fetchProjects()

      closeModal()
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl top-[-100px] right-[-100px]" />

        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center border border-white/10"
        >
          <X className="text-white" size={20} />
        </button>

        <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
            <FolderKanban
              className="text-white"
              size={40}
            />
          </div>

          <h1 className="text-4xl font-bold text-white mt-7">
            Create Project
          </h1>

          <p className="text-slate-300 mt-3 text-lg">
            Start organizing your workflow
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-8"
          >
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-400 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="description"
              placeholder="Project Description"
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-400 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 h-36 resize-none"
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-blue-500/30 hover:scale-[1.02]"
              >
                Create Project
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="flex-1 bg-white/10 hover:bg-white/20 transition text-white py-4 rounded-2xl border border-white/10"
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

export default CreateProjectModal