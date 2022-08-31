/* eslint-disable no-unused-vars */
import { useEthers } from "@usedapp/core";
import { BigNumberish } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { Label, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { textContent } from "../../constants";
import useList from "../../hooks/useList";
import useTextInput from "../../hooks/useTextInput";
import { InputEvent } from "../../interfaces";
import InfoTooltip from "../Common/InfoTooltip";
import LabelError from "../Common/LabelError";
import PasswordInput from "../Common/PasswordInput";
import TextInputWithList from "../Common/TextInputWithList";

interface Props {
  upAddress: string;
  handleChangeDeployOptions: (
    key: "secret" | "threshold" | "guardians",
    value: string | BigNumberish | string[] | undefined
  ) => void;
  triggerReset: boolean;
}

export default function Options({
  upAddress,
  handleChangeDeployOptions,
  triggerReset,
}: Props) {
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
    list: guardiansList,
    addItem: addGuardianItem,
    removeItem: removeGuardianItem,
    clear: clearGuardiansList,
  } = useList();
  const { account } = useEthers();

  const handleChangeGuardianInputValue = (e: InputEvent) => {
    setGuardianInputError(undefined);
    if (!e.target.value) {
      setGuardianInputValue("");
      return;
    }
    setGuardianInputValue(e.target.value);
  };

  const handleChangeSecretInputValue = (e: InputEvent) => {
    if (!e.target.value) {
      setSecretInputValue("");
      return;
    }
    setSecretInputValue(e.target.value);
  };

  const handleChangeThresholdInputValue = (e: InputEvent) => {
    setThresholdInputError(undefined);
    if (e.target.valueAsNumber === 0 || isNaN(e.target.valueAsNumber)) {
      handleChangeDeployOptions("threshold", undefined);
      setThresholdInputValue("");
      return;
    }
    if (e.target.valueAsNumber > guardiansList.length)
      setThresholdInputError(
        "guardians threshold can't be less than guardian list length"
      );
    setThresholdInputValue(e.target.value);
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
    if (guardiansList.find((g) => g === guardian)) {
      setGuardianInputError("guardian already in guardian list");
      return;
    }
    addGuardianItem(guardian);
    setGuardianInputValue("");
  };

  useEffect(() => {
    if (guardiansList.length > 0) {
      handleChangeDeployOptions("guardians", guardiansList);
    } else {
      handleChangeDeployOptions("guardians", undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guardiansList]);

  useEffect(() => {
    if (thresholdInputError) return;
    handleChangeDeployOptions("threshold", thresholdInputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thresholdInputValue]);

  useEffect(() => {
    if (secretInputValue === "") return;
    handleChangeDeployOptions("secret", secretInputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secretInputValue]);

  useEffect(() => {
    if (!triggerReset) return;
    clearGuardiansList();
    setGuardianInputValue("");
    setThresholdInputValue("");
    setSecretInputValue("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerReset]);

  return (
    <>
      <p className="text-center font-semibold dark:text-white">Options</p>
      <div className="space-y-3">
        <div className="w-full">
          <PasswordInput
            label="Secret (optional):"
            inputValue={secretInputValue}
            handleChangeInputValue={handleChangeSecretInputValue}
            tooltipMsg={textContent.common.tooltipMsg.secret}
          />
        </div>
        <div className="w-full">
          <TextInputWithList
            label={`Guardians List (optional)`}
            handleChangeInputValue={handleChangeGuardianInputValue}
            inputValue={guardianInputValue}
            inputValueError={guardianInputError}
            itemsList={guardiansList}
            addItem={handleClickAddGuardianItem}
            removeItem={removeGuardianItem}
            tooltipMsg={textContent.common.tooltipMsg.guardians}
          />
        </div>
        <div className="w-full">
          <Label>
            <InfoTooltip msg={textContent.common.tooltipMsg.threshold} />
            <p className="mb-1 inline-flex align-middle">{`Guardians Threshold (optional):`}</p>
            <TextInput
              type="number"
              min={1}
              max={20000}
              value={thresholdInputValue}
              onChange={handleChangeThresholdInputValue}
            />
            {thresholdInputError && <LabelError label={thresholdInputError} />}
          </Label>
        </div>
      </div>
    </>
  );
}
