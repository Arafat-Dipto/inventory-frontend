import React from 'react';
import MainMenuItem from '../Shared/MainMenuItem';

const MainMenu = ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="/dashboard" icon="dashboard" />
      <MainMenuItem text="Category" link="/categories" icon="dashboard" />
      <MainMenuItem text="Product" link="/products" icon="dashboard" />
      <MainMenuItem text="Supplier" link="/suppliers" icon="dashboard" />
      <MainMenuItem text="Purchase" link="/purchases" icon="dashboard" />
    </div>
  );
};
export default MainMenu;