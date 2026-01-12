import { RequestHandler } from "express";
import fs from "fs";
import type { IOCRService } from "../interfaces/IOCRService";

export class OCRController {
  constructor(private ocrService: IOCRService) {}

  performOCR: RequestHandler = async (req, res) => {
    try {
      if (!req.files || !req.files.front || !req.files.back) {
        return res
          .status(400)
          .json({ error: "Both front and back Aadhaar images are required!" });
      }

      if (Array.isArray(req.files.front)) req.files.front = req.files.front[0];
      if (Array.isArray(req.files.back)) req.files.back = req.files.back[0];

      const frontPath = req.files.front.tempFilePath;
      const backPath = req.files.back.tempFilePath;

      const frontText = await this.ocrService.extractTextFromImage(frontPath);
      const backText = await this.ocrService.extractTextFromImage(backPath);

      const extractResult = this.ocrService.extractAadhaarDetails(
        frontText,
        backText
      );

      fs.unlinkSync(frontPath);
      fs.unlinkSync(backPath);

      if (!extractResult.success) {
        return res.status(400).json({ error: extractResult.error });
      }

      res.status(200).json(extractResult.data);
    } catch (error) {
      res.status(500).json({ error: "OCR processing failed!" });
    }
  };
}
