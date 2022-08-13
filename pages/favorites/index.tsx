import React, { useEffect, useState } from 'react'
import { NextPage } from 'next';
import { MainLayout } from '../../components/layout'
import { NoFavorites } from '../../components/ui';
import localFavorites from '../../utils/local-favorites';
import { FavoritesPokemons } from '../../components/ui';

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
                 : (<FavoritesPokemons pokemons={favoritesPokemons} />)
            }





        </MainLayout>
    )
}

export default FavoritesPage;