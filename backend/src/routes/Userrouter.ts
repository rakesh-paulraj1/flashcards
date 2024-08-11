import { Router } from "express";
import { Usercontroller } from "../controllers/user.controller";

const router=Router();
const usercontroller=new Usercontroller();
router.post("/signup",usercontroller.signupuser);
router.post("/login",usercontroller.loginuser);
router.use('/admin',usercontroller.usermiddleware);
router.post("/admin/addflashcards",usercontroller.addflashcards);
router.put("/admin/editflashcards/:id",usercontroller.editflashcard);
router.delete("/admin/deleteflashcards/:id",usercontroller.deleteflashcard);
export default router;
