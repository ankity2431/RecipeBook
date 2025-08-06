import React from 'react';
import { Link, useLocation } from 'react-router';
import { ChefHat, Home, ArrowLeft } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isRecipeDetails = location.pathname.startsWith('/recipe/');

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-200"
          >
            <ChefHat className="h-8 w-8" />
            <span className="text-xl font-bold">RecipeBook</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isRecipeDetails ? (
              <Link
                to="/"
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-orange-50"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Recipes</span>
              </Link>
            ) : (
              <Link
                to="/"
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-orange-50"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;