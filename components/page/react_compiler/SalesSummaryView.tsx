import type { SalesSummary } from './reactCompilerSampleData';

function formatCurrency(value: number) {
  return `¥${value.toLocaleString()}`;
}

export default function SalesSummaryView({
  periodLabel,
  summary,
  detailsOpen,
}: {
  periodLabel: string;
  summary: SalesSummary;
  detailsOpen: boolean;
}) {
  return (
    <div className='mt-3 rounded-md border border-slate-200 bg-white p-3'>
      <div className='flex items-center justify-between gap-3'>
        <h4 className='text-sm font-semibold text-slate-900'>{periodLabel}の売上集計</h4>
        <span className='rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-600'>
          60,000件から集計
        </span>
      </div>

      <dl className='mt-3 grid grid-cols-2 gap-2 text-sm'>
        <div className='rounded bg-slate-50 p-2'>
          <dt className='text-xs text-slate-500'>売上合計</dt>
          <dd className='mt-1 font-mono font-semibold text-slate-900'>
            {formatCurrency(summary.totalRevenue)}
          </dd>
        </div>
        <div className='rounded bg-slate-50 p-2'>
          <dt className='text-xs text-slate-500'>注文件数</dt>
          <dd className='mt-1 font-mono font-semibold text-slate-900'>
            {summary.orderCount.toLocaleString()}件
          </dd>
        </div>
        <div className='rounded bg-slate-50 p-2'>
          <dt className='text-xs text-slate-500'>平均注文金額</dt>
          <dd className='mt-1 font-mono font-semibold text-slate-900'>
            {formatCurrency(summary.averageOrderValue)}
          </dd>
        </div>
        <div className='rounded bg-slate-50 p-2'>
          <dt className='text-xs text-slate-500'>売上トップカテゴリー</dt>
          <dd className='mt-1 font-semibold text-slate-900'>{summary.topCategory}</dd>
        </div>
      </dl>

      {detailsOpen && (
        <div className='mt-3 grid gap-3 border-t border-slate-200 pt-3 sm:grid-cols-2'>
          <div>
            <h5 className='text-xs font-semibold text-slate-700'>売上上位の商品</h5>
            <ol className='mt-2 space-y-1 text-xs text-slate-600'>
              {summary.topProducts.map((product, index) => (
                <li key={product.name} className='flex justify-between gap-2'>
                  <span>{index + 1}. {product.name}</span>
                  <span className='font-mono'>{formatCurrency(product.revenue)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h5 className='text-xs font-semibold text-slate-700'>注文金額トップ3</h5>
            <ol className='mt-2 space-y-1 text-xs text-slate-600'>
              {summary.topOrders.map((order) => (
                <li key={order.id} className='flex justify-between gap-2'>
                  <span>#{order.id} {order.productName}</span>
                  <span className='font-mono'>{formatCurrency(order.revenue)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
