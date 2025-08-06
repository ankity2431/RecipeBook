import React, { useState, useEffect } from 'react';
import { searchRecipes, getRandomRecipes, Recipe } from '../../services/api';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Homepage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRecipes = async (query: string = '') => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (query.trim()) {
        const searchData = await searchRecipes(query, 12);
        data = { recipes: searchData.results };
      } else {
        data = await getRandomRecipes(12);
      }
      
      setRecipes(data.recipes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchRecipes(query);
  };

  const handleRetry = () => {
    fetchRecipes(searchQuery);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Discover Amazing Recipes
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore thousands of delicious recipes from around the world. Find your next favorite dish!
        </p>
        
        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </div>

      {/* Results Header */}
      {searchQuery && !loading && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {recipes.length > 0 
              ? `Found ${recipes.length} recipe${recipes.length === 1 ? '' : 's'} for "${searchQuery}"`
              : `No recipes found for "${searchQuery}"`
            }
          </h2>
        </div>
      )}

      {!searchQuery && !loading && recipes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Featured Recipes</h2>
        </div>
      )}

      {/* Content */}
      {loading && <LoadingSpinner text="Fetching delicious recipes..." />}
      
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      
      {!loading && !error && recipes.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No recipes found for your search.</p>
          <p className="text-gray-500">Try searching for different ingredients or dish names.</p>
        </div>
      )}
      
      {!loading && !error && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;