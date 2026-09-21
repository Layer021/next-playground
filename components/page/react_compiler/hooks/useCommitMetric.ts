import { useCallback, useRef } from 'react';

function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export default function useCommitMetric() {
  const commitCountRef = useRef(0);
  const outputRef = useRef<HTMLOutputElement>(null);
  const itemOutputRefs = useRef(new Map<number, HTMLOutputElement>());

  const registerItemOutput = useCallback((itemId: number, output: HTMLOutputElement | null) => {
    if (output) {
      itemOutputRefs.current.set(itemId, output);
    } else {
      itemOutputRefs.current.delete(itemId);
    }
  }, []);

  const recordCommit = useCallback((itemId: number) => {
    commitCountRef.current += 1;

    if (outputRef.current) {
      outputRef.current.value = String(commitCountRef.current);
    }

    const itemOutput = itemOutputRefs.current.get(itemId);

    if (itemOutput) {
      itemOutput.value = formatTime(new Date());
    }
  }, []);

  const resetCommitCount = useCallback(() => {
    commitCountRef.current = 0;

    if (outputRef.current) {
      outputRef.current.value = '0';
    }

    for (const itemOutput of itemOutputRefs.current.values()) {
      itemOutput.value = '—';
    }
  }, []);

  return {
    outputRef,
    registerItemOutput,
    recordCommit,
    resetCommitCount,
  };
}
