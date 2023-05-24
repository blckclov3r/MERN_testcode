import mongoose, { mongo } from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const project = mongoose.model('Project', ProjectSchema);
export default project;
