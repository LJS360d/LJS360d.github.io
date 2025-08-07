import clsx from 'clsx';
import { searchStore } from '../../../data/store/search.store';
import { UsedPokemonTypes, type PokemonType } from '../../../data/types/pokemon.types';
import { toCapitalized } from '../../../utils/formatting.utils';
import SearchFilterDialog from '../../common/SearchFilterDialog';

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
    <div class='flex flex-col gap-6'>
      <PokemonTypesDiffSelector />
      <PokemonStatsDiffSelector />
      <PokemonTypeSelector />
      {/* <PokemonGenerationSelector /> */}
    </div>
  );
}

function PokemonTypesDiffSelector() {
  const toggleDiff = (diff: boolean) => {
    searchStore.filters.diffTypes = diff;
  };

  return (
    <section>
      <label class='flex gap-4'>
        <span>Only show Pokémon with type differences</span>
        <input
          type='checkbox'
          checked={searchStore.filters.diffTypes ?? false}
          class='toggle toggle-secondary'
          onChange={(e) => toggleDiff(e.target.checked)}
        />
      </label>
    </section>
  );
}

function PokemonStatsDiffSelector() {
  const toggleDiff = (diff: boolean) => {
    searchStore.filters.diffStats = diff;
  };

  return (
    <section>
      <label class='flex gap-4'>
        <span>Only show Pokémon with stat differences</span>
        <input
          type='checkbox'
          checked={searchStore.filters.diffStats ?? false}
          class='toggle toggle-secondary'
          onChange={(e) => toggleDiff(e.target.checked)}
        />
      </label>
    </section>
  );
}

function PokemonTypeSelector() {

  const toggleType = (type: PokemonType) => {
    if (searchStore.filters.types?.includes(type)) {
      searchStore.filters.types = searchStore.filters.types.filter((t) => t !== type);
    } else {
      searchStore.filters.types = [...(searchStore.filters.types ?? []), type];
    }
  };

  const toggleAll = () => {
    if (searchStore.filters.types?.length === 0) {
      searchStore.filters.types = Object.values(UsedPokemonTypes).map(type => type.toUpperCase() as PokemonType);
    } else {
      searchStore.filters.types = [];
    }
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
            obst: searchStore.filters.types?.includes(type.toUpperCase() as PokemonType),
            [`type-${type.toLowerCase()}`]: true,
          })} type='button' onClick={() => toggleType(type.toUpperCase() as PokemonType)}>
            {toCapitalized(type)}
          </button>
        ))}
      </div>
    </section>
  );
}

