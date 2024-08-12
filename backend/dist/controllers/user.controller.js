"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usercontroller = void 0;
const flashcards_1 = require("../models/flashcards");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const user_1 = require("../models/user");
class Usercontroller {
    constructor() { }
    signupuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const existingUser = yield user_1.User.findOne({ where: { username: data.username } });
                if (existingUser) {
                    res.status(400).json({ err: "User already exists" });
                    return;
                }
                const user = yield user_1.User.create({ username: data.username, password: data.password });
                res.status(200).json({ message: "User created successfully" });
            }
            catch (error) {
                res.status(500).json({ err: 'Internal server error' });
            }
        });
    }
    loginuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield user_1.User.findOne({ where: { username: data.username, password: data.password } });
                if (!user) {
                    res.status(403).json({ err: "Invalid username or password" });
                    return;
                }
                const jwt = yield (0, jsonwebtoken_1.sign)({ id: user.getDataValue('id') }, config_1.JWT_SECRET);
                const user_id = user.getDataValue('id');
                res.status(200).json({ jwt, user_id, message: "User logged in successfully" });
            }
            catch (error) {
                res.status(500).json({ err: "Internal server error" });
            }
        });
    }
    usermiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization || "";
                const user = yield (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET);
                if (user) {
                    yield next();
                }
                else {
                    res.status(401).json({
                        err: "Unauthorized"
                    });
                }
            }
            catch (err) {
                res.status(500).json({
                    err: "Unable to log  user"
                });
            }
        });
    }
    addflashcards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { question, answer } = req.body;
            if (!question || !answer) {
                res.status(400).json({ error: 'Question and answer are required.' });
                return;
            }
            try {
                const flashcards = yield flashcards_1.Flashcards.create({ question, answer });
                res.status(200).json(flashcards);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    editflashcard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const question = req.body.question;
                const answer = req.body.answer;
                const flashcards = yield flashcards_1.Flashcards.update({ answer: answer, question: question }, { where: { id: id } });
                res.status(200).json(flashcards);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    deleteflashcard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const flashcards = yield flashcards_1.Flashcards.destroy({ where: { id: id } });
                res.status(200).json(flashcards);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.Usercontroller = Usercontroller;
