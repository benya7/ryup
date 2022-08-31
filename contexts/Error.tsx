/* eslint-disable no-unused-vars */

import { useEthers } from "@usedapp/core";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ErrorContextInterface {
  ethersError: Error | undefined;
  setEthersError: (e: Error | undefined) => void;
}

const ErrorContext = createContext<ErrorContextInterface | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}
const ErrorProvider = ({ children }: Props) => {
  const [ethersError, setEthersError] = useState<Error | undefined>(undefined);
  const { error } = useEthers();

  useEffect(() => {
    if (!ethersError) return;
    const interval = setTimeout(() => setEthersError(undefined), 10000);
    return () => clearTimeout(interval);
  }, [ethersError]);

  useEffect(() => {
    if (!error) return;
    setEthersError(error);
    const interval = setTimeout(() => setEthersError(undefined), 10000);
    return () => clearTimeout(interval);
  }, [error]);

  return (
    <ErrorContext.Provider value={{ ethersError, setEthersError }}>
      {children}
    </ErrorContext.Provider>
  );
};

const useError = () => useContext(ErrorContext)!;

export { ErrorProvider, useError };
