import React from 'react';
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image'
import CardImage from './cardimage';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher } from '../store/PageContentSlice'
const SelectedPage = () => {
    const count = useAppSelector(Allcontent)

    const selected = useAppSelector(SelectedContent)
    const dispatch = useAppDispatch()
    const isSelected = useAppSelector(booleanSwitcher)
    const refSelectedPage = useRef<any>(null)
    const scrollBlock = useRef<any>(null)
    // useEffect(()=>{
    //   let i =  document.body.getElementsByClassName('SelectedPage_content')[0]
    //   i.addEventListener("scroll", (event)=>{
    //     console.log('dsfsfdf', event)
    //   })
    //   console.log('i',i)
    // }, [])

    function onscroll(event:React.UIEvent<HTMLDivElement>):void {
        scrollBlock.current.animate({
            height: `${event.currentTarget.scrollTop / (event.currentTarget.scrollHeight - event.currentTarget.clientHeight) * 100}%`
        }, { duration: 100, fill: 'forwards', easing: 'ease-in-out' })
    }


    useEffect(() => {
        if (isSelected) {
            refSelectedPage.current.animate({
                height: '100vh'
            }, {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
        } else {
            refSelectedPage.current.animate({
                height: '0'
            }, {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
        }
    }, [isSelected])

    const myLoader = ({ src }: { src: string }) => src





    return (
        <div ref={refSelectedPage} className='SelectedPage' >
            <span onClick={() => dispatch(changeBooleanSwitcher(false))} className='SelectedPage_imageBlock_back'>
                Back
            </span>
            <div ref={scrollBlock} className='SelectedPage_scrollBlock' />
            <div className='backAndScroll' onScroll={(e) => onscroll(e)}>

                <div className='SelectedPage_imageBlock'>

                    <div className='SelectedPage_imageBlock_header'>
                        <h1 >
                            {selected && selected.header}
                        </h1>
                        <h3>
                            {selected && selected.imagetitle}
                        </h3>
                        <h4>
                            {selected && selected.content}
                        </h4>
                    </div>


                    <Image
                        loader={myLoader}
                        width={10}
                        height={10}
                        className='SelectedPage_imageBlock_img'
                        draggable='false'
                        src={'https://mymoscowcity.com/upload/iblock/a9c/a9c2b0b174448e6054cbbbd957fd0429.jpg'}
                        alt="img" />

                    {/* <CardImage imageAltText='alt' imageSrc='https://p4.wallpaperbetter.com/wallpaper/471/152/20/background-art-images-1920x1080-wallpaper-preview.jpg'></CardImage> */}
                    {/* <Image alt='sdf' src={'https://mymoscowcity.com/upload/iblock/a9c/a9c2b0b174448e6054cbbbd957fd0429.jpg'} width={100} height={100}></Image> */}
                    {/* <img src="https://mymoscowcity.com/upload/iblock/a9c/a9c2b0b174448e6054cbbbd957fd0429.jpg" alt="img" /> */}

                </div>

                <div className='SelectedPage_content'>
                    <div className='SelectedPage_content_images'>
                        <Image
                            loader={myLoader}
                            width={10}
                            height={10}
                            className='SelectedPage_content_images_item'
                            draggable='false'
                            src={'https://mymoscowcity.com/upload/iblock/a9c/a9c2b0b174448e6054cbbbd957fd0429.jpg'}
                            alt="img"
                            priority={true} />

                        <Image
                            loader={myLoader}
                            width={10}
                            height={10}
                            className='SelectedPage_content_images_item'
                            draggable='false'
                            src={'https://mymoscowcity.com/upload/iblock/a9c/a9c2b0b174448e6054cbbbd957fd0429.jpg'}
                            alt="img" />


                        <Image
                            loader={myLoader}
                            width={10}
                            height={10}
                            className='SelectedPage_content_images_item'
                            draggable='false'
                            src={'https://mymoscowcity.com/upload/iblock/a9c/a9c2b0b174448e6054cbbbd957fd0429.jpg'}
                            alt="img" />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default SelectedPage;