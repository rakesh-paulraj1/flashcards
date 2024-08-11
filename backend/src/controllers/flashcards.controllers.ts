import { Request, Response } from 'express';

import { Flashcards } from '../models/flashcards';

export class FlashcardsController {
    constructor() {}
    public async getflashcards(req: Request, res: Response): Promise<void> {
        try {
            const flashcards = await Flashcards.findAll();
            res.status(200).json(flashcards);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}