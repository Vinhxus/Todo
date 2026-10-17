import express from 'express'
import dotenv from "dotenv"
import router from './routes/todoRoute.js'
import cors from "cors"

import {connectDB} from './db/db.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

app.use(express.json());
app.use("/api/todos", router);

connectDB();

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
