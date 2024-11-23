import React from 'react';
import { Category, Expense } from '../types/budget';
import { Pencil, Trash2 } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  expenses: Expense[];
  getCategoryBudget: (categoryId: string) => { budget: number; spent: number; remaining: number };
  onRemoveCategory: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  expenses,
  getCategoryBudget,
  onRemoveCategory,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Budget Categories</h3>
      {categories.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No categories yet</p>
      ) : (
        <div className="grid gap-4">
          {categories.map((category) => {
            const { spent, remaining } = getCategoryBudget(category.id);
            const spentPercentage = (spent / category.budget) * 100;
            const categoryExpenses = expenses.filter((exp) => exp.categoryId === category.id);

            return (
              <div key={category.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <h4 className="font-semibold">{category.name}</h4>
                  </div>
                  <button
                    onClick={() => onRemoveCategory(category.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-500">Budget</p>
                    <p className="font-semibold">${category.budget.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Spent</p>
                    <p className="font-semibold text-red-600">${spent.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Remaining</p>
                    <p className="font-semibold text-green-600">${remaining.toFixed(2)}</p>
                  </div>
                </div>

                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      spentPercentage > 90 ? 'bg-red-500' : spentPercentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                  />
                </div>

                {categoryExpenses.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Recent Expenses</p>
                    <div className="space-y-2">
                      {categoryExpenses.slice(-3).map((expense) => (
                        <div key={expense.id} className="text-sm flex justify-between">
                          <span className="text-gray-600">{expense.description}</span>
                          <span className="font-medium">${expense.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryList;