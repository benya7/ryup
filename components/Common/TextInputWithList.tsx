/* eslint-disable no-unused-vars */
import { Button, Label, TextInput } from "flowbite-react";
import { FiDelete, FiPlus } from "react-icons/fi";
import { InputEvent } from "../../interfaces";
import InfoTooltip from "./InfoTooltip";
import LabelError from "./LabelError";

interface Props {
  label: string;
  handleChangeInputValue: (e: InputEvent) => void;
  inputValue: string;
  inputValueError?: string;
  itemsList: string[];
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  tooltipMsg?: string;
}

export default function TextInputWithList({
  label,
  handleChangeInputValue,
  inputValue,
  inputValueError,
  itemsList,
  addItem,
  removeItem,
  tooltipMsg,
}: Props) {
  return (
    <>
      <Label>
        {tooltipMsg && <InfoTooltip msg={tooltipMsg} />}
        <p className="mb-1 inline-flex align-middle">{label}</p>
        <div className="mb-2 flex">
          <div className="mr-0.5 flex-auto">
            <TextInput onChange={handleChangeInputValue} value={inputValue} />
          </div>
          <Button
            disabled={inputValue === "" || !!inputValueError}
            onClick={() => {
              addItem(inputValue);
            }}
          >
            <span>
              <FiPlus className="ml-1 inline" />{" "}
            </span>
          </Button>
        </div>
        {inputValueError && <LabelError label={inputValueError} />}
      </Label>
      <div className="max-h-32 overflow-y-auto text-center">
        {itemsList.length > 0 ? (
          <ul className="space-y-2 dark:text-white">
            {itemsList.map((item, i) => (
              <li key={i}>
                <p className="text-right text-[0.65rem] sm:text-xs">
                  {item}
                  <FiDelete
                    className="ml-1 inline align-text-top text-red-600 hover:cursor-pointer dark:text-red-400"
                    onClick={() => removeItem(item)}
                  />
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-xs text-gray-500 sm:text-sm">
            There are no items in the list.
          </p>
        )}
      </div>
    </>
  );
}
