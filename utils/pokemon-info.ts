import pokeApi from '../api/pokeApi';
import { PokemonDetail } from '../interfaces/pokemon-detail';


const getPokemonInfo = async (nameOrId: string) => {

    try {
        
        const { data } = await pokeApi.get<PokemonDetail>(`/pokemon/${ nameOrId }`);
    
        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites
        }
        
    } catch (error) {
        console.log(error);
        return null;
    }


}

export default getPokemonInfo;