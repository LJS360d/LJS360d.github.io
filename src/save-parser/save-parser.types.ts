export interface SaveData {
  // "trainer": save.Trainer.toJS(),
  // "pokedex":  save.Pokedex.toJS(),
  team: Pokemon[];
  // "bag":  save.Bag.toJS(),
  pc: PC;
}

export interface PC {
  currentBox: number;
  pokemon: Pokemon[];
  boxNames: string;
}

export interface Pokemon {
  nickname: string;
  species: string;
  item: string;
  level: string;
  toSDExportFormat: () => string;
}

export interface GbaData {
  gameCode:                 string;
  slaveID:                  number;
  pokedexOffset:            number;
  abilitiesPtr:             number;
  seen2Offset:              number;
  pokedexFlag:              number;
  speciesInfoPtr:           number;
  movesCount:               number;
  version:                  number;
  pokedexCount:             number;
  warpFlagsOffset:          number;
  itemsPtr:                 number;
  ballGfxPtr:               number;
  enigmaBerryOffset:        number;
  checksum:                 number;
  gameName:                 string;
  trainerNameLength:        number;
  frontierStatusOffset2:    number;
  externalEventDataOffset:  number;
  ballPallettesPtr:         number;
  bagPokeballsCount:        number;
  taggedVersion:            number;
  abilitiesCount:           number;
  ramEntryPoint:            number;
  flagsOffset:              number;
  pokedexVar:               number;
  pokemonNameLength1:       number;
  saveBlock2Size:           number;
  frontierStatusOffset:     number;
  majorVersion:             number;
  playerNameLength:         number;
  movesPtr:                 number;
  softwareVersion:          number;
  saveBlock1Size:           number;
  bagTMHMSCount:            number;
  minorVersion:             number;
  partyCountOffset:         number;
  ribbonFlag:               number;
  bagBerriesCount:          number;
  pcItemsCount:             number;
  itemNameLength:           number;
  trainerIDOffset:          number;
  playerNameOffset:         number;
  rhhHeader:                string;
  mysteryEventFlag:         number;
  pokemonNameLength2:       number;
  bagItemsCount:            number;
  enigmaBerrySize:          number;
  gcnLinkFlagsOffset:       number;
  giftRibbonsOffset:        number;
  speciesCount:             number;
  gameTitle:                string;
  deviceType:               number;
  paletteTablesPtr:         number;
  varsOffset:               number;
  itemsCount:               number;
  makerCode:                string;
  playerGenderOffset:       number;
  pcItemsOffset:            number;
  nintendoLogo:             number[];
  joyBusEntryPoint:         number;
  gameClearFlag:            number;
  moveDescription:          number;
  patchVersion:             number;
  romEntryPoint:            number;
  unitCode:                 number;
  decorationsPtr:           number;
  seen1Offset:              number;
  partyOffset:              number;
  bootMode:                 number;
  language:                 number;
  externalEventFlagsOffset: number;
  bagKeyItemsCount:         number;
}
