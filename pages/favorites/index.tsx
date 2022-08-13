import React from 'react'
import { NextPage } from 'next';
import { MainLayout } from '../../components/layout'

const FavoritesPage:NextPage = () => {
    return (
        <MainLayout title="Pokemon | Favorites">
            <h1>Favorites Tab</h1>
        </MainLayout>
    )
}

export default FavoritesPage;
