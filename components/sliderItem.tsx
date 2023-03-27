import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher, arrayOfLoadedImages } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher, changearrayOfLoadedImages } from '../store/PageContentSlice'

import Link from 'next/link';


interface props {
    id: string,
    src: string,
    content: string,
    switcher: boolean,
    nextPercentage: number,
    dir: string,
    header: string,
    activeImage: string | null,
    actImgForPlus: (e: string | null) => void
}

const SliderItem = (props: props) => {
    const dispatch = useAppDispatch()
    const ref = useRef<any>(null)
    const [act, setact] = useState<boolean>(false)
    const boolSwitcher = useAppSelector(booleanSwitcher)
    const title = useRef<any>(null)
    const actImgForPlus = props.actImgForPlus
    let switcher: boolean = false
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        // Number(props.id)%2===0?
        // isReady&&  ref.current.animate([{
        //     transform: "rotateY(90deg)"
        // },
        // {
        //     transform: "none"
        // }
        // ], {
        //     duration: 1000,
        //     easing:'ease-out'
        // }):
        isReady && ref.current.animate([{
            transform: "rotateY(90deg)"
        },
        {
            transform: "none"
        }
        ], {
            duration: 1000,
            easing: 'ease-out'
        })
    }, [isReady, props.id])

    // useEffect(() => {
    //     console.log(boolSwitcher)
    //     let titleText = title.current
    //     if (titleText) {
    //         if (boolSwitcher) {
    //             titleText.animate({ transform: 'translate(0, -100%)' }, {
    //                 duration: 700,
    //                 fill: 'forwards',
    //                 easing: 'ease-in-out'
    //             })
    //         } else {
    //             titleText.animate({ transform: 'translate(0, 0)' }, {
    //                 duration: 700,
    //                 fill: 'forwards',
    //                 easing: 'ease-in-out'
    //             })
    //         }
    //     }

    // }, [boolSwitcher])

    useEffect(() => {
        if (props.switcher) { setact(false) }
    }, [props.switcher])

    useEffect(() => {
        const image = ref.current.getElementsByClassName('image')[0]
        // console.log(props.nextPercentage+100)
        image.animate({
            objectPosition: `${(props.nextPercentage + 100)}% 50%`,
        }, { duration: 800, fill: 'forwards', easing: 'ease' })
    }, [props.nextPercentage])



    useEffect(() => {
        if (props.activeImage === props.id && !act) { setact(true) }
        if (props.activeImage !== props.id && act) { setact(false) }
    }, [act, props.activeImage, props.id])

    useEffect(() => {
        if (props.activeImage === props.id) {
            const image = ref.current.getElementsByClassName('image')[0]
            image.animate({
                objectPosition: `50% 50%`,
            }, { duration: 800, fill: 'forwards', easing: 'ease-out' })
        }
    }, [props.activeImage, props.id])

    const myLoader = ({ src }: { src: string }) => src


    const onLoadCallback = (e: any) => {
        setIsReady(e.src);
        dispatch(changearrayOfLoadedImages())
    };
    return (
        <div ref={ref} className='sliderItem' onMouseDown={() => switcher = true}>
            <div className='sliderItem_name'><span>{props.header.split(' ')[0]}</span></div>
            <Image
                quality={40}
                // placeholder='blur'
                priority={true}
                unoptimized
                loader={myLoader}
                className={`image ${props.id} ${isReady ? '' : 'blur'}`}
                id={props.id}
                draggable='false'
                onLoadingComplete={onLoadCallback}
                src={props.src}
                alt="img" />
            {act && <div className='sliderItem_content'>
                <div className="title">
                    <div ref={title}>
                        <span onClick={() => actImgForPlus(String(Number(props.activeImage) - 1))}>+</span>
                        <span onClick={(() => {
                            // dispatch(selectContent(props.id))
                            // dispatch(changeBooleanSwitcher(true))
                            // dispatch(changeSelectedDir(props.dir))
                        })} id={props.id}><Link href={`${props.dir}`}>{props.content}</Link> </span>
                        <span onClick={() => actImgForPlus(String(Number(props.activeImage) + 1))}>+</span>



                    </div>

                </div>
            </div>}

        </div>
    );
};

export default SliderItem;