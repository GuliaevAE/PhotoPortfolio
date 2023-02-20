
import React from 'react';
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import SliderItem from './sliderItem';
import MiniSlider from './miniSlider';
import About from './about';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher, selectedPage } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher, changeSelectedPage } from '../store/PageContentSlice'

interface props {
    mini?: boolean
}


const Slider = (props: props) => {
    const dispatch = useAppDispatch()
    const isSelected = useAppSelector(booleanSwitcher)
    const allImages = useAppSelector(Allcontent)
    const pageTag = useAppSelector(selectedPage)
    const sliderComponent = useRef<any>(null)
    const background = useRef<any>(null)
    const work = useRef<any>(null)
    const animatedTextWork = useRef<any>(null)
    const animatedTextAbout = useRef<any>(null)

    const [activeImage, setImage] = useState<string | null>(null)
    let [nextPercentage, setnextPercentage] = useState(0)



    useEffect(() => {
        sliderComponent.current.animate([
            {
                transform: ' translate(0, -50%)', opacity: 1, 
            }], {
            duration: 4000,
            delay: 1000,
            fill: 'forwards',
            easing: 'ease-in-out'
        })
    }, [])

    useEffect(() => {
        switch (pageTag) {
            case 'work':
                work.current.animate({
                    height: '100vh'
                }, {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'ease-in-out'
                });
                break;
            case 'about':
                work.current.animate({
                    height: '0vh'
                }, {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'ease-in-out'
                })

                break;

            default:
                break;
        }
    }, [pageTag])

    useEffect(() => {

        if (isSelected) {
            background.current.animate({
                height: '0'
            }, {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
            animatedTextWork.current.animate({
                transform: 'translate(0, -100%)'
            }, {
                duration: 800,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
            animatedTextAbout.current.animate({
                transform: 'translate(0, -100%)'
            }, {
                duration: 800,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
        } else {
            background.current.animate({
                height: '100vh'
            }, {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
            animatedTextWork.current.animate({
                transform: 'translate(0, 0)'
            }, {
                duration: 800,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
            animatedTextAbout.current.animate({
                transform: 'translate(0, 0)'
            }, {
                duration: 800,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
        }
    }, [isSelected])

    let [isact, setisact] = useState<boolean>(false)

    useEffect(() => {
        if (activeImage !== null) {
            const allimg = sliderComponent.current.getElementsByClassName('image')
            for (let img of allimg) {
                img.animate({
                    width: '18vw', height: '56vh'
                }, { duration: 700, fill: 'forwards', easing: 'ease-in-out' })
            }


            const selectedImg = sliderComponent.current.getElementsByClassName(activeImage)[0]
            sliderComponent.current.animate({
                left: '0',
                transform: `translate(calc(-18vw * ${Number(activeImage) - 1} - 4vw * ${Number(activeImage) - 1} - (100vw - 18vw)/2),-50%)`
            }, { duration: 1000, fill: 'forwards', easing: 'ease-in-out' })

            selectedImg.animate({

                width: '100vw', height: '100vh'
            }, { duration: 1000, fill: "forwards", easing: 'ease-in-out' })
        }
    }, [activeImage])


    const actImg = (e: ChangeEvent<HTMLImageElement>) => {
        if (e.target.alt === 'img') {
            setImage(e.target.id)
        }
    }
    const actImgForPlus = (activeImage: string | null) => {
        if (!activeImage) return

        if (Number(activeImage) >= Number(allImages[allImages.length - 1].id)) {
            setImage('1')
        } else
            if (Number(activeImage) === 0) {
                setImage(allImages[allImages.length - 1].id)
            } else {
                setImage(activeImage)
            }

    }

    function onmousedown(e: any, mouse: boolean = false) {
        if (mouse) {
            sliderComponent.current.dataset.mouseDownAt = e.clientX
        } else {
            sliderComponent.current.dataset.mouseDownAt = e.touches[0].clientX;
        }
    }

    function onmouseup(e: any) {
        sliderComponent.current.dataset.mouseDownAt = '0'
        sliderComponent.current.dataset.prevPercentage = sliderComponent.current.dataset.percentage
        setisact(false)

        if (!isact) { actImg(e) }
    }

    function onmousemove(e: any, mouse: boolean = false) {
        let clientX
        if (mouse) {
            clientX = e.clientX
        } else {
            clientX = e.touches[0].clientX
        }
        if (sliderComponent.current.dataset.mouseDownAt === '0') return
        if (Math.abs(sliderComponent.current.dataset.mouseDownAt - clientX) > window.innerWidth / 50) { setisact(true) }
        if (isact) {
            const mouseDelta = parseFloat(sliderComponent.current.dataset.mouseDownAt) - clientX
            const maxDelta = window.innerWidth
           
            const percentage = mouseDelta / maxDelta * -100
            const nextPercentageUnconstrained = parseFloat(sliderComponent.current.dataset.prevPercentage) + percentage
            setnextPercentage(Math.max(Math.min(nextPercentageUnconstrained, 0), -53))
            sliderComponent.current.dataset.percentage = nextPercentage

            sliderComponent.current.animate({
                // left: '40vw',
                transform: `translate(${nextPercentage}%,-50%)`
            }, { duration: 800, fill: 'forwards', easing: 'ease' })

            if (activeImage !== null) {
                const allimg = sliderComponent.current.getElementsByClassName('image')

                for (let img of allimg) {

                    img.animate({
                        width: '18vw', height: '56vh'
                    }, { duration: 1000, fill: 'forwards', easing: 'ease-out' })

                }
                setImage(null)
            }
        }
    }



    const myLoader = ({ src }: { src: string }) => src

    return (
        <div ref={background} className="container">
            <div className='content'>

                <div className='header'>
                    <div className={pageTag === 'work' ? 'header_item active' : 'header_item'}>
                        <span ref={animatedTextWork} onClick={() => dispatch(changeSelectedPage('work'))}>work</span>
                    </div>
                    <div className={pageTag === 'about' ? 'header_item active' : 'header_item'}>
                        <span ref={animatedTextAbout} onClick={() => dispatch(changeSelectedPage('about'))}>about </span>
                    </div>
                </div>
                <div ref={work} className='sliderAndMinislider'>
                    <div ref={sliderComponent}
                        className='slider'
                        data-mouse-down-at='0'
                        data-prev-percentage='0'
                        data-percentage='0'
                        onMouseDown={(e) => onmousedown(e, true)}
                        onMouseMove={(e) => onmousemove(e, true)}
                        onMouseUp={onmouseup}

                        onTouchStart={onmousedown}
                        onTouchMove={onmousemove}
                        onTouchEnd={onmouseup}
                    >
                        {allImages.map((x, k) => <SliderItem actImgForPlus={actImgForPlus} activeImage={activeImage} key={x.img} id={x.id} nextPercentage={nextPercentage} switcher={isact} content={x.imagetitle} src={x.img} />
                        )}

                    </div>
                    <MiniSlider miniSliderClisck={actImg} activeImage={activeImage} />
                </div>

                <About />
            </div>
        </div>
    );
};

export default Slider;