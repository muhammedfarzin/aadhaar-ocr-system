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
  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h3 className="text-lg font-semibold text-center mb-4">
        Extracted Aadhaar Details
      </h3>

      {data ? (
        <div className="text-sm bg-white p-3 rounded-lg border shadow">
          <p>
            <strong>Name:</strong> {data.name || "N/A"}
          </p>
          <p>
            <strong>Date of Birth:</strong> {data.dob || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {data.gender || "N/A"}
          </p>
          <p>
            <strong>Aadhaar Number:</strong> {data.aadhaarNumber || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {data.address || "N/A"}
          </p>
          <p>
            <strong>Pincode:</strong> {data.pincode || "N/A"}
          </p>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold">Response</h3>
            <pre className="text-sm bg-gray-200 p-2 rounded mt-2 overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
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
