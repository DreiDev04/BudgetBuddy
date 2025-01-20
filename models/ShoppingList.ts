// models/ShoppingList.js
import { Schema, model, models } from 'mongoose';

const ShoppingListSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String },
    price: { type: Number, required: true },

    // Reference to User
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const ShoppingList = models.ShoppingList || model('ShoppingList', ShoppingListSchema);

export default ShoppingList;
