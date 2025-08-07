import { createVirtualizer } from "@tanstack/solid-virtual";
import { For, type JSXElement } from "solid-js";

export interface VirtualListProps<T extends readonly any[]> {
  items: T;
  rowHeight: number;
  rootHeight: number;
  overscan: number;
  fallback?: JSXElement;
  children: (item: T[number]) => JSXElement;
}

export default function VirtualList<T extends readonly any[]>(props: VirtualListProps<T>) {
  let parentRef: HTMLDivElement | undefined;
  const rowVirtualizer = createVirtualizer({
    count: props.items.length,
    getScrollElement: () => parentRef ?? null,
    estimateSize: () => props.rowHeight,
    overscan: props.overscan,
  });

  return (
    <div
      ref={parentRef}
      style={{
        overflow: "auto",
        height: `${props.rootHeight}px`,
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
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
                  transform: `translateY(${virtualRow.start}px)`,
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