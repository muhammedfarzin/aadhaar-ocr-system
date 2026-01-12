interface OCRValidationResult {
  success: boolean;
  error?: string;
  data: AadhaarInfo | null;
}

export interface IOCRService {
  extractTextFromImage(path: string): Promise<string>;
  extractAadhaarDetails(
    frontText: string,
    backText: string
  ): OCRValidationResult;
}
