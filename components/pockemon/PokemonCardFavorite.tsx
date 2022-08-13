import React from 'react'
import { Grid, Card } from '@nextui-org/react';
import { useRouter } from 'next/router';


interface Props {
    pokemonId: number;
}

export const PokemonCardFavorite = ({ pokemonId }:Props) => {
    
    const router = useRouter();

    const onFavoriteClicked = () => {
        router.push(`/pokemon/${pokemonId}`);
    }
 
    return (
        <Grid xs={6} sm={3} xl={1} key={pokemonId} onClick={onFavoriteClicked}>
            <Card isHoverable isPressable css={{padding: 10}}>
                <Card.Image 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                    width={'100%'}
                    height={140}
                />
            </Card>
        </Grid>
    )
}
