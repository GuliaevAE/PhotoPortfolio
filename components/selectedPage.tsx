import React from 'react';
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image'
import SelectPageImage from './SelectPageImage';
import ImageBlock from './imageBlock';
import FocusedImage from './focusedImage';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher, selectedDir, focusImage } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher, changeSelectedDir, changeFocusedImage, emptychangearrayOfLoadedImages } from '../store/PageContentSlice'

import Link from 'next/link';

interface arrayOfImagesItem {
    dir: string,
    img: string
}



const SelectedPage = ({ select }: any) => {
    const allContent = useAppSelector(Allcontent)
    const Dir = useAppSelector(selectedDir)
    const selected = useAppSelector(SelectedContent)
    const dispatch = useAppDispatch()
    const isSelected = useAppSelector(booleanSwitcher)
    const refSelectedPage = useRef<any>(null)
    const scrollBlock = useRef<any>(null)

    const backAndScroll = useRef<any>(null)
    const [switcher, setSwitch] = useState<boolean>(false)

    const focusedImages = useAppSelector(focusImage)


    const [arrayOfImages, setArr] = useState<arrayOfImagesItem[]>([])



    useEffect(() => {
        dispatch(emptychangearrayOfLoadedImages())
    }, [])

    // useEffect(() => {
    //     if (!select) {



    //         scrollBlock.current.animate({
    //             height: `0%`
    //         }, { duration: 100, fill: 'forwards', easing: 'ease-in-out' })
    //     }


    // }, [select, switcher])




    const onscroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        scrollBlock.current.animate({
            height: `${event.currentTarget.scrollTop / (event.currentTarget.scrollHeight - event.currentTarget.clientHeight) * 100}%`
        }, { duration: 100, fill: 'forwards', easing: 'ease-in-out' })



        let SelectedPageimageBlockimg = document.body.getElementsByClassName('SelectedPage_imageBlock_img')[0]

        SelectedPageimageBlockimg.animate({
            transform: `translateY(${event.currentTarget.scrollTop / (event.currentTarget.scrollHeight - event.currentTarget.clientHeight) * 100}%)`
        }, { duration: 50, fill: 'forwards', easing: 'ease' })
    }


    useEffect(() => {
        if (select) {
            setSwitch(true)
            refSelectedPage.current.animate({
                height: '100vh'
            }, {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
        } else {

            setTimeout(() => dispatch(changeSelectedDir(null)), 1000)

        }
    }, [dispatch, select])


    // useEffect(() => {
    //     if (!isSelected && switcher) {
    //         // setTimeout(() => {
    //         backAndScroll.current.scrollTo({
    //             top: 0,
    //             behavior: 'smooth'
    //         });
    //         // }, 1000)
    //         setTimeout(() => {
    //             setSwitch(false)

    //         }, 1000)
    //     }

    // }, [isSelected, switcher])

    // const storage = getStorage();





    useEffect(() => {
        function fillingArray() {
            // if (Dir) {
            let subarr = []
            if (!select) return
            console.log('asdfoiasdiua')
            // for (let i = 1; i < selected.numberOfImages; i++) {
            //     let img = await getDownloadURL(ref(storage, `${Dir}/img${i}.JPG`))
            //     subarr.push(img)
            // }
            // console.log('subarr', subarr)
            for (let i = 1; i <= select.numberOfImages; i++) {
                // let img = await getDownloadURL(ref(storage, `${Dir}/img${i}.JPG`))

                subarr.push({ dir: select.dir, img: String(i) })
            }
            setArr(subarr)
            // } else {
            //     console.log('удалено')
            //     setArr([])
            // }
        }
        fillingArray()
    }, [Dir, select])

    function scrollToImages() {
        let SelectedPage_content = document.body.getElementsByClassName('SelectedPage_content')[0]
        backAndScroll.current.scrollTo({
            left: 0, top: SelectedPage_content.getBoundingClientRect().top, behavior: 'smooth'
        })


    }





    const myLoader = ({ src }: { src: string }) => src

    return (
        <div ref={refSelectedPage} className='SelectedPage' >
            {focusedImages && <FocusedImage />}
            <span onClick={() => dispatch(changeBooleanSwitcher(false))} className='SelectedPage_imageBlock_back'>
                <Link href={'/'}>   Back</Link>
            </span>
            <div className='SelectedPage_imageBlock_imageIdOnCenter'>
                <div>{select && select.id}</div>
                <div>-</div>
                <div> {allContent.length}</div>
            </div>
            <div ref={scrollBlock} className='SelectedPage_scrollBlock' />
            <div ref={backAndScroll} className='backAndScroll' onScroll={(e) => onscroll(e)}>
                <ImageBlock selected={select} scrollToImages={scrollToImages} />


                <div className='SelectedPage_content'>

                    <>
                        <div className='SelectedPage_content_images'>
                            {arrayOfImages.map((x, k) => k < arrayOfImages.length / 3 &&
                                <SelectPageImage
                                    key={x.img}
                                    width={10}
                                    height={10}
                                    unoptimized={true}
                                    src={x} />
                            )}
                        </div>
                        <div className='SelectedPage_content_images'>
                            {arrayOfImages.map((x, k) => k >= arrayOfImages.length / 3 && k < arrayOfImages.length * 2 / 3 &&
                                <SelectPageImage
                                    key={x.img}
                                    width={10}
                                    height={10}
                                    unoptimized={true}
                                    src={x} />
                            )}
                        </div>
                        <div className='SelectedPage_content_images'>
                            {arrayOfImages.map((x, k) => k >= arrayOfImages.length * 2 / 3 &&
                                <SelectPageImage
                                    key={x.img}
                                    width={10}
                                    height={10}
                                    unoptimized={true}
                                    src={x} />
                            )}
                        </div>


                    </>

                </div>
            </div>

        </div>
    );
};

export default SelectedPage;