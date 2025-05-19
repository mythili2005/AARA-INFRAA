import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <img src={product.imageUrl} alt={product.name} className="w-full h-auto mb-4 rounded" />
      <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
      <p className="text-lg mb-2">{product.description}</p>
      <p className="text-xl font-semibold text-green-600 mb-4">₹{product.price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
