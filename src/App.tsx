import React from 'react';
import { Wallet } from 'lucide-react';
import CategoryForm from './components/CategoryForm';
import ExpenseForm from './components/ExpenseForm';
import CategoryList from './components/CategoryList';
import ExpenseList from './components/ExpenseList';
import BudgetSummary from './components/BudgetSummary';
import { useBudget } from './hooks/useBudget';

function App() {
  const {
    categories,
    expenses,
    addCategory,
    removeCategory,
    addExpense,
    removeExpense,
    getCategoryBudget,
    getTotalBudget,
  } = useBudget();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Wallet className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Smart Budget</h1>
          <p className="text-gray-600">Manage your monthly expenses by category</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <CategoryForm onAddCategory={addCategory} />
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <ExpenseForm 
                categories={categories}
                onAddExpense={addExpense}
              />
            </div>

            <ExpenseList 
              expenses={expenses}
              categories={categories}
              onRemoveExpense={removeExpense}
            />
          </div>

          <div className="space-y-6">
            <BudgetSummary totalBudget={getTotalBudget()} />
            
            <CategoryList
              categories={categories}
              expenses={expenses}
              getCategoryBudget={getCategoryBudget}
              onRemoveCategory={removeCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;