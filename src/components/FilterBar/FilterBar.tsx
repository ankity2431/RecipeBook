import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions, CUISINE_OPTIONS, DIET_OPTIONS, MEAL_TYPE_OPTIONS } from '../../services/api';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isLoading?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange, isLoading = false }) => {
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters };
    if (newFilters[key] === value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-800">Filter Recipes</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            disabled={isLoading}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-orange-600 transition-colors duration-200 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Cuisine Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Cuisine</h4>
          <div className="flex flex-wrap gap-2">
            {CUISINE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange('cuisine', option.value)}
                disabled={isLoading}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
                  filters.cuisine === option.value
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`} 
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Diet Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Dietary Preferences</h4>
          <div className="flex flex-wrap gap-2">
            {DIET_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange('diet', option.value)}
                disabled={isLoading}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
                  filters.diet === option.value
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Type Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Meal Type</h4>
          <div className="flex flex-wrap gap-2">
            {MEAL_TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange('type', option.value)}
                disabled={isLoading}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
                  filters.type === option.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {filters.cuisine && (
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md">
                  {CUISINE_OPTIONS.find(c => c.value === filters.cuisine)?.label}
                </span>
              )}
              {filters.diet && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md">
                  {DIET_OPTIONS.find(d => d.value === filters.diet)?.label}
                </span>
              )}
              {filters.type && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                  {MEAL_TYPE_OPTIONS.find(t => t.value === filters.type)?.label}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;