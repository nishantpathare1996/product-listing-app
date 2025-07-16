import type { CardProps } from "../types/product";

export default function ProductCard({ product }: CardProps) {
  return (
    <div className="border rounded-lg h-full flex flex-col p-2">
      {/* Ensure the image fills the card, maintains aspect ratio and no distortion */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm">Price: ${product.price}</p>
        <p className="text-sm text-gray-400">{product.description}</p>
      </div>
    </div>
  );
}
