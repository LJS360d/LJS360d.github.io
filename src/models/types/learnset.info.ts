export interface LearnsetInfo extends LearnsetInfoDefinition {
  old?: LearnsetInfoDefinition;
}

export interface LearnsetInfoDefinition {
  eggMoveLearnset:   number[] | null;
  levelUpLearnset:   LevelUpMove[] | null;
  species:           number;
  teachableLearnset: number[] | null;
}


export interface LevelUpMove {
  level: number;
  move: number;
}

