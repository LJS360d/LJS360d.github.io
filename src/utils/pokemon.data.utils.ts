import mons from "../data/pokemon.json";
import { PokemonFlags, type PokemonInfo } from "../models/types/pokemon.info";

export const monsData = mons as PokemonInfo[];

export function getBaseMonsData(): PokemonInfo[] {
  return monsData.filter(({ species, flags }) => {
    return !(
      species.endsWith('_FEMALE') ||
      flags.some((flag) =>
        [
          PokemonFlags.alternateForm,
          PokemonFlags.alolanForm,
          PokemonFlags.galarianForm,
          PokemonFlags.hisuianForm,
          PokemonFlags.paldeanForm,
        ].includes(flag)
      )
    );
  });
}

export function getMonAlternateForms(species: string): PokemonInfo[] {
  const formsBlacklist = ["PORYGON_Z"];
  return monsData.filter(
    (m) =>
      m.species !== species &&
      m.species.startsWith(`${species}_`) &&
      !formsBlacklist.includes(m.species),
  )
}

export function getNextMon(species: string): PokemonInfo | undefined {
  const currentIndex = getBaseMonsData().findIndex(m => m.species === species);
  return getBaseMonsData()[currentIndex + 1];
}

export function getPreviousMon(species: string): PokemonInfo | undefined {
  const currentIndex = getBaseMonsData().findIndex(m => m.species === species);
  return getBaseMonsData()[currentIndex - 1];
}

export function getMonPaginator(species: string): [PokemonInfo | undefined, PokemonInfo | undefined] {
  const currentIndex = getBaseMonsData().findIndex(m => m.species === species);
  return [getBaseMonsData()[currentIndex - 1], getBaseMonsData()[currentIndex + 1]];
}