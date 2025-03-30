import clsx from 'clsx';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { UsedPokemonTypes } from '../../../data/types/pokemon.types';
import { toCapitalized } from '../../../utils/formatting.utils';
import SearchFilterDialog from '../../common/SearchFilterDialog';

export default PokemonSearchFilter;

interface PokemonFiltersContext {
  filters: Partial<PokemonFilters>;
  setFilters: Dispatch<SetStateAction<Partial<PokemonFilters>>>;
}

export interface PokemonFilters {
  diffTypes: boolean;
  types: string[];
  generations: number[];
}

const FiltersContext = createContext<PokemonFiltersContext>({
  filters: {},
  setFilters: () => {},
});

function PokemonSearchFilter() {
  return (
    <SearchFilterDialog>
      <PokemonSearchFilterContent />
    </SearchFilterDialog>
  );
}

function PokemonSearchFilterContent() {
  const [filters, setFilters] = useState<Partial<PokemonFilters>>({});

  useEffect(() => {
    const text = (document.getElementById('search-input') as HTMLInputElement)
      .value;
    const searchEvent = new CustomEvent('search', {
      detail: { text, filters },
    });
    document.dispatchEvent(searchEvent);
  }, [filters]);

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      <div className='flex flex-col gap-6'>
        <PokemonTypesDiffSelector />
        <PokemonTypeSelector />
        {/* <PokemonGenerationSelector /> */}
      </div>
    </FiltersContext.Provider>
  );
}

function PokemonTypesDiffSelector() {
  const { filters, setFilters } = useContext(FiltersContext);
  const toggleDiff = (diff: boolean) => {
    setFilters((prevFilters) => ({ ...prevFilters, diffTypes: diff }));
  };

  return (
    <section>
      <label className='form-control gap-1'>
        <span>Only show Pokémon with type differences</span>
        <input
          type='checkbox'
          checked={filters.diffTypes}
          className='toggle toggle-secondary'
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
    <section className='space-y-2'>
      <div className='space-x-2'>
        <button
          type='button'
          className='btn btn-xs btn-secondary'
          onClick={toggleAll}>
          Toggle All
        </button>
        <span>Types</span>
      </div>
      <div className='flex flex-wrap gap-2'>
        {Object.values(UsedPokemonTypes).map(( type, i) => (
          <button key={i} type='button' onClick={() => toggleType(type.toUpperCase())}>
            <span
              className={clsx('p-4 w-16 rounded-md', {
                obst: filters.types?.includes(type.toUpperCase()),
                [`type-${type.toLowerCase()}`]: true,
              })}>
              {toCapitalized(type)}
            </span>
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
    <section className='space-y-2'>
      <div className='space-x-2'>
        <button
          type='button'
          className='btn btn-xs btn-secondary'
          onClick={toggleAll}>
          Toggle All
        </button>
        <span>Generations</span>
      </div>
      <div className='flex flex-wrap gap-2'>
        {generations.map((gen) => (
          <button
            key={gen}
            type='button'
            className={clsx('btn btm-sm btn-square w-10 h-10', {
              'btn-accent': !filters.generations?.includes(gen),
              'btn-ghost text-gray-500': filters.generations?.includes(gen),
            })}
            onClick={() => toggleGeneration(gen)}>
            <span className={'text-lg '}>{gen}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
