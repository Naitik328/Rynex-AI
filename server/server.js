import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {connectDB} from "./db/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import configurePassport from "./passport.config.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
configurePassport(app);



app.use(express.json());
app.use(cookieParser()); 


app.use("/api/auth", authRouter);


app.get("/", (req, res) => {
    res.send("Rynex API is Running...");
  });

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});