import { useState } from 'react';
import { flushSync } from 'react-dom';
import { CaseHeader, Metric, ResetButton, ResultHint } from './ComparisonCardParts';
import ProductListWithCompiler from './ProductListWithCompiler';
import useCommitMetric from './hooks/useCommitMetric';
import { INITIAL_PRODUCTS } from './reactCompilerSampleData';

export default function ProductCatalogWithCompiler() {
  'use memo';

  const [cartCount, setCartCount] = useState(0);
  const [lastAddedProductId, setLastAddedProductId] = useState<number | null>(null);
  const { outputRef, registerItemOutput, recordCommit, resetCommitCount } = useCommitMetric();
  const lastAddedProduct = INITIAL_PRODUCTS.find((product) => product.id === lastAddedProductId);

  const addToCart = (productId: number) => {
    setCartCount((count) => count + 1);
    setLastAddedProductId(productId);
  };

  const handleReset = () => {
    flushSync(() => {
      setCartCount(0);
      setLastAddedProductId(null);
    });
    resetCommitCount();
  };

  return (
    <article className='rounded-lg border border-emerald-200 bg-emerald-50/40 p-5'>
      <CaseHeader enabled />
      <dl className='mt-4 grid grid-cols-2 gap-3'>
        <Metric label='カート件数'>{cartCount}</Metric>
        <Metric label='商品のコミット合計'>
          <output ref={outputRef}>0</output>
        </Metric>
      </dl>
      <p className='mt-3 rounded-md bg-white px-3 py-2 text-sm text-slate-600'>
        最後に追加した商品: <strong className='text-slate-900'>{lastAddedProduct?.name ?? '—'}</strong>
      </p>
      <ProductListWithCompiler
        products={INITIAL_PRODUCTS}
        onAddToCart={addToCart}
        onCommit={recordCommit}
        registerItemOutput={registerItemOutput}
      />
      <ResultHint>
        改善結果: 商品カードからカートへ追加しても、変化するのは親のカート情報だけです。商品一覧は再利用されます。
      </ResultHint>
      <div className='mt-4'>
        <ResetButton onReset={handleReset} />
      </div>
    </article>
  );
}
