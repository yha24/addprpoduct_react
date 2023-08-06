import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface Product {
  product_name: string;
  quantity_inventory: number;
  brand: string;
  category: string;
  image: string;
  price: number;
}

function AddProduct() {
  const [product, setProduct] = useState<Product>({
    product_name: '',
    quantity_inventory: 0,
    brand: '',
    category: '',
    image: '',
    price: 0,
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://rene-be.onrender.com/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('https://rene-be.onrender.com/products', product)
      .then((response: { data: any }) => {
        console.log(response.data);
        setProduct({
          product_name: '',
          quantity_inventory: 0,
          brand: '',
          category: '',
          image: '',
          price: 0,
        });
        fetchProducts();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setProduct({ ...product, product_name: event.target.value });
  };

  const handleBrandChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setProduct({ ...product, brand: event.target.value });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setProduct({ ...product, category: event.target.value });
  };
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setProduct({ ...product, price: Number(event.target.value )});
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setProduct({ ...product, image: event.target.value });
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setProduct({ ...product, quantity_inventory: parseInt(event.target.value) });
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name:
          <input type="text" value={product.product_name} onChange={handleNameChange} />
        </div>
        <br />
        <div>
          Price:
          <input type="number" value={product.price} onChange={handlePriceChange} />
        </div>
        <br />
        <div>
          Brand:
          <input type="text" value={product.brand} onChange={handleBrandChange} />
        </div>
        <br />
        <div>
          Category:
          <input type="text" value={product.category} onChange={handleCategoryChange} />
        </div>
        <br />
        <div>
          Quantity:
          <input type="text" value={product.quantity_inventory} onChange={handleQuantityChange} />
        </div>
        <br />
        <div>
          Image:
          <input type="text" value={product.image} onChange={handleImageChange} />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      {/* <div>
        <h2>Product List</h2>
        <div>
          {products.map((product) => (
            <div key={product.product_name}>
              {product.product_name} - {product.price}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default AddProduct;