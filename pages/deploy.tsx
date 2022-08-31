/* eslint-disable no-unused-vars */
import { isBigNumberish } from "@ethersproject/bignumber/lib/bignumber";
import { useEthers } from "@usedapp/core";
import { BigNumberish } from "ethers";
import Head from "next/head";
import { useCallback, useMemo, useState } from "react";
import { FiCompass, FiCopy, FiFileText, FiX } from "react-icons/fi";
import { DeployOptions } from "ryup-social-recovery-tool";
import ActionButton from "../components/Common/ActionButton";
import Tooltip from "../components/Common/Tooltip";
import UniversalProfileAddressLabel from "../components/Common/UniversalProfileAddressLabel";
import Options from "../components/Deploy/Options";
import { supportedChains, textContent } from "../constants";
import { useBSR } from "../contexts/BasicSocialRecovery";
import { useError } from "../contexts/Error";
import { useSuccess } from "../contexts/Success";
import useLoading from "../hooks/useLoading";
import copyToClipboard from "../utils/copy-to-clipboard";
import handleError from "../utils/handle-error";
import toKeccak256 from "../utils/to-keccak256";

export default function Deploy(): JSX.Element {
  const { upAddress, upAddressInputError, handleChangeUpAddress, bsr } =
    useBSR();
  const { account, chainId } = useEthers();
  const { setEthersError } = useError();
  const { setEthersSuccess } = useSuccess();
  const { isLoading, startLoad, stopLoad } = useLoading();
  const [bsrAddress, setBsrAddress] = useState<string>("");
  const [deployStep, setDeployStep] = useState("");
  const [triggerReset, setTriggerReset] = useState(false);

  const [deployOptions, setDeployOptions] = useState<DeployOptions>({});

  const handleChangeDeployOptions = (
    key: "secret" | "threshold" | "guardians",
    value: string | BigNumberish | string[] | undefined
  ) => {
    if (key === "secret" && typeof value === "string") {
      setDeployOptions((prev) => {
        return {
          ...prev,
          secret: toKeccak256(value),
        };
      });
    } else if (
      key === "guardians" &&
      value &&
      !isBigNumberish(value) &&
      typeof value !== "string" &&
      value.length > 0
    ) {
      setDeployOptions((prev) => {
        return {
          ...prev,
          guardians: value,
        };
      });
    } else if (key === "threshold" && isBigNumberish(value)) {
      setDeployOptions((prev) => {
        return {
          ...prev,
          threshold: value,
        };
      });
    } else if (!value) {
      delete deployOptions[key];
    }
  };

  const deploy = useCallback(
    async () => {
      if (!bsr) return;
      setBsrAddress("");
      console.log(deployOptions);
      const _bsrAddress = await bsr.deploy(
        deployOptions,
        (currentStep: string) => {
          setDeployStep(currentStep);
        }
      );
      return _bsrAddress;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bsr, deployOptions]
  );

  const handleOnClickDeploy = () => {
    startLoad();
    deploy()
      .then((_bsrAddress) => {
        if (_bsrAddress) setBsrAddress(_bsrAddress);
        setDeployOptions({});
        setTriggerReset(true);
        stopLoad();
        setEthersSuccess("Transaction executed succesfully");
        setTimeout(() => setTriggerReset(false), 1000);
      })
      .catch((e) => {
        handleError(e, setEthersError);
        stopLoad();
      });
  };

  const clearDeployStep = () => setDeployStep("");

  const isDeployReady = useMemo(() => {
    return !!(
      account &&
      upAddress !== "" &&
      !upAddressInputError &&
      !isLoading &&
      supportedChains["l16"] &&
      supportedChains["l16"].chainId === chainId
    );
  }, [account, upAddress, upAddressInputError, isLoading, chainId]);
  return (
    <>
      <Head>
        <title>{textContent.deploy.title}</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto w-full rounded-xl bg-gray-300 py-8 px-4 shadow-md dark:bg-gray-800 sm:w-[640px] sm:px-6">
        <div className="flex flex-col items-center space-y-5 py-2">
          <p className="text-center font-semibold dark:text-white sm:text-xl">
            Deploy your Social Recovery Tool
          </p>
          <div className="w-full sm:w-4/5">
            <UniversalProfileAddressLabel
              address={upAddress}
              handleChangeInput={handleChangeUpAddress}
              error={upAddressInputError}
            />
          </div>
          <div className="w-full sm:w-4/5">
            <Options
              upAddress={upAddress}
              handleChangeDeployOptions={handleChangeDeployOptions}
              triggerReset={triggerReset}
            />
          </div>
          <ActionButton
            label={"Deploy"}
            icon={<FiFileText className="ml-1 inline" />}
            disabled={!isDeployReady}
            onClick={handleOnClickDeploy}
          />

          {deployStep !== "" && (
            <div className="relative flex h-40 w-full flex-col items-center justify-center space-y-4 rounded-xl bg-gray-400 p-4 shadow-md dark:bg-gray-700 sm:w-4/5">
              <FiX
                className="absolute top-5 right-5 hover:cursor-pointer dark:text-white"
                onClick={clearDeployStep}
              />
              {isLoading && (
                <FiCompass className="h-10 w-10 animate-spin-slow dark:text-white" />
              )}
              <p className="text-sm text-center dark:text-white">{deployStep}</p>
              {bsrAddress !== "" && (
                <div className="dark:text-white">
                  <p className="text-center text-sm">BSR address:</p>
                  <p className="inline-flex items-center text-sm font-semibold">
                    <a
                      href={`${supportedChains["l16"]?.[
                        "getExplorerAddressLink"
                      ](bsrAddress)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {bsrAddress}
                    </a>
                    <Tooltip msg="copied!" triggerClick={true}>
                      <FiCopy
                        className="ml-2 hover:cursor-pointer"
                        onMouseEnter={() => copyToClipboard(bsrAddress)}
                      />
                    </Tooltip>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
