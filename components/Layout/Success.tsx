import { FiX } from "react-icons/fi";

interface Props {
  message: string;
  onClose: () => void;
}
export default function Success({ message, onClose }: Props) {
  return (
    <div className="fixed top-24 right-0 border-t-4 border-green-700 bg-green-200 p-6 shadow-lg sm:top-16 sm:right-5 sm:w-1/3">
      <FiX
        className="absolute right-5 top-5 h-5 w-5 text-green-600"
        onClick={onClose}
      />
      <p className="font-semibold text-green-700 underline">Transaction:</p>
      <p className="mt-2 truncate text-green-600">{message}</p>
    </div>
  );
}
