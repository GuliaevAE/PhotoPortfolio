import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher, selectedPage, arrayOfLoadedImages, slectedSliderItem } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher, changeSelectedPage, changearrayOfLoadedImages, changeSlectedSliderItem } from '../store/PageContentSlice'

const NavigationMenu = () => {
    const dispatch = useAppDispatch()
    const myLoader = ({ src }: { src: string }) => src

    const allImages = useAppSelector(Allcontent)
    return (
        <div className='navigationMenu'>
            {allImages.map(x =>
                <div key={x.header} className='navigationMenu_item'>
                    <Link
                        
                        href={x.dir}>
                        <div className='navigationMenu_item_name'><span>{x.header}</span></div>
                        <Image

                            quality={40}
                            // placeholder='blur'
                            // priority={true}
                            unoptimized
                            loader={myLoader}
                            className={`navigationMenu_imageLink `}
                            //  id={props.id}
                            draggable='false'
                            //  onLoadingComplete={onLoadCallback}
                            src={x && x.selectpImg}
                            alt="img" />
                    </Link>
                </div>


            )}
        </div>
    );
};

export default NavigationMenu;