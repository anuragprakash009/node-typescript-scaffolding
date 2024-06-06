import { model, Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  category: Schema.Types.ObjectId;
  isActive: boolean;
}

const productSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
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

productSchema.index({
  createdAt: 1,
  isActive: 1,
});
productSchema.index({
  name: 1,
  isActive: 1,
});

const Product = model<IProduct>('Product', productSchema);

export { Product, IProduct };
