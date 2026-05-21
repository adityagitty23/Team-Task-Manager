import express from "express"

import authMiddleware from "../middleware/authMiddleware.js"

import roleMiddleware from "../middleware/roleMiddleware.js"

const router = express.Router()

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    })
  }
)

router.get(
  "/member",
  authMiddleware,
  roleMiddleware(
    "admin",
    "member"
  ),
  (req, res) => {
    res.json({
      message: "Welcome Member",
    })
  }
)

export default router