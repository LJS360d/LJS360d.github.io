import type { ReactElement } from "react";
import type { IconType } from "react-icons";

export interface Route {
  readonly label: string;
  readonly route: string;
  readonly icon: IconType;
  readonly restricted?: boolean;
  readonly disabled?: boolean;
}
