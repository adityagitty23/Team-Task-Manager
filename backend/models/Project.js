import mongoose from "mongoose"

const memberSchema =
  new mongoose.Schema({
    user: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    role: {
      type: String,

      enum: [
        "admin",
        "member",
      ],

      default: "member",
    },
  })

const projectSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,

        required: true,
      },

      description: {
        type: String,

        required: true,
      },

      status: {
        type: String,

        enum: [
          "active",
          "completed",
        ],

        default: "active",
      },

      members: [
        memberSchema,
      ],

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  )

export default mongoose.model(
  "Project",
  projectSchema
)