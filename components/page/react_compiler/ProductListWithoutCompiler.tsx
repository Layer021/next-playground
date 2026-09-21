import ProductCard from './ProductCard';
import type { Product } from './reactCompilerSampleData';

export default function ProductListWithoutCompiler({
  products,
  onAddToCart,
  onCommit,
  registerItemOutput,
}: {
  products: Product[];
  onAddToCart: (productId: number) => void;
  onCommit: (itemId: number) => void;
  registerItemOutput: (itemId: number, output: HTMLOutputElement | null) => void;
}) {
  return (
    <ul className='mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2' aria-label='商品カタログ'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onCommit={onCommit}
          registerOutput={registerItemOutput}
        />
      ))}
    </ul>
  );
}
