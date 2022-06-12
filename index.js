import "dotenv/config";
import Database from "./src/classes/Database.js";
const database = new Database(process.env.MONGO_URL);

database.createIntern(object, "Benjamin", "anthonyjbenjamin@gmail.com", "Pizza");

// database.deleteIntern("anthonyjbenjamin@gmail.com");