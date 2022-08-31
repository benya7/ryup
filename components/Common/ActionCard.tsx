import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  height?: string;
  width?: string;
  color?: [string, string];
}
export default function ActionCard({
  title,
  children,
  height = "h-80",
  width = "sm:w-[25rem]",
  color = ["bg-gray-300", "dark:bg-gray-800"],
}: Props) {
  return (
    <div
      className={`relative mx-auto mb-4 ${height} w-full rounded-xl ${color[0]} ${color[1]} ${width}`}
    >
      <div className="h-full p-6 px-10">
        {title && (
          <p className="mb-8 text-center font-bold dark:text-white sm:text-lg">
            {title}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
