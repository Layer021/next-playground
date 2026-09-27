import { useState } from 'react';
import { CaseHeader, ResetButton, ResultHint } from './ComparisonCardParts';

type RankedProduct = {
  id: number;
  name: string;
  price: number;
};

const INITIAL_PRODUCTS: RankedProduct[] = [
  { id: 1, name: 'スマートウォッチ', price: 24_800 },
  { id: 2, name: 'ワイヤレスイヤホン', price: 12_800 },
  { id: 3, name: 'キーボード', price: 18_400 },
];

function ProductOrder({ products }: { products: RankedProduct[] }) {
  return (
    <ol className='mt-2 space-y-1 text-sm text-slate-700'>
      {products.map((product, index) => (
        <li key={product.id} className='flex items-center justify-between gap-3 rounded bg-slate-50 px-2 py-1.5'>
          <span>{index + 1}. {product.name}</span>
          <span className='font-mono text-xs'>¥{product.price.toLocaleString()}</span>
        </li>
      ))}
    </ol>
  );
}

function PricePreviewWithCompiler({ products }: { products: RankedProduct[] }) {
  'use memo';

  const sortedProducts = products.sort((a, b) => a.price - b.price);

  return (
    <div className='mt-3 rounded-md border border-blue-200 bg-blue-50/50 p-3'>
      <p className='text-xs font-semibold text-blue-700'>子が表示する「価格の安い順」</p>
      <ProductOrder products={sortedProducts} />
    </div>
  );
}

export default function MutatingSortWithCompiler() {
  'use memo';

  const [products, setProducts] = useState(() => INITIAL_PRODUCTS.map((product) => ({ ...product })));
  const [previewVisible, setPreviewVisible] = useState(false);
  const [hasSorted, setHasSorted] = useState(false);

  const handleTogglePreview = () => {
    setPreviewVisible((visible) => !visible);
    setHasSorted(true);
  };

  const handleReset = () => {
    setProducts(INITIAL_PRODUCTS.map((product) => ({ ...product })));
    setPreviewVisible(false);
    setHasSorted(false);
  };

  return (
    <article className='rounded-lg border border-rose-200 bg-rose-50/40 p-5'>
      <CaseHeader enabled />
      <div className='mt-4 rounded-md border border-slate-200 bg-white p-3'>
        <p className='text-xs font-semibold text-slate-700'>親が保持する「おすすめ順」</p>
        <div data-testid='mutation-on-parent-order'>
          <ProductOrder products={products} />
        </div>
        {previewVisible && <PricePreviewWithCompiler products={products} />}
      </div>
      {hasSorted && !previewVisible && (
        <p className='mt-3 rounded-md border border-rose-200 bg-rose-100 px-3 py-2 text-xs leading-5 text-rose-800'>
          見た目はおすすめ順のままですが、子は元の商品配列を価格順に書き換えています。親の表示が再利用され、バグが画面上では隠れています。
        </p>
      )}
      <ResultHint>
        Compilerがデータの書き換えを直したのではありません。同じ配列を直接sortせず、コピーを作ってから並べ替える必要があります。
      </ResultHint>
      <div className='mt-4 flex flex-wrap gap-2'>
        <button
          type='button'
          className='rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700'
          onClick={handleTogglePreview}
        >
          {!hasSorted
            ? '1. 価格順プレビューを表示'
            : previewVisible
              ? '2. プレビューを閉じて親を再表示'
              : '価格順プレビューをもう一度表示'}
        </button>
        <ResetButton onReset={handleReset} />
      </div>
    </article>
  );
}
