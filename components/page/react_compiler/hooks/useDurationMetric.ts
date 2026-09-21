import { useCallback, useRef } from 'react';

export default function useDurationMetric() {
  const outputRef = useRef<HTMLOutputElement>(null);

  const recordDuration = useCallback((duration: number) => {
    if (outputRef.current) {
      outputRef.current.value = `${duration.toFixed(2)} ms`;
    }
  }, []);

  const resetDuration = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.value = '—';
    }
  }, []);

  return {
    outputRef,
    recordDuration,
    resetDuration,
  };
}
