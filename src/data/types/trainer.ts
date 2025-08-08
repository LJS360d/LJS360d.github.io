export interface Trainer {
  aiFlags: number;
  doubleBattle: boolean;
  encounterMusicGender: number;
  items: number[];
  mugshotColor: number;
  old?: Trainer;
  party: TrainerMon[] | null;
  partySize: number;
  poolPickIndex: number;
  poolPruneIndex: number;
  poolRuleIndex: number;
  poolSize: number;
  startingStatus: number;
  trainerClass: number;
  trainerName: string;
  trainerPic: number;
}

export interface TrainerMon {
  ability: number;
  ball: number;
  dynamaxLevel: number;
  ev: number[];
  friendship: number;
  gender: number;
  gigantamaxFactor: boolean;
  heldItem: number;
  isShiny: boolean;
  iv: number[];
  lvl: number;
  moves: number[];
  nature: number;
  nickname: string;
  shouldUseDynamax: boolean;
  species: number;
  tags: number;
  teraType: number;
}
