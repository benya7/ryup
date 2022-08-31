import { ChangeEvent } from "react";

export type InputEvent = ChangeEvent<HTMLInputElement>;

export interface DeployOptionsErrors {
  guardiansThreshold?: string;
  guardians?: string;
}
