import { useState, type ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AadharInputButton from "./components/AadharInputButton";
import DisplayAadharData from "./components/DisplayAadharData";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ExtractedData {
  name: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  address: string;
  pincode: string;
}

function App() {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Handle file upload
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: "front" | "back"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    else if (!file.type.startsWith("image/"))
      toast.error("Please upload an image file");
    else if (type === "front") setFrontImage(file);
    else setBackImage(file);
  };

  // Handle OCR process
  const handleOCR = async () => {
    if (!frontImage || !backImage) {
      toast.error("Please upload both front and back images.");
      return;
    }

    const formData = new FormData();
    formData.append("front", frontImage);
    formData.append("back", backImage);

    setLoading(true);
    try {
      const response = await axios.post<ExtractedData>(
        `${BASE_URL}/ocr`,
        formData
      );
      setExtractedData(response.data);
    } catch (error) {
      toast.error(`OCR Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          Aadhaar OCR System
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Section - Image Upload */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-center mb-4">
              Upload Aadhaar Images
            </h3>

            {/* Front Image Upload */}
            <AadharInputButton
              image={frontImage}
              title="front"
              label="Upload Front Side"
              handleFileChange={handleFileChange}
            />

            {/* Back Image Upload */}
            <AadharInputButton
              image={backImage}
              title="back"
              label="Upload Back Side"
              handleFileChange={handleFileChange}
            />

            {/* Process OCR Button */}
            <button
              onClick={handleOCR}
              className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Processing..." : "Extract Aadhaar Details"}
            </button>
          </div>

          {/* Right Section - Extracted Aadhaar Details */}
          <DisplayAadharData data={extractedData} />
        </div>
      </div>
    </div>
  );
}

export default App;
