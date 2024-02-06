import { GiAppleCore } from "react-icons/gi";
import { MdCatchingPokemon, MdFlare, MdHome, MdTimeline } from "react-icons/md";
import type { Route } from "../types/route.type";

export const RoutesIterator: Route[] = [
  { label: "Home", route: "/", icon: MdHome },
  { label: "Pokémon", route: "/pokemon", icon: MdCatchingPokemon },
  { label: "Moves", route: "/moves", icon: MdFlare },
  { label: "Items", route: "/items", icon: GiAppleCore },
  { label: "Evolutions", route: "/evolutions", icon: MdTimeline },
];
