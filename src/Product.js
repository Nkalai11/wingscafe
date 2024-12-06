import React, { useState } from 'react';

const Product = () => {
  // State to store the list of products
  const [products, setProducts] = useState([]);

  // State for product input fields
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  // Handle input changes for new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle adding new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const { name, price, quantity } = newProduct;

    // Check if all fields are filled
    if (!name || !price || !quantity) {
      alert('Please fill in all fields');
      return;
    }

    const product = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    setProducts((prevProducts) => [...prevProducts, product]);

    // Clear input fields
    setNewProduct({
      name: '',
      price: '',
      quantity: '',
    });
  };

  return (
    <div className="product">
      <h2>Product Management</h2>

      {/* Add Product Form */}
      <div className="add-product">
        <h3>Add Product</h3>
        <form onSubmit={handleAddProduct}>
          <div>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* View Products in Table */}
      <div className="view-products">
        <h3>View Products</h3>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>M{product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Product;
