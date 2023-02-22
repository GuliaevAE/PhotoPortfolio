import React from 'react';
import Image from 'next/image'

import { Allcontent, SelectedContent, booleanSwitcher, SelectedContentType } from '../store/PageContentSlice'

interface ImageBlockinterface {
    selected: SelectedContentType,
    scrollToImages: Function
}

export default function ImageBlock({ selected, scrollToImages }: ImageBlockinterface) {
 
    const myLoader = ({ src }: { src: string }) => src

    return (
        <div className='SelectedPage_imageBlock'>

            <div className='SelectedPage_imageBlock_header'>
                <h2 >
                    {selected && selected.header}
                </h2>
                <h3>
                    {selected && selected.imagetitle}
                </h3>
                <h3>
                    {selected && selected.content}
                </h3>
            </div>
            
            <div className='SelectedPage_imageBlock_buttonForScroll'>
                <span>Scrol</span>
                <div onClick={() => scrollToImages()}>down</div>
            </div>
            <Image
                loader={myLoader}
                width={10}
                height={10}
                className='SelectedPage_imageBlock_img'
                draggable='false'
                priority={true}
                src={'https://wallpapershome.ru/images/wallpapers/ozero-2560x1440-4k-hd-wallpaper-gori-154.jpg'}
                alt="img" />
        </div>
    );
};

