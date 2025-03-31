import { extractAadhaarDetails, extractTextFromImage } from "../services/ocrService.js";

export const performOCR = async (req, res) => {
  try {
    if (!req.files || !req.files.front || !req.files.back) {
      return res.status(400).json({ error: "Both front and back Aadhaar images are required!" });
    }

    const frontPath = req.files.front.tempFilePath;
    const backPath = req.files.back.tempFilePath;

    const frontText = await extractTextFromImage(frontPath);
    const backText = await extractTextFromImage(backPath);

    const data = extractAadhaarDetails(frontText, backText);

    res.json({ data });
  } catch (error) {
    console.error("OCR Error:", error);
    res.status(500).json({ error: "OCR processing failed!" });
  }
};
