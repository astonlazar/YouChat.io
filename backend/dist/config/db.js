"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        mongoose_1.default.connect(process.env.MONGO_URI || '')
            .then(() => console.log('DB connected successfully'));
    }
    catch (error) {
        console.warn(`Error connecting to DB - ${error}`);
        process.exit(1);
    }
};
exports.default = connectDB;
