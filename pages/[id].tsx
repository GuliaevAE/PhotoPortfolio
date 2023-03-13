import React from 'react';

import Comand from '../public/images/Comand.webp'
import Comand1 from '../public/images/Comand2.webp'
import Olga from '../public/images/Olga.webp'
import Olga1 from '../public/images/Olga2.webp'
import Retush from '../public/images/Retush.webp'
import Retush1 from '../public/images/Retush2.webp'
import YulySmirnova from '../public/images/YulySmirnova.webp'
import YulySmirnova1 from '../public/images/YulySmirnova2.webp'
import FSTany from '../public/images/FSTany.webp'
import FSTany1 from '../public/images/FSTany2.webp'
import Yana from '../public/images/Yana.webp'
import Yana1 from '../public/images/Yana2.webp'
import FS from '../public/images/FSs.webp'
import FS1 from '../public/images/FSs2.webp'


import dynamic from 'next/dynamic'
const DynamicSelectedPage = dynamic(() => import('../components/selectedPage'), {
    ssr: false,
})
import SelectedPage from '../components/selectedPage';


export async function getStaticPaths() {



    return {
        paths: [
            { params: { id: 'Comand' } },
            { params: { id: 'OlgaIpatova' } },
            { params: { id: 'Retush' } },
            { params: { id: 'YulySmirnova' } },
            { params: { id: 'FSTany' } },
            { params: { id: 'Yana' } },
            { params: { id: 'FS' } }],
        fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps(context: any) {

    const { id } = context.params
   

    return { props: { id } }

}

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher } from '../store/PageContentSlice'

export default function Aa({ id }: any) {
    const allImages = useAppSelector(Allcontent)
    const selected = allImages.find(x => x.dir === id)
    return (
        <>
            <DynamicSelectedPage select={selected} />
        </>
    );
};

