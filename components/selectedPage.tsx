import React from 'react';
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image'
import SelectPageImage from './SelectPageImage';
import ImageBlock from './imageBlock';
import FocusedImage from './focusedImage';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher, selectedDir, focusImage } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher, changeSelectedDir, changeFocusedImage } from '../store/PageContentSlice'



interface arrayOfImagesItem {
    dir: string,
    img: string
}



const SelectedPage = () => {
    const allContent = useAppSelector(Allcontent)
    const Dir = useAppSelector(selectedDir)
    const selected = useAppSelector(SelectedContent)
    const dispatch = useAppDispatch()
    const isSelected = useAppSelector(booleanSwitcher)
    const refSelectedPage = useRef<any>(null)
    const scrollBlock = useRef<any>(null)

    const backAndScroll = useRef<any>(null)
    const [switcher, setSwitch] = useState<boolean>(false)

    const focusedImages = useAppSelector(focusImage)


    const [arrayOfImages, setArr] = useState<arrayOfImagesItem[]>([])
    //////////////////////observer

    const observer = useRef<any>(null);
    useEffect(() => {
        if (switcher) {

            // let options = { threshold: [0.5] };
            // observer.current = new IntersectionObserver(onEntry, options);
            // let elements = refSelectedPage.current.getElementsByClassName('SelectedPage_content_images_item');
            // for (let elm of elements) {
            //     observer.current.observe(elm);
            // }
        } else {
            scrollBlock.current.animate({
                height: `0%`
            }, { duration: 100, fill: 'forwards', easing: 'ease-in-out' })
        }


    }, [switcher])


    const onEntry = (entry: any) => {
        entry.forEach((change: any) => {
            if (change.isIntersecting) {
                change.target.classList.add('element-show');
            }
        });
    }
    //////////////////////

    const onscroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        scrollBlock.current.animate({
            height: `${event.currentTarget.scrollTop / (event.currentTarget.scrollHeight - event.currentTarget.clientHeight) * 100}%`
        }, { duration: 100, fill: 'forwards', easing: 'ease-in-out' })



        let SelectedPageimageBlockimg = document.body.getElementsByClassName('SelectedPage_imageBlock_img')[0]

        SelectedPageimageBlockimg.animate({
            transform: `translateY(${event.currentTarget.scrollTop / (event.currentTarget.scrollHeight - event.currentTarget.clientHeight) * 100}%)`
        }, { duration: 50, fill: 'forwards', easing: 'ease' })
    }


    useEffect(() => {
        if (isSelected) {
            setSwitch(true)
            refSelectedPage.current.animate({
                height: '100vh'
            }, {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            })
        } else {
            // refSelectedPage.current.animate({
            //     height: '0'
            // }, {
            //     duration: 1000,
            //     fill: 'forwards',
            //     easing: 'ease-in-out'
            // })
            setTimeout(() => dispatch(changeSelectedDir(null)), 1000)

        }
    }, [dispatch, isSelected])


    useEffect(() => {
        if (!isSelected && switcher) {
            // setTimeout(() => {
            backAndScroll.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // }, 1000)
            setTimeout(() => {
                setSwitch(false)

            }, 1000)
        }

    }, [isSelected, switcher])

    // const storage = getStorage();





    useEffect(() => {
        function fillingArray() {
            if (Dir) {
                let subarr = []
                if (!selected) return
                // for (let i = 1; i < selected.numberOfImages; i++) {
                //     let img = await getDownloadURL(ref(storage, `${Dir}/img${i}.JPG`))
                //     subarr.push(img)
                // }
                // console.log('subarr', subarr)
                for (let i = 1; i <= selected.numberOfImages; i++) {
                    // let img = await getDownloadURL(ref(storage, `${Dir}/img${i}.JPG`))
                    subarr.push({ dir: Dir, img: String(i) })
                }
                setArr(subarr)
            } else {
                console.log('удалено')
                setArr([])
            }
        }
        fillingArray()
    }, [Dir, selected])

    function scrollToImages() {
        let SelectedPage_content = document.body.getElementsByClassName('SelectedPage_content')[0]
        backAndScroll.current.scrollTo({
            left: 0, top: SelectedPage_content.getBoundingClientRect().top, behavior: 'smooth'
        })

      
    }





    const myLoader = ({ src }: { src: string }) => src

    return (
        <div ref={refSelectedPage} className='SelectedPage' >
            {focusedImages && <FocusedImage />}
            <span onClick={() => dispatch(changeBooleanSwitcher(false))} className='SelectedPage_imageBlock_back'>
                Back
            </span>
            <div className='SelectedPage_imageBlock_imageIdOnCenter'>
                <div>{selected && selected.id}</div>
                <div>-</div>
                <div> {allContent.length}</div>
            </div>
            <div ref={scrollBlock} className='SelectedPage_scrollBlock' />
            <div ref={backAndScroll} className='backAndScroll' onScroll={(e) => onscroll(e)}>
                <ImageBlock selected={selected} scrollToImages={scrollToImages} />


                <div className='SelectedPage_content'>
                    {switcher &&
                        <>
                            <div className='SelectedPage_content_images'>
                                {arrayOfImages.map((x, k) => k < arrayOfImages.length / 3 &&
                                    <SelectPageImage
                                        key={x.img}
                                        width={10}
                                        height={10}
                                        unoptimized={true}
                                        src={x} />
                                )}
                            </div>
                            <div className='SelectedPage_content_images'>
                                {arrayOfImages.map((x, k) => k >= arrayOfImages.length / 3 && k < arrayOfImages.length * 2 / 3 &&
                                    <SelectPageImage
                                        key={x.img}
                                        width={10}
                                        height={10}
                                        unoptimized={true}
                                        src={x} />
                                )}
                            </div>
                            <div className='SelectedPage_content_images'>
                                {arrayOfImages.map((x, k) => k >= arrayOfImages.length * 2 / 3 &&
                                    <SelectPageImage
                                        key={x.img}
                                        width={10}
                                        height={10}
                                        unoptimized={true}
                                        src={x} />
                                )}
                            </div>


                        </>}

                </div>
            </div>

        </div>
    );
};

export default SelectedPage;