import { ethers } from "ethers";
import { toUtf8Bytes } from "ethers/lib/utils";

export default function toKeccak256(value: string) {
  return ethers.utils.keccak256(toUtf8Bytes(value));
}
