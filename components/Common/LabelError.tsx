interface Props {
  label: string;
}
export default function LabelError({ label }: Props) {
  return (
    <p className="text-[0.7rem] font-normal text-red-600 dark:text-red-400">
      Error: {label}
    </p>
  );
}
