import React from 'react';

const Dashboard = ({ inventory }) => {
  // Calculate total inventory value
  const totalStockValue = inventory.reduce((acc, product) => acc + (product.price * product.quantity), 0);

  // Calculate total number of products
  const totalProducts = inventory.length;

  // Calculate total quantity in stock
  const totalQuantity = inventory.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <div className="dashboard">
      <h2>Dashboard view</h2>
      <div className="dashboard-summary">
        <div className="stat">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="stat">
          <h3>Total Stock Value</h3>
          <p>{`M${totalStockValue.toFixed(2)}`}</p>
        </div>
        <div className="stat">
          <h3>Total Quantity</h3>
          <p>{totalQuantity} units</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
