
import React from 'react';
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import SliderItem from './sliderItem';
import MiniSlider from './miniSlider';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent } from '../store/PageContentSlice'

interface props {
    mini?: boolean
}

interface mouseevent {
    target: {
        alt: string,
        id: string
    }
}


const Slider = (props: props) => {

    const ref = useRef<any>(null)
    const ref2 = useRef<any>(null)
    const [activeImage, setImage] = useState<string | null>(null)
    let [nextPercentage, setnextPercentage] = useState(0)
    let cloneOfAllSliderItems: { id: string, offsetLeft: number }[] = []

    const isSelected = useAppSelector(SelectedContent)
    const allImages = useAppSelector(Allcontent)
    useEffect(() => {
        if (cloneOfAllSliderItems.length === 0) {
            for (const image of ref.current.getElementsByClassName('image')) {

                cloneOfAllSliderItems.push({ id: image.id, offsetLeft: image.parentNode.offsetLeft })
            }
        }
    }, [])

    useEffect(() => {
        if (isSelected) {
            ref2.current.animate({
                height: '0'
            }, {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
        } else {
            ref2.current.animate({
                height: '100vh'
            }, {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
        }
    }, [isSelected])

    let [isact, setisact] = useState<boolean>(false)

    // let ImageArray = [
    //     { id: '1', img: "https://look.com.ua/pic/201701/1920x1080/look.com.ua-192291.jpg", title: 'From Nature to Culture' },
    //     { id: '2', img: "https://img2.akspic.ru/crops/9/2/1/6/6/166129/166129-california_streaming_apple_event_wallpaper_without_logo-1920x1080.jpg", title: 'Reventing Wonder' },
    //     { id: '3', img: "https://images.wallpaperscraft.ru/image/single/ulitsa_osveshchenie_podsvetka_134856_1920x1080.jpg", title: 'Sound Expressed In Full' },
    //     { id: '4', img: "https://wallpaperaccess.com/full/109666.jpg", title: 'From Gaggio With Love' },
    //     { id: '5', img: "https://mikhail.krivyy.com/wallpapers/list/m11-6-4/1920x1080.jpg", title: 'The Regeneration Suit' },
    //     { id: '6', img: "https://mobimg.b-cdn.net/v3/fetch/9c/9c63d540a3284fd5b7077e6a63dd2d3e.jpeg", title: 'Чето еще' },
    // ]

    useEffect(() => {
        if (activeImage !== null) {




            const selectedImg = ref.current.getElementsByClassName(activeImage)[0]





            let asd = window.innerWidth / 2 - selectedImg.offsetWidth
            selectedImg.animate({
                width: '100vw', height: '100vh'
            }, { duration: 700, fill: "forwards", ease: 'easy-in-out' })
            ref.current.animate({
                left: '0',

                transform: `translate(calc(-${selectedImg.parentNode.offsetLeft}px),-50%)`
            }, { duration: 400, fill: 'forwards', ease: 'easy-in-out' })
        }

    }, [activeImage])


    const miniSliderClisck = (e: ChangeEvent<HTMLImageElement>) => {
        if (e.target.alt === 'img') {
            setImage(e.target.id)
        }
    }


    const actImg = (e: ChangeEvent<HTMLImageElement>) => {
        if (e.target.alt === 'img') {
            setImage(e.target.id)
        }
    }


    function onmousedown(e: any) {
        ref.current.dataset.mouseDownAt = e.clientX

    }

    function onmouseup(e: any) {
        ref.current.dataset.mouseDownAt = '0'
        ref.current.dataset.prevPercentage = ref.current.dataset.percentage
        setisact(false)
        if (!isact) { actImg(e) }
    }

    function onmousemove(e: any) {
        if (ref.current.dataset.mouseDownAt === '0') return
        if (Math.abs(ref.current.dataset.mouseDownAt - e.clientX) > window.innerWidth / 50) { setisact(true) }
        if (isact) {
            const mouseDelta = parseFloat(ref.current.dataset.mouseDownAt) - e.clientX
            const maxDelta = window.innerWidth / 2
            const percentage = mouseDelta / maxDelta * -100
            const nextPercentageUnconstrained = parseFloat(ref.current.dataset.prevPercentage) + percentage
            setnextPercentage(Math.max(Math.min(nextPercentageUnconstrained, 0), -100))
            ref.current.dataset.percentage = nextPercentage

            ref.current.animate({
                left: '50%',
                // gap: '4vmin',
                transform: `translate(${nextPercentage}%,-50%)`
            }, { duration: 400, fill: 'forwards' })

            // const selectedImg = ref.current.getElementsByClassName(activeImage)[0]
            // if (selectedImg) {
            //     selectedImg.animate({
            //         width: '40vmin', height: '56vmin'
            //     }, { duration: 700, fill: 'forwards' })
            // }

            if (activeImage !== null) {
                const allimg = ref.current.getElementsByClassName(activeImage)
                console.log('allimg', allimg)
                for (let img of allimg) {

                    img.animate({
                        width: '40vmin', height: '56vmin'
                    }, { duration: 700, fill: 'forwards' })

                }
                setImage(null)
            }
        }
    }

    // if (typeof document !== "undefined" && !isSelected) {
    //     document.onmousedown = e => {
    //         ref.current.dataset.mouseDownAt = e.clientX


    //     }
    //     document.onmouseup = (e) => {
    //         ref.current.dataset.mouseDownAt = '0'
    //         ref.current.dataset.prevPercentage = ref.current.dataset.percentage
    //         setisact(false)
    //         if (!isact) { actImg(e) }
    //     }

    //     document.onmousemove = (e) => {
    //         if (ref.current.dataset.mouseDownAt === '0') return
    //         if (Math.abs(ref.current.dataset.mouseDownAt - e.clientX) > window.innerWidth / 50) { setisact(true) }
    //         if (isact) {
    //             const mouseDelta = parseFloat(ref.current.dataset.mouseDownAt) - e.clientX
    //             const maxDelta = window.innerWidth / 2
    //             const percentage = mouseDelta / maxDelta * -100
    //             const nextPercentageUnconstrained = parseFloat(ref.current.dataset.prevPercentage) + percentage
    //             setnextPercentage(Math.max(Math.min(nextPercentageUnconstrained, 0), -100))
    //             ref.current.dataset.percentage = nextPercentage

    //             ref.current.animate({
    //                 left: '50%',
    //                 // gap: '4vmin',
    //                 transform: `translate(${nextPercentage}%,-50%)`
    //             }, { duration: 400, fill: 'forwards' })

    //             const selectedImg = ref.current.getElementsByClassName(activeImage)[0]
    //             if (selectedImg) {
    //                 selectedImg.animate({
    //                     width: '40vmin', height: '56vmin'
    //                 }, { duration: 700, fill: 'forwards' })
    //             }




    //             if (activeImage !== null) { setImage(null) }
    //             // for (const image of ref.current.getElementsByClassName('image')) {
    //             //     image.dataset.active = 'false'
    //             //     image.animate({
    //             //         objectPosition: `${nextPercentage + 100}% 50%`,
    //             //         width: '40vmin',
    //             //         height: '56vmin',
    //             //         position: 'relative',

    //             //         transform: 'none',
    //             //         zindex: '3'
    //             //     }, { duration: 1000, fill: 'forwards' })
    //             // }
    //         }
    //     }
    // }



    return (
        <div ref={ref2} className="backgr">
            <div ref={ref}
                className='slider'
                data-mouse-down-at='0'
                data-prev-percentage='0'
                data-percentage='0'
                onMouseDown={onmousedown}
                onMouseMove={onmousemove}
                onMouseUp={onmouseup}     >
                {allImages.map((x, k) => <SliderItem activeImage={activeImage} key={x.img} id={x.id} nextPercentage={nextPercentage} switcher={isact} content={x.imagetitle} src={x.img} />
                )}

            </div>

            <div className='content'>
                <div className='header'>
                    <div>
                        <span>Work</span>
                    </div>
                    <div>
                        <span>About </span>
                    </div>
                </div>
                <MiniSlider miniSliderClisck={miniSliderClisck} activeImage={activeImage} />
            </div>

        </div>
    );
};

export default Slider;