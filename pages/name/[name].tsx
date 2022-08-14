import React, { useState } from 'react';

import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';

import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { PokemonDetail } from '../../interfaces/pokemon-detail';
import { MainLayout } from '../../components/layout';
import { localFavorites, getPokemonInfo} from '../../utils';
import pokeApi from '../../api/pokeApi';
import { PokemonListResponse } from '../../interfaces/pokemon-list';

interface Props {
    pokemon: PokemonDetail;
}

const PokemonByName:NextPage<Props> = ({ pokemon }) => {
    
    const [isInFavorites, setIsInFavorites ] = useState( localFavorites.existPokemonInFavorites(pokemon.id) );
    
    const onToogleFavorite = () => {
        localFavorites.toogleFavorite(pokemon.id);
        setIsInFavorites( !isInFavorites );

        if( !isInFavorites ) {
            confetti({
                zIndex: 9999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: {
                    x: 1,
                    y: 0
                }
            })
        }
    }


    return (
        <MainLayout title={ `Pokemon | ${pokemon.name}` }>
            <Grid.Container css={{marginTop: '5px'}} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default|| 'no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height="200px"
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{ pokemon.name }</Text>
                        
                            <Button
                                color='gradient'
                                ghost={ !isInFavorites }
                                onClick={onToogleFavorite}
                            >
                                { isInFavorites ? 'Remove from favorites' : 'Add to favorites' }
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites</Text> 
                            <Container direction='row' display='flex' gap={0} justify='space-evenly'>
                                <Image 
                                    src={pokemon.sprites.front_default} 
                                    alt={ pokemon.name } 
                                    width={100} 
                                    height={100} 
                                />
                                <Image 
                                    src={pokemon.sprites.back_default} 
                                    alt={ pokemon.name } 
                                    width={100} 
                                    height={100} 
                                />
                                <Image 
                                    src={pokemon.sprites.front_shiny} 
                                    alt={ pokemon.name } 
                                    width={100} 
                                    height={100} 
                                />
                                <Image 
                                    src={pokemon.sprites.back_shiny} 
                                    alt={ pokemon.name } 
                                    width={100} 
                                    height={100} 
                                />

                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </MainLayout>
    )
};

export default PokemonByName;

export const getStaticPaths: GetStaticPaths = async(contex) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    const paths = data.results.map( ({ name }) => ({
        params: { name }
    }) )

    return {
        paths,
        fallback: 'blocking'
    }

}

export const getStaticProps: GetStaticProps = async (context) => {

    const { params } = context;
    const { name } = params as {name: string};
    
    const pokemon = await getPokemonInfo(name);

    if( !pokemon ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    return {
        props: {
            pokemon,
        },
        revalidate: 86400,
    }
}