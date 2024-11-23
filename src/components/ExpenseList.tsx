import React from 'react';
import { Category, Expense } from '../types/budget';
import { Trash2, Calendar } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  categories: Category[];
  onRemoveExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, categories, onRemoveExpense }) => {
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.color || 'bg-gray-500';
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="text-indigo-500" />
          Recent Expenses
        </h3>
        <p className="text-gray-500 text-center py-4">No expenses recorded yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Calendar className="text-indigo-500" />
        Recent Expenses
      </h3>
      <div className="space-y-4">
        {sortedExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getCategoryColor(expense.categoryId)}`} />
              <div>
                <p className="font-medium">{expense.description}</p>
                <p className="text-sm text-gray-500">
                  {getCategoryName(expense.categoryId)} • {formatDate(expense.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">${expense.amount.toFixed(2)}</span>
              <button
                onClick={() => onRemoveExpense(expense.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="Delete expense"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;