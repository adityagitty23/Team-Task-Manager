import { useState } from "react"

import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

function DashboardLayout({
  children,
}) {
  const [mobileOpen, setMobileOpen] =
    useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <div className="flex relative z-10">
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={
            setMobileOpen
          }
        />

        <main className="flex-1 md:ml-64 min-h-screen p-4 md:p-5">
          <Header
            setMobileOpen={
              setMobileOpen
            }
          />

          <div className="mt-5">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout