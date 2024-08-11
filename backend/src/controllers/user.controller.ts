import { Request, Response } from 'express';
import { Flashcards } from '../models/flashcards';
import {sign,verify} from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

import { User } from '../models/user';
export class Usercontroller {
    constructor() {}
    public async signupuser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;

            const existingUser = await User.findOne({ where: { username } });

            if (existingUser) {
                res.status(400).json({ err: "User already exists" });
                return;
            }

            const user = await User.create({ username, password });

            res.status(200).json({ message: "User created successfully" });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    public async loginuser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
    
            const user = await User.findOne({ where: { username, password } });
    
            if (!user) {
                res.status(403).json({ err: "Invalid username or password" });
                return;
            }
            const jwt = await sign({ id: user.getDataValue('id') }, JWT_SECRET!);
    
            const user_id = user.getDataValue('id');
    
            res.status(200).json({ jwt, user_id, message: "User logged in successfully" });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ err: "Internal server error" });
        }
    }
    public async usermiddleware(req:Request,res:Response,next:Function):Promise<void>{
        try{
            const token=req.headers.authorization||"";
            const user=await verify(token,JWT_SECRET!);
            if(user){
                await next();
            }
            else{
                res.status(401).json({
                    err:"Unauthorized"
                })
            }
    }catch(err){
        res.status(500).json({
            err:"Unable to log  user"
        })
    }}

    public async addflashcards(req: Request, res: Response): Promise<void> {
        const { question, answer } = req.body;
    
        
        if (!question || !answer) {
            res.status(400).json({ error: 'Question and answer are required.' });
            return;
        }
    
        try {
            const flashcards = await Flashcards.create({ question, answer });
            res.status(200).json(flashcards);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    public async editflashcard(req: Request, res: Response): Promise<void> {
        try {
            const id=req.params.id;
            const question=req.body.question;
            const answer=req.body.answer;
            const flashcards = await Flashcards.update({answer:answer,question:question},{where:{id:id}});
            res.status(200).json(flashcards);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    public async deleteflashcard(req: Request, res: Response): Promise<void> {
        try {
            const id=req.params.id;
            const flashcards = await Flashcards.destroy({where:{id:id}});
            res.status(200).json(flashcards);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}