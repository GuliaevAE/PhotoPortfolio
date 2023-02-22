import React, { useState } from 'react';
import Image from 'next/image';

interface SelectPageImageProps {
    src: string,
    width: number,
    height: number,
    unoptimized: boolean
}


const SelectPageImage = ({ src, ...props }: SelectPageImageProps) => {
    const [isReady, setIsReady] = useState(false);

    const onLoadCallback = () => {
        setIsReady(true);
    };
    const myLoader = ({ src }: { src: string }) => src
    return (
        <Image
            loader={myLoader}
            className={`SelectedPage_content_images_item ${isReady ? '' : 'blur'}`}
            draggable='false'
            src={src}
            {...props}
            onLoadingComplete={onLoadCallback}
            alt='img'
        />
    );
};

export default SelectPageImage;