import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({ id: Number(id), name: '', price: 0 , image: ''});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://rene-be.onrender.com/products/${id}`);
      setProduct(response.data);
    }
    fetchData();
  }, [id]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, name: event.target.value });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, price: Number(event.target.value) });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, image: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`https://rene-be.onrender.com/products/${id}`, product);
      navigate('/path');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name:
          <input type="text" value={product.name} onChange={handleNameChange} />
        </div>
        <br />
        <div>
          Price:
          <input type="number" value={product.price} onChange={handlePriceChange} />
        </div>  
        <br />
        <div>
          Image:
          <input type="text"  value={product.image} onChange={handleImageChange}/>
        </div>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UpdateProduct;