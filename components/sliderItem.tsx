import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher } from '../store/PageContentSlice'

interface props {
    id: string,
    src: string,
    content: string,
    switcher: boolean,
    nextPercentage: number,
    activeImage: string | null,
    actImgForPlus: (e:string | null)=>void
}

const SliderItem = (props: props) => {
    const dispatch = useAppDispatch()
    const ref = useRef<any>(null)
    const [act, setact] = useState<boolean>(false)
    const boolSwitcher = useAppSelector(booleanSwitcher)
    const title = useRef<any>(null)
    const actImgForPlus = props.actImgForPlus
    let switcher: boolean = false


    useEffect(() => {
        
        let titleText = title.current
        if(titleText){
            if (boolSwitcher) {
                titleText.animate({ transform: 'translate(0, -100%)' }, {
                    duration: 700,
                    fill: 'forwards',
                    easing: 'ease-in-out'
                })
            } else {
                titleText.animate({ transform: 'translate(0, 0)' }, {
                    duration: 700,
                    fill: 'forwards',
                    easing: 'ease-in-out'
                })
            }
        }
        
    }, [boolSwitcher])

    useEffect(() => {
        if (props.switcher) { setact(false) }
    }, [ props.switcher])

    useEffect(() => {
        const image = ref.current.getElementsByClassName('image')[0]
        image.animate({
            objectPosition: `${props.nextPercentage + 100}% 50%`,
        }, { duration: 800, fill: 'forwards', easing: 'ease'})
    }, [props.nextPercentage])



    useEffect(() => {
        if (props.activeImage === props.id && !act) { setact(true) }
        if (props.activeImage !== props.id && act) { setact(false) }
    }, [act, props.activeImage, props.id])



    const myLoader = ({ src }: { src: string }) => src

    const active = () => {
        // if (switcher) {setact(true)}
    }

    return (
        <div ref={ref} className='sliderItem' onClick={() => active()} onMouseDown={() => switcher = true}>
            <Image loader={myLoader} width={10} height={10} className={`image ${props.id} ${act ? "activeaaa" : ""}`} id={props.id} draggable='false' src={props.src} alt="img" />
            {act && <div className='sliderItem_content'>
                <div className="title">
                    <div ref={title}>
                        <h1 onClick={()=>actImgForPlus(String(Number(props.activeImage)-1) )}>+</h1>
                        <h1  onClick={(() => {
                            dispatch(selectContent(props.id))
                            dispatch(changeBooleanSwitcher(true))
                        })} id={props.id}>{props.content}</h1>
                        <h1 onClick={()=>actImgForPlus(String(Number(props.activeImage)+1) )}>+</h1>
                    </div>

                </div>
            </div>}

        </div>
    );
};

export default SliderItem;