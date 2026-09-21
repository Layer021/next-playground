import { ResetButton } from './ComparisonCardParts';

export default function SalesAnalyticsActions({
  detailsOpen,
  onToggleDetails,
  onChangePeriod,
  onReset,
}: {
  detailsOpen: boolean;
  onToggleDetails: () => void;
  onChangePeriod: () => void;
  onReset: () => void;
}) {
  return (
    <div className='mt-4 flex flex-wrap gap-2'>
      <button
        type='button'
        className='rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'
        onClick={onToggleDetails}
      >
        詳細パネルを{detailsOpen ? '閉じる' : '開く'}
      </button>
      <button
        type='button'
        className='rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2'
        onClick={onChangePeriod}
      >
        集計期間を変更
      </button>
      <ResetButton onReset={onReset} />
    </div>
  );
}
