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
        gsap.set(cursor.current, {
            css: {
                left: mouseX,
                top: mouseY
            }
        })
        // gsap.to(cursor.current, {
        //     left: mouseX,
        //     top: mouseY,


        //     // onRepeat: () => {
        //     //     // setposX((posX)=>posX + (mouseX - posX) / 5)
        //     //     // // setposY((posY)=>posY + (mouseY - posY) / 5)
        //     //     // gsap.set(cursor.current, {
        //     //     //     css: {
        //     //     //         left: mouseX,
        //     //     //         top: mouseY
        //     //     //     }
        //     //     // })
        //     //     // gsap.set(aura.current, {
        //     //     //     css: {
        //     //     //         left: posX-23,
        //     //     //         top: posY-23
        //     //     //     }
        //     //     // })
        //     // }

        // })
        gsap.to(aura.current, {
            left: mouseX - 11,
            top: mouseY - 11,
            duration: .2



        })

    }, [mouseX,
        mouseY])

    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            // cursor.current.classList.remove('cursorHidden')
            // aura.current.classList.remove('cursorHidden')

            mouseCoords(e)
        })

        window.addEventListener('mouseout', () => {
            // cursor.current.classList.add('cursorHidden')
            // aura.current.classList.add('cursorHidden')
        })
        window.addEventListener('mousedown', () => {
            // gsap.to(cursor.current, {
            //     transform: 'scale(2)'
            // })

            cursor.current.animate({
                transform: 'scale(2)'
            }, { duration: 300, fill: 'forwards' })
        })
        window.addEventListener('mouseup', () => {
            cursor.current.animate({
                transform: 'scale(1)'
            }, { duration: 300, fill: 'forwards' })
        })

    }, [])
    return (
        <div className='layout'>
            <div ref={cursor} id="cursor" />
            <div ref={aura} id="aura" />
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