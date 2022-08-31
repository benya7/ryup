import { FiInfo } from "react-icons/fi";
import Tooltip from "./Tooltip";

interface Props {
  msg: string;
}
export default function InfoTooltip({ msg }: Props) {
  return (
    <Tooltip msg={msg}>
      <FiInfo className="mr-1 h-3 w-3" />
    </Tooltip>
  );
}
