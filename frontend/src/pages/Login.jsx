import {
  useContext,
  useState,
} from "react"

import {
  Link,
  useNavigate,
} from "react-router-dom"

import {
  ClipboardList,
  Eye,
  EyeOff,
} from "lucide-react"

import API from "../services/api"

import { AuthContext } from "../context/authContext"

function Login() {
  const navigate = useNavigate()

  const { login } =
    useContext(AuthContext)

  const [showPassword, setShowPassword] =
    useState(false)

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
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
      const response =
        await API.post(
          "/auth/login",
          formData
        )

      login(
        response.data.user,
        response.data.token
      )

      navigate("/dashboard")
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Login failed"
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center">
              <ClipboardList
                size={40}
                className="text-white"
              />
            </div>

            <h1 className="text-4xl font-bold text-white mt-5">
              Team Task Manager
            </h1>

            <p className="text-slate-300 mt-2 text-center">
              Manage projects and
              teams efficiently
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
              className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
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
                onChange={
                  handleChange
                }
                className="w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
              >
                {showPassword ? (
                  <EyeOff />
                ) : (
                  <Eye />
                )}
              </button>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold">
              Login
            </button>
          </form>

          <p className="text-center text-slate-300 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login