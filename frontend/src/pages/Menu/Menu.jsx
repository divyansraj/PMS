//import React from 'react'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../../components/Footer/Footer';

const Menu = () => {
  return (
    <div className="pt-[100px]">
      <ExploreMenu />
      <FoodDisplay />
      <Footer />
    </div>
  );
}

export default Menu