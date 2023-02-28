import React, { useState } from 'react';
import Image from 'next/image';

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

    const onLoadCallback = () => {
        setIsReady(true);
    };
    const myLoader = ({ src }: { src: string }) => src
    return (<>
        
        <Image
            loader={myLoader}
            className={`SelectedPage_content_images_item ${isReady ? '' : 'blur'}`}
            draggable='false'
            src={`http://natalyshando.ru/imageDir?img=${src.img}&dir=${src.dir}`}
            {...props}
            onLoadingComplete={onLoadCallback}
            alt='img'
        />
    </>
    );
};

export default SelectPageImage;