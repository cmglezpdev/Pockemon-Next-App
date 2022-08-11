import { Button } from '@nextui-org/react'

import type { NextPage } from 'next'

import { MainLayout } from '../components/layout'

const HomePage: NextPage = () => {
  return (
    <>
      <MainLayout title='Listado de Pokemons'>
        <h1>Hola mundo</h1>
        <Button color='gradient' >
          Click here
        </Button>
      </MainLayout>
    </>
  )
}

export default HomePage
