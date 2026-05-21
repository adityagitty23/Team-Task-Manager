/* eslint-disable react-hooks/set-state-in-effect */

import {
  useEffect,
  useState,
} from "react"

import {
  useNavigate,
  useParams,
} from "react-router-dom"

import DashboardLayout from "../layouts/DashboardLayout"
import API from "../services/api"

import {
  FolderKanban,
  Users,
  Trash2,
} from "lucide-react"

function ProjectDetails() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [project, setProject] =
    useState(null)

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const loadProject = async () => {
    try {
      const response = await API.get(
        "/projects"
      )

      const foundProject =
        response.data.find(
          (p) => p._id === id
        )

      setProject(foundProject)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadProject()
  }, [])

  const deleteProject = async () => {
    try {
      await API.delete(`/projects/${id}`)

      navigate("/projects")
    } catch (error) {
      console.log(error)
    }
  }

  const updateStatus = async (status) => {
    try {
      const response = await API.put(
        `/projects/status/${id}`,
        { status }
      )

      setProject(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!project) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
              <FolderKanban
                className="text-white"
                size={40}
              />
            </div>

            <h1 className="text-5xl font-bold text-white mt-7">
              {project.title}
            </h1>

            <p className="text-slate-300 mt-5 text-lg max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className={`px-5 py-3 rounded-2xl text-center ${
                project.status === "active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {project.status}
            </div>

            {user?.role === "admin" && (
              <>
                <select
                  value={project.status}
                  onChange={(e) =>
                    updateStatus(
                      e.target.value
                    )
                  }
                  className="bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
                >
                  <option
                    value="active"
                    className="bg-slate-900"
                  >
                    Active
                  </option>

                  <option
                    value="completed"
                    className="bg-slate-900"
                  >
                    Completed
                  </option>
                </select>

                <button
                  onClick={deleteProject}
                  className="bg-red-500 hover:bg-red-600 transition text-white py-4 rounded-2xl flex items-center justify-center gap-3"
                >
                  <Trash2 size={20} />
                  Delete Project
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-purple-400" />

            <h2 className="text-3xl font-bold text-white">
              Team Members
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {project.members.map((member) => (
              <div
                key={member._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {member.name.charAt(0)}
                </div>

                <h3 className="text-white text-xl font-bold mt-4">
                  {member.name}
                </h3>

                <p className="text-slate-300 mt-1">
                  {member.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProjectDetails