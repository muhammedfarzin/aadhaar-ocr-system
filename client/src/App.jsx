import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file upload
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;
    else if (!file.type.startsWith("image/")) toast.error("Please upload an image file");
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
      const response = await axios.post(`${BASE_URL}/ocr`, formData);
      setExtractedData(response.data);
    } catch (error) {
      toast.error("OCR Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-4">Aadhaar OCR System</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Section - Image Upload */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-center mb-4">Upload Aadhaar Images</h3>

            {/* Front Image Upload */}
            <div className="text-center mb-4">
              <label className="block text-sm font-medium">Upload Front Side</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "front")}
                className="mt-2 border p-2 w-full cursor-pointer"
              />
              {frontImage && (
                <img
                  src={URL.createObjectURL(frontImage)}
                  alt="Front Aadhaar"
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
            </div>

            {/* Back Image Upload */}
            <div className="text-center">
              <label className="block text-sm font-medium">Upload Back Side</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "back")}
                className="mt-2 border p-2 w-full cursor-pointer"
              />
              {backImage && (
                <img
                  src={URL.createObjectURL(backImage)}
                  alt="Back Aadhaar"
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
            </div>

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
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-center mb-4">Extracted Aadhaar Details</h3>

            {extractedData ? (
              <div className="text-sm bg-white p-3 rounded-lg border shadow">
                <p><strong>Name:</strong> {extractedData.data.name || "N/A"}</p>
                <p><strong>Date of Birth:</strong> {extractedData.data.dob || "N/A"}</p>
                <p><strong>Gender:</strong> {extractedData.data.gender || "N/A"}</p>
                <p><strong>Aadhaar Number:</strong> {extractedData.data.aadhaarNumber || "N/A"}</p>
                <p><strong>Address:</strong> {extractedData.data.address || "N/A"}</p>
                <p><strong>Pincode:</strong> {extractedData.data.pincode || "N/A"}</p>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold">Response</h3>
                  <pre className="text-sm bg-gray-200 p-2 rounded mt-2 overflow-x-auto">
                    {JSON.stringify(extractedData, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">No Aadhaar data extracted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
