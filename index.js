import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 8000

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is runing on port: ${PORT} ✅`);
        })
    })
    .catch((err) => {
        console.error("MongoDB Connection error ❌", err);
        process.exit(1);
    })
