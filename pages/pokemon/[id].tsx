import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import React, { useState } from 'react';
import { MainLayout } from '../../components/layout';
import pokeApi from '../../api/pokeApi';
import { PokemonDetail } from '../../interfaces/pokemon-detail';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';
import localFavorites from '../../utils/local-favorites';

interface Props {
    pokemon: PokemonDetail;
}

const PokemonPage:NextPage<Props> = ({ pokemon }) => {
    
    const [isInFavorites, setIsInFavorites ] = useState( localFavorites.existPokemonInFavorites(pokemon.id) );
    
    const onToogleFavorite = () => {
        localFavorites.toogleFavorite(pokemon.id);
        setIsInFavorites( !isInFavorites );
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