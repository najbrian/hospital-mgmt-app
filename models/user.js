const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    credentials: {
        type: String,
        enum: ['Level-1', 'Level-2', 'Level-3', 'Level-4'],
        required: true
    },
    roles: {
        type: String,
        enum: ['Doctor', 'Nurse', 'Tech', 'Pharmacist'],
        required: true
    }

});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

module.exports = mongoose.model('User', userSchema);