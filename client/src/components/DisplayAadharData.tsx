import CodeBlock from "./CodeBlock";
import TableView from "./TableView";

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
          <TableView data={data} />

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold">Response</h3>

            <CodeBlock>{JSON.stringify(data, null, 2)}</CodeBlock>
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
