import { allStacks, AllStacks } from './1_All/allChips';
import { redStacks, RedStacks } from './2_RedPlus/redPlus';
import { blueStacks, BlueStacks } from './3_BluePlus/bluePlus';
import { greenStacks, GreenStacks } from './4_GreenPlus/greenPlus';
import { blackStacks, BlackStacks } from './5_Black/black';

export interface PokerStacks {
  allStacks: AllStacks;
  redStacks: RedStacks;
  blueStacks: BlueStacks;
  greenStacks: GreenStacks;
  blackStacks: BlackStacks;
};

export const pokerStacks: PokerStacks = {
  allStacks,
  redStacks,
  blueStacks,
  greenStacks,
  blackStacks,
};
