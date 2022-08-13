import { GetStaticProps, NextPage } from 'next'
import { Grid } from '@nextui-org/react';
import { MainLayout } from '../components/layout'
import pokeApi from '../api/pokeApi';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pockemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  console.log(pokemons)

  return (
    <>
      <MainLayout title='Listado de Pokemons'>

        <Grid.Container gap={2} justify="flex-start">
          {
            pokemons.map((pokemon) => (
              <PokemonCard 
                pokemon={pokemon} 
                key={pokemon.id} 
              />
            ))
          }
        </Grid.Container>

      </MainLayout>
    </>
  )
}

export default HomePage;

// Esto se ejecuta del lado del servidor, por lo que nada de esto llega al cliente
// a excepcion de lo que se está retornando

// Esta función siempre de debería usar cuando queremos que todo el contenido de cree en build time
// ya que esto seria contenido que se ejecuta la iniciar por primera vez la paguina y nunca va a acambiar
export const getStaticProps: GetStaticProps = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151'); 

    const pokemons:SmallPokemon[] = data.results.map((pokemon, i) => {
      return {
        ...pokemon,
        id: i + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
      }
    })


    return {
      props: {
        pokemons
      }
    }

}

