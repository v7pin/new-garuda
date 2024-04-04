const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://agro-admin:agro-123@vedant.jfvpwaf.mongodb.net/cctv-servilance");

const userSchema = new mongoose.Schema({
    Useremail: { type: String, unique: true, required: true },
    Username: { type: String, unique: true, required: true },
    Password: { type: String, required: true },
    Servilancepartner: { type: Boolean, required: true }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

const surveillanceSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    adhar: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    Servilancepartner: { type: Boolean, required: true }
});

const ServilanceUser = mongoose.model('surveillanceUser', surveillanceSchema);

module.exports = { UserModel, ServilanceUser };
