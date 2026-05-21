import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import testRoutes from "./routes/testRoutes.js"

dotenv.config()

const app = express()

app.use(
  cors({
    origin:
      "https://team-task-manager-three-beta.vercel.app/",
    credentials: true,
  })
)
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("MongoDB Connected")
  )
  .catch((err) => console.log(err))

app.use("/api/auth", authRoutes)

app.use("/api/projects", projectRoutes)

app.use("/api/tasks", taskRoutes)

app.use("/api/dashboard", dashboardRoutes)

app.use(
  "/api/notifications",
  notificationRoutes
)

app.use("/api/users", userRoutes)

app.use("/api/test", testRoutes)

app.get("/", (req, res) => {
  res.send("API Running")
})

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  )
})
