import toKeccak256 from "./to-keccak256";

export default function ifIsPlainHash(value: string) {
  if (value.startsWith("0x") && value.length === 66) {
    return value;
  } else {
    return toKeccak256(value);
  }
}
