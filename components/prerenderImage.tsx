import React, { useState } from 'react';
import Image from 'next/image'

import Comand1 from '../public/images/Comand2.jpg'
import Olga1 from '../public/images/Olga2.jpg'
import Retush1 from '../public/images/Retush2.jpg'
import YulySmirnova1 from '../public/images/YulySmirnova2.jpg'
import FSTany1 from '../public/images/FSTany2.jpg'
import Yana1 from '../public/images/Yana2.jpg'
import FS1 from '../public/images/FSs2.jpg'
import { Allcontent, SelectedContent, booleanSwitcher, SelectedContentType } from '../store/PageContentSlice'

interface ImageBlockinterface {
    selected: SelectedContentType

}
const PrerenderImage = ({ selected }: ImageBlockinterface) => {
    const [isReady, setIsReady] = useState(false);

    const onLoadCallback = (e: any) => {
        console.log('PrerenderImage')
        setIsReady(e.src);
    };
    const myLoader = ({ src }: { src: string }) => src

    return (
        <>
            {selected&&selected.selectpImg === Comand1 && <Image
                loader={myLoader}
                width={10}
                height={10}
                onLoadingComplete={onLoadCallback}
                className={`SelectedPage_imageBlock_img ${isReady ? '' : 'blur'}`}
                draggable='false'
                priority={false}
                src={Comand1}
                alt="img" />}
            {selected&&selected.selectpImg === Olga1 && <Image
                loader={myLoader}
                width={10}
                height={10}
                onLoadingComplete={onLoadCallback}
                className={`SelectedPage_imageBlock_img ${isReady ? '' : 'blur'}`}
                draggable='false'
                priority={true}
                src={Olga1}
                alt="img" />}
            {selected&&selected.selectpImg === Retush1 && <Image
                loader={myLoader}
                width={10}
                height={10}
                onLoadingComplete={onLoadCallback}
                className={`SelectedPage_imageBlock_img ${isReady ? '' : 'blur'}`}
                draggable='false'
                priority={true}
                src={Retush1}
                alt="img" />}
            {selected&&selected.selectpImg === YulySmirnova1 && <Image
                loader={myLoader}
                width={10}
                height={10}
                onLoadingComplete={onLoadCallback}
                className={`SelectedPage_imageBlock_img ${isReady ? '' : 'blur'}`}
                draggable='false'
                priority={true}
                src={YulySmirnova1}
                alt="img" />}
            {selected&&selected.selectpImg === FSTany1 && <Image
                loader={myLoader}
                width={10}
                height={10}
                onLoadingComplete={onLoadCallback}
                className={`SelectedPage_imageBlock_img ${isReady ? '' : 'blur'}`}
                draggable='false'
                priority={true}
                src={FSTany1}
                alt="img" />}
            {selected&&selected.selectpImg === Yana1 && <Image
                loader={myLoader}
                width={10}
                height={10}
                onLoadingComplete={onLoadCallback}
                className={`SelectedPage_imageBlock_img ${isReady ? '' : 'blur'}`}
                draggable='false'
                priority={true}
                src={Yana1}
                alt="img" />}
            {selected&&selected.selectpImg === FS1 && <Image
                loader={myLoader}
                width={10}
                height={10}
                onLoadingComplete={onLoadCallback}
                className={`SelectedPage_imageBlock_img ${isReady ? '' : 'blur'}`}
                draggable='false'
                priority={true}
                src={FS1}
                alt="img" />}
        </>
    );
};

export default PrerenderImage;