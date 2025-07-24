import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const restaurantSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);