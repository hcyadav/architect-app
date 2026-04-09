"use client";

import Link from "next/link";

interface RelatedProduct {
  id: string;
  slug?: string;
  title: string;
  price: number;
  mrp?: number;
  imageUrl: string;
  category: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  title: string;
}

export default function RelatedProducts({ products, title }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#111827",
          marginBottom: "20px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "12px",
        }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug || product.id}`}
            className="group block"
            style={{
              border: "0.5px solid #e5e7eb",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#fff",
              transition: "box-shadow 0.2s",
            }}
          >
            {/* Image — 100px height */}
            <div
              style={{
                width: "100%",
                height: "100px",
                overflow: "hidden",
                background: "#f9fafb",
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s",
                }}
                className="group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div style={{ padding: "8px 10px 10px" }}>
              {/* Category tag */}
              <p
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#B4623A",
                  fontWeight: 600,
                  marginBottom: "3px",
                }}
              >
                {product.category}
              </p>

              {/* Name */}
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#111827",
                  lineHeight: 1.35,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  marginBottom: "6px",
                }}
              >
                {product.title}
              </p>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <span style={{ fontSize: "11px", color: "#9ca3af", textDecoration: "line-through" }}>
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
