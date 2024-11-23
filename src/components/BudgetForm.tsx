import React, { useState } from 'react';
import { DollarSign, RefreshCw } from 'lucide-react';

interface BudgetFormProps {
  budget: number;
  onSetBudget: (amount: number) => void;
  onReset: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ budget, onSetBudget, onReset }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onSetBudget(parsedAmount);
      setAmount('');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <DollarSign className="text-green-500" />
        Set Monthly Budget
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Budget Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              id="budget"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your monthly budget"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Set Budget
          </button>
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Reset Budget"
          >
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;