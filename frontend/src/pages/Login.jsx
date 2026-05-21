import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../services/api"
import { AuthContext } from "../context/authContext"

import {
  ClipboardList,
  CheckCircle2,
  Users,
  FolderKanban,
  Eye,
  EyeOff,
} from "lucide-react"

function Login() {
  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await API.post(
        "/auth/login",
        formData
      )

      login(
        response.data.user,
        response.data.token
      )

      navigate("/dashboard")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const [showPassword, setShowPassword] =
  useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-10 items-center relative z-10">
        <div className="hidden lg:block">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/40">
              <ClipboardList
                size={42}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-5xl font-bold text-white">
                Team Task Manager
              </h1>

              <p className="text-slate-300 mt-2 text-lg">
                Plan. Track. Collaborate.
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-xl leading-relaxed max-w-xl">
            Manage projects, tasks, and teams with
            a modern productivity platform built
            for efficient collaboration and smart
            workflow management.
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <FolderKanban className="text-blue-400" />
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold">
                  Project Management
                </h3>

                <p className="text-slate-400 mt-1">
                  Organize and manage projects with
                  your team efficiently.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                <Users className="text-purple-400" />
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold">
                  Team Collaboration
                </h3>

                <p className="text-slate-400 mt-1">
                  Work together seamlessly with
                  role-based access control.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-600/20 border border-green-500/30 flex items-center justify-center">
                <CheckCircle2 className="text-green-400" />
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold">
                  Smart Task Tracking
                </h3>

                <p className="text-slate-400 mt-1">
                  Track progress, deadlines and
                  productivity in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/40">
                <ClipboardList
                  size={40}
                  className="text-white"
                />
              </div>

              <h2 className="text-4xl font-bold text-white mt-5">
                Welcome Back
              </h2>

              <p className="text-slate-300 mt-2 text-center">
                Login to continue managing your
                workspace
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-400 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="relative">
                <input
                    type={
                    showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-400 p-4 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="button"
                    onClick={() =>
                    setShowPassword(!showPassword)
                    }
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-300 hover:text-white"
                >
                    {showPassword ? (
                    <EyeOff size={22} />
                    ) : (
                    <Eye size={22} />
                    )}
                </button>
                </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-blue-500/30 hover:scale-[1.02]">
                Login
              </button>
            </form>

            <p className="text-center text-slate-300 mt-7">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login