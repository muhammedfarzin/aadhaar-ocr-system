import { Router } from "express";
import { performOCR } from "../controller/ocr.controller.js";

const router = Router();

// OCR route
router.post("/ocr", performOCR);

export { router };
