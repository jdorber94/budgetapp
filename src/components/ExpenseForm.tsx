import React, { useState } from 'react';
import { Receipt } from 'lucide-react';
import { Category } from '../types/budget';

interface ExpenseFormProps {
  categories: Category[];
  onAddExpense: (categoryId: string, description: string, amount: number) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ categories, onAddExpense }) => {
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (categoryId && description && !isNaN(parsedAmount) && parsedAmount > 0) {
      onAddExpense(categoryId, description, parsedAmount);
      setCategoryId('');
      setDescription('');
      setAmount('');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Receipt className="text-indigo-500" />
        Add Expense
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter expense description"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter expense amount"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          disabled={categories.length === 0}
        >
          {categories.length === 0 ? 'Add a category first' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;