import clsx from "clsx";
import { createMemo } from "solid-js";
import { searchStore } from "../../../data/store/search.store";
import type { TypeFilterMode } from "../../../data/store/search.store";
import { getBaseMonsData } from "../../../utils/pokemon.data.utils";
import { UsedPokemonTypes, type PokemonType } from "../../../data/types/pokemon.types";
import { toCapitalized } from "../../../utils/formatting.utils";
import SearchFilterDialog from "../../common/SearchFilterDialog";

export default PokemonSearchFilter;

function PokemonSearchFilter() {
  return (
    <SearchFilterDialog>
      <PokemonSearchFilterContent />
    </SearchFilterDialog>
  );
}

function PokemonSearchFilterContent() {
  return (
    <div class="flex flex-col gap-6">
      <OnlyShowChangedSection />
      <TypeFilterSection />
      <PokemonGenerationSelector />
    </div>
  );
}

function OnlyShowChangedSection() {
  return (
    <section class="flex flex-col gap-2">
      <h3 class="text-sm font-bold border-b border-base-300 pb-1">Only show changed</h3>
      <div class="flex flex-col gap-2">
        <label class="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={searchStore.filters.diffTypes ?? false}
            class="checkbox checkbox-sm rounded border-base-300"
            onChange={(e) => (searchStore.filters.diffTypes = e.target.checked)}
          />
          <span>Type changes (vs original)</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={searchStore.filters.diffStats ?? false}
            class="checkbox checkbox-sm rounded border-base-300"
            onChange={(e) => (searchStore.filters.diffStats = e.target.checked)}
          />
          <span>Stat changes (vs original)</span>
        </label>
      </div>
    </section>
  );
}

const TYPE_FILTER_MODES: { value: TypeFilterMode; label: string }[] = [
  { value: "include_any", label: "Has any of" },
  { value: "include_all", label: "Has all of" },
  { value: "exclude_any", label: "Has none of" },
];

function TypeFilterSection() {
  const selectedTypes = () => searchStore.filters.types ?? [];
  const mode = () => searchStore.filters.typeFilterMode ?? "include_any";
  const typeList = () => Object.values(UsedPokemonTypes).map((t) => t.toUpperCase() as PokemonType);

  const toggleType = (typeKey: PokemonType) => {
    const current = searchStore.filters.types ?? [];
    if (current.includes(typeKey)) {
      searchStore.filters.types = current.filter((t) => t !== typeKey);
    } else {
      searchStore.filters.types = [...current, typeKey];
    }
  };

  const selectAll = () => {
    searchStore.filters.types =
      selectedTypes().length === 0 ? typeList() : [];
  };

  return (
    <section class="flex flex-col gap-2">
      <h3 class="text-sm font-bold border-b border-base-300 pb-1">Filter by type</h3>
      <TypeFilterModeSelect value={mode()} onChange={(m) => (searchStore.filters.typeFilterMode = m)} />
      <p class="text-sm text-base-content/80">
        {mode() === "include_any" && "Show Pokémon that have at least one of the selected types."}
        {mode() === "include_all" && "Show only Pokémon that have every selected type."}
        {mode() === "exclude_any" && "Hide Pokémon that have any of the selected types."}
        {mode() === "exclude_all" && "Hide Pokémon that have all of the selected types."}
      </p>
      <div class="flex flex-wrap gap-2">
        <button type="button" class="btn btn-xs btn-ghost" onClick={selectAll}>
          {selectedTypes().length === 0 ? "Select all" : "Clear"}
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        {typeList().map((typeKey) => {
          const active = selectedTypes().includes(typeKey);
          return (
            <button
              type="button"
              class={clsx(
                "p-1 w-18 rounded-md font-bold text-sm transition-opacity delay-200",
                `type-${typeKey.toLowerCase()}`,
                !active && "opacity-30",
              )}
              onClick={() => toggleType(typeKey)}
            >
              {toCapitalized(typeKey.toLowerCase())}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function TypeFilterModeSelect(props: { value: TypeFilterMode; onChange: (m: TypeFilterMode) => void }) {
  return (
    <div class="flex flex-wrap gap-2">
      {TYPE_FILTER_MODES.map(({ value, label }) => (
        <button
          type="button"
          class={clsx(
            "btn btn-xs",
            props.value === value ? "btn-primary" : "btn-outline",
          )}
          onClick={() => props.onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function PokemonGenerationSelector() {
  const presentGens = createMemo(() => {
    const mons = getBaseMonsData();
    const set = new Set(mons.map((m) => m.generation));
    return [...set].sort((a, b) => a - b);
  });

  const toggleGen = (gen: number) => {
    const current = searchStore.filters.generations ?? [];
    if (current.includes(gen)) {
      searchStore.filters.generations = current.filter((g) => g !== gen);
    } else {
      searchStore.filters.generations = [...current, gen].sort((a, b) => a - b);
    }
  };

  return (
    <section class="flex flex-col gap-2">
      <h3 class="text-sm font-bold border-b border-base-300 pb-1">Generation</h3>
      <p class="text-sm text-base-content/80">Show only Pokémon from these generations.</p>
      <div class="flex flex-wrap gap-2">
        {presentGens().map((gen) => (
          <button
            type="button"
            class={clsx(
              "btn btn-sm border border-base-300",
              searchStore.filters.generations?.includes(gen) && "btn-primary"
            )}
            onClick={() => toggleGen(gen)}
          >
            Gen {gen}
          </button>
        ))}
      </div>
    </section>
  );
}
