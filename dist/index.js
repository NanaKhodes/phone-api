"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const phoneRoutes_1 = __importDefault(require("./routes/phoneRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
app.use(express_1.default.json());
app.use("/api", phoneRoutes_1.default);
app.use("/api", uploadRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
