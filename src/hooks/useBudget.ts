import { useState, useEffect } from 'react';
import { Category, Expense, CategoryBudget } from '../types/budget';

const COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-orange-500',
];

export const useBudget = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [categories, expenses]);

  const addCategory = (name: string, budget: number) => {
    const colorIndex = categories.length % COLORS.length;
    setCategories([
      ...categories,
      {
        id: crypto.randomUUID(),
        name,
        budget,
        color: COLORS[colorIndex],
      },
    ]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, ...updates } : cat
      )
    );
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    setExpenses(expenses.filter((exp) => exp.categoryId !== id));
  };

  const addExpense = (categoryId: string, description: string, amount: number) => {
    setExpenses([
      ...expenses,
      {
        id: crypto.randomUUID(),
        categoryId,
        description,
        amount,
        date: new Date().toISOString(),
      },
    ]);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const getCategoryBudget = (categoryId: string): CategoryBudget => {
    const category = categories.find((cat) => cat.id === categoryId);
    const categoryExpenses = expenses.filter((exp) => exp.categoryId === categoryId);
    const spent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      budget: category?.budget || 0,
      spent,
      remaining: (category?.budget || 0) - spent,
    };
  };

  const getTotalBudget = (): CategoryBudget => {
    const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      budget: totalBudget,
      spent: totalSpent,
      remaining: totalBudget - totalSpent,
    };
  };

  return {
    categories,
    expenses,
    addCategory,
    updateCategory,
    removeCategory,
    addExpense,
    removeExpense,
    getCategoryBudget,
    getTotalBudget,
  };
};