export interface WildEncounters {
  mapGroup:          number;
  mapNum:            number;
  fishingMonsInfo:   MonsInfo | null;
  landMonsInfo:      MonsInfo | null;
  rockSmashMonsInfo: MonsInfo | null;
  hiddenMonsInfo:    MonsInfo | null;
  waterMonsInfo:     MonsInfo | null;
  locationName:      string;
  old:              Omit<WildEncounters, "old"> | null;
}

export interface MonsInfo {
  encounterRate: number;
  wildPokemon:   WildPokemon[];
}

export interface WildPokemon {
  maxLevel: number;
  minLevel: number;
  species:  number;
}
