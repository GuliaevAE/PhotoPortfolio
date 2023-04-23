import React from 'react';
import Link from 'next/link';

import { useAppSelector } from '../store/hooks'
import { Allcontent, } from '../store/PageContentSlice'
import NavigationImage from './navigationMenu_image';

const NavigationMenu = () => {

    const allImages = useAppSelector(Allcontent)
    return (
        <div className='navigationMenu'>
            {allImages.map(x =>
                <div key={x.header} className='navigationMenu_item'>
                    <Link
                        href={x.dir}>
                        <div className='navigationMenu_item_name'><span>{x.header}</span></div>
                        <NavigationImage
                            quality={40}
                            priority={true}
                            unoptimized
                            draggable={false}
                            src={x.selectpImg}
                        />
                    </Link>
                </div>


            )}
        </div>
    );
};

export default NavigationMenu;