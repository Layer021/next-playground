import { ResetButton } from './ComparisonCardParts';
import {
  SALES_PERIODS,
  type SalesPeriod,
} from './reactCompilerSampleData';

export default function SalesAnalyticsActions({
  selectedPeriod,
  detailsOpen,
  onToggleDetails,
  onSelectPeriod,
  onReset,
}: {
  selectedPeriod: SalesPeriod;
  detailsOpen: boolean;
  onToggleDetails: () => void;
  onSelectPeriod: (period: SalesPeriod) => void;
  onReset: () => void;
}) {
  return (
    <div className='mt-4 space-y-4'>
      <fieldset>
        <legend className='text-xs font-semibold text-slate-700'>集計期間</legend>
        <div className='mt-2 grid grid-cols-2 rounded-lg bg-slate-100 p-1' aria-label='集計期間を選択'>
          {SALES_PERIODS.map((period) => {
            const selected = period.value === selectedPeriod;

            return (
              <button
                key={period.value}
                type='button'
                aria-pressed={selected}
                disabled={selected}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  selected
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
                }`}
                onClick={() => onSelectPeriod(period.value)}
              >
                {period.label}
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className='flex flex-wrap gap-2'>
        <button
          type='button'
          className='rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'
          onClick={onToggleDetails}
        >
          詳細パネルを{detailsOpen ? '閉じる' : '開く'}
        </button>
        <ResetButton onReset={onReset} />
      </div>
    </div>
  );
}
