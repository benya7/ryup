import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { InputEvent } from "../../interfaces";
import InfoTooltip from "./InfoTooltip";
import LabelError from "./LabelError";

interface Props {
  label: string;
  inputValue: string;
  inputValueError?: string;
  // eslint-disable-next-line no-unused-vars
  handleChangeInputValue: (e: InputEvent) => void;
  tooltipMsg?: string;
}
export default function PasswordInput({
  label,
  inputValue,
  handleChangeInputValue,
  inputValueError,
  tooltipMsg,
}: Props) {
  const [showValue, setShowValue] = useState(false);

  return (
    <>
      <Label>
        {tooltipMsg && <InfoTooltip msg={tooltipMsg} />}
        <p className="mb-1 inline-flex align-middle">{label}</p>
        <TextInput
          type={showValue ? "text" : "password"}
          value={inputValue}
          onChange={handleChangeInputValue}
          addon={
            <div
              className="flex h-full w-full items-center px-3"
              onClick={() => setShowValue(!showValue)}
              role="button"
              onKeyDown={() => null}
              tabIndex={0}
            >
              {showValue ? <FiEye /> : <FiEyeOff />}
            </div>
          }
        />
        {inputValueError && <LabelError label={inputValueError} />}
      </Label>
    </>
  );
}
