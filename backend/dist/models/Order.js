import mongoose, { Schema } from 'mongoose';
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
export default mongoose.model('Order', orderSchema);
