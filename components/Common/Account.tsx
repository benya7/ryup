interface Props {
  account: string;
}
export default function Account({ account }: Props) {
  return (
    <p className="mr-2 hidden font-semibold dark:text-white lg:block">
      {`${account.substring(0, 6)}...${account.substring(account.length - 6)}`}
    </p>
  );
}
