import { Button } from '@nextui-org/react'

import type { NextPage } from 'next'


const HomePage: NextPage = () => {
  return (
    <>
      <h1>Hola mundo</h1>
      <Button color='gradient' >
        Click here
      </Button>
    </>
  )
}

export default HomePage
