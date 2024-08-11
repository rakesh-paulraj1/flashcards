import express,{Express} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { User } from "./models/user";
import { Flashcards } from "./models/flashcards";
import Flashcardsrouter from "./routes/Flashcardsrouter"
import Userrouter from "./routes/Userrouter"
dotenv.config();

const app: Express = express();
const port=3001;
app.use(express.json());
app.use(express.static(__dirname + "/files", { index: false }));
app.use(cors());

User.sync()
Flashcards.sync()


  .then(() => console.log("All models synced with the database"))
  .catch((err) => console.error("Unable to sync  all models:", err));
   
app.use(Flashcardsrouter);
app.use(Userrouter);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port!}`);
});