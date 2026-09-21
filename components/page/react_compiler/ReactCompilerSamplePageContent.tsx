'use client';

import ProductCatalogWithCompiler from './ProductCatalogWithCompiler';
import ProductCatalogWithoutCompiler from './ProductCatalogWithoutCompiler';
import SalesAnalyticsWithCompiler from './SalesAnalyticsWithCompiler';
import SalesAnalyticsWithoutCompiler from './SalesAnalyticsWithoutCompiler';

function ProcessFlow({
  steps,
}: {
  steps: Array<{
    label: string;
    value: string;
  }>;
}) {
  return (
    <ol className='mt-3 grid grid-cols-1 gap-2 text-sm md:grid-cols-3'>
      {steps.map((step, index) => (
        <li
          key={step.label}
          className='relative rounded-md border border-slate-200 bg-white px-4 py-3'
        >
          <span className='text-xs font-semibold text-slate-500'>STEP {index + 1}</span>
          <span className='mt-1 block font-semibold text-slate-900'>{step.label}</span>
          <span className='mt-1 block text-xs leading-5 text-slate-600'>{step.value}</span>
          {index < steps.length - 1 && (
            <span className='absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-slate-700 px-1.5 py-0.5 text-xs text-white md:block'>
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function ReactCompilerSamplePageContent() {
  return (
    <div className='mx-auto max-w-6xl'>
      <h1 className='text-2xl font-bold text-slate-900'>React Compiler 比較</h1>
      <p className='mt-2 text-sm text-slate-600'>
        計測をリセットしてから、それぞれの「更新する」を押して比較してください。
      </p>

      <section className='mt-8'>
        <h2 className='text-lg font-bold text-slate-900'>商品カタログの部分更新</h2>
        <p className='mt-1 text-sm leading-6 text-slate-600'>
          商品カードからカートへ追加したとき、内容が変わらない商品一覧が再利用されるかを確認します。再レンダーされたカードは黄色く点滅します。
        </p>
        <ProcessFlow
          steps={[
            { label: '商品をカートへ追加', value: '商品カード内のボタンをクリック' },
            { label: '親の情報だけ変更', value: 'カート件数と最後の商品名を更新' },
            { label: '商品一覧を再利用', value: '6商品の内容は変わらないため更新を省略' },
          ]}
        />
        <div className='mt-3 grid grid-cols-1 gap-4 xl:grid-cols-2'>
          <ProductCatalogWithCompiler />
          <ProductCatalogWithoutCompiler />
        </div>
      </section>

      <section className='mt-10'>
        <h2 className='text-lg font-bold text-slate-900'>売上分析ダッシュボード</h2>
        <p className='mt-1 text-sm leading-6 text-slate-600'>
          60,000件の注文データを集計し、入力が同じ場合の再利用と、期間変更時の必要な再計算を確認します。
        </p>
        <ProcessFlow
          steps={[
            { label: '注文データを集計', value: '売上・平均金額・ランキングを算出' },
            { label: '画面または期間を変更', value: '詳細開閉は入力不変、期間変更は入力変更' },
            { label: '再利用可否を判定', value: '入力が同じ場合だけ集計処理を省略' },
          ]}
        />
        <div className='mt-3 grid grid-cols-1 gap-4 xl:grid-cols-2'>
          <SalesAnalyticsWithCompiler />
          <SalesAnalyticsWithoutCompiler />
        </div>
      </section>
    </div>
  );
}
