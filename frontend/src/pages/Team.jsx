import {
  useEffect,
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import DashboardLayout from "../layouts/DashboardLayout"

import API from "../services/api"

import {
  Users,
  ShieldCheck,
  User,
  Mail,
} from "lucide-react"

function Team() {
  const [members, setMembers] =
    useState([])

  const navigate =
    useNavigate()

  useEffect(() => {
    const fetchMembers =
      async () => {
        try {
          const response =
            await API.get(
              "/projects"
            )

          const allMembers =
            response.data.flatMap(
              (project) =>
                project.members
            )

          const uniqueMembers =
            Array.from(
              new Map(
                allMembers.map(
                  (
                    member
                  ) => [
                    member.user
                      ?._id,
                    member,
                  ]
                )
              ).values()
            )

          setMembers(
            uniqueMembers
          )
        } catch (error) {
          console.log(error)
        }
      }

    fetchMembers()
  }, [])

  const getRoleColor = (
    role
  ) => {
    if (role === "admin") {
      return "bg-blue-500/20 text-blue-400 border border-blue-500/20"
    }

    return "bg-green-500/20 text-green-400 border border-green-500/20"
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        
        <div>
          <h1 className="text-4xl font-bold text-white">
            Team Members
          </h1>

          <p className="text-slate-300 mt-2 text-lg">
            Collaborate with your team
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3">
          
          <Users className="text-blue-400" />

          <div>
            <p className="text-slate-400 text-sm">
              Total Members
            </p>

            <h3 className="text-white text-2xl font-bold">
              {members.length}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
        
        {members.map(
          (member) => (
            <div
              key={
                member.user
                  ?._id
              }
              className="bg-white/10 border border-white/10 rounded-3xl p-7"
            >
              <div className="flex items-center justify-between">
                
                <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {member.user?.name?.charAt(
                      0
                    )}
                  </span>
                </div>

                <div
                  className={`px-4 py-2 rounded-2xl text-sm capitalize ${getRoleColor(
                    member.role
                  )}`}
                >
                  {
                    member.role
                  }
                </div>
              </div>

              <div className="mt-8">
                
                <h2 className="text-3xl font-bold text-white">
                  {
                    member.user
                      ?.name
                  }
                </h2>

                <div className="mt-5 space-y-4">
                  
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail
                      size={20}
                      className="text-purple-400"
                    />

                    <span>
                      {
                        member.user
                          ?.email
                      }
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    
                    {member.role ===
                    "admin" ? (
                      <ShieldCheck
                        size={20}
                        className="text-blue-400"
                      />
                    ) : (
                      <User
                        size={20}
                        className="text-green-400"
                      />
                    )}

                    <span className="capitalize">
                      {
                        member.role
                      }
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/member/${member.user?._id}`
                  )
                }
                className="mt-8 w-full bg-white/10 hover:bg-white/20 transition border border-white/10 text-white py-4 rounded-2xl"
              >
                View Profile
              </button>
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  )
}

export default Team