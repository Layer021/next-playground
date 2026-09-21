import { useState } from 'react';
import { flushSync } from 'react-dom';
import { CaseHeader, Metric, ResultHint } from './ComparisonCardParts';
import SalesAnalyticsActions from './SalesAnalyticsActions';
import SalesSummaryView from './SalesSummaryView';
import useDurationMetric from './hooks/useDurationMetric';
import {
  calculateSalesSummary,
  ORDER_RECORDS,
  SALES_PERIODS,
  type SalesPeriod,
} from './reactCompilerSampleData';

const DEFAULT_PERIOD: SalesPeriod = '2026-09';

export default function SalesAnalyticsWithoutCompiler() {
  const [selectedPeriod, setSelectedPeriod] = useState<SalesPeriod>(DEFAULT_PERIOD);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const { outputRef, recordDuration, resetDuration } = useDurationMetric();
  const summary = calculateSalesSummary(ORDER_RECORDS, selectedPeriod);
  const periodLabel = SALES_PERIODS.find((period) => period.value === selectedPeriod)?.label ?? selectedPeriod;

  const measureUpdate = (update: () => void) => {
    const startTime = performance.now();
    flushSync(() => {
      update();
      setUpdateCount((count) => count + 1);
    });
    recordDuration(performance.now() - startTime);
  };

  const handleChangePeriod = () => {
    measureUpdate(() => {
      setSelectedPeriod((period) => period === '2026-09' ? '2026-08' : '2026-09');
    });
  };

  const handleReset = () => {
    flushSync(() => {
      setSelectedPeriod(DEFAULT_PERIOD);
      setDetailsOpen(false);
      setUpdateCount(0);
    });
    resetDuration();
  };

  return (
    <article className='rounded-lg border border-amber-200 bg-amber-50/40 p-5'>
      <CaseHeader enabled={false} />
      <dl className='mt-4 grid grid-cols-2 gap-3'>
        <Metric label='操作回数'>{updateCount}</Metric>
        <Metric label='直近の更新時間'>
          <output ref={outputRef}>—</output>
        </Metric>
      </dl>
      <SalesSummaryView
        periodLabel={periodLabel}
        summary={summary}
        detailsOpen={detailsOpen}
      />
      <ResultHint>
        比較結果: 集計条件と無関係な詳細パネルの開閉でも、60,000件の注文データを毎回再集計します。
      </ResultHint>
      <SalesAnalyticsActions
        detailsOpen={detailsOpen}
        onToggleDetails={() => measureUpdate(() => setDetailsOpen((open) => !open))}
        onChangePeriod={handleChangePeriod}
        onReset={handleReset}
      />
    </article>
  );
}
