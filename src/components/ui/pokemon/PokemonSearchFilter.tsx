import clsx from 'clsx';

import { createContext, createEffect, createSignal, useContext, type Accessor, type Context, type Setter } from 'solid-js';
import { UsedPokemonTypes } from '../../../data/types/pokemon.types';
import { toCapitalized } from '../../../utils/formatting.utils';
import SearchFilterDialog from '../../common/SearchFilterDialog';

export default PokemonSearchFilter;

interface PokemonFiltersContext {
  filters: Accessor<Partial<PokemonFilters>>;
  setFilters: Setter<Partial<PokemonFilters>>;
}

export interface PokemonFilters {
  diffTypes: boolean;
  types: string[];
  generations: number[];
}

const FiltersContext = createContext() as Context<PokemonFiltersContext>;

function PokemonSearchFilter() {
  return (
    <SearchFilterDialog>
      <PokemonSearchFilterContent />
    </SearchFilterDialog>
  );
}

function PokemonSearchFilterContent() {
  const [filters, setFilters] = createSignal<Partial<PokemonFilters>>({});

  createEffect(() => {
    const text = (document.getElementById('search-input') as HTMLInputElement)
      .value;
    const searchEvent = new CustomEvent('search', {
      detail: { text, filters: filters() },
    });
    document.dispatchEvent(searchEvent);
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      <div class='flex flex-col gap-6'>
        <PokemonTypesDiffSelector />
        <PokemonTypeSelector />
        {/* <PokemonGenerationSelector /> */}
      </div>
    </FiltersContext.Provider>
  );
}

function PokemonTypesDiffSelector() {
  const { filters, setFilters } = useContext<PokemonFiltersContext>(FiltersContext);
  const toggleDiff = (diff: boolean) => {
    setFilters((prevFilters) => ({ ...prevFilters, diffTypes: diff }));
  };

  return (
    <section>
      <label class='form-control gap-1'>
        <span>Only show Pokémon with type differences</span>
        <input
          type='checkbox'
          checked={filters().diffTypes}
          class='toggle toggle-secondary'
          onChange={(e) => toggleDiff(e.target.checked)}
        />
      </label>
    </section>
  );
}

function PokemonTypeSelector() {
  const { filters, setFilters } = useContext(FiltersContext);

  const toggleType = (type: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      types: prevFilters.types?.includes(type)
        ? prevFilters.types.filter((t) => t !== type)
        : [...(prevFilters.types ?? []), type],
    }));
  };

  const toggleAll = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      types:
        (prevFilters.types?.length ?? 0) > 0
          ? []
          : Object.values(UsedPokemonTypes).map(type => type.toUpperCase()),
    }));
  };

  return (
    <section class='space-y-6'>
      <div class='space-x-6'>
        <button
          type='button'
          class='btn btn-xs btn-secondary'
          onClick={toggleAll}>
          Toggle All
        </button>
        <span>Types</span>
      </div>
      <div class='flex flex-wrap gap-4'>
        {Object.values(UsedPokemonTypes).map((type, i) => (
          <button class={clsx('p-1 w-24 rounded-md font-bold', {
            obst: filters().types?.includes(type.toUpperCase()),
            [`type-${type.toLowerCase()}`]: true,
          })} type='button' onClick={() => toggleType(type.toUpperCase())}>
            {toCapitalized(type)}
          </button>
        ))}
      </div>
    </section>
  );
}

function PokemonGenerationSelector() {
  const { filters, setFilters } = useContext(FiltersContext);

  const generations = Array.from({ length: 9 }, (_, i) => i + 1);

  const toggleGeneration = (gen: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      generations: prevFilters.generations?.includes(gen)
        ? prevFilters.generations.filter((g) => g !== gen)
        : [...prevFilters.generations ?? [], gen],
    }));
  };

  const toggleAll = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      generations: (prevFilters.generations?.length ?? 0) > 0 ? [] : generations,
    }));
  };

  return (
    <section class='space-y-2'>
      <div class='space-x-2'>
        <button
          type='button'
          class='btn btn-xs btn-secondary'
          onClick={toggleAll}>
          Toggle All
        </button>
        <span>Generations</span>
      </div>
      <div class='flex flex-wrap gap-2'>
        {generations.map((gen) => (
          <button
            type='button'
            class={clsx('btn btm-sm btn-square w-10 h-10', {
              'btn-accent': !filters().generations?.includes(gen),
              'btn-ghost text-gray-500': filters().generations?.includes(gen),
            })}
            onClick={() => toggleGeneration(gen)}>
            <span class={'text-lg '}>{gen}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
