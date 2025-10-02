import type { ChangeEvent } from "react";

interface Props {
  label: string;
  handleFileChange: (
    event: ChangeEvent<HTMLInputElement>,
    type: "front" | "back"
  ) => void;
  title: "front" | "back";
  image: File | null;
}

const AadharInputButton: React.FC<Props> = ({
  label,
  handleFileChange,
  title,
  image,
}) => {
  return (
    <div className="text-center mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, title)}
        className="mt-2 border p-2 w-full cursor-pointer"
      />
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt={`${title} aadhaar`}
          className="mt-2 w-full h-40 object-cover rounded"
        />
      )}
    </div>
  );
};

export default AadharInputButton;
