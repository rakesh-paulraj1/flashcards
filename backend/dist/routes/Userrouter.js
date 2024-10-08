"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
const usercontroller = new user_controller_1.Usercontroller();
router.post("/signup", usercontroller.signupuser);
router.post("/login", usercontroller.loginuser);
router.use('/admin', usercontroller.usermiddleware);
router.post("/admin/addflashcards", usercontroller.addflashcards);
router.put("/admin/editflashcards/:id", usercontroller.editflashcard);
router.delete("/admin/deleteflashcards/:id", usercontroller.deleteflashcard);
exports.default = router;
