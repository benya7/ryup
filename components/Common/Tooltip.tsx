import { ReactNode, useState } from "react";

interface Props {
  msg: string;
  width?: string;
  children?: ReactNode;
  triggerClick?: boolean;
}

export default function Tooltip({
  msg,
  width = "w-40",
  children,
  triggerClick,
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const show = () => {
    if (triggerClick) return;
    setShowTooltip(true);
  };
  const hide = () => setShowTooltip(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onClick={() => setShowTooltip((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={() => null}
    >
      {showTooltip && (
        <span
          className={`absolute top-4 left-[-4.5rem] z-30 ${width} rounded-xl bg-gray-700 p-2 text-center text-[0.65rem] font-normal text-white dark:bg-gray-300 dark:text-black`}
        >
          {msg}
        </span>
      )}
      {children}
    </div>
  );
}
