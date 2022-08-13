import React, { useEffect, useState } from 'react'
import { NextPage } from 'next';
import { MainLayout } from '../../components/layout'
import { NoFavorites } from '../../components/ui';
import localFavorites from '../../utils/local-favorites';
import { Card, Grid } from '@nextui-org/react';

const FavoritesPage:NextPage = () => {

    const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritesPokemons( localFavorites.pokemons() );
    }, []);


    return (
        <MainLayout title="Pokemon | Favorites">

            {
                favoritesPokemons.length === 0
                 ? (<NoFavorites /> ) 
                 : (
                    <Grid.Container gap={2} direction="row" justify='flex-start'>
                        {
                            favoritesPokemons.map( (pokemonId:number) => (
                                <Grid xs={6} sm={3} xl={1} key={pokemonId}>
                                    <Card isHoverable isPressable css={{padding: 10}}>
                                        <Card.Image 
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                                            width={'100%'}
                                            height={140}
                                        />
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid.Container>
                 )
            }





        </MainLayout>
    )
}

export default FavoritesPage;