import React, { useState, useEffect } from 'react';
import Image from 'next/image'

import { Allcontent, SelectedContent, booleanSwitcher, SelectedContentType } from '../store/PageContentSlice'

import Comand1 from '../public/images/Comand2.jpg'
import Olga1 from '../public/images/Olga2.jpg'
import Retush1 from '../public/images/Retush2.jpg'
import YulySmirnova1 from '../public/images/YulySmirnova2.jpg'
import FSTany1 from '../public/images/FSTany2.jpg'
import Yana1 from '../public/images/Yana2.jpg'
import FS1 from '../public/images/FSs2.jpg'

import PrerenderImage from './prerenderImage';

interface ImageBlockinterface {
    selected: SelectedContentType,
    scrollToImages: Function
}











export default function ImageBlock({ selected, scrollToImages }: ImageBlockinterface) {
    const [isReady, setIsReady] = useState(false);
    const onLoadCallback = (e: any) => {
        console.log('PrerenderImage')

        setIsReady(e.src);
    };
    const myLoader = ({ src }: { src: string }) => src
    console.log('Olga1',selected&&selected.selectpImg)


    return (
        <> {selected &&

            <div className='SelectedPage_imageBlock' style={{backgroundImage: `url('${selected&&selected.selectpImg.src}')`}}>

                <div className='SelectedPage_imageBlock_header'>
                    <h2 >
                        {selected.header}
                    </h2>
                    <h3>
                        {selected.imagetitle}
                    </h3>
                    <h3>
                        {selected.content}
                    </h3>
                </div>

                <div className='SelectedPage_imageBlock_buttonForScroll'>
                    <span>Scrol</span>
                    <div onClick={() => scrollToImages()}>down</div>
                </div>


                {/* <PrerenderImage selected={selected}/> */}


                {/* <Image
                    loader={myLoader}
                    width={10}
                    height={10}
                    
                    onLoadingComplete={onLoadCallback}
                    className={`SelectedPage_imageBlock_img ${isReady ? '' : 'blur'}`}
                    draggable='false'
                    priority={true}
                    src={selected.selectpImg}
                    alt="img" /> */}


            </div>}</>
    );
};

