import { createEffect, onCleanup, onMount } from "solid-js";
import { searchStore } from "../../data/store/search.store";
import { debounce } from "lodash";
import MdSearch from "~icons/material-symbols/search";


const DEBOUNCE_MS = 400;

export default function PageSearchBar() {
  let inputRef: HTMLInputElement | undefined;

  onMount(() => {
    if (inputRef) inputRef.value = searchStore.text;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        inputRef?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    onCleanup(() => window.removeEventListener("keydown", handler));
  });

  const syncStoreToInput = () => {
    if (inputRef && inputRef.value !== searchStore.text) inputRef.value = searchStore.text;
  };
  createEffect(syncStoreToInput);

  const setSearch = debounce((value: string) => {
    searchStore.text = value;
  }, DEBOUNCE_MS);

  return (
    <div class="flex shrink-0">
      <label class="relative flex items-center bg-base-100 overflow-hidden w-full max-w-xs md:max-w-sm">
        <MdSearch class="absolute left-2 z-10 text-lg text-accent" />
        <input
          ref={inputRef}
          type="text"
          autocomplete="off"
          placeholder="Search…"
          class="w-full pl-10 pr-14 outline-none focus:ring-0 text-base-content placeholder-base-content/50 rounded-md rounded-r-none border-accent border h-10"
          onInput={(e) => setSearch(e.currentTarget.value)}
        />
        <kbd class="absolute right-3 text-xs text-base-content pointer-events-none select-none">Ctrl+K</kbd>
      </label>
    </div>
  );
}
