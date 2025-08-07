import { createVirtualizer } from "@tanstack/solid-virtual";
import { For, type JSXElement } from "solid-js";

export interface VirtualListProps<T extends readonly any[]> {
  items: T;
  rowHeight: number;
  rootHeight?: number;
  overscan?: number;
  fallback?: JSXElement;
  children: (item: T[number]) => JSXElement;
  class?: string;
}

export default function VirtualList<T extends readonly any[]>(props: VirtualListProps<T>) {
  let parentRef: HTMLDivElement | undefined;
  const rowVirtualizer = createVirtualizer({
    count: props.items.length,
    getScrollElement: () => parentRef ?? null,
    estimateSize: () => props.rowHeight,
    overscan: props.overscan ?? 40,
  });

  return (
    <div
      ref={parentRef}
      style={{
        "overflow-y": "auto",
      }}
    >
      <div
        style={{
          /* set rootHeight to prevent the use of rowVirtualizer.getTotalSize which is very expensive for big lists */
          height: `${props.rootHeight ?? rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
        class={props.class ?? ""}
      >
        <For fallback={props.fallback} each={rowVirtualizer.getVirtualItems()}>
          {(virtualRow) => {
            if (!props.items[virtualRow.index]) {
              return null;
            }
            return (
              <div
                data-index={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
                  width: "100%",
                }}
              >
                {props.children(props.items[virtualRow.index])}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}