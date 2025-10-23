import Tesseract from "tesseract.js";

interface AadhaarInfo {
  dob: string | null;
  aadhaarNumber: string | null;
  gender: string | null;
  name: string | null;
  address: string | null;
  pincode: string | null;
}

export interface OCRValidationResult {
  success: boolean;
  error?: string;
  data: AadhaarInfo | null;
}

const markerExistsRegex =
  /(Date of Birth|DOB|Government of India|Male|Female)/i;
const addressExistsRegex = /Address:/i;

export const extractAadhaarDetails = (
  frontText: string,
  backText: string
): OCRValidationResult => {
  const info: AadhaarInfo = {
    name: null,
    dob: null,
    gender: null,
    aadhaarNumber: null,
    address: null,
    pincode: null,
  };

  const cleanText = (text: string) => text.replace(/\s+/g, " ").trim();
  let cleanFrontText = cleanText(frontText);
  let cleanBackText = cleanText(backText);

  // Validating aadhar
  let frontHasMarkers = markerExistsRegex.test(cleanFrontText);
  let frontHasAddress = addressExistsRegex.test(cleanFrontText);

  let backHasMarkers = markerExistsRegex.test(cleanBackText);
  let backHasAddress = addressExistsRegex.test(cleanBackText);

  const isSwapped =
    frontHasAddress && !frontHasMarkers && backHasMarkers && !backHasAddress;

  if (isSwapped) {
    [cleanFrontText, cleanBackText] = [cleanBackText, cleanFrontText];

    // Swapping Regex results
    [frontHasAddress, frontHasMarkers, backHasAddress, backHasMarkers] = [
      backHasAddress,
      backHasMarkers,
      frontHasAddress,
      frontHasMarkers,
    ];
  }

  if (frontHasAddress && !frontHasMarkers) {
    return {
      success: false,
      error:
        "Front image seems to be the back. Please upload front image of card.",
      data: null,
    };
  }

  if (backHasMarkers && !backHasAddress) {
    return {
      success: false,
      error:
        "Back image seems to be the front. Please upload back image of card.",
      data: null,
    };
  }

  if (!frontHasMarkers || !backHasAddress) {
    return {
      success: false,
      error:
        "Could not detect a valid Aadhaar card. Please upload clear images of both sides of the Aadhar card.",
      data: null,
    };
  }

  // Extract DOB
  const dobPattern = /(?:Date of Birth|DOB) ?:? *(\d{2}\/\d{2}\/\d{4})/i;
  const dobMatch = cleanFrontText.match(dobPattern);
  info.dob = dobMatch ? dobMatch[1] : null;

  // Extract Aadhaar Number
  const aadhaarPattern = /(\d{4} \d{4} \d{4})/;
  const aadhaarMatch = cleanFrontText.match(aadhaarPattern);
  info.aadhaarNumber = aadhaarMatch ? aadhaarMatch[1] : null;

  // Extract Gender
  const genderPattern = /\b(Male|Female)\b/i;
  const genderMatch = cleanFrontText.match(genderPattern);
  info.gender = genderMatch ? genderMatch[1] : null;

  // Extract Name
  const namePattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g;
  const nameMatch = cleanFrontText.match(namePattern);
  info.name = nameMatch?.pop()?.trim() ?? null;

  // Extract Address
  const addressPattern = /Address:\s*([\s\S]*?)(?:\d{6}|$)/i;
  const addressMatch = cleanBackText.match(addressPattern);
  if (addressMatch) {
    info.address = cleanText(addressMatch[1])
      .replace(/[^\w\s,.-]/g, "") // Remove unwanted characters
      .replace(/\s+/g, " ")
      .trim();
  }

  const pincodePattern = /\b(\d{6})\b/;
  const pincodeMatch = cleanBackText.match(pincodePattern);
  info.pincode = pincodeMatch ? pincodeMatch[0] : null;

  if (!info.aadhaarNumber && !info.dob && !info.address) {
    return {
      success: false,
      error: "OCR failed to extract details. Please use a clearer image.",
      data: null,
    };
  }

  return { success: true, data: info };
};

export const extractTextFromImage = async (path: string) => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(path, "eng");
    return text;
  } catch (error) {
    throw error;
  }
};
