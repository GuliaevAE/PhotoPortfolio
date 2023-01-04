import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';


interface props {
    id: string,
    src: string,
    content: string,
    switcher: boolean,
    nextPercentage: number,
    activeImage: string|null
}

const SliderItem = (props: props) => {
    const ref = useRef<any>(null)
    const [act, setact] = useState<boolean>(false)
    let switcher: boolean = false

    useEffect(() => {
        if (props.switcher) { setact(false) }
    }, [act, props.switcher])

    useEffect(() => {
        const image = ref.current.getElementsByClassName('image')[0]
        image.animate({
            objectPosition: `${props.nextPercentage + 100}% 50%`,
        }, { duration: 800, fill: 'forwards' })
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
                    <h1>+</h1>
                    <h1>{props.content}</h1>
                    <h1>+</h1>
                </div>
            </div>}

        </div>
    );
};

export default SliderItem;