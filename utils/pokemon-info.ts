import pokeApi from '../api/pokeApi';
import { PokemonDetail } from '../interfaces/pokemon-detail';


const getPokemonInfo = async (nameOrId: string) => {

    const { data } = await pokeApi.get<PokemonDetail>(`/pokemon/${ nameOrId }`);

    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }

}

export default getPokemonInfo;