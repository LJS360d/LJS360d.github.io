export interface LearnsetInfo {
  pokemon: string;
  moves: LevelUpMove[];
  addedMoves?: LevelUpMove[];
}

export interface LevelUpMove {
  level: number;
  move: string;
}
export interface OldLevelUpMove {
  oldLevel: number;
  move: string;
}
