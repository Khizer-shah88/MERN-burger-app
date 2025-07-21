import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: string;
  restaurantId: string;
  quantity: number;
  total: number;
  status: string;
  createdAt: Date;
  items?: { restaurantId: string; quantity: number; price: number; itemTotal: number }[];
}

const orderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  restaurantId: { type: String, required: true, ref: 'Restaurant' },
  quantity: { type: Number, required: true, min: 1 },
  total: { type: Number, required: true, min: 0 },
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'delivered', 'cancelled'] },
  createdAt: { type: Date, default: Date.now },
  items: [{ restaurantId: { type: String, ref: 'Restaurant' }, quantity: Number, price: Number, itemTotal: Number }],
});

export default mongoose.model<IOrder>('Order', orderSchema);