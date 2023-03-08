
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import SliderItem from './sliderItem';
import MiniSlider from './miniSlider';
import About from './about';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher, selectedPage, arrayOfLoadedImages } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher, changeSelectedPage, changearrayOfLoadedImages } from '../store/PageContentSlice'




import dynamic from 'next/dynamic'


const Slider = () => {



    const dispatch = useAppDispatch()
    const selected = useAppSelector(SelectedContent)
    const isSelected = useAppSelector(booleanSwitcher)
    const allImages = useAppSelector(Allcontent)
    const pageTag = useAppSelector(selectedPage)
    const sliderComponent = useRef<any>(null)
    const background = useRef<any>(null)
    const work = useRef<any>(null)
    const animatedTextWork = useRef<any>(null)
    const animatedTextAbout = useRef<any>(null)

    const arrOfLoadedImages = useAppSelector(arrayOfLoadedImages)

    const plus = useRef<any>(null)
    const [ImageIdOnCenter, changeId] = useState<string>('1')


    const [activeImage, setImage] = useState<string | null>(null)
    let [nextPercentage, setnextPercentage] = useState(0)




    useEffect(() => {
        if (arrOfLoadedImages.length === allImages.length) {
            plus.current.animate({ color: '#ffffff' }, {
                duration: 4000,
                delay: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
            sliderComponent.current.animate([
                {
                    transform: ` translate(0%, -50%)`, opacity: 1,
                }], {
                duration: 1000,
                // delay: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
        }
    }, [arrOfLoadedImages, allImages])



    // useEffect(() => {
    //     plus.current.animate({ color: '#ffffff' }, {
    //         duration: 4000,
    //         delay: 1000,
    //         fill: 'forwards',
    //         easing: 'ease-in-out'
    //     })
    //     sliderComponent.current.animate([
    //         {
    //             transform: ` translate(0%, -50%)`, opacity: 1,
    //         }], {
    //         duration: 1000,
    //         // delay: 1000,
    //         fill: 'forwards',
    //         easing: 'ease-in-out'
    //     })

    // }, [])





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
            // background.current.animate({
            //     height: '100vh'
            // }, {
            //     duration: 1000,
            //     fill: 'forwards',
            //     easing: 'ease-in-out'
            // })
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

            changeId(activeImage)
            plus.current.animate([
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 0, transform: 'translateY(-100%)' }
            ], { duration: 300, fill: 'forwards', easing: 'ease-in' })

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
        else {
            plus.current.animate({
                opacity: 1, transform: 'translate(-50%, -50%)'
            }, { duration: 700, fill: 'forwards', easing: 'ease-in-out' })
        }
    }, [activeImage])



    const actImg = (e: any) => {
        if (!(e.target instanceof HTMLImageElement)) return
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

    function identificationPictureNumber() {
        let allImg = sliderComponent.current.getElementsByClassName('image')
        for (let img of allImg) {
            if (ImageIdOnCenter !== img.id && img.getBoundingClientRect().left <= plus.current.getBoundingClientRect().left && img.getBoundingClientRect().left + img.getBoundingClientRect().width >= plus.current.getBoundingClientRect().left) {
                changeId(img.id)
            }
        }
    }

    const ontouchdown: React.TouchEventHandler<HTMLDivElement> = (e) => {
        sliderComponent.current.dataset.mouseDownAt = e.touches[0].clientX;
    }

    const onmousedown: React.MouseEventHandler<HTMLDivElement> = (e) => {
        sliderComponent.current.dataset.mouseDownAt = e.clientX
    }

    const ontouchup: React.TouchEventHandler<HTMLDivElement> = (e) => {
        sliderComponent.current.dataset.mouseDownAt = '0'
        sliderComponent.current.dataset.prevPercentage = sliderComponent.current.dataset.percentage
        setisact(false)
        if (!isact) { actImg(e) }
    }

    const onmouseup: React.MouseEventHandler<HTMLDivElement> = (e) => {
        sliderComponent.current.dataset.mouseDownAt = '0'
        sliderComponent.current.dataset.prevPercentage = sliderComponent.current.dataset.percentage
        setisact(false)

        if (!isact) { actImg(e) }
    }

    const onwheelmove: React.WheelEventHandler = (e:any) => {
        sliderComponent.current.dataset.mouseDownAt = e.clientX
        let clientX = e.nativeEvent.wheelDelta

        const nextPercentageUnconstrained = parseFloat(sliderComponent.current.dataset.prevPercentage) + clientX/50
      
        setnextPercentage(Math.max(Math.min(nextPercentageUnconstrained, 0), -52.5))
        sliderComponent.current.dataset.percentage = nextPercentage

        sliderComponent.current.animate({
            transform: `translate(${Math.max(Math.min(nextPercentageUnconstrained, 0), -57)}%,-50%)`
        }, { duration: 800, fill: 'forwards', easing: 'ease-in' })

        identificationPictureNumber()

        if (activeImage !== null) {

            setImage(null)
            const allimg = sliderComponent.current.getElementsByClassName('image')

            for (let img of allimg) {
                if (img.id === activeImage) {
                    img.animate({
                        width: '18vw', height: '56vh'
                    }, { duration: 700, fill: 'forwards', easing: 'ease-in-out' })
                }
            }
        }
        sliderComponent.current.dataset.mouseDownAt = '0'
        sliderComponent.current.dataset.prevPercentage = sliderComponent.current.dataset.percentage
    }
    const ontouchmove: React.TouchEventHandler<HTMLDivElement> = (e) => {
        let clientX = e.touches[0].clientX
        moveFunction(clientX)
    }

    const onmousemove: React.MouseEventHandler<HTMLDivElement> = (e) => {
        let clientX = e.clientX
        moveFunction(clientX)

    }

    const moveFunction = (clientX: number) => {
        if (sliderComponent.current.dataset.mouseDownAt === '0') return
        if (Math.abs(sliderComponent.current.dataset.mouseDownAt - clientX) > window.innerWidth / 50) { setisact(true) }
        if (isact) {
            const mouseDelta = parseFloat(sliderComponent.current.dataset.mouseDownAt) - clientX
            const maxDelta = window.innerWidth
            const percentage = mouseDelta / maxDelta * -100
            const nextPercentageUnconstrained = parseFloat(sliderComponent.current.dataset.prevPercentage) + percentage
            setnextPercentage(Math.max(Math.min(nextPercentageUnconstrained, 0), -57))
            sliderComponent.current.dataset.percentage = nextPercentage

            sliderComponent.current.animate({
                transform: `translate(${nextPercentage}%,-50%)`
            }, { duration: 800, fill: 'forwards', easing: 'ease-in' })

            identificationPictureNumber()

            if (activeImage !== null) {

                setImage(null)
                const allimg = sliderComponent.current.getElementsByClassName('image')

                for (let img of allimg) {
                    if (img.id === activeImage) {
                        img.animate({
                            width: '18vw', height: '56vh'
                        }, { duration: 700, fill: 'forwards', easing: 'ease-in-out' })
                    }
                }
            }
        }
    }

    return (
        <div ref={background} className="container" onWheel={onwheelmove}>
            <div className='content'>

                <div className='header'>
                    <div className={pageTag === 'work' ? 'header_item active' : 'header_item'}>
                        <span ref={animatedTextWork} onClick={() => dispatch(changeSelectedPage('work'))}>Галерея</span>
                    </div>
                    <div className={pageTag === 'about' ? 'header_item active' : 'header_item'}>
                        <span ref={animatedTextAbout} onClick={() => dispatch(changeSelectedPage('about'))}>Обо мне</span>
                    </div>
                </div>
                <div ref={work} className='sliderAndMinislider'>
                    <div ref={sliderComponent}
                        className='slider'
                        data-mouse-down-at='0'
                        data-prev-percentage='0'
                        data-percentage='0'
                        onMouseDown={onmousedown}
                        onMouseMove={onmousemove}
                        onMouseUp={onmouseup}

                    onTouchStart={ontouchdown}
                    onTouchMove={ontouchmove}
                    onTouchEnd={ontouchup}
                    >
                        {allImages.map((x, k) => <SliderItem
                            actImgForPlus={actImgForPlus}
                            activeImage={activeImage}
                            key={x.id}
                            id={x.id}
                            nextPercentage={nextPercentage}
                            switcher={isact}
                            content={x.imagetitle}
                            src={x.img}
                            header={x.dir}
                        />
                        )}

                    </div>
                    <div ref={plus} className='sliderAndMinislider_plus' onClick={() => setImage(String(ImageIdOnCenter))}>
                        +
                    </div>
                    <div className='sliderAndMinislider_counter'>
                        <div>{ImageIdOnCenter}</div>
                        <div>-</div>
                        <div>{allImages.length}</div>
                    </div>
                    {/* <MiniSlider miniSliderClisck={actImg} activeImage={activeImage} /> */}
                </div>

                <About />
            </div>
        </div>
    );
};

export default Slider;