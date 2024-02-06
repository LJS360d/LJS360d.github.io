import type { IconType } from "react-icons/lib";

export interface Route {
  readonly label: string;
  readonly route: string;
  readonly icon: IconType;
  readonly restricted?: boolean;
  readonly disabled?: boolean;
}
