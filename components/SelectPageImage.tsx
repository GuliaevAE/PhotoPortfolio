import React, { useState } from 'react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { selectContent, selectNull, changeBooleanSwitcher, changeSlectedSliderItem, changeFocusedImage } from '../store/PageContentSlice'
import OnLoadingComplete from "next/image"


interface SelectPageImageProps {
    src: arrayOfImagesItem,
    width: number,
    height: number,
    unoptimized: boolean
}
interface arrayOfImagesItem {
    dir: string,
    img: string
}

const SelectPageImage = ({ src, ...props }: SelectPageImageProps) => {
    const [isReady, setIsReady] = useState(false);
    const dispatch = useAppDispatch()


    const onLoadCallback = (e:any) => {
        setIsReady(e.src);
    };
    const myLoader = ({ src }: { src: string }) => src
    return (<>
    
        <Image
        onClick={()=>dispatch(changeFocusedImage(isReady))}
            loader={myLoader}
            className={`SelectedPage_content_images_item ${isReady ? '' : 'blur'}`}
            draggable='false'
          
            src={`https://natalyshando.ru/imageDir?img=${src.img}&dir=${src.dir}`}
            {...props}
            onLoadingComplete={onLoadCallback}
            alt='img'
        />
    </>
    );
};

export default SelectPageImage;