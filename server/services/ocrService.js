import Tesseract from "tesseract.js";

export const extractAadhaarDetails = (frontText, backText) => {
  const info = {
    dob: null,
    aadhaarNumber: null,
    gender: null,
    name: null,
    address: null,
    pincode: null,
  };


  const cleanText = (text) => text.replace(/\s+/g, ' ').trim();
  const cleanFrontText = cleanText(frontText);
  const cleanBackText = cleanText(backText);

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
  info.name = nameMatch ? nameMatch.pop().trim() : null;

  // Extract Address
  const addressPattern = /Address:\s*([\s\S]*?)(?:\d{6}|$)/i;
  const addressMatch = cleanBackText.match(addressPattern);
  if (addressMatch) {
    info.address = cleanText(addressMatch[1])
      .replace(/[^\w\s,.-]/g, '') // Remove unwanted characters
      .replace(/\s+/g, ' ')
      .trim();
  }

  const pincodePattern = /\b(\d{6})\b/;
  const pincodeMatch = cleanBackText.match(pincodePattern);
  info.pincode = pincodeMatch ? pincodeMatch[0] : null;

  return info;
};

export const extractTextFromImage = async (path) => {
  try {
    const { data: { text } } = await Tesseract.recognize(path, 'eng');
    return text;
  } catch (error) {
    throw error;
  }
}