import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, maxLength: 50 },
    lastName: { type: String, required: true, maxLength: 50 },
    email: { 
        type: String, 
        index: true, 
        unique: true,
        maxLength: 80 
    },
    hash: { type: String, required: true, maxLength: 256 },
    nickName: { type: String, required: false, maxLength: 50 },
    type: { 
        type: String, 
        required: true, 
        enum: ['developer', 'customer', 'admin'], 
        default: 'customer'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    removedAt: { type: Date, default: null },
});

export const User = mongoose.model('Users', userSchema, 'Users');