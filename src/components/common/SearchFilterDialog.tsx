import type { HTMLAttributes } from "astro/types";
import type { JSXElement } from "solid-js";

export default function SearchFilterDialog(props: HTMLAttributes<"dialog"> & { children?: string | JSXElement }) {
  return (
    <dialog {...props as any} id={props.id ?? "search-filter"} class={`modal ${props.class ?? ''}`}>
      <form method='dialog' class="modal-box">
        <button
          type='submit'
          class='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
          ✕
        </button>
        {props.children}
      </form>
    </dialog>
  );
}
