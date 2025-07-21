import mongoose, { Schema } from 'mongoose';
const orderSchema = new Schema({
    userId: { type: String, required: true },
    restaurantId: { type: String, required: true, ref: 'Restaurant' },
    quantity: { type: Number, required: true, min: 1 },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'delivered', 'cancelled'] },
    createdAt: { type: Date, default: Date.now },
    items: [{ restaurantId: { type: String, ref: 'Restaurant' }, quantity: Number, price: Number, itemTotal: Number }],
});
export default mongoose.model('Order', orderSchema);
//# sourceMappingURL=Order.js.map