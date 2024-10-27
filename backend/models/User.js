// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare the plain text password with the hashed password
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
