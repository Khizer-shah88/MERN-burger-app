import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  name: string;
  phoneNumber: string;
  items: {
    restaurantId: string;
    quantity: number;
    drink?: string;
    extraCheese?: boolean;
    name?: string;
    price?: number;
    isDeal?: boolean;
  }[];
  total: number;
  status: string;
  paymentMethod: string;
  deliveryOption: string;
  address?: string;
  createdAt?: Date;
}

const orderSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  items: [{
    restaurantId: { type: String, required: true },
    quantity: { type: Number, required: true },
    drink: { type: String },
    extraCheese: { type: Boolean },
    name: { type: String },
    price: { type: Number },
    isDeal: { type: Boolean },
  }],
  total: { type: Number, required: true },
  status: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  deliveryOption: { type: String, required: true },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', orderSchema);