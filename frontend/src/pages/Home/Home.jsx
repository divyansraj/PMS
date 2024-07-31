/* eslint-disable no-unused-vars */
import React from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  
  return (
    <div>
      <Header />
      <ExploreMenu />
      <FoodDisplay/>
      <Footer/>
    </div>
  );
}

export default Home