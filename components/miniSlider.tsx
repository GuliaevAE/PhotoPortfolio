import React, {useEffect, useState, useRef} from 'react';
import Image from 'next/image';

import { useAppSelector } from '../store/hooks'
import { Allcontent   } from '../store/PageContentSlice'

interface props {
    activeImage: string | null
    miniSliderClisck: (e:any)=> void
}

const MiniSlider = (props:props) => {

    // const [switcher, setSwitch] = useState<boolean>(false)
    // useEffect(()=>{
    //     if(props.activeImage===null && switcher){setSwitch(false)}
    //     if(props.activeImage!==null && !switcher){setSwitch(true)}
    // },[props.activeImage, switcher])
    const allImages = useAppSelector(Allcontent)

    const minislider = useRef<any>(null)
    useEffect(()=>{
        if(!props.activeImage){
            minislider.current.animate({
                transform:'translate(0, 300%)', opacity: 0
            },{
                duration:800, fill:'forwards', easing: 'ease-out'
            })
        }else{
            minislider.current.animate({
                transform:'translate(0, 0)', opacity: 1
            },{
                duration:800, fill:'forwards', easing: 'ease-out'
            })
        }
    },[props.activeImage])

    const myLoader = ({ src }: { src: string }) => src

    return (
        <div ref={minislider} className={`minislider `} onClick={(e:any)=>props.miniSliderClisck(e)}>
            {allImages.map(img => <Image key={img.id} loader={myLoader} width={0} height={10} className={`image ${img.id}  ${props.activeImage===img.id? 'slideDown': ''}`} id={img.id} draggable='false' src={img.img} alt='img' />)}
        </div>
    );
};

export default MiniSlider;


