import { useEffect, useState } from 'react';
import { CaseHeader, Metric, ResetButton, ResultHint } from './ComparisonCardParts';
import useEffectRunMetric from './hooks/useEffectRunMetric';
import { createInventoryApi } from './inventoryApi';

export default function InventorySubscriptionWithoutCompiler() {
  'use no memo';

  const [api] = useState(createInventoryApi);
  const [stock, setStock] = useState(12);
  const [memoOpen, setMemoOpen] = useState(false);
  const { outputRef, recordEffectRun, resetEffectRunCount } = useEffectRunMetric();

  const handleStockChange = (nextStock: number) => {
    setStock(nextStock);
  };

  useEffect(() => {
    recordEffectRun();
    return api.subscribe(handleStockChange);
  }, [api, handleStockChange, recordEffectRun]);

  return (
    <article className='rounded-lg border border-amber-200 bg-amber-50/40 p-5'>
      <CaseHeader enabled={false} />
      <dl className='mt-4 grid grid-cols-2 gap-3'>
        <Metric label='最新の在庫'>{stock}個</Metric>
        <Metric label='不要な再接続'>
          <output ref={outputRef} data-testid='subscription-off-count'>0</output>回
        </Metric>
      </dl>
      <div className='mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-3'>
        <div className='flex items-center gap-2'>
          <span className='h-2.5 w-2.5 rounded-full bg-emerald-500' aria-hidden='true' />
          <p className='text-sm font-semibold text-emerald-800'>在庫通知サーバーに接続中</p>
        </div>
        <p className='mt-2 text-xs text-slate-600'>在庫が変わったときだけ通知を受け取る接続です。</p>
      </div>
      {memoOpen && (
        <>
          <div className='mt-3 rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-600'>
            <p className='font-semibold text-slate-800'>商品メモ</p>
            <p className='mt-1 text-xs'>次回入荷分はキャンペーン対象。在庫通知の接続条件とは無関係です。</p>
          </div>
          <p className='mt-3 rounded-md border border-amber-200 bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-800'>
            メモを開いただけなのに、通知サーバーへ接続し直しました。
          </p>
        </>
      )}
      <ResultHint>
        確認結果: 商品メモしか変えていませんが、通知接続をいったん解除して作り直します。
      </ResultHint>
      <div className='mt-4 flex flex-wrap gap-2'>
        <button
          type='button'
          className='rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700'
          onClick={() => setMemoOpen((open) => !open)}
        >
          商品メモを{memoOpen ? '閉じる' : '開く'}
        </button>
        <ResetButton onReset={resetEffectRunCount} />
      </div>
    </article>
  );
}
