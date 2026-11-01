import type { IconName } from '../ui/Icon';

export type Transaction = {
  id: string;
  title: string;
  detail: string;
  date: string;
  amount: string;
  icon: IconName;
  category: string;
};

export const transactions: Transaction[] = [
  { id: 'salary', title: 'Salary', detail: 'Monthly income', date: 'Today, 09:42', amount: '+$4,000.00', icon: 'wallet', category: 'Income' },
  { id: 'market', title: 'Fresh market', detail: 'Groceries', date: 'Today, 08:15', amount: '-$84.50', icon: 'groceries', category: 'Food' },
  { id: 'rent', title: 'Apartment rent', detail: 'Home', date: 'Yesterday, 17:20', amount: '-$674.40', icon: 'rent', category: 'Home' },
  { id: 'metro', title: 'Metro card', detail: 'Transport', date: 'Yesterday, 12:05', amount: '-$28.00', icon: 'car', category: 'Transport' },
  { id: 'pharmacy', title: 'City pharmacy', detail: 'Health', date: 'Mon, 14:30', amount: '-$25.90', icon: 'medicine', category: 'Health' },
  { id: 'coffee', title: 'Coffee Lab', detail: 'Food & drink', date: 'Mon, 10:12', amount: '-$12.40', icon: 'food', category: 'Food' },
  { id: 'cinema', title: 'Cinema tickets', detail: 'Entertainment', date: 'Sun, 19:05', amount: '-$32.00', icon: 'entertainment', category: 'Fun' },
];

export const spendingCategories = [
  { label: 'Food', icon: 'food' as const, amount: 320, limit: 600 },
  { label: 'Transport', icon: 'car' as const, amount: 186, limit: 400 },
  { label: 'Health', icon: 'medicine' as const, amount: 74, limit: 250 },
  { label: 'Home', icon: 'rent' as const, amount: 434, limit: 900 },
  { label: 'Shopping', icon: 'gift' as const, amount: 90, limit: 500 },
  { label: 'Fun', icon: 'entertainment' as const, amount: 83, limit: 300 },
];
