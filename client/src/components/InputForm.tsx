import { useState, type ChangeEvent } from "react";
import AadharInputButton from "./AadharInputButton";
import { toast } from "react-toastify";

interface Props {
  onSubmit: (frontImage: File | null, backImage: File | null) => Promise<void>;
}

const InputForm: React.FC<Props> = ({ onSubmit }) => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
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
        onClick={() => {
          setIsLoading(true);
          onSubmit(frontImage, backImage).finally(() => {
            setIsLoading(false);
          });
        }}
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-600/80 cursor-pointer transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Extract Aadhaar Details"}
      </button>
    </div>
  );
};

export default InputForm;
