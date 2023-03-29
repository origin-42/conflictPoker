import { FC, useState } from 'react';
import { chipsImages, ChipImages } from './tableImages';
import { Timer } from './Timer';

interface LayerStart {
    chipsImages: ChipImages,
    stack: string,
    playerChips: string,
    playerBet: string,
    jimsStack: string,
    jimsBet: string
}

const LayerStart: LayerStart = {
    chipsImages: {},
    stack: '',
    playerChips: '',
    playerBet: '',
    jimsStack: '',
    jimsBet: ''
}

export const GameLayer: FC = () => {
    const [layer, setLayer] = useState<LayerStart>(LayerStart);

    const setChips = (chips) => {
        setLayer({ ...layer,  })
        if (chips > 4500) layer.chipsImages.Large;
        else if (chips > 3000) layer.chipsImages.midLarge;
        else if (chips === 3000) layer.chipsImages.Mid;
        else if (chips === 3000) layer.midSmall.Mid;
        else if (chips === 3000) layer.small.Mid;
        else '';
    };

    return (
        <section id='tableSection' className='absolute grid grid-cols-7 grid-rows-3 h-full justify-between gap-4'>
            <Timer />
            <div></div>
            <div className="relative w-full h-full">
                <img src={chipsImages[0].small} alt='jims Bet or Raise' className='w-full h-full object-cover'></img>
                <div className="absolute inset-0 flex items-end justify-center">
                    <div className="bg-white px-4 py-2 rounded-lg">
                        <p className="text-lg font-medium">200</p>
                    </div>
                </div>
            </div>
            <div></div>
            <div></div>
            <div className="relative w-full h-full">
                <img src={chipsImages[0].midLarge} alt='Jims Stack' className='w-full h-full object-cover'></img>
                <div className="absolute inset-0 flex items-end justify-center">
                    <div className="bg-white px-4 py-2 rounded-lg">
                        <p className="text-lg font-medium">4200</p>
                    </div>
                </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="relative w-full h-full">
                <img src={chipsImages[0].midSmall} alt='The current pot' className='w-full h-full object-cover'></img>
                <div className="absolute inset-0 flex items-end justify-center">
                    <div className="bg-white px-4 py-2 rounded-lg">
                        <p className="text-lg font-medium">500</p>
                    </div>
                </div>
            </div>
            <div></div>
            <div></div>
            <div className="relative w-full h-full">
                <img src={chipsImages[0].midSmall} alt='Your stack' className='w-full h-full object-cover'></img>
                <div className="absolute inset-0 flex items-end justify-center">
                    <div className="bg-white px-4 py-2 rounded-lg">
                        <p className="text-lg font-medium">1100</p>
                    </div>
                </div>
            </div>
            <div></div>
            <div></div>
            <div className="relative w-full h-full">
                <img src={chipsImages[0].small} alt='Your bet or raise' className='w-full h-full object-cover'></img>
                <div className="absolute inset-0 flex items-end justify-center">
                    <div className="bg-white px-4 py-2 rounded-lg">
                        <p className="text-lg font-medium">100</p>
                    </div>
                </div>
            </div>
            <div></div>
            <div></div>
        </section>
    );
};