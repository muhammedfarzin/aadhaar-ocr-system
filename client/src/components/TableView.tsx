import CopyButton from "./CopyButton";

interface Props
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  data: Record<string, any>;
}

const TableView: React.FC<Props> = ({ data, ...props }) => {
  const formatLabel = (key: string) => {
    if (key === "dob") return "Date of Birth";

    // Split camelCase and capitalize
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <table {...props}>
      {Object.entries(data).map(([key, value]) => (
        <tr key={key}>
          <th align="left" className="flex justify-between w-30">
            <span>{formatLabel(key)}</span>:
          </th>
          <td className="pl-1">
            <CopyButton
              text={value}
              className="p-0.5! text-start text-black"
              title="Copy"
            >
              {value || "N/A"}
            </CopyButton>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default TableView;
