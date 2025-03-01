import { Schema, model, models } from "mongoose";
import { ICategoryColor } from "@/types/budget-types";

const CategoryColorSchema = new Schema<ICategoryColor>(
  {
    colorName: { type: String, required: true },
    hslValue: { type: String, required: true },
  },
  { timestamps: true }
);

const CategoryColor =
  models.CategoryColor || model<ICategoryColor>("CategoryColor", CategoryColorSchema);

export { CategoryColor };
