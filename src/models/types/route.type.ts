import type { Component } from "solid-js";

export interface Route {
  readonly label: string;
  readonly route: string;
  readonly icon: Component | string;
  readonly restricted?: boolean;
  readonly disabled?: boolean;
}
