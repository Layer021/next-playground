type InventoryListener = (stock: number) => void;

export type InventoryApi = {
  publish: (stock: number) => void;
  subscribe: (listener: InventoryListener) => () => void;
};

export function createInventoryApi(): InventoryApi {
  const listeners = new Set<InventoryListener>();

  return {
    publish(stock) {
      for (const listener of listeners) {
        listener(stock);
      }
    },
    subscribe(listener) {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
  };
}
