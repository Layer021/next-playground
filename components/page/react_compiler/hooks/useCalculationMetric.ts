import { useCallback } from 'react';
import {
  registerCalculationMetricOutput,
  resetCalculationMetric,
} from '../calculationMetricStore';

export default function useCalculationMetric(id: string) {
  const outputRef = useCallback((output: HTMLOutputElement | null) => {
    registerCalculationMetricOutput(id, output);
  }, [id]);

  const resetCalculationCount = useCallback(() => {
    resetCalculationMetric(id);
  }, [id]);

  return {
    outputRef,
    resetCalculationCount,
  };
}
