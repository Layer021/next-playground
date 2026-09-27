'use client';

import InventorySubscriptionWithCompiler from './InventorySubscriptionWithCompiler';
import InventorySubscriptionWithoutCompiler from './InventorySubscriptionWithoutCompiler';
import MutatingSortWithCompiler from './MutatingSortWithCompiler';
import MutatingSortWithoutCompiler from './MutatingSortWithoutCompiler';
import ProductCatalogWithCompiler from './ProductCatalogWithCompiler';
import ProductCatalogWithoutCompiler from './ProductCatalogWithoutCompiler';
import RhfUseWatchWithCompiler from './RhfUseWatchWithCompiler';
import RhfWatchWithCompiler from './RhfWatchWithCompiler';
import RhfWatchWithoutCompiler from './RhfWatchWithoutCompiler';
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
        計測をリセットしてから、各セクションの操作ボタンを押して比較してください。
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
          開発モードでは同じレンダー処理が安全確認のため複数回実行されることがあるため、回数の大小ではなく「0のままか、増えたか」を見ます。
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

      <section className='mt-10'>
        <h2 className='text-lg font-bold text-slate-900'>React Hook Formとの連携</h2>
        <p className='mt-1 text-sm leading-6 text-slate-600'>
          それぞれの入力欄に名前を入力し、下の表示値が追従するかを確認します。FormProvider配下でwatchを使う構成と、useWatchを使う構成の違いを比較します。
        </p>
        <ProcessFlow
          steps={[
            { label: '名前を入力', value: '各カードの入力欄へ同じ文字を入力' },
            { label: '表示値を確認', value: 'Reactが認識した値が追従するかを見る' },
            { label: '安全な購読と比較', value: 'useWatchでは子自身が変更を購読' },
          ]}
        />
        <div className='mt-3 grid grid-cols-1 gap-4 2xl:grid-cols-3'>
          <RhfWatchWithCompiler />
          <RhfWatchWithoutCompiler />
          <RhfUseWatchWithCompiler />
        </div>
      </section>

      <section className='mt-10'>
        <h2 className='text-lg font-bold text-slate-900'>商品メモを開いても在庫通知を維持できるか</h2>
        <p className='mt-1 text-sm leading-6 text-slate-600'>
          商品管理画面が在庫通知サーバーへ常時接続している想定です。計測をリセットしてから、接続条件とは無関係な「商品メモを開く」を押してください。
        </p>
        <ProcessFlow
          steps={[
            { label: '通知サーバーへ接続', value: '在庫の変更を常時受け取る' },
            { label: '商品メモを開く', value: '接続とは無関係な画面だけ変更' },
            { label: '接続維持を確認', value: '不要な再接続が0回かを比較' },
          ]}
        />
        <div className='mt-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800'>
          見方: 商品メモを開いたあと「不要な再接続」が0回なら接続を維持、1回以上なら通知サーバーへ接続し直しています。
        </div>
        <div className='mt-3 grid grid-cols-1 gap-4 xl:grid-cols-2'>
          <InventorySubscriptionWithCompiler />
          <InventorySubscriptionWithoutCompiler />
        </div>
      </section>

      <section className='mt-10'>
        <h2 className='text-lg font-bold text-slate-900'>子の商品並べ替えが親データを書き換える例</h2>
        <p className='mt-1 text-sm leading-6 text-slate-600'>
          親は商品をおすすめ順で保持していますが、子が価格順プレビューを作るときに同じ配列を直接並べ替えてしまう例です。
          各カードで「1. 表示」「2. 閉じる」の順に操作し、親のおすすめ順を比較してください。どちらも同じバグを含みますが、Compilerありでは表示の再利用によってバグが隠れます。
        </p>
        <div className='mt-3 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-800'>
          確認ポイント: 2回操作したあと、Compilerありはおすすめ順の表示が残り、Compilerなしは価格順へ変わります。Compilerがバグを直すわけではなく、どちらも修正が必要です。この破壊的なsortはCompilerにもESLintにも検出されません。
        </div>
        <div className='mt-3 grid grid-cols-1 gap-4 xl:grid-cols-2'>
          <MutatingSortWithCompiler />
          <MutatingSortWithoutCompiler />
        </div>
      </section>
    </div>
  );
}
