import { model, Schema, Document } from 'mongoose';

interface ICategory extends Document {
  name: string;
  isActive: boolean;
}

const categorySchema: Schema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.index({
  name: 1,
  isActive: 1,
});

const Category = model<ICategory>('Category', categorySchema);

export { Category, ICategory };
