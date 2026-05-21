import express from "express"

import Notification from "../models/Notification.js"

import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          user: req.user.id,
        }).sort({
          createdAt: -1,
        })

      res.json(notifications)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

export default router