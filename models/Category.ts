import { ICategory } from "@/types/shared-types";
import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Category = models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
