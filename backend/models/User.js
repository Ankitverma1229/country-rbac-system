import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {type: String, unique: true},
    password: { type: String, required: true },
    country: { type: String, default: undefined }, 
    role: { type: String, enum: ['Admin', 'Viewer'], default: 'Viewer' }, 
    image: {type: String, required: true},
    lastAdminRequest: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
