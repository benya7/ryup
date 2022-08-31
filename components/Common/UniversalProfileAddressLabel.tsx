/* eslint-disable no-unused-vars */
import { Label, TextInput } from "flowbite-react";
import { InputEvent } from "../../interfaces";
import LabelError from "./LabelError";

interface Props {
  address: string;
  handleChangeInput: (e: InputEvent) => void;
  error?: string;
}
export default function UniversalProfileAddressLabel({
  address,
  handleChangeInput,
  error,
}: Props) {
  return (
    <Label>
      <p className="mb-1">{`Universal Profile Address:`}</p>
      <TextInput value={address} onChange={handleChangeInput} />
      {error && <LabelError label={error} />}
    </Label>
  );
}
