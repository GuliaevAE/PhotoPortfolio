import React from 'react';
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image'

import ImageBlock from './imageBlockForSelectedPage';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher } from '../store/PageContentSlice'
const SelectedPage = () => {
    const allContent = useAppSelector(Allcontent)

    const selected = useAppSelector(SelectedContent)
    const dispatch = useAppDispatch()
    const isSelected = useAppSelector(booleanSwitcher)
    const refSelectedPage = useRef<any>(null)
    const scrollBlock = useRef<any>(null)

    const backAndScroll = useRef<any>(null)
    const [switcher, setSwitch] = useState<boolean>(false)
    //////////////////////observer

    const observer = useRef<any>(null);
    useEffect(() => {
        if (switcher) {

            let options = { threshold: [0.5] };
            observer.current = new IntersectionObserver(onEntry, options);
            let elements = refSelectedPage.current.getElementsByClassName('SelectedPage_content_images_item');
            for (let elm of elements) {
                observer.current.observe(elm);
            }
        } else {
            scrollBlock.current.animate({
                height: `0%`
            }, { duration: 100, fill: 'forwards', easing: 'ease-in-out' })
        }


    }, [switcher])


    function onEntry(entry: any) {
        entry.forEach((change: any) => {
            if (change.isIntersecting) {
                change.target.classList.add('element-show');
            }
        });
    }
    //////////////////////

    function onscroll(event: React.UIEvent<HTMLDivElement>): void {
        scrollBlock.current.animate({
            height: `${event.currentTarget.scrollTop / (event.currentTarget.scrollHeight - event.currentTarget.clientHeight) * 100}%`
        }, { duration: 100, fill: 'forwards', easing: 'ease-in-out' })
    }


    useEffect(() => {
        if (isSelected) {
            setSwitch(true)
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
    }, [isSelected,])


    useEffect(() => {
        if (!isSelected && switcher) {
            setTimeout(() => {
                backAndScroll.current.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 1000)
            setTimeout(() => {
                setSwitch(false)

            }, 1000)
        }

    }, [isSelected, switcher])


    function scrollToImages(){
        let SelectedPage_content = document.body.getElementsByClassName('SelectedPage_content')[0]
        backAndScroll.current.scrollTo({
            left: 0, top: SelectedPage_content.getBoundingClientRect().top,  behavior: 'smooth'
        })
    }

    const myLoader = ({ src }: { src: string }) => src

    return (
        <div ref={refSelectedPage} className='SelectedPage' >
            <span onClick={() => dispatch(changeBooleanSwitcher(false))} className='SelectedPage_imageBlock_back'>
                Back
            </span>
            <div className='SelectedPage_imageBlock_imageIdOnCenter'>
                <div>{selected && selected.id}</div>
                <div>-</div>
                <div> {allContent.length}</div>
            </div>
            <div ref={scrollBlock} className='SelectedPage_scrollBlock' />
            <div ref={backAndScroll} className='backAndScroll' onScroll={(e) => onscroll(e)}>
                {selected&&<ImageBlock selected={selected} scrollToImages={scrollToImages}/>}
                

                <div className='SelectedPage_content'>
                    {switcher && <div className='SelectedPage_content_images'>
                        <Image
                            loader={myLoader}
                            width={10}
                            height={10}
                            className='SelectedPage_content_images_item'
                            draggable='false'
                            src={selected && selected.img}
                            alt="img"
                            priority={true} />

                        <Image
                            loader={myLoader}
                            width={10}
                            height={10}
                            className='SelectedPage_content_images_item'
                            draggable='false'
                            src={selected && selected.img}
                            alt="img" />


                        <Image
                            loader={myLoader}
                            width={10}
                            height={10}
                            className='SelectedPage_content_images_item'
                            draggable='false'
                            src={selected && selected.img}
                            alt="img" />
                    </div>}

                </div>
            </div>

        </div>
    );
};

export default SelectedPage;