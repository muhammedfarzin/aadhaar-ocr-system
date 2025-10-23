import { toast } from "react-toastify";
import CopyIcon from "../assets/icons/CopyIcon";

interface ExtractedData {
  name: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  address: string;
  pincode: string;
}

interface Props {
  data: ExtractedData | null;
}

const DisplayAadharData: React.FC<Props> = ({ data }) => {
  const handleCopy = async () => {
    if (!data) return;
    const dataString = JSON.stringify(data, null, 2);

    try {
      await navigator.clipboard.writeText(dataString);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text.");
    }
  };

  const formatLabel = (key: string) => {
    if (key === "dob") return "Date of Birth";

    // Split camelCase and capitalize
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h3 className="text-lg font-semibold text-center mb-4">
        Extracted Aadhaar Details
      </h3>

      {data ? (
        <div className="text-sm bg-white p-3 rounded-lg border shadow">
          {Object.entries(data).map(([key, value]) => (
            <p key={key}>
              <strong>{formatLabel(key)}:</strong> {value || "N/A"}
            </p>
          ))}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold">Response</h3>

            <div className="relative mt-2">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-md text-gray-600 hover:bg-gray-300 hover:text-gray-900 active:bg-gray-400 transition-colors"
                title="Copy JSON response"
              >
                <CopyIcon className="w-5 h-5" />
              </button>

              <pre className="text-sm bg-gray-200 p-2 rounded overflow-x-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No Aadhaar data extracted yet.
        </p>
      )}
    </div>
  );
};

export default DisplayAadharData;
