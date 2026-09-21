export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

export type SalesPeriod = '2026-08' | '2026-09';

type OrderRecord = {
  id: number;
  period: SalesPeriod;
  productName: string;
  category: string;
  unitPrice: number;
  quantity: number;
  discountRate: number;
};

export type SalesSummary = {
  totalRevenue: number;
  orderCount: number;
  averageOrderValue: number;
  topCategory: string;
  topProducts: Array<{
    name: string;
    revenue: number;
  }>;
  topOrders: Array<{
    id: number;
    productName: string;
    revenue: number;
  }>;
};

export const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'ワイヤレスイヤホン', category: 'オーディオ', price: 12_800 },
  { id: 2, name: 'メカニカルキーボード', category: 'PC周辺機器', price: 18_400 },
  { id: 3, name: 'モバイルバッテリー', category: 'アクセサリー', price: 6_980 },
  { id: 4, name: 'スマートウォッチ', category: 'ウェアラブル', price: 24_800 },
  { id: 5, name: 'ポータブルスピーカー', category: 'オーディオ', price: 9_900 },
  { id: 6, name: 'USB-Cドッキングステーション', category: 'PC周辺機器', price: 15_600 },
];

export const SALES_PERIODS: Array<{ value: SalesPeriod; label: string }> = [
  { value: '2026-08', label: '2026年8月' },
  { value: '2026-09', label: '2026年9月' },
];

export const ORDER_RECORDS: OrderRecord[] = Array.from({ length: 60_000 }, (_, index) => {
  const product = INITIAL_PRODUCTS[(index * 5 + Math.floor(index / 2)) % INITIAL_PRODUCTS.length];

  return {
    id: index + 1,
    period: index % 2 === 0 ? '2026-08' : '2026-09',
    productName: product.name,
    category: product.category,
    unitPrice: product.price,
    quantity: ((index * 3) % 4) + 1,
    discountRate: index % 11 === 0 ? 0.1 : 0,
  };
});

export function calculateSalesSummary(
  orders: OrderRecord[],
  period: SalesPeriod,
): SalesSummary {
  const revenueByCategory = new Map<string, number>();
  const revenueByProduct = new Map<string, number>();
  const periodOrders = orders
    .filter((order) => order.period === period)
    .map((order) => ({
      id: order.id,
      productName: order.productName,
      category: order.category,
      revenue: Math.round(order.unitPrice * order.quantity * (1 - order.discountRate)),
    }))
    .sort((a, b) => b.revenue - a.revenue);

  let totalRevenue = 0;

  for (const order of periodOrders) {
    totalRevenue += order.revenue;
    revenueByCategory.set(
      order.category,
      (revenueByCategory.get(order.category) ?? 0) + order.revenue,
    );
    revenueByProduct.set(
      order.productName,
      (revenueByProduct.get(order.productName) ?? 0) + order.revenue,
    );
  }

  const topCategory = [...revenueByCategory.entries()]
    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
  const topProducts = [...revenueByProduct.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, revenue]) => ({ name, revenue }));

  return {
    totalRevenue,
    orderCount: periodOrders.length,
    averageOrderValue: Math.round(totalRevenue / periodOrders.length),
    topCategory,
    topProducts,
    topOrders: periodOrders.slice(0, 3).map(({ id, productName, revenue }) => ({
      id,
      productName,
      revenue,
    })),
  };
}
