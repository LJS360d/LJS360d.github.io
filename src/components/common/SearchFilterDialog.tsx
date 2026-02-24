import type { HTMLAttributes } from "astro/types";
import type { JSXElement } from "solid-js";

export default function SearchFilterDialog(
  props: HTMLAttributes<"dialog"> & { children?: string | JSXElement }
) {
  const onDialogClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) (e.currentTarget as HTMLDialogElement).close();
  };

  return (
    <dialog
      {...(props as any)}
      id={props.id ?? "search-filter"}
      class={`modal ${props.class ?? ""}`}
      onClick={onDialogClick}
    >
      <form method="dialog" class="modal-box" onClick={(e: MouseEvent) => e.stopPropagation()}>
        <button type="submit" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        {props.children}
      </form>
    </dialog>
  );
}
