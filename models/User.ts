// models/User.js
import { Schema, model, models } from 'mongoose';
import Budget from './Budget';
import Goal from './Goal';
import ShoppingList from './ShoppingList';

const UserSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String },
    isOnboardingCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    // References to other collections
    budget: { type: Schema.Types.ObjectId, ref: 'Budget' },
    goal: { type: Schema.Types.ObjectId, ref: 'Goal' },
    shoppingList: { type: Schema.Types.ObjectId, ref: 'ShoppingList' }
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);

export { User };
