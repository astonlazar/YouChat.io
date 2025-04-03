"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_1 = require("../utils/auth");
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        let userCheck = await userModel_1.default.findOne({ username });
        if (userCheck) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await userModel_1.default.create({
            username,
            password: hashedPassword
        });
        let id = user._id;
        res.status(201).json({ token: (0, auth_1.generateToken)(id) });
    }
    catch (error) {
        console.warn(`Error in registerUser- ${error}`);
        res.status(400).json({ message: `Registration failed` });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        let userCheck = await userModel_1.default.findOne({ username });
        if (!userCheck) {
            res.status(404).json({ message: 'User does not exist. If account not created, Register.' });
            return;
        }
        let passwordCompare = await bcrypt_1.default.compare(password, userCheck.password);
        if (!passwordCompare) {
            res.status(404).json({ message: 'Enter the correct password' });
            return;
        }
        let id = userCheck._id;
        res.status(200).json({ token: (0, auth_1.generateToken)(id) });
    }
    catch (error) {
        console.warn(`Error in loginUser- ${error}`);
        res.status(400).json({ message: `Login failed` });
    }
};
exports.loginUser = loginUser;
