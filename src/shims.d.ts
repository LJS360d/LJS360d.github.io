declare module '~icons/*' {
  import type { Component, JSX } from 'solid-js';

  export type IconProps = JSX.SvgSVGAttributes<SVGSVGElement> & {
    class?: string;
    color?: string;
    size?: string | number;
  };

  const component: Component<IconProps>;
  export default component;
}

declare module 'virtual:icons/*' {
  import type { Component, JSX } from 'solid-js';

  export type IconProps = JSX.SvgSVGAttributes<SVGSVGElement> & {
    class?: string;
    color?: string;
    size?: string | number;
  };

  const component: Component<IconProps>;
  export default component;
}

declare module 'virtual:svg-icons/*' {
  const content: string;
  export default content;
}