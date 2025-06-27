export interface EstimateItem {
  id: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

export interface Estimate {
  id: string;
  items: EstimateItem[];
  totalSum: number;
}
