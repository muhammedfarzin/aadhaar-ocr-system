import { useState, type ChangeEvent } from "react";
import AadharInputButton from "./AadharInputButton";
import { toast } from "react-toastify";

interface Props {
  onSubmit: (frontImage: File | null, backImage: File | null) => Promise<void>;
  onClear?: () => void;
}

const InputForm: React.FC<Props> = ({ onSubmit, onClear }) => {
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

  const handleSubmit = () => {
    setIsLoading(true);
    onSubmit(frontImage, backImage).finally(() => {
      setIsLoading(false);
    });
  };

  const handleClear = () => {
    setFrontImage(null);
    setBackImage(null);
    onClear?.();
  };

  return (
    <form
      className="bg-gray-50 p-4 rounded-lg border"
      onSubmit={(e) => e.preventDefault()}
    >
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

      <div className="flex flex-row">
        {/* Clear Button */}
        <button
          onClick={handleClear}
          type="reset"
          className="mt-4 w-full bg-gray-400 text-black p-2 rounded-s-md hover:bg-gray-500 cursor-pointer disabled:bg-gray-400/80 disabled:cursor-not-allowed transition-all duration-300"
          disabled={isLoading}
        >
          Clear
        </button>

        {/* Process OCR Button */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-e-md hover:bg-blue-700 disabled:bg-blue-600/80 disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Extract Aadhaar Details"}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
