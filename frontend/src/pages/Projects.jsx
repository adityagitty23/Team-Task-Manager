/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react"

import {
  useNavigate,
} from "react-router-dom"

import DashboardLayout from "../layouts/DashboardLayout"
import API from "../services/api"
import CreateProjectModal from "../components/CreateProjectModal"

import {
  FolderKanban,
  Users,
  Plus,
  Trash2,
} from "lucide-react"

function Projects() {
  const [projects, setProjects] =
    useState([])

  const [showModal, setShowModal] =
    useState(false)

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const loadProjects = async () => {
    try {
      const response = await API.get(
        "/projects"
      )

      setProjects(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`)

      loadProjects()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-5xl font-bold text-white">
            Projects
          </h1>

          <p className="text-slate-300 mt-3 text-lg">
            Manage and organize your
            projects
          </p>
        </div>

        {user?.role === "admin" && (
          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-7 py-4 rounded-2xl flex items-center gap-3 shadow-xl shadow-blue-500/30 hover:scale-[1.02]"
          >
            <Plus size={22} />
            New Project
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-14 text-center shadow-2xl">
          <FolderKanban
            size={70}
            className="mx-auto text-blue-400"
          />

          <h2 className="text-3xl font-bold text-white mt-6">
            No Projects Found
          </h2>

          <p className="text-slate-300 mt-3 text-lg">
            Start by creating your first
            project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-7 shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-3xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                  <FolderKanban
                    size={32}
                    className="text-blue-400"
                  />
                </div>

                <div
                  className={`px-4 py-2 rounded-2xl text-sm border ${
                    project.status ===
                    "completed"
                      ? "bg-green-500/20 text-green-400 border-green-500/20"
                      : "bg-blue-600/20 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {project.status ||
                    "active"}
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mt-7">
                {project.title}
              </h2>

              <p className="text-slate-300 mt-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Users
                    size={20}
                    className="text-purple-400"
                  />

                  <p className="text-slate-200 font-semibold">
                    Team Members
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.members
                    .slice(0, 3)
                    .map((member) => (
                      <div
                        key={member._id}
                        className="bg-white/10 border border-white/10 px-4 py-2 rounded-2xl text-slate-200 text-sm"
                      >
                        {member.name}
                      </div>
                    ))}

                  {project.members.length >
                    3 && (
                    <div className="bg-blue-500/20 border border-blue-500/20 px-4 py-2 rounded-2xl text-blue-400 text-sm">
                      +
                      {project.members
                        .length - 3}{" "}
                      more
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">
                    Members
                  </p>

                  <h3 className="text-white text-3xl font-bold mt-1">
                    {
                      project.members.length
                    }
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      navigate(
                        `/projects/${project._id}`
                      )
                    }
                    className="bg-white/10 hover:bg-white/20 transition px-5 py-3 rounded-2xl text-white border border-white/10"
                  >
                    View Details
                  </button>

                  {user?.role ===
                    "admin" && (
                    <button
                      onClick={() =>
                        deleteProject(
                          project._id
                        )
                      }
                      className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition"
                    >
                      <Trash2 className="text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CreateProjectModal
          closeModal={() =>
            setShowModal(false)
          }
          fetchProjects={loadProjects}
        />
      )}
    </DashboardLayout>
  )
}

export default Projects