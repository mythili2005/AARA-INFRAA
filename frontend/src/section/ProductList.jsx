import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(p => (
        <div key={p._id} className="p-4 border shadow rounded">
          <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover" />
          <h3 className="text-lg font-bold">{p.name}</h3>
          <p>{p.description}</p>
          <p className="text-green-700 font-semibold">₹{p.price}</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
