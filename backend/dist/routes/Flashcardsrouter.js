"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flashcards_controllers_1 = require("../controllers/flashcards.controllers");
const router = (0, express_1.Router)();
const flashcardsController = new flashcards_controllers_1.FlashcardsController();
router.get("/flashcards", flashcardsController.getflashcards);
exports.default = router;
