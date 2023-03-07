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
        paths: [{ params: { id: '1' } },
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
    const AllContent =
        [{ id: '1', selectpImg: Comand1, numberOfImages: 15, header: 'Команда', dir: 'Comand', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Comand, imagetitle: 'From sadasdNature to Culture' },
        { id: '2', selectpImg: Olga1, numberOfImages: 15, header: 'Ольга Ипатова', dir: 'OlgaIpatova', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Olga, imagetitle: 'Reventing Wonder' },
        { id: '3', selectpImg: Retush1, numberOfImages: 15, header: 'Ретушь', dir: 'Retush', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Retush, imagetitle: 'Sound Expressed In Full' },
        { id: '4', selectpImg: YulySmirnova1, numberOfImages: 15, header: 'Юля Смирнова', dir: 'YulySmirnova', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: YulySmirnova, imagetitle: 'From Gaggio With Love' },
        { id: '5', selectpImg: FSTany1, numberOfImages: 15, header: 'Таня', dir: 'FSTany', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: FSTany, imagetitle: 'The Regeneration Suit' },
        { id: '6', selectpImg: Yana1, numberOfImages: 15, header: '6Toadsadasdo for the day', dir: 'Yana', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Yana, imagetitle: 'Чето еще' },
        { id: '7', selectpImg: FS1, numberOfImages: 15, header: 'FS', dir: 'FS', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: FS, imagetitle: 'Чето еще' }
        ]

    const selected = AllContent.find(x => x.dir === id)
    return {
        props: { data: selected }, // will be passed to the page component as props
    }
}

// import { useAppSelector, useAppDispatch } from '../store/hooks'
// import { Allcontent, SelectedContent, booleanSwitcher } from '../store/PageContentSlice'
// import { selectContent, selectNull, changeBooleanSwitcher } from '../store/PageContentSlice'

export default function Aa({ data }: any) {
    // console.log('props', data)
    // const selected = useAppSelector(SelectedContent)
    // const cs = { id: '3', selectpImg: Retush1, numberOfImages: 15, header: 'Ретушь', dir: 'Retush', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Retush, imagetitle: 'Sound Expressed In Full' }

    return (
        <>
            <DynamicSelectedPage select={data} />
        </>
    );
};

