/* eslint-disable react-hooks/exhaustive-deps */
import { useEthers } from "@usedapp/core";
import { isAddress } from "ethers/lib/utils";
import { Label, TextInput } from "flowbite-react";
import { useCallback, useEffect, useMemo } from "react";
import { FiDelete } from "react-icons/fi";
import ActionButton from "../components/Common/ActionButton";
import ActionCard from "../components/Common/ActionCard";
import InfoTooltip from "../components/Common/InfoTooltip";
import LabelError from "../components/Common/LabelError";
import PasswordInput from "../components/Common/PasswordInput";
import TextInputWithList from "../components/Common/TextInputWithList";
import UniversalProfileAddressLabel from "../components/Common/UniversalProfileAddressLabel";
import { textContent } from "../constants";
import { useBSR } from "../contexts/BasicSocialRecovery";
import { useError } from "../contexts/Error";
import { useSuccess } from "../contexts/Success";
import useList from "../hooks/useList";
import useLoading from "../hooks/useLoading";
import useTextInput from "../hooks/useTextInput";
import { InputEvent } from "../interfaces";
import handleError from "../utils/handle-error";
import toKeccak256 from "../utils/to-keccak256";

export default function Manage() {
  const {
    inputValue: guardianInputValue,
    setInputValue: setGuardianInputValue,
    inputError: guardianInputError,
    setInputError: setGuardianInputError,
  } = useTextInput();

  const {
    inputValue: thresholdInputValue,
    setInputValue: setThresholdInputValue,
    inputError: thresholdInputError,
    setInputError: setThresholdInputError,
  } = useTextInput();
  const { inputValue: secretInputValue, setInputValue: setSecretInputValue } =
    useTextInput();

  const {
    addItem: addNewGuardianItem,
    removeItem: removeNewGuardianItem,
    list: newGuardiansList,
    clear: clearNewGuardiansList,
  } = useList();

  const {
    addItem: addCurrentGuardianItem,
    removeItem: removeCurrentGuardianItem,
    list: currentGuardiansList,
    clear: clearCurrentGuardianList,
  } = useList();

  const { account } = useEthers();
  const { setEthersError } = useError();
  const { setEthersSuccess } = useSuccess();
  const {
    isLoading: isLoadingAddGuardians,
    startLoad: startLoadAddGuardians,
    stopLoad: stopLoadAddGuardians,
  } = useLoading();

  const {
    isLoading: isLoadingChangeSecret,
    startLoad: startLoadChangeSecret,
    stopLoad: stopLoadChangeSecret,
  } = useLoading();

  const {
    isLoading: isLoadingChangeThreshold,
    startLoad: startLoadChangeThreshold,
    stopLoad: stopLoadChangeThreshold,
  } = useLoading();

  const { bsr, handleChangeUpAddress, upAddress, upAddressInputError } =
    useBSR();

  useEffect(() => {
    if (!bsr) return;
    if (newGuardiansList.length > 0) return;
    clearCurrentGuardianList();
    const getManageData = async () => {
      const guardians = await bsr.getGuardians();
      const threshold = await bsr.getGuardiansThreshold();
      return { guardians, threshold };
    };
    getManageData()
      .then(({ guardians, threshold }) => {
        guardians.map((guardian) => addCurrentGuardianItem(guardian));
        setThresholdInputValue(threshold);
      })
      .catch((e) => {
        console.log(e);
        handleError(e, setEthersError);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bsr, newGuardiansList]);

  const handleChangeSecretInputValue = (e: InputEvent) => {
    if (!e.target.value) {
      setSecretInputValue("");
      return;
    }
    setSecretInputValue(e.target.value);
  };

  const handleChangeGuardianInputValue = (e: InputEvent) => {
    setGuardianInputError(undefined);
    if (!e.target.value) {
      setGuardianInputValue("");
      return;
    }
    setGuardianInputValue(e.target.value);
  };

  const handleClickAddGuardianItem = (guardian: string) => {
    setGuardianInputError(undefined);
    if (!isAddress(guardian)) {
      setGuardianInputError("guardian is not a valid address");
      return;
    }
    if (upAddress === guardian) {
      setGuardianInputError("guardian can't be up address");
      return;
    }
    if (account === guardian) {
      setGuardianInputError("guardian can't be your own address");
      return;
    }
    if (newGuardiansList.find((g) => g === guardian)) {
      setGuardianInputError("guardian already in guardian list");
      return;
    }
    if (currentGuardiansList.find((g) => g === guardian)) {
      setGuardianInputError("guardian already in current guardians");
      return;
    }

    addNewGuardianItem(guardian);
    setGuardianInputValue("");
  };

  const handleChangeThresholdInputValue = (e: InputEvent) => {
    setThresholdInputError(undefined);
    if (e.target.valueAsNumber === 0 || isNaN(e.target.valueAsNumber)) {
      setThresholdInputValue("");
      return;
    }
    if (e.target.valueAsNumber > currentGuardiansList.length)
      setThresholdInputError(
        "threshold can't be greater than current length of guardian list"
      );
    setThresholdInputValue(e.target.value);
  };

  const setSecret = useCallback(async () => {
    if (!bsr) return;
    console.log("Call to setSecret");
    return await bsr.setSecret(toKeccak256(secretInputValue));
  }, [bsr, secretInputValue]);

  const addGuardians = useCallback(async () => {
    if (!bsr) return;
    for (const guardian of newGuardiansList) {
      console.log(`Call to addGuardian to ${guardian}`);
      const receipt = await bsr.addGuardian(guardian);
      console.log(receipt);
    }
  }, [bsr, newGuardiansList]);

  const removeGuardian = useCallback(
    async (targetGuardian: string) => {
      if (!bsr) return;
      console.log(`Call to removeGuardian to ${targetGuardian}`);
      return await bsr.removeGuardian(targetGuardian);
    },
    [bsr]
  );

  const setThreshold = useCallback(
    async () => {
      if (!bsr || !thresholdInputValue) return;
      return await bsr.setThreshold(thresholdInputValue);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bsr, thresholdInputValue]
  );

  const handleClickChangeSecret = () => {
    startLoadChangeSecret();
    setSecret()
      .then((receipt) => {
        console.log(receipt);
        setEthersSuccess("setSecret executed succesfully");
        setSecretInputValue("");
        stopLoadChangeSecret();
      })
      .catch((e) => {
        handleError(e, setEthersError);
        stopLoadChangeSecret();
      });
  };

  const handleClickAddGuardians = () => {
    startLoadAddGuardians();
    addGuardians()
      .then(() => {
        setEthersSuccess("addGuardians executed succesfully");
        clearNewGuardiansList();
        stopLoadAddGuardians();
      })
      .catch((e) => {
        handleError(e, setEthersError);
        stopLoadAddGuardians();
      });
  };

  const handleClickChangeThreshold = () => {
    startLoadChangeThreshold();
    setThreshold()
      .then((receipt) => {
        console.log(receipt);
        setEthersSuccess("setThreshold executed succesfully");
        setThresholdInputValue("");
        stopLoadChangeThreshold();
      })
      .catch((e) => {
        handleError(e, setEthersError);
        stopLoadChangeThreshold();
      });
  };

  const isReadyChangeSecret = useMemo(() => {
    return !!(
      upAddress !== "" &&
      !upAddressInputError &&
      account &&
      secretInputValue !== ""
    );
  }, [account, secretInputValue, upAddress, upAddressInputError]);

  const isReadyUpdateGuardians = useMemo(() => {
    return !!(
      upAddress !== "" &&
      !upAddressInputError &&
      account &&
      newGuardiansList.length > 0 &&
      !guardianInputError
    );
  }, [
    account,
    guardianInputError,
    newGuardiansList,
    upAddress,
    upAddressInputError,
  ]);

  const isReadyChangeThreshold = useMemo(() => {
    return !!(
      upAddress !== "" &&
      !upAddressInputError &&
      account &&
      thresholdInputValue !== "" &&
      !thresholdInputError
    );
  }, [
    account,
    thresholdInputValue,
    thresholdInputError,
    upAddress,
    upAddressInputError,
  ]);

  return (
  <>
      <Head>
        <title>{textContent.manage.title}</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="w-full">
      <div className="mx-auto my-4 w-full sm:w-96">
        <UniversalProfileAddressLabel
          address={upAddress}
          handleChangeInput={handleChangeUpAddress}
          error={upAddressInputError}
        />
      </div>
      <div className="flex flex-wrap items-center justify-evenly">
        <ActionCard title="Add Guardians">
          <div className="flex h-3/4 w-full flex-col justify-between">
            <TextInputWithList
              label="Guardian Address:"
              handleChangeInputValue={handleChangeGuardianInputValue}
              inputValue={guardianInputValue}
              inputValueError={guardianInputError}
              itemsList={newGuardiansList}
              addItem={handleClickAddGuardianItem}
              removeItem={removeNewGuardianItem}
              tooltipMsg={textContent.common.tooltipMsg.guardians}
            />
            <div className="self-center">
              <ActionButton
                label="Add"
                disabled={!isReadyUpdateGuardians}
                onClick={handleClickAddGuardians}
                isLoading={isLoadingAddGuardians}
              />
            </div>
          </div>
        </ActionCard>
        <ActionCard title="Remove Guardians">
          <div className="h-3/4 w-full">
            <Label>
              <InfoTooltip msg="List of the current guardians in the contract. Number of guardians can't be less than threshold." />
              <p className="mb-1 inline-flex align-middle">
                Current Guardians:
              </p>
            </Label>
            <div className="flex h-4/5 max-h-48 items-center justify-center overflow-y-auto text-center">
              {currentGuardiansList.length > 0 ? (
                <ul className="space-y-2 dark:text-white">
                  {currentGuardiansList.map((item, i) => (
                    <li key={i}>
                      <p className="text-right text-[0.65rem] sm:text-xs">
                        {item}
                        <FiDelete
                          className="ml-1 inline align-text-top text-red-600 hover:cursor-pointer dark:text-red-400"
                          onClick={() => {
                            removeGuardian(item)
                              .then((receipt) => {
                                removeCurrentGuardianItem(item);
                                console.log(receipt);
                                setEthersSuccess(
                                  "removeGuardian executed succesfully"
                                );
                              })
                              .catch((e) => handleError(e, setEthersError));
                          }}
                        />
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-xs  text-gray-500 sm:text-sm">
                  There are no items in the list.
                </p>
              )}
            </div>
          </div>
        </ActionCard>
        <ActionCard title="Change Secret">
          <div className="flex h-3/4 w-full flex-col justify-between">
            <PasswordInput
              label="Secret:"
              inputValue={secretInputValue}
              handleChangeInputValue={handleChangeSecretInputValue}
              tooltipMsg={textContent.common.tooltipMsg.secret}
            />
            <div className="self-center">
              <ActionButton
                label="Change"
                disabled={!isReadyChangeSecret}
                onClick={handleClickChangeSecret}
                isLoading={isLoadingChangeSecret}
              />
            </div>
          </div>
        </ActionCard>
        <ActionCard title="Change Threshold">
          <div className="flex h-3/4 w-full flex-col justify-between">
            <Label>
              <InfoTooltip msg={textContent.common.tooltipMsg.threshold} />
              <p className="mb-1 inline-flex align-middle">Threshold:</p>
              <TextInput
                type="number"
                min={1}
                max={10000}
                value={thresholdInputValue}
                onChange={handleChangeThresholdInputValue}
              />
              {thresholdInputError && (
                <LabelError label={thresholdInputError} />
              )}
            </Label>
            <div className="self-center">
              <ActionButton
                label="Change"
                disabled={!isReadyChangeThreshold}
                onClick={handleClickChangeThreshold}
                isLoading={isLoadingChangeThreshold}
              />
            </div>
          </div>
        </ActionCard>
      </div>
    </div>
    </>
  );
}
