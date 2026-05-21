import DashboardLayout from "../layouts/DashboardLayout"

function ManageMembers() {
  return (
    <DashboardLayout>
      <div className="bg-white/10 border border-white/10 rounded-3xl p-10 text-center">
        <h1 className="text-4xl font-bold text-white">
          Manage Members
        </h1>

        <p className="text-slate-300 mt-4">
          Manage project members
          here.
        </p>
      </div>
    </DashboardLayout>
  )
}

export default ManageMembers