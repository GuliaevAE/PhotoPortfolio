import React from 'react';
import Image from 'next/image'


import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher, selectedDir, focusImage } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher, changeSelectedDir, changeFocusedImage } from '../store/PageContentSlice'


const FocusedImage = () => {
    const focusedImages = useAppSelector(focusImage)
    const dispatch = useAppDispatch()

    const myLoader = ({ src }: { src: string }) => src

    return (
        <div className='focusedImageComponent'>
            <div className='focusedImageComponent_closeButton' onClick={()=>dispatch(changeFocusedImage(null))}>close</div>
            <Image
                loader={myLoader}
                width={10}
                height={10}
                className='focusedImageComponent_image'
                draggable='false'
                priority={true}
                src={focusedImages && focusedImages}
                alt="img" />


        </div>
    );
};

export default FocusedImage;