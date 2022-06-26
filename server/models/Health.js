const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthSchema = new Schema({
     fullname:{
        type: String,
        required: true,
        trim: true
     },
     temperature: {
        type: Number,
        required: true,
        trim: true
     },
     email: {
        type: String,
        required: true,
        trim: true
     },
     phone: {
        type: String,
        required: true,
        trim: true
     }
},{
    timestamps: true
});



// collection name & schema
const HealthModel = mongoose.model('health',healthSchema);

module.exports = HealthModel