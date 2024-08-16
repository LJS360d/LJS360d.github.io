export interface LearnsetInfo extends LearnsetInfoDefinition {
  old: LearnsetInfoDefinition;
}

export interface LearnsetInfoDefinition {
  species: string;
  moves: LevelUpMove[];
}


export interface LevelUpMove {
  level: number;
  move: string;
}
