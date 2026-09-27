import { useState } from 'react';
import { flushSync } from 'react-dom';
import { CaseHeader, Metric, ResultHint } from './ComparisonCardParts';
import SalesAnalyticsActions from './SalesAnalyticsActions';
import SalesSummaryView from './SalesSummaryView';
import useCalculationMetric from './hooks/useCalculationMetric';
import useDurationMetric from './hooks/useDurationMetric';
import {
  calculateSalesSummary,
  ORDER_RECORDS,
  SALES_PERIODS,
  type SalesPeriod,
} from './reactCompilerSampleData';

const DEFAULT_PERIOD: SalesPeriod = '2026-09';
const METRIC_ID = 'sales-with-compiler';

export default function SalesAnalyticsWithCompiler() {
  'use memo';

  const [selectedPeriod, setSelectedPeriod] = useState<SalesPeriod>(DEFAULT_PERIOD);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const { outputRef, recordDuration, resetDuration } = useDurationMetric();
  const {
    outputRef: calculationOutputRef,
    resetCalculationCount,
  } = useCalculationMetric(METRIC_ID);
  const summary = calculateSalesSummary(ORDER_RECORDS, selectedPeriod, METRIC_ID);
  const periodLabel = SALES_PERIODS.find((period) => period.value === selectedPeriod)?.label ?? selectedPeriod;

  const measureUpdate = (update: () => void) => {
    const startTime = performance.now();
    flushSync(() => {
      update();
      setUpdateCount((count) => count + 1);
    });
    recordDuration(performance.now() - startTime);
  };

  const handleSelectPeriod = (period: SalesPeriod) => {
    measureUpdate(() => {
      setSelectedPeriod(period);
    });
  };

  const handleReset = () => {
    flushSync(() => {
      setSelectedPeriod(DEFAULT_PERIOD);
      setDetailsOpen(false);
      setUpdateCount(0);
    });
    resetDuration();
    resetCalculationCount();
  };

  return (
    <article className='rounded-lg border border-emerald-200 bg-emerald-50/40 p-5'>
      <CaseHeader enabled />
      <dl className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3'>
        <Metric label='操作回数'>{updateCount}</Metric>
        <Metric label='集計処理の実行回数'>
          <output ref={calculationOutputRef}>0</output>
        </Metric>
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
        改善結果: 詳細パネルの開閉では集計結果を再利用し、集計期間が変わったときだけ注文データを再集計します。
      </ResultHint>
      <SalesAnalyticsActions
        selectedPeriod={selectedPeriod}
        detailsOpen={detailsOpen}
        onToggleDetails={() => measureUpdate(() => setDetailsOpen((open) => !open))}
        onSelectPeriod={handleSelectPeriod}
        onReset={handleReset}
      />
    </article>
  );
}
