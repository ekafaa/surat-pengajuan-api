"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    bio: {
        name: {
            type: String,
            required: true,
        },
    },
});
exports.default = mongoose_1.default.model("admin", AdminSchema);
