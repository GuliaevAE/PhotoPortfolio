import React, { useState } from 'react';
import Image from 'next/image';


interface NavigationImageProps {
    quality: number,
    priority: boolean,
    unoptimized: any,
    draggable: boolean,
    src: any,
}

const NavigationImage = ({ ...props }: NavigationImageProps) => {
    const [isReady, setIsReady] = useState(false);

    const onLoadCallback = (e: any) => {
        setIsReady(e.src);
    };
    
    const myLoader = ({ src }: { src: string }) => src
    return (<>
        <Image
            loader={myLoader}
            className={`navigationMenu_imageLink ${isReady ? '' : 'blur'}`}
            {...props}
            onLoadingComplete={onLoadCallback}
            alt="img"
        />
    </>
    );
};

export default NavigationImage;