/**
 * User Mongoose Model
 * src/backend/models/User.js
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 4,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // adds createdAt, updatedAt
    }
);

module.exports = mongoose.model('User', userSchema);
