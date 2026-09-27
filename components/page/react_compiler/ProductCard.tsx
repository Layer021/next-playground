import { useCallback, useLayoutEffect, useRef } from 'react';
import type { Product } from './reactCompilerSampleData';

export default function ProductCard({
  product,
  onAddToCart,
  onCommit,
  registerOutput,
}: {
  product: Product;
  onAddToCart: (productId: number) => void;
  onCommit: (itemId: number) => void;
  registerOutput: (itemId: number, output: HTMLOutputElement | null) => void;
}) {
  const cardRef = useRef<HTMLLIElement>(null);
  const setOutputRef = useCallback((output: HTMLOutputElement | null) => {
    registerOutput(product.id, output);
  }, [product.id, registerOutput]);

  useLayoutEffect(() => {
    onCommit(product.id);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cardRef.current?.animate(
        [
          {
            backgroundColor: '#fef3c7',
            boxShadow: '0 0 0 2px #f59e0b',
          },
          {
            backgroundColor: '#ffffff',
            boxShadow: '0 0 0 0 rgba(245, 158, 11, 0)',
          },
        ],
        {
          duration: 650,
          easing: 'ease-out',
        },
      );
    }
  });

  return (
    <li ref={cardRef} className='rounded-md border border-slate-200 bg-white p-3 text-slate-700'>
      <div className='flex items-start justify-between gap-2'>
        <div>
          <span className='block text-xs text-slate-500'>{product.category}</span>
          <span className='mt-1 block text-sm font-semibold text-slate-900'>{product.name}</span>
        </div>
        <button
          type='button'
          className='shrink-0 rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-700'
          onClick={() => onAddToCart(product.id)}
        >
          カートに追加
        </button>
      </div>
      <div className='mt-3 flex items-end justify-between gap-2 border-t border-slate-100 pt-2'>
        <span className='font-mono text-sm font-semibold text-slate-900'>
          ¥{product.price.toLocaleString()}
        </span>
        <span className='text-right text-[10px] text-slate-500'>
          最終レンダー
          <output ref={setOutputRef} className='mt-0.5 block font-mono text-[11px] text-slate-800'>
            —
          </output>
        </span>
      </div>
    </li>
  );
}
