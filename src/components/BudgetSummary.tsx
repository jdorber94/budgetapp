import React from 'react';
import { PiggyBank, TrendingDown, Wallet } from 'lucide-react';
import { CategoryBudget } from '../types/budget';

interface BudgetSummaryProps {
  totalBudget: CategoryBudget;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ totalBudget }) => {
  const spentPercentage = totalBudget.budget > 0 
    ? (totalBudget.spent / totalBudget.budget) * 100 
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <PiggyBank className="text-indigo-500" />
        Total Budget Summary
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Wallet className="w-5 h-5" />
            <span className="font-medium">Total Budget</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">
            ${totalBudget.budget.toFixed(2)}
          </p>
        </div>

        <div className="bg-red-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <TrendingDown className="w-5 h-5" />
            <span className="font-medium">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-red-700">
            ${totalBudget.spent.toFixed(2)}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <PiggyBank className="w-5 h-5" />
            <span className="font-medium">Total Remaining</span>
          </div>
          <p className="text-2xl font-bold text-green-700">
            ${totalBudget.remaining.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Budget Used</span>
          <span>{spentPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              spentPercentage > 90 ? 'bg-red-500' : spentPercentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;