import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img
          className="product-img"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />

        {/* small chip */}
        <span className="product-chip">{product.category}</span>
      </div>

      <div className="product-body">
        <h3 className="product-title line-clamp-1">{product.title}</h3>
        <p className="product-desc line-clamp-2">{product.description}</p>

        <div className="product-meta">
          <p className="product-price">$ {product.price}</p>
          <span className="product-rating">⭐ {product.rating}</span>
        </div>
      </div>
    </div>
  );
}
