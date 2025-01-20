// models/Goal.js
import { Schema, model, models } from 'mongoose';

const GoalSchema = new Schema(
  {
    title: { type: String, required: true },
    target: { type: String, required: true },
    progress: { type: Number, default: 0 },

    // Reference to User
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const Goal = models.Goal || model('Goal', GoalSchema);

export default Goal;
