import Image from 'next/image';
import React from 'react';
// Import a static image file
interface Imageprops{
    imageSrc:string,
    imageAltText:string
}

export default function CardImage(props:Imageprops) {
    return (
        <div className="cardImageWrapper">
            <Image src={props.imageSrc} alt={props.imageAltText} width={100} height={100}/>
        </div>
    )
}