import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
  _id: string | mongoose.Types.ObjectId; // Support both string and ObjectId
  name: string;
  description: string;
  price: number;
  image: string;
  popular: boolean;
}

const restaurantSchema = new Schema({
  _id: { type: String, required: true }, // Default to string, adjust if Compass uses ObjectId
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  popular: { type: Boolean, default: false },
}, { collection: 'restaurants' });

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);