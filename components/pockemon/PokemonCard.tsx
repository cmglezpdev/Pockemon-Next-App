import { Grid, Card, Text, Row } from '@nextui-org/react';
import { SmallPokemon } from '../../interfaces/pokemon-list';
import { useRouter } from 'next/router';

interface Props {
    pokemon: SmallPokemon;
}


export const PokemonCard = ({ pokemon }: Props) => {

  const router = useRouter();

  const onClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  }

  const { id, img, name } = pokemon;

  return (
      <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card isHoverable isPressable onClick={onClick}>
        <Card.Body css={{p: 1}}>
          <Card.Image src={img} width="100%" height={140}/>
        </Card.Body>
        <Card.Footer>
          <Row justify='space-between'>
            <Text transform='capitalize'>{ name }</Text>
            <Text>#{ id }</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  )
}
