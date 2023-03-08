import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher, selectedPage, arrayOfLoadedImages } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher, changeSelectedPage, changearrayOfLoadedImages } from '../store/PageContentSlice'

export default function Layout({ children }: any) {
    const allImages = useAppSelector(Allcontent)
    const arrOfLoadedImages = useAppSelector(arrayOfLoadedImages)
    const gag = useRef<any>(null)
    const [switcher, setSwitcher] = useState<boolean>(false)

    useEffect(() => {
        if (arrOfLoadedImages.length === allImages.length) {
            setSwitcher(true)
        }
    }, [arrOfLoadedImages, allImages])
    return (
        <div className='layout'>
            <div ref={gag} className={`gag ${switcher ? 'active' : ''}`}>
                <div className='gag_text'>
                    <span>nataly</span>
                    <span>nataly</span>
                    <span>nataly</span>
                    <span>nataly</span>
                </div>
            </div>
            {children}
        </div>
    );
};

// export default Layout;