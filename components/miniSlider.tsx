import React, {useEffect, useState, useRef} from 'react';
import Image from 'next/image';



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


    const minislider = useRef<any>(null)
    useEffect(()=>{
        if(!props.activeImage){
            minislider.current.animate({
                transform:'translate(0, 300%)'
            },{
                duration:800, fill:'forwards', easing: 'ease-out'
            })
        }else{
            minislider.current.animate({
                transform:'translate(0, 0)'
            },{
                duration:800, fill:'forwards', easing: 'ease-out'
            })
        }
    },[props.activeImage])

    let ImageArray = [
        { id: '1', img: "https://look.com.ua/pic/201701/1920x1080/look.com.ua-192291.jpg", title: 'From Nature to Culture' },
        { id: '2', img: "https://img2.akspic.ru/crops/9/2/1/6/6/166129/166129-california_streaming_apple_event_wallpaper_without_logo-1920x1080.jpg", title: 'Reventing Wonder' },
        { id: '3', img: "https://images.wallpaperscraft.ru/image/single/ulitsa_osveshchenie_podsvetka_134856_1920x1080.jpg", title: 'Sound Expressed In Full' },
        { id: '4', img: "https://wallpaperaccess.com/full/109666.jpg", title: 'From Gaggio With Love' },
        { id: '5', img: "https://mikhail.krivyy.com/wallpapers/list/m11-6-4/1920x1080.jpg", title: 'The Regeneration Suit' },
        { id: '6', img: "https://mobimg.b-cdn.net/v3/fetch/9c/9c63d540a3284fd5b7077e6a63dd2d3e.jpeg", title: 'Чето еще' },
    ]

    const myLoader = ({ src }: { src: string }) => src

    return (
        <div ref={minislider} className={`minislider `} onClick={(e:any)=>props.miniSliderClisck(e)}>
            {ImageArray.map(img => <Image key={img.id} loader={myLoader} width={0} height={10} className={`image ${img.id}`} id={img.id} draggable='false' src={img.img} alt='img' />)}
        </div>
    );
};

export default MiniSlider;


