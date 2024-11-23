import React, { useState } from 'react';
import { FolderPlus } from 'lucide-react';

interface CategoryFormProps {
  onAddCategory: (name: string, budget: number) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedBudget = parseFloat(budget);
    if (name && !isNaN(parsedBudget) && parsedBudget > 0) {
      onAddCategory(name, parsedBudget);
      setName('');
      setBudget('');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FolderPlus className="text-indigo-500" />
        Add Budget Category
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Rent, Groceries, Entertainment"
            required
          />
        </div>
        <div>
          <label htmlFor="categoryBudget" className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Budget
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              id="categoryBudget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="block w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter monthly budget"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;