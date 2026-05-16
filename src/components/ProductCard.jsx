import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition duration-300">

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover"
      />

      {/* CONTENT */}
      <div className="p-5">

        <h2 className="text-xl font-semibold mb-2">
          {product.name}
        </h2>

        <p className="text-blue-600 text-lg font-bold mb-4">
          Rp {product.price}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Detail Produk
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;