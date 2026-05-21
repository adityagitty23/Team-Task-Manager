import express from "express"
import Task from "../models/Task.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      let filter = {}

      if (
        req.user.role === "member"
      ) {
        filter.assignedTo =
          req.user.id
      }

      const totalTasks =
        await Task.countDocuments(
          filter
        )

      const completedTasks =
        await Task.countDocuments({
          ...filter,
          status: "completed",
        })

      const pendingTasks =
        await Task.countDocuments({
          ...filter,
          status: "todo",
        })

      const inProgressTasks =
        await Task.countDocuments({
          ...filter,
          status: "in-progress",
        })

      const overdueTasks =
        await Task.countDocuments({
          ...filter,
          dueDate: {
            $lt: new Date(),
          },
          status: {
            $ne: "completed",
          },
        })

      res.status(200).json({
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        overdueTasks,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

export default router