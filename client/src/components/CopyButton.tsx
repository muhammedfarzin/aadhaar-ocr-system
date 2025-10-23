import { toast } from "react-toastify";
import CopyIcon from "../assets/icons/CopyIcon";
import clsx from "clsx";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

const CopyButton: React.FC<Props> = ({
  text,
  children,
  className,
  disabled,
  title,
  ...props
}) => {
  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text.");
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={disabled || !text}
      className={clsx(
        "rounded-md transition-colors",
        text && "cursor-pointer",
        typeof children !== "string" &&
          "p-1.5 text-gray-600 hover:bg-gray-300 disabled:bg-transparent disabled:text-current hover:text-gray-900 active:bg-gray-400",
        className
      )}
      title={text && title}
      {...props}
    >
      {children || <CopyIcon className="w-5 h-5" />}
    </button>
  );
};

export default CopyButton;
