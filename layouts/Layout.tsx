import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher, selectedPage, arrayOfLoadedImages } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher, changeSelectedPage, changearrayOfLoadedImages } from '../store/PageContentSlice'

import gsap from 'gsap';

export default function Layout({ children }: any) {
    const allImages = useAppSelector(Allcontent)
    const arrOfLoadedImages = useAppSelector(arrayOfLoadedImages)
    const gag = useRef<any>(null)
    const [switcher, setSwitcher] = useState<boolean>(false)
    const cursor = useRef<any>(null)
    const aura = useRef<any>(null)
    useEffect(() => {
        if (arrOfLoadedImages.length === allImages.length) {
            setSwitcher(true)
        }
    }, [arrOfLoadedImages, allImages])

 
    let [mouseX, setmouseX] = useState(0)
    let [mouseY, setmouseY] = useState(0)


    function mouseCoords(e: MouseEvent) {
        setmouseX(e.pageX)
        setmouseY(e.pageY)
    }


    useEffect(() => {
        cursor.current.classList.contains('cursorHidden') && mouseX && cursor.current.classList.remove('cursorHidden')
        aura.current.classList.contains('cursorHidden') && mouseY && aura.current.classList.remove('cursorHidden')

        gsap.set(cursor.current, {
            css: {
                left: mouseX,
                top: mouseY
            }
        })
      
        gsap.to(aura.current, {
            left: mouseX - 11,
            top: mouseY - 11,
            duration: .2
        })

    }, [mouseX,
        mouseY])

    useEffect(() => {
        window.addEventListener('mousemove', (e:any) => {
            if(e.target&&e.target.classList.contains('image')){
                cursor.current.animate({
                    background: 'var(--secondTextColor)'
                },{
                    duration:300, fill: 'forwards'
                })
            }else{
                cursor.current.animate({
                    background: 'white'
                },{
                    duration:300, fill: 'forwards'
                }) 
            }
            mouseCoords(e)
        })

        // window.addEventListener('mouseout', () => {
            // cursor.current.classList.add('cursorHidden')
            // aura.current.classList.add('cursorHidden')
        // })
        window.addEventListener('mousedown', () => {

            cursor.current.animate({
                transform: 'scale(2)'
            }, { duration: 200, fill: 'forwards' })
        })
        window.addEventListener('mouseup', () => {
            cursor.current.animate({
                transform: 'scale(1)'
            }, { duration: 200, fill: 'forwards' })
        })

    }, [])
    return (
        <div className='layout'>
            <div ref={cursor} className='cursorHidden' id="cursor" />
            <div ref={aura} className='cursorHidden' id="aura" />
            <div ref={gag} className={`gag ${switcher ? 'active' : ''}`}>
                <div className='gag_text'>
                    <span>nataly</span>
                    <span>nataly</span>
                    <span>nataly</span>
                    <span>nataly</span>
                </div>
            </div>
            {children}
        </div>
    );
};

// export default Layout;