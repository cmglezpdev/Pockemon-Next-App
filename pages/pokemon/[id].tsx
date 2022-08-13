import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import { MainLayout } from '../../components/layout';
import pokeApi from '../../api/pokeApi';
import { PokemonDetail } from '../../interfaces/pokemon-detail';

interface Props {
    pokemon: PokemonDetail;
}

const PokemonPage:NextPage<Props> = ({ pokemon }) => {

    return (
        <MainLayout title='Listado de Pokemons'>
            <h1>{ pokemon.name }</h1>
        </MainLayout>
    )
};

export default PokemonPage;

// Se usa en las paguinas que tienen rutas dinamicas
export const getStaticPaths:GetStaticPaths = async(ctx) => {

    const paths = [...Array(151)]
                    .map((value, index) => ({
                            params: {id: `${index + 1}`}
                        }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps:GetStaticProps = async (ctx) => {

    const { params } = ctx;
    const { id } = params as {id: string};

    const { data } = await pokeApi.get<PokemonDetail>(`/pokemon/${id}`);

    return { 
        props: {
            pokemon: data
        }
    }
}