import { useCallback, useRef } from 'react';

export default function useEffectRunMetric() {
  const countRef = useRef(0);
  const outputRef = useRef<HTMLOutputElement>(null);

  const recordEffectRun = useCallback(() => {
    countRef.current += 1;

    if (outputRef.current) {
      outputRef.current.value = String(countRef.current);
    }
  }, []);

  const resetEffectRunCount = useCallback(() => {
    countRef.current = 0;

    if (outputRef.current) {
      outputRef.current.value = '0';
    }
  }, []);

  return {
    outputRef,
    recordEffectRun,
    resetEffectRunCount,
  };
}
