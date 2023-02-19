import React from 'react';
import Image from 'next/image'
import { Allcontent, SelectedContent, booleanSwitcher, SelectedContentType } from '../store/PageContentSlice'

interface ImageBlockinterface {
    selected: SelectedContentType
}

export default function ImageBlock({ selected }: ImageBlockinterface) {
    const myLoader = ({ src }: { src: string }) => src

    return (
        <div className='SelectedPage_imageBlock'>
 
            <div className='SelectedPage_imageBlock_header'>
                <h1 >
                    {selected && selected.header}
                </h1>
                <h3>
                    {selected && selected.imagetitle}
                </h3>
                <h4>
                    {selected && selected.content}
                </h4>
            </div>
                <Image
                    loader={myLoader}
                    width={10}
                    height={10}
                    className='SelectedPage_imageBlock_img'
                    draggable='false'
                    src={'https://mymoscowcity.com/upload/iblock/a9c/a9c2b0b174448e6054cbbbd957fd0429.jpg'}
                    alt="img" />
        </div>
    );
};

