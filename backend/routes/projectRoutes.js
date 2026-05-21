import express from "express"
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
      } = req.body

      const project =
        await Project.create({
          title,
          description,
          createdBy: req.user.id,
          members: [req.user.id],
        })

      res.status(201).json(
        project
      )
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const projects =
        await Project.find({
          members: req.user.id,
        })
          .populate(
            "createdBy",
            "name email role"
          )
          .populate(
            "members",
            "name email role"
          )

      res.status(200).json(
        projects
      )
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

router.put(
  "/:id/add-member",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { userId } = req.body

      const project =
        await Project.findById(
          req.params.id
        )

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        })
      }

      const user =
        await User.findById(userId)

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        })
      }

      if (
        project.members.includes(userId)
      ) {
        return res.status(400).json({
          message:
            "User already added",
        })
      }

      project.members.push(userId)

      await project.save()

      await Notification.create({
        user: userId,

        title:
          "Added To Project",

        message: `You were added to "${project.title}" project by admin. Complete your assigned tasks.`,

        type: "project",
      })

      res.status(200).json({
        message:
          "Member added successfully",
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

router.put(
  "/status/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const project =
        await Project.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          { new: true }
        )

      res.json(project)
    } catch (error) {
      res.status(500).json({
        message:
          "Server error",
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
      const project =
        await Project.findById(
          req.params.id
        )

      if (!project) {
        return res.status(404).json({
          message:
            "Project not found",
        })
      }

      await project.deleteOne()

      res.status(200).json({
        message:
          "Project deleted successfully",
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

export default router