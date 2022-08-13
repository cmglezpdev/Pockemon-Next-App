import { FC, FunctionComponent } from "react"

import Head from "next/head"

import { Navbar } from '../ui';

interface Props {
    children?: React.ReactNode;
    title?: string;
} 

const origin = (typeof window === 'undefined') ? '' : window.location.origin;


export const MainLayout:FC<Props> = ({ children, title }) => {

    

    return (  
        <>
            <Head>
                <title>{ title || 'Pokemon App'}</title>
                <meta name='author' content="Carlos Manuel" />
                <meta name='description' content={`Información sobre el pokemon ${ title }`} />
                <meta name='keywords' content={`${ title }, pokemon, pokedex`} />
            
                <meta property="og:title" content={`Pokemon Information ${ title }`} />
                <meta property="og:description" content={`This is a page about ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head> 

            <Navbar />   

            <main style={{
                padding: '0 20px',
            }}>
                {children}
            </main>
        </>
    )
}
