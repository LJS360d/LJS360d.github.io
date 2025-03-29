export interface Learnset {
  species:           number;
  eggMoveLearnset:   number[] | null;
  teachableLearnset: number[] | null;
  levelUpLearnset:   LevelUpMove[] | null;
  old:               Omit<Learnset, "old"> | null;
}

export interface LevelUpMove {
  level: number;
  move: number;
}

