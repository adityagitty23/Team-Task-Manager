/* eslint-disable react-hooks/set-state-in-effect */
import {
  useEffect,
  useState,
  useCallback,
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
  UserPlus,
  UserMinus,
  LogOut,
} from "lucide-react"

function ProjectDetails() {
  const { id } = useParams()

  const navigate =
    useNavigate()

  const [project, setProject] =
    useState(null)

  const [users, setUsers] =
    useState([])

  const [selectedUser, setSelectedUser] =
    useState("")

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const fetchData =
    useCallback(
      async () => {
        try {
          const projectResponse =
            await API.get(
              "/projects"
            )

          const foundProject =
            projectResponse.data.find(
              (p) =>
                p._id === id
            )

          setProject(
            foundProject
          )

          const usersResponse =
            await API.get(
              "/users"
            )

          setUsers(
            usersResponse.data
          )
        } catch (error) {
          console.log(error)
        }
      },
      [id]
    )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const deleteProject =
    async () => {
      try {
        await API.delete(
          `/projects/${id}`
        )

        navigate("/projects")
      } catch (error) {
        console.log(error)
      }
    }

  const updateStatus =
    async (status) => {
      try {
        const response =
          await API.put(
            `/projects/status/${id}`,
            { status }
          )

        setProject(
          response.data
        )
      } catch (error) {
        console.log(error)
      }
    }

  const addMember =
    async () => {
      try {
        await API.put(
          `/projects/${id}/add-member`,
          {
            userId:
              selectedUser,
          }
        )

        fetchData()

        setSelectedUser("")
      } catch (error) {
        alert(
          error?.response
            ?.data
            ?.message ||
            "Failed to add member"
        )
      }
    }

  const removeMember =
    async (userId) => {
      try {
        await API.put(
          `/projects/${id}/remove-member`,
          { userId }
        )

        fetchData()
      } catch (error) {
        console.log(error)
      }
    }

  const leaveProject =
    async () => {
      try {
        await API.put(
          `/projects/${id}/leave`
        )

        navigate("/projects")
      } catch (error) {
        alert(
          error.response.data
            .message
        )
      }
    }

  if (!project) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="bg-white/10 border border-white/10 rounded-3xl p-8">
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          
          <div>
            <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center">
              <FolderKanban className="text-white" />
            </div>

            <h1 className="text-5xl font-bold text-white mt-6">
              {project.title}
            </h1>

            <p className="text-slate-300 mt-5 text-lg">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            
            <div
              className={`px-5 py-3 rounded-2xl text-center capitalize ${
                project.status ===
                "active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {project.status}
            </div>

            <button
              onClick={
                leaveProject
              }
              className="bg-yellow-500 hover:bg-yellow-600 transition text-white py-4 rounded-2xl flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Leave Project
            </button>

            {user?.role ===
              "admin" && (
              <>
                <select
                  value={
                    project.status
                  }
                  onChange={(
                    e
                  ) =>
                    updateStatus(
                      e.target
                        .value
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
                  onClick={
                    deleteProject
                  }
                  className="bg-red-500 hover:bg-red-600 transition text-white py-4 rounded-2xl flex items-center justify-center gap-3"
                >
                  <Trash2 size={20} />
                  Delete Project
                </button>
              </>
            )}
          </div>
        </div>

        {user?.role ===
          "admin" && (
          <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-6">
            
            <div className="flex items-center gap-3 mb-5">
              <UserPlus className="text-blue-400" />

              <h2 className="text-2xl font-bold text-white">
                Add Member
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              
              <select
                value={
                  selectedUser
                }
                onChange={(
                  e
                ) =>
                  setSelectedUser(
                    e.target
                      .value
                  )
                }
                className="flex-1 bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
              >
                <option
                  value=""
                  className="bg-slate-900"
                >
                  Select User
                </option>

                {users.map(
                  (user) => (
                    <option
                      key={
                        user._id
                      }
                      value={
                        user._id
                      }
                      className="bg-slate-900"
                    >
                      {user.name}
                    </option>
                  )
                )}
              </select>

              <button
                onClick={
                  addMember
                }
                className="bg-blue-600 hover:bg-blue-700 transition px-6 py-4 rounded-2xl text-white"
              >
                Add Member
              </button>
            </div>
          </div>
        )}

        <div className="mt-12">
          
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-purple-400" />

            <h2 className="text-3xl font-bold text-white">
              Team Members
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            
            {project.members.map(
              (member) => (
                <div
                  key={
                    member.user
                      ?._id
                  }
                  className="bg-white/5 border border-white/10 rounded-3xl p-5"
                >
                  <div className="flex items-center justify-between">
                    
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                      {member.user?.name?.charAt(
                        0
                      )}
                    </div>

                    <div
                      className={`px-3 py-1 rounded-xl text-xs capitalize ${
                        member.role ===
                        "admin"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {member.role}
                    </div>
                  </div>

                  <h3 className="text-white text-xl font-bold mt-4">
                    {member.user?.name}
                  </h3>

                  <p className="text-slate-300 mt-1">
                    {member.user?.email}
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        `/member/${member.user?._id}`
                      )
                    }
                    className="mt-5 w-full bg-white/10 hover:bg-white/20 transition py-3 rounded-2xl text-white"
                  >
                    View Profile
                  </button>

                  {user?.role ===
                    "admin" &&
                    member.user
                      ?._id !==
                      user.id && (
                      <button
                        onClick={() =>
                          removeMember(
                            member.user?._id
                          )
                        }
                        className="mt-3 w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl text-white flex items-center justify-center gap-2"
                      >
                        <UserMinus size={18} />
                        Remove
                      </button>
                    )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProjectDetails