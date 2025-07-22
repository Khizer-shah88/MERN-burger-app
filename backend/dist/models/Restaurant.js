import mongoose, { Schema } from 'mongoose';
const restaurantSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
});
export default mongoose.model('Restaurant', restaurantSchema);
