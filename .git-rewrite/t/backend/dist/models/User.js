import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String }, // Add this
    createdAt: { type: Date, default: Date.now },
    price: { type: Number, required: true, min: 0 },
});
export default mongoose.model('User', userSchema);
