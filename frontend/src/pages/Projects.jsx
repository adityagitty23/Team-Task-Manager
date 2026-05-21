import {
  useEffect,
  useState,
} from "react"

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
} from "lucide-react"

function Projects() {
  const [projects, setProjects] =
    useState([])

  const [showModal, setShowModal] =
    useState(false)

  const navigate =
    useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  useEffect(() => {
    const fetchProjects =
      async () => {
        try {
          const response =
            await API.get(
              "/projects"
            )

          setProjects(
            response.data
          )
        } catch (error) {
          console.log(error)
        }
      }

    fetchProjects()
  }, [])

  const reloadProjects =
    async () => {
      try {
        const response =
          await API.get(
            "/projects"
          )

        setProjects(
          response.data
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
            Projects
          </h1>

          <p className="text-slate-300 mt-2 text-lg">
            Manage and organize projects
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
            New Project
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="bg-white/10 border border-white/10 rounded-3xl p-14 text-center">
          
          <FolderKanban
            size={70}
            className="mx-auto text-blue-400"
          />

          <h2 className="text-3xl font-bold text-white mt-6">
            No Projects Found
          </h2>

          <p className="text-slate-300 mt-3">
            Create your first project
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {projects.map(
            (project) => (
              <div
                key={
                  project._id
                }
                className="bg-white/10 border border-white/10 rounded-3xl p-7 hover:scale-[1.02] transition-all duration-300"
              >
                
                <div className="flex items-start justify-between">
                  
                  <div className="w-16 h-16 rounded-3xl bg-blue-600/20 flex items-center justify-center">
                    <FolderKanban className="text-blue-400" />
                  </div>

                  <div
                    className={`px-4 py-2 rounded-2xl text-sm capitalize ${
                      project.status ===
                      "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {
                      project.status
                    }
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mt-6">
                  {
                    project.title
                  }
                </h2>

                <p className="text-slate-300 mt-4 leading-relaxed">
                  {
                    project.description
                  }
                </p>

                <div className="mt-8">
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="text-purple-400" />

                    <p className="text-slate-200 font-semibold">
                      Team Members
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    
                    {project.members.map(
                      (
                        member
                      ) => (
                        <div
                          key={
                            member.user
                              ?._id
                          }
                          className="bg-white/10 px-4 py-2 rounded-2xl text-slate-200 text-sm flex items-center gap-2"
                        >
                          <span>
                            {
                              member
                                .user
                                ?.name
                            }
                          </span>

                          <span
                            className={`text-xs px-2 py-1 rounded-xl capitalize ${
                              member.role ===
                              "admin"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {
                              member.role
                            }
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  
                  <div>
                    <p className="text-slate-400 text-sm">
                      Members
                    </p>

                    <h3 className="text-white text-2xl font-bold mt-1">
                      {
                        project
                          .members
                          .length
                      }
                    </h3>
                  </div>

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
                </div>
              </div>
            )
          )}
        </div>
      )}

      {showModal && (
        <CreateProjectModal
          closeModal={() =>
            setShowModal(
              false
            )
          }
          fetchProjects={
            reloadProjects
          }
        />
      )}
    </DashboardLayout>
  )
}

export default Projects