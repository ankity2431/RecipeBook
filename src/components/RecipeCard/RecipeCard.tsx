import React from 'react';
import { Link } from 'react-router';
import { Clock, Users, DollarSign } from 'lucide-react';
import { Recipe } from '../../services/api';
import StarRating from '../StarRating/StarRating';
import { getRecipeRating } from '../../services/reviewService';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  const rating = getRecipeRating(recipe.id);

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2 mb-2">
          {recipe.title}
        </h3>
        
        {recipe.summary && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {stripHtml(recipe.summary)}
          </p>
        )}
        
        {rating.totalReviews > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            <StarRating rating={rating.averageRating} size="sm" />
            <span className="text-sm text-gray-600">
              ({rating.totalReviews} review{rating.totalReviews !== 1 ? 's' : ''})
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {recipe.readyInMinutes && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-orange-500" />
                <span>{recipe.readyInMinutes}m</span>
              </div>
            )}
            
            {recipe.servings && (
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-green-500" />
                <span>{recipe.servings}</span>
              </div>
            )}
          </div>
          
          {recipe.pricePerServing && (
            <div className="flex items-center space-x-1 text-orange-600 font-medium">
              <DollarSign className="h-4 w-4" />
              <span>${formatPrice(recipe.pricePerServing)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;