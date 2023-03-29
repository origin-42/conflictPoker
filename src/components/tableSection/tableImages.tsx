import allImgL from '../../assets/tableImgs/Chips/1_All/Large.png';
import allImgML from '../../assets/tableImgs/Chips/1_All/MidLarge.png';
import allImgM from '../../assets/tableImgs/Chips/1_All/Mid.png';
import allImgMS from '../../assets/tableImgs/Chips/1_All/MidSmall.png';
import allImgS from '../../assets/tableImgs/Chips/1_All/Small.png';

import redImgL from '../../assets/tableImgs/Chips/2_RedPlus/Large.png';
import redImgML from '../../assets/tableImgs/Chips/2_RedPlus/MidLarge.png';
import redImgM from '../../assets/tableImgs/Chips/2_RedPlus/Mid.png';
import redImgMS from '../../assets/tableImgs/Chips/2_RedPlus/SmallMid.png';
import redImgS from '../../assets/tableImgs/Chips/2_RedPlus/Small.png';

import blueImgL from '../../assets/tableImgs/Chips/3_BluePlus/Large.png';
import blueImgML from '../../assets/tableImgs/Chips/3_BluePlus/MidLarge.png';
import blueImgM from '../../assets/tableImgs/Chips/3_BluePlus/Mid.png';
import blueImgMS from '../../assets/tableImgs/Chips/3_BluePlus/SmallMid.png';
import blueImgS from '../../assets/tableImgs/Chips/3_BluePlus/Small.png';

import greenImgL from '../../assets/tableImgs/Chips/4_GreenPlus/Large.png';
import greenImgML from '../../assets/tableImgs/Chips/4_GreenPlus/MidLarge.png';
import greenImgM from '../../assets/tableImgs/Chips/4_GreenPlus/Mid.png';
import greenImgMS from '../../assets/tableImgs/Chips/4_GreenPlus/SmallMid.png';
import greenImgS from '../../assets/tableImgs/Chips/4_GreenPlus/Small.png';

import blackImgL from '../../assets/tableImgs/Chips/5_Black/Large.png';
import blackImgML from '../../assets/tableImgs/Chips/5_Black/MidLarge.png';
import blackImgM from '../../assets/tableImgs/Chips/5_Black/Mid.png';
import blackImgMS from '../../assets/tableImgs/Chips/5_Black/SmallMid.png';
import blackImgS from '../../assets/tableImgs/Chips/5_Black/Small.png';

export interface ChipImages {
  Large: string;
  midLarge: string;
  Mid: string;
  midSmall: string;
  small: string;
}

export const chipsImages: ChipImages[] = [
  {
    Large: allImgL,
    midLarge: allImgML,
    Mid: allImgM,
    midSmall: allImgMS,
    small: allImgS,
  },
  {
    Large: redImgL,
    midLarge: redImgML,
    Mid: redImgM,
    midSmall: redImgMS,
    small: redImgS,
  },
  {
    Large: blueImgL,
    midLarge: blueImgML,
    Mid: blueImgM,
    midSmall: blueImgMS,
    small: blueImgS,
  },
  {
    Large: greenImgL,
    midLarge: greenImgML,
    Mid: greenImgM,
    midSmall: greenImgMS,
    small: greenImgS,
  },
  {
    Large: blackImgL,
    midLarge: blackImgML,
    Mid: blackImgM,
    midSmall: blackImgMS,
    small: blackImgS,
  },
];