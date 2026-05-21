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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon

        return (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-slate-300 text-sm">
                  {card.title}
                </h2>

                <p className="text-4xl font-bold mt-4 text-white">
                  {card.value}
                </p>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DashboardCards