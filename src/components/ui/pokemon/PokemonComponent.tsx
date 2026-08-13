import { learnsetBySpecies } from '../../../data/lookups';
import type { PokemonInfo } from '../../../data/types/pokemon';
import LearnsetComponent from '../learnset/LearnsetComponent';
import PokemonIcon from '../shared/PokemonIcon';
import PokemonSprite from '../shared/PokemonSprite';
import AbilitiesBar from './PokemonAbilities';
import PokemonHeldItems from './PokemonHeldItems';
import StatBar from './PokemonStats';
import TypeBar from './PokemonTyping';

interface PokemonComponentProps {
  pokemon: PokemonInfo;
  forms: readonly PokemonInfo[];
  searchKey?: string;
  /** Filter metadata merged onto the root `<li>`. */
  attrs?: Record<string, string | undefined>;
}

/** Static: every form is rendered up front and `scripts/form-tabs.ts` toggles panels. */
function PokemonComponent(props: PokemonComponentProps) {
  const forms = [props.pokemon, ...props.forms];
  const hasTabs = forms.length > 1;

  return (
    <li
      class='grid grid-flow-row'
      data-s={props.searchKey}
      data-form-group={hasTabs ? '' : undefined}
      {...(props.attrs ?? {})}>
      {hasTabs && (
        <div
          role='tablist'
          class='tabs w-fit max-w-full tabs-bordered hover:bg-base-100 p-0 inline-block overflow-x-auto'>
          {forms.map((form, i) => (
            <button
              role='tab'
              type='button'
              data-form-tab={i}
              class={`tab hover:bg-base-200 tab-bordered text-nowrap min-w-fit ${i === 0 ? 'tab-active' : ''}`}>
              <PokemonIcon species={form.id} />
              <span class='capitalize w-fit'>
                {form.species.toLowerCase().replace(/_/g, ' ')}
              </span>
            </button>
          ))}
        </div>
      )}
      {forms.map((form, i) => (
        <div
          data-form-panel={hasTabs ? i : undefined}
          hidden={hasTabs && i !== 0}
          class='cursor-default bg-base-200 rounded-lg flex flex-row justify-start flex-1 p-2'>
          <div class='cursor-default flex flex-row flex-1 gap-4 items-center pl-2'>
            <a href={`/pokemon/${form.species.toLowerCase()}`} class='capitalize'>
              {form.speciesName}
              <PokemonSprite species={form.id} />
            </a>
            <StatBar pokemon={form} />
            <div class='grid grid-flow-col gap-4'>
              <AbilitiesBar pokemon={form} />
              <TypeBar pokemon={form} />
              {(!!form.itemCommon || !!form.itemRare) && (
                <PokemonHeldItems pokemon={form} />
              )}
            </div>
          </div>
          <LearnsetComponent learnset={learnsetBySpecies.get(form.id)} />
        </div>
      ))}
    </li>
  );
}

export default PokemonComponent;
