import mongoose, { Schema } from 'mongoose';
const restaurantSchema = new Schema({
    _id: { type: String, required: true }, // Default to string, adjust if Compass uses ObjectId
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    popular: { type: Boolean, default: false },
}, { collection: 'restaurants' });
export default mongoose.model('Restaurant', restaurantSchema);
