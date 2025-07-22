import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  address?: string; // Optional address field
  createdAt: Date;
  price: number;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String }, // Add this
  createdAt: { type: Date, default: Date.now },
  price: { type: Number, required: true, min: 0 },
});

export default mongoose.model<IUser>('User', userSchema);