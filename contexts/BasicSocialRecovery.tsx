/* eslint-disable no-unused-vars */
import { useEthers } from "@usedapp/core";
import { isAddress } from "ethers/lib/utils";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BasicSocialRecovery } from "ryup-social-recovery-tool";
import { InputEvent } from "../interfaces";

export interface BasicSocialRecoveryContextInterface {
  upAddress: string;
  upAddressInputError: string | undefined;
  bsr: BasicSocialRecovery | undefined;
  handleChangeUpAddress: (e: InputEvent) => void;
  luksoBrowserWalletOn?: boolean;
  setLuksoBrowserWalletOn?: (on: boolean) => void;
}

const BasicSocialRecoveryContext = createContext<
  BasicSocialRecoveryContextInterface | undefined
>(undefined);

const BasicSocialRecoveryProvider = (props: { children: ReactNode }) => {
  const { library, account } = useEthers();
  const [upAddress, setUpAddress] = useState<string>("");
  const [upAddressInputError, setUpAddressInputError] = useState<
    string | undefined
  >();
  const [bsr, setBsr] = useState<BasicSocialRecovery>();
  //const [luksoBrowserWalletOn, setLuksoBrowserWalletOn] = useState(false);

  const handleChangeUpAddress = (e: InputEvent) => {
    setUpAddressInputError(undefined);
    if (!e.target.value) {
      setUpAddress("");
      return;
    }
    if (!isAddress(e.target.value)) {
      setUpAddressInputError("Universal Profile Address is not valid address");
    }
    setUpAddress(e.target.value);
  };

  useEffect(() => {
    setBsr(undefined);
    if (!account || !library || upAddress === "" || upAddressInputError) return;
    const _bsr = new BasicSocialRecovery(upAddress, library);
    setBsr(_bsr);
  }, [account, library, upAddress, upAddressInputError]);

  return (
    <BasicSocialRecoveryContext.Provider
      value={{
        upAddress,
        upAddressInputError,
        handleChangeUpAddress,
        bsr,
      }}
    >
      {props.children}
    </BasicSocialRecoveryContext.Provider>
  );
};

const useBSR = () => useContext(BasicSocialRecoveryContext)!;

export { BasicSocialRecoveryProvider, useBSR };
