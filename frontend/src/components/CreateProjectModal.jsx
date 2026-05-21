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
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    })

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
        "/projects",
        formData
      )

      fetchProjects()

      closeModal()
    } catch (error) {
      alert(
        error.response.data.message
      )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 relative">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5"
        >
          <X className="text-white" />
        </button>

        <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center">
          <FolderKanban className="text-white" />
        </div>

        <h1 className="text-4xl font-bold text-white mt-6">
          Create Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none h-36"
          />

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl text-white font-semibold">
              Create
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-white/10 py-4 rounded-2xl text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProjectModal