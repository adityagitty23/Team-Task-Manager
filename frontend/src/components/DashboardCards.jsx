import {
  ListTodo,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react"

function DashboardCards({
  stats,
}) {
  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: ListTodo,
      color:
        "text-blue-400 bg-blue-500/20",
    },

    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      color:
        "text-green-400 bg-green-500/20",
    },

    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: Clock3,
      color:
        "text-yellow-400 bg-yellow-500/20",
    },

    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: LoaderCircle,
      color:
        "text-purple-400 bg-purple-500/20",
    },

    {
      title: "Overdue",
      value: stats.overdueTasks,
      icon: AlertTriangle,
      color:
        "text-red-400 bg-red-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon

        return (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300 min-h-[170px]"
          >
            <div className="flex items-start justify-between h-full">
              
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-slate-300 text-base font-medium">
                    {card.title}
                  </h2>

                  <p className="text-5xl font-bold mt-6 text-white">
                    {card.value}
                  </p>
                </div>
              </div>

              <div
                className={`w-16 h-16 rounded-3xl flex items-center justify-center ${card.color}`}
              >
                <Icon size={30} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DashboardCards