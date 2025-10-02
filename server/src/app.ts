import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { router } from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
