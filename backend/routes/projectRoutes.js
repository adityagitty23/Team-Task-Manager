import express from "express"

import Project from "../models/Project.js"
import User from "../models/User.js"
import Notification from "../models/Notification.js"

import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"

const router = express.Router()

// CREATE PROJECT
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

      if (
        !title ||
        !description
      ) {
        return res.status(400).json({
          message:
            "All fields are required",
        })
      }

      const project =
        await Project.create({
          title,
          description,
          createdBy:
            req.user.id,

          members: [
            {
              user:
                req.user.id,
              role: "admin",
            },
          ],
        })

      res.status(201).json(
        project
      )
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

// GET PROJECTS
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const projects =
        await Project.find({
          "members.user":
            req.user.id,
        })
          .populate(
            "members.user",
            "name email role"
          )
          .populate(
            "createdBy",
            "name email"
          )

      res.status(200).json(
        projects
      )
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

// ADD MEMBER
router.put(
  "/:id/add-member",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { userId } =
        req.body

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

      const user =
        await User.findById(
          userId
        )

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        })
      }

      const alreadyMember =
        project.members.find(
          (member) =>
            member.user.toString() ===
            userId
        )

      if (alreadyMember) {
        return res.status(400).json({
          message:
            "User already added",
        })
      }

      project.members.push({
        user: userId,
        role: "member",
      })

      await project.save()

      await Notification.create({
        user: userId,

        title:
          "Added To Project",

        message: `You were added to "${project.title}" project by admin.`,

        type: "project",
      })

      res.status(200).json({
        message:
          "Member added successfully",
      })
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

// REMOVE MEMBER
router.put(
  "/:id/remove-member",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { userId } =
        req.body

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

      project.members =
        project.members.filter(
          (member) =>
            member.user.toString() !==
            userId
        )

      await project.save()

      res.json({
        message:
          "Member removed",
      })
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

// LEAVE PROJECT
router.put(
  "/:id/leave",
  authMiddleware,
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

      const currentMember =
        project.members.find(
          (member) =>
            member.user.toString() ===
            req.user.id
        )

      if (
        currentMember?.role ===
        "admin"
      ) {
        const adminCount =
          project.members.filter(
            (member) =>
              member.role ===
              "admin"
          ).length

        if (adminCount <= 1) {
          return res.status(400).json({
            message:
              "At least one admin required",
          })
        }
      }

      project.members =
        project.members.filter(
          (member) =>
            member.user.toString() !==
            req.user.id
        )

      await project.save()

      res.json({
        message:
          "Left project successfully",
      })
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

// UPDATE PROJECT STATUS
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
          {
            new: true,
          }
        )

      res.status(200).json(
        project
      )
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

// DELETE PROJECT
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
        message:
          error.message,
      })
    }
  }
)

export default router