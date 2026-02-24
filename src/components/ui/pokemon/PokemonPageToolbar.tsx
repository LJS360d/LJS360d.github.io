import { onCleanup, onMount } from "solid-js";
import CiFilter from "~icons/meteor-icons/filter";
import PageSearchBar from "../../common/PageSearchBar";

const FILTER_DIALOG_ID = "search-filter";

export default function PokemonPageToolbar() {
  let filterBtnRef: HTMLButtonElement | undefined;

  onMount(() => {
    const openFilter = () => {
      (document.getElementById(FILTER_DIALOG_ID) as HTMLDialogElement | null)?.showModal();
    };
    filterBtnRef?.addEventListener("click", openFilter);
    onCleanup(() => filterBtnRef?.removeEventListener("click", openFilter));
  });

  return (
    <div class="sticky top-0 z-40 flex flex-wrap items-center">
      <PageSearchBar />
      <button
        ref={filterBtnRef}
        type="button"
        class="btn btn-accent btn-outline gap-1.5 shrink-0 rounded-md rounded-l-none h-10"
        aria-label="Open Pokémon filters"
      >
        <CiFilter class="text-lg" />
        Filters
      </button>
    </div>
  );
}
