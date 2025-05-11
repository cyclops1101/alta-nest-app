export type Invoice = {
  id: number;
  vendor_name: string;
  amount: number;
  description: string;
  due_date: string;
  paid: boolean;
};
