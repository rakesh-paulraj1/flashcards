import { Router } from "express";
import { FlashcardsController } from "../controllers/flashcards.controllers";

const router=Router();
const flashcardsController=new FlashcardsController();
router.get("/flashcards",flashcardsController.getflashcards);
export default router;