
import React from 'react';
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import SliderItem from './sliderItem';
import MiniSlider from './miniSlider';

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
    const about = useRef<any>(null)
    const animatedTextWork = useRef<any>(null)
    const animatedTextAbout = useRef<any>(null)

    const [activeImage, setImage] = useState<string | null>(null)
    let [nextPercentage, setnextPercentage] = useState(0)



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
                about.current.animate({
                    height: '0vh'
                }, {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'ease-in-out'
                })
                break;
            case 'about':
                work.current.animate({
                    height: '0vh'
                }, {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'ease-in-out'
                })
                about.current.animate({
                    height: '100vh'
                }, {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'ease-in-out'
                });

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
                    width: '40vmin', height: '56vmin'
                }, { duration: 700, fill: 'forwards', easing: 'ease-in-out' })
            }


            const selectedImg = sliderComponent.current.getElementsByClassName(activeImage)[0]
            sliderComponent.current.animate({
                left: '0',
                // transform: `translate(calc(-${selectedImg.parentNode.offsetLeft}px),-50%)`
                transform: `translate(calc(-40vmin * ${Number(activeImage) - 1} - 4vmin * ${Number(activeImage) - 1}),-50%)`
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

        setImage(activeImage)

    }

    function onmousedown(e: any) {
        sliderComponent.current.dataset.mouseDownAt = e.clientX

    }

    function onmouseup(e: any) {
        sliderComponent.current.dataset.mouseDownAt = '0'
        sliderComponent.current.dataset.prevPercentage = sliderComponent.current.dataset.percentage
        setisact(false)
        if (!isact) { actImg(e) }
    }

    function onmousemove(e: any) {
        if (sliderComponent.current.dataset.mouseDownAt === '0') return
        if (Math.abs(sliderComponent.current.dataset.mouseDownAt - e.clientX) > window.innerWidth / 50) { setisact(true) }
        if (isact) {
            const mouseDelta = parseFloat(sliderComponent.current.dataset.mouseDownAt) - e.clientX
            const maxDelta = window.innerWidth / 2
            const percentage = mouseDelta / maxDelta * -100
            const nextPercentageUnconstrained = parseFloat(sliderComponent.current.dataset.prevPercentage) + percentage
            setnextPercentage(Math.max(Math.min(nextPercentageUnconstrained, 0), -100))
            sliderComponent.current.dataset.percentage = nextPercentage

            sliderComponent.current.animate({
                left: '50%',
                // gap: '4vmin',
                transform: `translate(${nextPercentage}%,-50%)`
            }, { duration: 800, fill: 'forwards', easing: 'linear' })

            // const selectedImg = sliderComponent.current.getElementsByClassName(activeImage)[0]
            // if (selectedImg) {
            //     selectedImg.animate({
            //         width: '40vmin', height: '56vmin'
            //     }, { duration: 700, fill: 'forwards' })
            // }

            if (activeImage !== null) {
                const allimg = sliderComponent.current.getElementsByClassName('image')

                for (let img of allimg) {

                    img.animate({
                        width: '40vmin', height: '56vmin'
                    }, { duration: 1000, fill: 'forwards', easing:'ease-out' })

                }
                setImage(null)
            }
        }
    }


    return (
        <div ref={background} className="backgr">
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
                        onMouseDown={onmousedown}
                        onMouseMove={onmousemove}
                        onMouseUp={onmouseup}     >
                        {allImages.map((x, k) => <SliderItem actImgForPlus={actImgForPlus} activeImage={activeImage} key={x.img} id={x.id} nextPercentage={nextPercentage} switcher={isact} content={x.imagetitle} src={x.img} />
                        )}

                    </div>
                    <MiniSlider miniSliderClisck={actImg} activeImage={activeImage} />
                </div>
                <div ref={about} className='about'>
                    <div className='about_content'>
                        <span>Статья́ — это жанр журналистики, в котором автор ставит задачу проанализировать общественные ситуации, процессы, явления, прежде всего с точки зрения закономерностей, лежащих в их основе. В статье автор рассматривает отдельные ситуации как часть более широкого явления. Автор аргументированно пишет о своей точке зрения.

                            В статье выражается развернутая обстоятельная аргументированная концепция автора или редакции по поводу актуальной социологической проблемы. Также в статье журналист обязательно должен интерпретировать факты (это могут быть цифры, дополнительная информация, которая будет правильно расставлять акценты и ярко раскрывать суть вопроса).

                            Отличительным аспектом статьи является её готовность. Если подготавливаемый материал так и не был опубликован (не вышел в тираж, не получил распространения), то такой труд относить к статье некорректно. Скорее всего данную работу можно назвать черновиком или заготовкой. Поэтому целью любой статьи является распространение содержащейся в ней информации.</span>
                    </div>

                </div>


            </div>




        </div>
    );
};

export default Slider;