import React from 'react'
import { Grid } from '@nextui-org/react';
import { PokemonCardFavorite } from '../pockemon';

interface Props {
    pokemons: number[];
}



export const FavoritesPokemons = ({ pokemons }:Props) => {
    
    return (
        <Grid.Container gap={2} direction="row" justify='flex-start'>
        {
            pokemons.map( (pokemonId:number) => (
                <PokemonCardFavorite key={pokemonId} pokemonId={pokemonId} />
            ))
        }
    </Grid.Container>
    )
}
