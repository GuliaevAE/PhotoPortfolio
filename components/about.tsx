import React from 'react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

import { useAppSelector,  } from '../store/hooks'
import {  selectedPage } from '../store/PageContentSlice'

const About = () => {
    const about = useRef<any>(null)
    const [aboutSwitcher, setAboutSwitch] = useState<boolean>(false)

    const pageTag = useAppSelector(selectedPage)

    useEffect(() => {
        switch (pageTag) {
            case 'work':
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
                about.current.animate({
                    height: '100vh'
                }, {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'ease-in-out'
                });
                setAboutSwitch(true)
                break;
            default:
                break;
        }
    }, [pageTag])

    //////////////////////observer

    const observer = useRef<any>(null);

    const onEntry = (entry: any) => {
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
            // let elements = about.current.getElementsByClassName('about_content_textBlock_text');
            let elements = about.current.getElementsByClassName('about_content');
            for (let elm of elements) {
                observer.current.observe(elm);
            }


            let elements1 = about.current.getElementsByClassName('about_image');
            for (let elm of elements1) {
                observer.current.observe(elm);
            }
        } else {
            about.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [aboutSwitcher])

    const myLoader = ({ src }: { src: string }) => src

    return (
        <div ref={about} className='about'>

            {aboutSwitcher && <div className='about_container'>

                <div className='about_content'>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_text'>
                            Красивый визуал сделать легко. <strong>Умный визуал — это глубокая работа.</strong>
                            И результатом этой работы станет грамотное позиционирование Вас и Вашего продукта в медиапространстве.
                        </div>
                    </div>



                </div>
            </div>}

            {aboutSwitcher && <div className='about_container '>
                <div className='about_image'>
                    <Image className='img long'
                        height={40}
                        width={40}
                        loader={myLoader}
                        draggable='false'
                        alt="img"
                        priority={true}
                        src={'https://sun9-west.userapi.com/sun9-68/s/v1/ig2/Ys8rUumKXY61umxr_L8-i5M0frxN4NmlCQxhuQODGgMMEy4PmYfXdSmHU0kpATE94EwfiJ-ElOxIjYTzzdqj7R3S.jpg?size=1600x1066&quality=95&type=album'} />
                </div>
                <div className='about_content'>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_text'>
                            <strong>Brand фотография</strong>
                        </div>
                    </div>

                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_text'>
                            — это новое уникальное направление, которое сочетает в себе ум и творчество, логику и полёт фантазии, красивую картинку и глубокий смысл.
                        </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_text'>
                            Правильно выстроенный визуальный контент максимально отражает Вас и Ваш продукт, верно транслирует Ваши роли в медиа-пространстве и привлекает именно Вашу целевую аудиторию. Ведь визуал — это первое, что заставляет Ваших потенциальных клиентов задержаться на Вашей странице.
                        </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_text'>
                            Грамотная визуализация бренда создает <strong> ДОВЕРИЕ</strong>
                        </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_text'>
                            А доверие, как известно, вовлекает, удерживает внимание и прекрасно продает!
                        </div>
                    </div>
                </div>
            </div>}

            {aboutSwitcher && <div className='about_container reverse'>
                <div className='about_image'>
                    <Image className='img'
                        height={40}
                        width={40}
                        loader={myLoader}
                        draggable='false'
                        alt="img"
                        unoptimized={true}
                        priority={true}
                        src={'https://sun9-east.userapi.com/sun9-76/s/v1/ig2/59A7dDDLihBlIHffrT-j5Rv28tkuxAYyPLlSsF7hhr8yotq4vc7z9m7CvG8rt8D-byP2AWRneIthadsEfS8KqQZS.jpg?size=1600x1270&quality=95&type=album'} />
                </div>
                <div className='about_content'>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_text'>
                            <span className='about_content_textBlock_span_text'>
                                Я — Brand фотограф и эксперт по визуальному продвижению в Instagram
                            </span>
                        </div>
                    </div>

                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_text'>
                            <ul>
                                <li>
                                    два высших образования, что говорит о системности, структуре и желании быть в постоянном развитии
                                </li>
                                <li>
                                    10 лет опыта работы в красивом бизнесе снимаю с 2013 года
                                </li>
                                <li>
                                    бэкграунд: пейзажная фотография, детские и семейные съёмки, кинематографическая фотография, создание Slide movie
                                </li>
                                <li>
                                    участник тематических конкурсов 35AWARDS 2019
                                </li>
                                <li>
                                    участник выставки BICFP ROME EXPO В Италии 2020
                                </li>
                                <li>
                                    снимаю с 2013 года
                                </li>
                                <li>
                                    повышение квалификации на курсе «BRAND фотография» в агентстве визуального брендинга MIA
                                </li>
                            </ul>

                        </div>
                    </div>

                </div>
            </div>}

        </div>
    );
};

export default About;