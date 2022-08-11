import { FC, FunctionComponent } from "react"

import Head from "next/head"

import { Navbar } from '../ui';

interface Props {
    children: React.ReactNode;
    title?: string;
} 


export const MainLayout:FC<Props> = ({ children, title }) => {
    return (  
        <>
            <Head>
                <title>{ title || 'Pokemon App'}</title>
                <meta name='author' content="Carlos Manuel" />
                <meta name='description' content={`Información sobre el pokemon ${ title }`} />
                <meta name='keywords' content={`${ title }, pokemon, pokedex`} />
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
