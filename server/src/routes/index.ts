import { Router } from "express";
import { OCRController } from "../controller/ocr.controller";
import { aadharOCRService } from "../services/ocrService";

const router = Router();
const ocrController = new OCRController(aadharOCRService);

// OCR route
router.post("/ocr", ocrController.performOCR);

export { router };
