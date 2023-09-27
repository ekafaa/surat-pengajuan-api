"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const main_1 = require("./controller/main");
const admin_1 = require("./controller/admin");
const auth_1 = __importDefault(require("./controller/auth"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const protected_1 = require("./middleware/protected");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const key = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "selfsigned.key"));
const cert = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "selfsigned.crt"));
const app = (0, express_1.default)();
const server = https_1.default.createServer({
    key: key,
    cert: cert,
}, app);
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
//Admin
app.get("/admin/surat", protected_1.verifiedAdmin, admin_1.adminGetAllSurat);
app.get("/admin/user", protected_1.verifiedAdmin, admin_1.adminGetAllUser);
app.post("/admin/user", protected_1.verifiedAdmin, main_1.createNewUser);
app.post("/admin", auth_1.default);
//Surat
app.get("/surat/:suratId", protected_1.verifiedUser, main_1.getSurat);
app.get("/surat", protected_1.verifiedUser, main_1.getSurat);
app.delete("/surat/:suratId", protected_1.verifiedUser, main_1.deleteSurat);
app.put("/surat/:suratId", protected_1.verifiedUser, main_1.generateSurat);
app.post("/surat", protected_1.verifiedUser, main_1.generateSurat);
//User
app.post("/user", main_1.createNewUser);
app.get("/user", protected_1.verifiedUser, main_1.getUser);
//Auth
app.post("/login", auth_1.default);
//Util
app.get("/", (_, res, __) => {
    return res.status(200).json({
        msg: "Server is Alived",
    });
});
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({ message: err.message });
});
mongoose_1.default
    .connect(process.env.MongoURI)
    .then(() => {
    server.listen(process.env.PORT, () => console.log("Server is Connected"));
})
    .catch((err) => console.log(err));
exports.default = app;
