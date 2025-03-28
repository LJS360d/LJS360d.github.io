export interface ItemData extends ItemInfo {
  old: ItemInfo | null;
}

export interface ItemInfo {
  battleUsage:     number;
  pocket:          number;
  description:     string;
  flingPower:      number;
  holdEffect:      number;
  holdEffectParam: number;
  id:              number;
  importance:      number;
  name:            string;
  pluralName:      string;
  price:           number;
  secondaryId:     number;
  type:            number;
}
