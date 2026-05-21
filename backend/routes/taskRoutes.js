import express from "express"

import Task from "../models/Task.js"
import Project from "../models/Project.js"
import User from "../models/User.js"
import Notification from "../models/Notification.js"

import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"

const router = express.Router()

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        priority,
        dueDate,
        assignedTo,
        project,
      } = req.body

      if (
        !title ||
        !description ||
        !dueDate ||
        !assignedTo ||
        !project
      ) {
        return res.status(400).json({
          message:
            "All fields are required",
        })
      }

      const existingProject =
        await Project.findById(
          project
        )

      if (!existingProject) {
        return res.status(404).json({
          message:
            "Project not found",
        })
      }

      const existingUser =
        await User.findById(
          assignedTo
        )

      if (!existingUser) {
        return res.status(404).json({
          message:
            "Assigned user not found",
        })
      }

      const task =
        await Task.create({
          title,
          description,
          priority,
          dueDate,
          assignedTo,
          project,
          createdBy:
            req.user.id,
        })

      await Notification.create({
        user: assignedTo,

        title:
          "New Task Assigned",

        message: `A new task "${title}" has been assigned to you.`,

        type: "task",
      })

      res.status(201).json(task)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

router.get(
  "/project/:projectId",
  authMiddleware,
  async (req, res) => {
    try {
      const tasks =
        await Task.find({
          project:
            req.params.projectId,
        })
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "project",
            "title"
          )

      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

router.get(
  "/member/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const tasks =
        await Task.find({
          assignedTo:
            req.params.id,
        }).populate(
          "project",
          "title"
        )

      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const task =
        await Task.findById(
          req.params.id
        )

      if (!task) {
        return res.status(404).json({
          message:
            "Task not found",
        })
      }

      if (
        req.user.role !==
          "admin" &&
        task.assignedTo.toString() !==
          req.user.id
      ) {
        return res.status(403).json({
          message:
            "Access denied",
        })
      }

      const previousStatus =
        task.status

      task.status =
        req.body.status ||
        task.status

      await task.save()

      if (
        previousStatus !==
          "completed" &&
        task.status ===
          "completed"
      ) {
        const admins =
          await User.find({
            role: "admin",
          })

        for (const admin of admins) {
          await Notification.create({
            user: admin._id,

            title:
              "Task Completed",

            message: `${req.user.name} completed the task "${task.title}".`,

            type: "task",
          })
        }
      }

      res.status(200).json(task)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const task =
        await Task.findById(
          req.params.id
        )

      if (!task) {
        return res.status(404).json({
          message:
            "Task not found",
        })
      }

      await task.deleteOne()

      res.status(200).json({
        message:
          "Task deleted successfully",
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

router.get(
  "/overdue/all",
  authMiddleware,
  async (req, res) => {
    try {
      let filter = {
        dueDate: {
          $lt: new Date(),
        },

        status: {
          $ne: "completed",
        },
      }

      if (
        req.user.role ===
        "member"
      ) {
        filter.assignedTo =
          req.user.id
      }

      const overdueTasks =
        await Task.find(filter)
          .populate(
            "assignedTo",
            "name email"
          )
          .populate(
            "project",
            "title"
          )

      res.status(200).json(
        overdueTasks
      )
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

export default router