import mongoose, { now } from "mongoose";

export const DBUsersSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    status: {
        type: String,
    }
}, { timestamps: true })
