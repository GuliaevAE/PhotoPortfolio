
import React from 'react';
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import SliderItem from './sliderItem';
import MiniSlider from './miniSlider';

import { CSSTransition } from 'react-transition-group';

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


    const [aboutSwitcher, setAboutSwitch] = useState<boolean>(false)

    


    //////////////////////observer

    const observer = useRef<any>(null);


    function onEntry(entry: any) {
        entry.forEach((change: any) => {
            if (change.isIntersecting) {
                change.target.classList.add('element-show');
            }
        });
    }
    //////////////////////



    useEffect(() => {
        if (aboutSwitcher) {
            let options = { threshold: [0.5] };
            observer.current = new IntersectionObserver(onEntry, options);
            let elements = about.current.getElementsByClassName('about_content_textBlock_span');
            for (let elm of elements) {
                observer.current.observe(elm);
            }
        } else {
            about.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [aboutSwitcher])







    useEffect(() => {
        sliderComponent.current.animate([
            {
                transform: ' translate(0, -50%)', opacity: 1, gap: '4vmin'
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
                about.current.animate({
                    height: '0vh'
                }, {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'ease-in-out'
                })

                setTimeout(() => {
                    setAboutSwitch(false)

                    // about.current.scrollTo({
                    //     top: 0,
                    //     behavior: 'smooth'
                    // });
                }, 900)

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
                setAboutSwitch(true)
                // let options = { threshold: [0.5] };
                // observer.current = new IntersectionObserver(onEntry, options);
                // let elements = about.current.getElementsByClassName('about_content_textBlock_span');
                // for (let elm of elements) {
                //     observer.current.observe(elm);
                // }
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
                transform: `translate(${nextPercentage}%,-50%)`
            }, { duration: 800, fill: 'forwards', easing: 'linear' })

            if (activeImage !== null) {
                const allimg = sliderComponent.current.getElementsByClassName('image')

                for (let img of allimg) {

                    img.animate({
                        width: '40vmin', height: '56vmin'
                    }, { duration: 1000, fill: 'forwards', easing: 'ease-out' })

                }
                setImage(null)
            }
        }
    }
    let str = 'Красивый визуал сделать легко.'
    let str1 = 'Умный визуал — это глубокая работа.'
    let str2 = 'И результатом этой работы станет грамотное позиционирование Вас и Вашего продукта в медиапространстве. '
    let str3 = 'Brand фотография'
    let str4 = '— это новое уникальное направление, которое сочетает в себе ум и творчество, логику и полёт фантазии, красивую картинку и глубокий смысл.  '
    let str5 = 'Правильно выстроенный визуальный контент максимально отражает Вас и Ваш продукт, верно транслирует Ваши роли в медиа-пространстве и привлекает именно Вашу целевую аудиторию. Ведь визуал — это первое, что заставляет Ваших потенциальных клиентов задержаться на Вашей странице. '

    let str6 = 'Грамотная визуализация бренда создает ДОВЕРИЕ'
    let str7 = 'А доверие, как известно, вовлекает, удерживает внимание и прекрасно продает!'
    let str8 = 'Я — Brand фотограф и эксперт по визуальному продвижению в Instagram'

    let str11 = '- два высших образования, что говорит о системности, структуре и желании быть в постоянном развитии'
    let str12 = '- 10 лет опыта работы в красивом бизнесе снимаю с 2013 года'
    let str13 = '- бэкграунд: пейзажная фотография, детские и семейные съёмки, кинематографическая фотография, создание Slide movie'
    let str14 = '- участник тематических конкурсов 35AWARDS 2019'
    let str15 = '- участник выставки BICFP ROME EXPO В Италии 2020  '
    let str16 = '- снимаю с 2013 года'
    let str17 = '- повышение квалификации на курсе «BRAND фотография» в агентстве визуального брендинга MIA'

    let aboutTextArr = [str,
        str1,
        str2,
        str3,
        str4,
        str5,
        str6,
        str7,
        str8,
        str11,
        str12,
        str13,
        str14,
        str15,
        str16,
        str17]


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
                        onMouseDown={onmousedown}
                        onMouseMove={onmousemove}
                        onMouseUp={onmouseup}     >
                        {allImages.map((x, k) => <SliderItem actImgForPlus={actImgForPlus} activeImage={activeImage} key={x.img} id={x.id} nextPercentage={nextPercentage} switcher={isact} content={x.imagetitle} src={x.img} />
                        )}

                    </div>
                    <MiniSlider miniSliderClisck={actImg} activeImage={activeImage} />
                </div>
                <div ref={about} className='about'>
                    {aboutSwitcher && <div className='about_image'>
                        <Image className='img'
                            height={40}
                            width={40}
                            loader={myLoader}
                            draggable='false'
                            alt="img"
                            src={'https://img-10.wfolio.com/QPMs3IyRCgMwE_iazelPKmR6dX7vp8OI5EFnBU8QkVc/c:853:853:nowe:0:370/rs:fill:320:0:0/cb:v2/aHR0cDovL3N0b3Jh/Z2Uud2ZvbGlvLnJ1/L3NpdGVzLzEyOTc0/L2Fzc2V0cy8xNjQy/NjA1OTUzXzNkNmFh/OS5qcGc.jpg'} />
                    </div>}
                    {aboutSwitcher && <div className='about_content'>


                        {aboutTextArr.map((str, k) => {

                            if (k === 3) {
                                return <div key={str} className='about_content_textBlock'>
                                    {str.split(' ').map((x, k) => <div key={x + k} className='about_content_textBlock_span'><span className='about_content_textBlock_span_text title uppercase'>{x}</span> </div>)}
                                </div>
                            } else if (k >= 9) {
                                return <div key={str} className='about_content_textBlock ul'>
                                    {str.split(' ').map((x, k) => <div key={x + k} className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{x}</span> </div>)}
                                </div>
                            } else {
                                return <div key={str} className='about_content_textBlock'>
                                {str.split(' ').map((x, k) => <div key={x + k} className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{x}</span> </div>)}
                            </div>
                            }

                        })}






                        {/* <div className='about_content_textBlock'>
                            {str.split(' ').map((x, k) => <div key={x + k} className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{x}</span> </div>)}
                        </div>

                        <div className='about_content_textBlock'>
                            {str1.split(' ').map((x, k) => <div key={x + k} className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{x}</span> </div>)}
                        </div>
                        <div className='about_content_textBlock'>
                            {str2.split(' ').map((x, k) => <div key={x + k} className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{x}</span> </div>)}
                        </div>
                        <div className='about_content_textBlock'>
                            {str3.split(' ').map((x, k) => <div key={x + k} className='about_content_textBlock_span'><span className='about_content_textBlock_span_text title uppercase'>{x}</span> </div>)}
                        </div>

                        <div className='about_content_textBlock'>
                            {str4.split(' ').map((x, k) => <div key={x + k} className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{x}</span> </div>)}
                        </div>
                        <div className='about_content_textBlock'>
                            {str5.split(' ').map((x, k) => <div key={x + k} className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{x}</span> </div>)}
                        </div> */}

                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Slider;