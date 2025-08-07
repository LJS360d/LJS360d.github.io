import { createMemo, For } from "solid-js";
import { items } from "../../../data";
import { searchStore } from "../../../data/store/search.store";
import ItemComponent from "./ItemComponent";

export default function ItemsList() {
  const filteredItems = createMemo(() => {
    const allItems = items;
    const searchText = searchStore.text;
    if (!searchText) return allItems;
    return allItems.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
  });

  return (
    <ul class="list-base">
      <For each={filteredItems()}>
        {(item) => (
          <ItemComponent item={item} />
        )}
      </For>
    </ul>
  );
}