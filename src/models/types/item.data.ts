export interface ItemData extends ItemInfo {
  new?: boolean;
  old: ItemInfo | null;
}

export interface ItemInfo {
  name: string;
  displayName: string;
  price: number;
  sprite: string;
  description: string;
  pocket: string;
  type: string;
  fieldUseFunc: string | null;
  battleUsage: string | null;
  secondaryId: string | null;
  holdEffectParam: number | null;
  flingPower: number | null;
  holdEffect: string | null;
  importance: string | null;
}
