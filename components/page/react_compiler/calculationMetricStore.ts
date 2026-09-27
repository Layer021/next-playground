const calculationCounts = new Map<string, number>();
const calculationOutputs = new Map<string, HTMLOutputElement>();
const pendingUpdates = new Set<string>();

function updateOutput(id: string) {
  const output = calculationOutputs.get(id);

  if (output) {
    output.value = String(calculationCounts.get(id) ?? 0);
  }
}

function scheduleOutputUpdate(id: string) {
  if (pendingUpdates.has(id)) {
    return;
  }

  pendingUpdates.add(id);
  queueMicrotask(() => {
    pendingUpdates.delete(id);
    updateOutput(id);
  });
}

export function recordCalculation(id: string) {
  calculationCounts.set(id, (calculationCounts.get(id) ?? 0) + 1);
  scheduleOutputUpdate(id);
}

export function resetCalculationMetric(id: string) {
  calculationCounts.set(id, 0);
  updateOutput(id);
}

export function registerCalculationMetricOutput(
  id: string,
  output: HTMLOutputElement | null,
) {
  if (output) {
    calculationOutputs.set(id, output);
    updateOutput(id);
  } else {
    calculationOutputs.delete(id);
  }
}
