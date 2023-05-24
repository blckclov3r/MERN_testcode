import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const client = mongoose.model('Client', ClientSchema);
export default client;
