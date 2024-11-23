export interface Category {
  id: string;
  name: string;
  budget: number;
  color: string;
}

export interface Expense {
  id: string;
  categoryId: string;
  description: string;
  amount: number;
  date: string;
}

export interface CategoryBudget {
  budget: number;
  spent: number;
  remaining: number;
}