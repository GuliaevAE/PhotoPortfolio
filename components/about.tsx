import React from 'react';
import Image from 'next/image';
import { useRef, useState, useEffect, ChangeEvent } from 'react';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher, selectedPage } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher, changeSelectedPage } from '../store/PageContentSlice'


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

    const onEntry=(entry: any)=> {
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
            // let elements = about.current.getElementsByClassName('about_content_textBlock_span');
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



    let str = 'Красивый визуал сделать легко. Умный визуал — это глубокая работа. И результатом этой работы станет грамотное позиционирование Вас и Вашего продукта в медиапространстве.'
    // let str1 = 'Умный визуал — это глубокая работа. И результатом этой работы станет грамотное позиционирование Вас и Вашего продукта в медиапространстве.'
    let str2 = 'И результатом этой работы станет грамотное позиционирование Вас и Вашего продукта в медиапространстве.'


    let str3 = 'Brand фотография'
    let str4 = '— это новое уникальное направление, которое сочетает в себе ум и творчество, логику и полёт фантазии, красивую картинку и глубокий смысл.'
    let str5 = 'Правильно выстроенный визуальный контент максимально отражает Вас и Ваш продукт, верно транслирует Ваши роли в медиа-пространстве и привлекает именно Вашу целевую аудиторию. Ведь визуал — это первое, что заставляет Ваших потенциальных клиентов задержаться на Вашей странице.'

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

    const myLoader = ({ src }: { src: string }) => src

    return (
        <div ref={about} className='about'>

            {aboutSwitcher && <div className='about_container'>

                <div className='about_content'>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str}</span> </div>
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
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str3}</span> </div>
                    </div>

                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str4}</span> </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str5}</span> </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str6}</span> </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str7}</span> </div>
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
                        priority={true}
                        src={'https://sun9-east.userapi.com/sun9-76/s/v1/ig2/59A7dDDLihBlIHffrT-j5Rv28tkuxAYyPLlSsF7hhr8yotq4vc7z9m7CvG8rt8D-byP2AWRneIthadsEfS8KqQZS.jpg?size=1600x1270&quality=95&type=album'} />
                </div>  
                <div className='about_content'>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str8}</span> </div>
                    </div>

                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str11}</span> </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str12}</span> </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str13}</span> </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str14}</span> </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str15}</span> </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str16}</span> </div>
                    </div>
                    <div className='about_content_textBlock'>
                        <div className='about_content_textBlock_span'><span className='about_content_textBlock_span_text'>{str17}</span> </div>
                    </div>
                </div>
            </div>}

        </div>
    );
};

export default About;