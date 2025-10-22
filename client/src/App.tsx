import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import DisplayAadharData from "./components/DisplayAadharData";
import InputForm from "./components/InputForm";

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
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );

  // Handle OCR process
  const handleOCR = async (frontImage: File | null, backImage: File | null) => {
    if (!frontImage || !backImage) {
      toast.error("Please upload both front and back images.");
      return;
    }

    const formData = new FormData();
    formData.append("front", frontImage);
    formData.append("back", backImage);

    try {
      const response = await axios.post<ExtractedData>(
        `${BASE_URL}/ocr`,
        formData
      );
      setExtractedData(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(`OCR Error: ${error}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          Aadhaar OCR System
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Section - Image Upload */}
          <InputForm
            onSubmit={handleOCR}
            onClear={() => setExtractedData(null)}
          />

          {/* Right Section - Extracted Aadhaar Details */}
          <DisplayAadharData data={extractedData} />
        </div>
      </div>
    </div>
  );
}

export default App;
