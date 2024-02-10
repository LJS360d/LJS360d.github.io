export interface LearnsetData {
  pokemon: string;
  moves: LevelUpMove[];
  addedMoves?: LevelUpMove[];
  removedMoves?: LevelUpMove[];
  updatedLevelMoves?: OldLevelUpMove[];
}

export interface LevelUpMove {
  level: number;
  move: string;
}
export interface OldLevelUpMove {
  oldLevel: number;
  move: string;
}
