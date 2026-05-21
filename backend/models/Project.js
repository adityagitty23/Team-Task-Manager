import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 5,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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