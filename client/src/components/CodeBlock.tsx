import CopyButton from "./CopyButton";

interface Props {
  children?: string;
}

const CodeBlock: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative mt-2">
      {children && (
        <CopyButton
          text={children}
          className="absolute top-2 right-2 z-10"
          title="Copy JSON response"
        />
      )}

      <pre className="text-sm bg-gray-200 p-2 rounded overflow-x-auto">
        {children}
      </pre>
    </div>
  );
};

export default CodeBlock;
