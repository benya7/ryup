/* eslint-disable no-unused-vars */

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SuccessContextInterface {
  ethersSuccess: string | undefined;
  setEthersSuccess: (s: string | undefined) => void;
}

const SuccessContext = createContext<SuccessContextInterface | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}
const SuccessProvider = ({ children }: Props) => {
  const [ethersSuccess, setEthersSuccess] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!ethersSuccess) return;
    const interval = setTimeout(() => setEthersSuccess(undefined), 10000);
    return () => clearTimeout(interval);
  }, [ethersSuccess]);

  return (
    <SuccessContext.Provider value={{ ethersSuccess, setEthersSuccess }}>
      {children}
    </SuccessContext.Provider>
  );
};

const useSuccess = () => useContext(SuccessContext)!;

export { SuccessProvider, useSuccess };
