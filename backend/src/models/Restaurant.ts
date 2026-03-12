import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
}

const restaurantSchema = new Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  popular: { type: Boolean, default: false },
});

restaurantSchema.index({ popular: -1, name: 1 });

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);