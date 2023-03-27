import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'

import { Allcontent, SelectedContent, booleanSwitcher, SelectedContentType } from '../store/PageContentSlice'

interface ImageBlockinterface {
    selected: SelectedContentType,
    scrollToImages: Function
}


export default function ImageBlock({ selected, scrollToImages }: ImageBlockinterface) {
    const [isReady, setIsReady] = useState(false);
    const onLoadCallback = (e: any) => {
        setIsReady(e.src);
    };
    const myLoader = ({ src }: { src: string }) => src

    const image = useRef<any>(null)

    return (
        <> {selected &&

            <div className={`SelectedPage_imageBlock ${isReady ? 'active' : ''}`} >
                <div className={`SelectedPage_imageBlock_header ${isReady ? 'active' : ''}`}>
                    <div> <h2 >
                        {selected.header}
                    </h2></div>
                    <div> <h3>
                        {selected.imagetitle.split(' ').map((x, k) =>
                            <span key={x + k}>{x}</span>
                        )}
                    </h3></div>
                    <div> <h3>
                        {selected.content}
                    </h3></div>
                </div>

                <div className='SelectedPage_imageBlock_buttonForScroll'>
                    <span>Scrol</span>
                    <div onClick={() => scrollToImages()}>down</div>
                </div>



                <Image ref={image}
                    loader={myLoader}

                    unoptimized
                    onLoadingComplete={onLoadCallback}
                    className={`SelectedPage_imageBlock_img ${isReady ? '' : 'blur'}`}
                    draggable='false'
                    priority={true}
                    src={selected.selectpImg}
                    alt="img" />


            </div>}</>
    );
};

