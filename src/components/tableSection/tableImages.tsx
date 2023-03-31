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
  large: string;
  midLarge: string;
  mid: string;
  midSmall: string;
  small: string;
}

export const chipsImages: ChipImages[] = [
  {
    large: allImgL,
    midLarge: allImgML,
    mid: allImgM,
    midSmall: allImgMS,
    small: allImgS,
  },
  {
    large: redImgL,
    midLarge: redImgML,
    mid: redImgM,
    midSmall: redImgMS,
    small: redImgS,
  },
  {
    large: blueImgL,
    midLarge: blueImgML,
    mid: blueImgM,
    midSmall: blueImgMS,
    small: blueImgS,
  },
  {
    large: greenImgL,
    midLarge: greenImgML,
    mid: greenImgM,
    midSmall: greenImgMS,
    small: greenImgS,
  },
  {
    large: blackImgL,
    midLarge: blackImgML,
    mid: blackImgM,
    midSmall: blackImgMS,
    small: blackImgS,
  },
];