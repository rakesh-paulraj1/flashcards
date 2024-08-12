"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./models/user");
const flashcards_1 = require("./models/flashcards");
const Flashcardsrouter_1 = __importDefault(require("./routes/Flashcardsrouter"));
const Userrouter_1 = __importDefault(require("./routes/Userrouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + "/files", { index: false }));
app.use((0, cors_1.default)());
user_1.User.sync();
flashcards_1.Flashcards.sync()
    .then(() => console.log("All models synced with the database"))
    .catch((err) => console.error("Unable to sync  all models:", err));
app.use(Flashcardsrouter_1.default);
app.use(Userrouter_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
