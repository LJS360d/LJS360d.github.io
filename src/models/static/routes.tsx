import GiHighGrass from '~icons/game-icons/high-grass';
import GiAppleCore from '~icons/game-icons/apple-core';
import GoFileBinary from '~icons/codicon/file-binary';
import IcBaselineCatchingPokemon from '~icons/ic/baseline-catching-pokemon';
import MdFlare from "~icons/material-symbols/flare" 
import MdHome from "~icons/material-symbols/home" 
import MdTimeline from "~icons/material-symbols/timeline"
import type { Route } from '../types/route.type';

export const RoutesIterator: Route[] = [
  { label: 'Home', route: '/', icon: MdHome },
  {
    label: 'Pokémon',
    route: '/pokemon',
    icon: IcBaselineCatchingPokemon,
  },
  { label: 'Moves', route: '/moves', icon: MdFlare },
  { label: 'Items', route: '/items', icon: GiAppleCore },
  {
    label: 'Evolutions',
    route: '/evolutions',
    icon: MdTimeline,
  },
  {
    label: 'Wild Encounters',
    route: '/wild-encounters',
    icon: GiHighGrass,
  },
  { label: 'Savefile Parser', route: '/savefile', icon: GoFileBinary },
];
